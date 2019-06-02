import Express from "express";
import Path from "path";
import Mongoose from "mongoose";
import Models from "./database/db";
import BodyParser from "body-parser";
import Session from "express-session";
import Favicon from "serve-favicon";
import ConnectMongo from "connect-mongo";
import Slashes from "connect-slashes";
import Config from "../config/config";
import Logger from "./logger";
import Uuid from "uuid";
import Bcrypt from "bcrypt";
import Passport from "passport";
import PassportLocal from "passport-local";
import Helmet from "helmet";
import ExpressWinston from "express-winston";
import HttpError from "http-errors";


function setupPassport(userModel) {
    Passport.use(new PassportLocal.Strategy(
        {
            usernameField: 'username',
            passwordField: 'password'
        },
        (username, password, done) => {
            userModel.findOne({ userName: username }, function (err, user) {
                if (err) { return done(err); }
                if (!user) {
                    return done(null, false, { status: 401, message: 'Incorrect username.' });
                }
                if (!Bcrypt.compareSync(password, user.passwordHash)) {
                    return done(null, false, { message: 'Incorrect password.' });
                }
                return done(null, user);
            });
        }
    ));

    Passport.serializeUser((user, done) => {
        // @ts-ignore
        done(null, user.id);
    });
      
    Passport.deserializeUser((id, done) => {
        userModel.findById(id, function(err, user) {
            done(err, user);
          });
    });
}


