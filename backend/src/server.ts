import Express from "express";
import Path from "path";
import HttpError from "http-errors";
import Mongoose from "mongoose";
import { ImplementationSchema, UserSchema } from "./schemas";
import BodyParser from "body-parser";
import Session from "express-session";
import favicon from "serve-favicon";
import ConnectMongo from "connect-mongo";
import Config from "../config/config";
import Uuid from "uuid";
import Bcrypt from "bcrypt";
import Passport from "passport";
import PassportLocal from "passport-local";


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
    return {ImplementationModel: ImplementationModel, userModel: UserModel}
}


function setupPassport(userModel) {
    Passport.use(new PassportLocal.Strategy(
        {
            usernameField: 'username',
            passwordField: 'password'
        },
        (username, password, done) => {
            console.log(`User trying to login with username: ${username} and password: ${password}`)
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


function setupExpress(models) {
    // Initiate Express server
    let app = Express();

    // Initiate MongoStore DB to store sessions
    let MongoStore = ConnectMongo(Session);

    // Add and Configure middleware
    app.use(favicon(Path.join(__dirname, '../public/favicon.ico')))
    app.use("/public", Express.static(Path.join(__dirname, "../public")));
    app.use("/js", Express.static(Path.join(__dirname, "../public/js")));
    app.use("/css", Express.static(Path.join(__dirname, "../public/css")));
    app.use(BodyParser.urlencoded({ extended: false }));
    app.use(BodyParser.json());
    app.use(Session({
        genid: (req) => { return Uuid.v4() },
        secret: config.session.secret, 
        resave: false,
        saveUninitialized: true,
        store: new MongoStore({ mongooseConnection: Mongoose.connection })
        // TODO: Fix session options (like expire ..) and cookie options (like httpOnly, secure .. )
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
        let newUser = new models.userModel({
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
                console.log("ERR: " + err); next(HttpError(400));
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
    app.get("/api/users/:userName",
        Passport.authenticate("local", (req, res) => {
            models.UserModel.find(
                {userName: req.params.userName},
                (err, result) => {
                    if (err) {
                        return Error()
                    } else {
                        res.json({ //TODO: maybe this can be better with de-construction (...)
                            username: result.userName,
                            firstName: result.firstName,
                            lastName: result.lastName
                        })
                    }
                }
            )
        })
    );

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
        let newProject = new models.ImplementationModel(req.body)
        newProject.save({validateBeforeSave: true}, (err, product) => {
            if (err) { 
                console.log("ERR: " + err);
                next(err);
            } else {
                res.status(201).send("CREATED");
            }
        })
    });

    // catch 404 and forward to error handler
    app.use((req, res, next) => {
        next(HttpError(404)); // FIXME: is HttpError needed compared to setting status? what does it add?
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
    setupPassport(models.userModel)
    let app = setupExpress(models)
    app.listen(config.server.port, () => { console.info(`Server listening on port ${config.server.port}!`) });
}


main()