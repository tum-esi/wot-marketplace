import Express from "express";
import Path from "path";
import Mongoose from "mongoose";
import { ImplementationSchema, UserSchema } from "./schemas";
import BodyParser from "body-parser";
import Session from "express-session";
import Favicon from "serve-favicon";
import ConnectMongo from "connect-mongo";
import Config from "../config/config";
import Uuid from "uuid";
import Bcrypt from "bcrypt";
import Passport from "passport";
import PassportLocal from "passport-local";
import Helmet from "helmet"


// Get correct configuration
let config = Config[process.env.NODE_ENV || 'development']


// Setup MongoDB connection
function setupMongo() {
    Mongoose.connect(
        config.database.url, 
        { 
            useNewUrlParser: true, 
            useCreateIndex: true 
        });
    let db = Mongoose.connection;
    db.on('error', (err) => console.error("DB connection error: " + err))
    db.once('open', () => console.log("Successfully connected to database!"))
    ImplementationSchema.index({'$**': 'text'});
    let ImplementationModel = Mongoose.model("ImplementationModel", ImplementationSchema, "implementations" );
    let UserModel =  Mongoose.model("UserModel", UserSchema, "users");
    return {ImplementationModel: ImplementationModel, UserModel: UserModel}
}


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
    }))
    app.use(Favicon(Path.join(__dirname, '../public/favicon.ico')))
    app.use("/public", Express.static(Path.join(__dirname, "../public")));
    app.use("/js", Express.static(Path.join(__dirname, "../public/js")));
    app.use("/css", Express.static(Path.join(__dirname, "../public/css")));
    app.use(BodyParser.urlencoded({ extended: false }));
    app.use(BodyParser.json());
    app.use(Session({
        name: config.session.cookieName,
        genid: (req) => { return Uuid.v4() },
        secret: config.session.secret, 
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
        res.sendFile(Path.join(__dirname, config.index));
    });

    // Login process
    app.post("/api/login", 
        Passport.authenticate('local', {successRedirect: '/', failureRedirect: '/login'})
    );

    // Logout process
    app.post("/api/logout", (req, res) => {
        req.logout();
        res.redirect("/");
    });

    // Signup process
    app.post("/api/signup", (req, res, next) => {
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
                console.log("ERR: " + err); next({status: 400, message: err});
            } else { 
                res.status(201).send("CREATED");
                req.login(product, (err) => { if (err) next(err) });
            }
        })
    })

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
                        res.json({allowed: false, reason: "Username already exists."});
                    }
                }
            )
        } else {
            res.json({allowed: false, reason: "Username must be between 5 and 39 Characters long."})
        }
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
            //             console.warn("Error on /api/users/<username> : " + err)
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

    // Process search requests
    app.get("/api/search", (req, res, next) => {
        models.ImplementationModel.find(
            {$text: {$search: req.query.q}},
            null,
            {
                limit: parseInt(req.query.count, 10),
                skip: parseInt(req.query.skip, 10)
            },
            (err, indx) => { 
                if (err) { next(err); return console.log("ERR: " + err); }
                models.ImplementationModel.countDocuments({$text: {$search: req.query.q}}, (err, count) => {
                    if (err) { next(err); return console.log("ERR: " + err); }
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

    // Return a certain package
    app.get("/api/project/:packageName", (req, res) => {
        models.ImplementationModel.find(
            {name: req.params.packageName},
            (err, result) => {
                res.json(result)
            }
        )
    });

    // Add a package to the DB
    // TODO: change error handlin to return useful messages
    app.put("/api/project/:projectName", (req, res, next) => {
        if (!req.user) { res.sendStatus(401); return; }
        let newProject = new models.ImplementationModel({...req.body, owner: req.user.id})
        newProject.save({validateBeforeSave: true}, (err, product) => {
            if (err) { 
                console.log("ERR: " + err);
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

    // catch 404 and forward to error handler
    app.use((req, res, next) => {
        next({status: 404, message: "URL not found."});
    });
    
    // error handler
    // TODO: Add logging
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.send(err.message || "Server Error.");
    });

    return app
}


function main() {
    let models = setupMongo()
    setupPassport(models.UserModel)
    let app = setupExpress(models)
    app.listen(config.server.port, () => { console.info(`Server listening on port ${config.server.port}!`) });
}


main()