function setupExpress(models) {  // : {ImplementationModel: Mongoose.Model<Mongoose.Document, {}>, UserModel: Mongoose.Model<Mongoose.Document, {}>}
    // Initiate Express server
    let app = Express();

    // Initiate MongoStore DB to store sessions
    let MongoStore = ConnectMongo(Session);

    // Add and Configure middleware
    app.use(Helmet({
        frameguard: {action: "deny"},
        dnsPrefetchControl: false
    }));
    app.use(Favicon(Path.join(__dirname, '../public/favicon.ico')))
    app.use("/public", Express.static(Path.join(__dirname, "../public")));
    app.use("/js", Express.static(Path.join(__dirname, "../public/js")));
    app.use("/css", Express.static(Path.join(__dirname, "../public/css")));
    app.use(Slashes());
    app.use(BodyParser.urlencoded({ extended: false }));
    app.use(BodyParser.json());
    app.use(ExpressWinston.logger({
        winstonInstance: Logger,
        ignoredRoutes: ["/api/login"]
    }));
    app.use(Session({
        name: Config.session.cookieName,
        genid: (req) => { return Uuid.v4() },
        secret: Config.session.secret, 
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({ mongooseConnection: Mongoose.connection }),
        cookie: {
            httpOnly: true,
            secure: false, //FIXME: change to true after switching to https
            maxAge: 1000 * 60 * 60 * 24 * 60, // 60days
            sameSite: "lax"
        }
    }));
    app.use(Passport.initialize());
    app.use(Passport.session());

    // Serve index.html
    app.get("/", (req, res) => {
        res.sendFile(Path.join(__dirname, Config.index));
    });

    // Login process
    /**
     * @api {post} /login Perform a user Login
     * @apiGroup Users
     *
     * @apiParam {String{5..39}} username Username of the user to Log-in.
     * @apiParam {String} password Password of the user to Log-in.
     */
    app.post("/api/login", 
        Passport.authenticate('local'),
        (req, res, next) => {
            res.sendStatus(200);
        }
    );

    // Logout process
    app.post("/api/logout", (req, res) => {
        req.logout();
        res.redirect("/");
    });

    // return true if a username is allowed for new users
    app.get("/api/validateUsername", (req, res, next) => {
        if (req.query.username && req.query.username.length > 4 && req.query.username.length < 40) {
            models.UserModel.find(
                {userName: req.query.username},
                (err, result) => {
                    if (err) {
                        next(err);
                    } else if (!result) {
                        // TODO: check allowed chars
                        res.json({allowed: true});
                    } else {
                        res.status(400).send("A username must be given: \n/api/validateUsername?username=<user name>")
                    }
                }
            )
        } else if (req.query.username) {
            res.status(400)
            res.json({allowed: false, reason: "Username must be between 5 and 39 Characters long."})
        } else {
            res.json({allowed: false, reason: "Username must be between 5 and 39 Characters long."})
        }
    })

    // Signup process
    app.post("/api/users", (req, res, next) => {
        if (!req.body.password || !req.body.username || !req.body.password) {
            return res.status(400).send("A username, email address and password are required to register a new user.")
        }
        let newUser = new models.UserModel({
            userName: req.body.username,
            email: req.body.email,
            firstName: req.body.firstname,
            lastName: req.body.lastname,
            passwordHash: Bcrypt.hashSync(req.body.password, 10) 
            // TODO: check the speed difference between async and sync hashing
        })
        newUser.save({validateBeforeSave: true}, (err, product) => {
            if (err) {
                // TODO: Add correct message in case of failure
                Logger.error("ERR: " + err);
                next(HttpError(400, err));
            } else { 
                res.status(201).send("CREATED");
                req.login(product, (err) => { if (err) next(err) });
            }
        })
    })

    // Get the information of a given user
    app.get("/api/users/:userName", (req, res, next) => {
        if (!req.user) {
            res.status(401).send("Please log-in and try again!")
        } else if (req.user.userName === req.params.userName) {
            res.json({ //TODO: maybe this can be better with de-construction (...)
                username: req.user.userName,
                firstName: req.user.firstName,
                lastName: req.user.lastName,
                email: req.user.email
            })
        } else {
            res.sendStatus(403)
            // right now, user cant see anything about other users. This will change.
            // models.UserModel.findOne(
            //     {userName: req.params.userName},
            //     (err, result) => {
            //         if (err) {
            //             Logger.warn("Error on /api/users/<username> : " + err)
            //             next(err)
            //         } else {
            //             res.json({
            //                 username: result.userName
            //             })
            //         }
            //     }
            // )
        }
    });

    // Edit a user
    // FIXME: not implemented
    app.put("/api/users/:userName", (req, res, next) => {
        if (!req.user) {
            res.status(401).send("Please log-in and try again!")
        } else if (req.user.userName === req.params.userName) {
            // Update
            res.sendStatus(501)
        } else {
            res.sendStatus(403)
        }
    });

    // Get the information of a given user
    app.delete("/api/users/:userName", (req, res, next) => {
        if (!req.user) {
            res.status(401).send("Please log-in and try again!")
        } else if (req.user.userName === req.params.userName) {
            models.UserModel.deleteOne(
                {userName: req.user.userName},
                (err, result) => {
                    if (err) {
                        next({message: err})
                    } else {
                        res.sendStatus(204)
                    }
                }
            )
            req.logout()
        } else {
            res.sendStatus(403)
        }
    });

    // Add a package to the DB
    // TODO: change error handlin to return useful messages
    app.post("/api/projects", (req, res, next) => {
        if (!req.user) { res.sendStatus(401); return; }
        let newProject = new models.ImplementationModel({...req.body, owner: req.user.id})
        newProject.save({validateBeforeSave: true}, (err, product) => {
            if (err) { 
                Logger.error("ERR: " + err);
                next({message: err.message});
            } else {
                models.UserModel.findOneAndUpdate(
                    // @ts-ignore
                    {userName: req.user.userName},
                    {$push: {implementations: product.id}},
                    (err, result) => {
                        if (err) next({message: err})
                    }
                )
                res.status(201).send("CREATED");
            }
        })
    });

    // Read a project
    app.get("/api/projects/:projectName", (req, res, next) => {
        models.ImplementationModel.find(
            {name: req.params.projectName},
            (err, result) => {
                Logger.info("DB ERR:" + err)
                if (err) { res.sendStatus(404); return; }
                res.json(result)
            }
        )
    });

    // Edit a project
    app.put("/api/projects/:projectName", (req, res, next) => {
        if (!req.user) { return res.sendStatus(401) }
        models.ImplementationModel.find(
            {name: req.params.projectName},
            (err, result) => {
                if (result.owner !== req.user!.id) { return res.sendStatus(401) }
                delete(req.body["owner"])
                delete(req.body["name"])
                models.ImplementationModel.update(
                    {name: req.params.projectName},
                    req.body,
                    {runValidators: true},
                    (err, result) => {
                        if (err) {next({message: err})}
                        // TODO: check res.modifiedCount
                    }
                )
            }
        )
    });

    // Delete a project
    // TODO: change error handlin to return useful messages
    app.delete("/api/projects/:projectName", (req, res, next) => {
        if (!req.user) { return res.sendStatus(401) }
        models.ImplementationModel.deleteOne(
            {
                name: req.params.projectName,
                owner: req.user.id
            },
            (err, result) => {
                if (err) { next({message: err}) }
                else { res.sendStatus(204) }
            }
        )
    })

    // Process search requests
    app.get("/api/search", (req, res, next) => {
        let search: Object = {$text: {$search: req.query.q}}
        if (!req.query.q) search = {}
        models.ImplementationModel.find(
            search,
            null,
            {
                limit: parseInt(req.query.count, 10),
                skip: parseInt(req.query.skip, 10),
                projection: { score: {$meta: "textScore" }},
                sort: { score: {$meta: "textScore" }}
            },
            (err, indx) => { 
                if (err) { next(err); return Logger.error("ERR: " + err); }
                models.ImplementationModel.countDocuments(search, (err, count) => {
                    if (err) { next(err); return Logger.error("ERR: " + err); }
                    // TODO: Set headers
                    res.json({
                        query: req.query.q,
                        totalResults: count,
                        shownResults: parseInt(req.query.count, 10) || count,
                        startIndex: parseInt(req.query.skip, 10) || 0,
                        results: indx
                    }); 
                })
            }
        );
    });

    // catch all non existing paths and return 404
    app.use((req, res, next) => {
        res.status(404).redirect("/");  //FIXME: remove redirect once frontend is ready
    });
    
    app.use(ExpressWinston.errorLogger({
        winstonInstance: Logger,
        dumpExceptions: true,
        showStack: true
    }));

    // error handler
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.send(err.message || "Server Error.");
    });

    return app
}


function main() {
    setupPassport(Models.UserModel)
    let app = setupExpress(Models)
    app.listen(Config.server.port, () => { Logger.info(`Server listening on port ${Config.server.port}!`) });
}


main()