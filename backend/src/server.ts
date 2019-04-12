import Express from "express";
import Path from "path";
import HttpError from "http-errors";
import Mongoose from "mongoose";
import { ImplementationSchema, UserSchema } from "./schemas";
import BodyParser from "body-parser";
import Session from "express-session";
import ConnectMongo from "connect-mongo";
import Config from "../config/config";
import Uuid from "uuid";
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
    return {impModel: ImplementationModel, userModel: UserModel}
}


function setupPassport(userModel) {
    Passport.use(new PassportLocal.Strategy(
        {
            usernameField: 'userName',
            passwordField: 'password'
        },
        (username, password, done) => {
            userModel.findOne({ username: username }, function (err, user) {
                if (err) { return done(err); }
                if (!user) {
                    return done(null, false, { message: 'Incorrect username.' });
                }
                if (false) { //FIXME: test password
                    return done(null, false, { message: 'Incorrect password.' });
                }
                return done(null, user);
            });
        }
    ));

    Passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
      
    Passport.deserializeUser(function(id, done) {
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
    app.use(BodyParser.urlencoded({ extended: false }));
    app.use(BodyParser.json());
    app.use(Session({
        genid: (req) => { return Uuid.v4() },
        secret: 'random string',  //FIXME: add to config file
        resave: false,
        saveUninitialized: true,
        store: new MongoStore({ mongooseConnection: Mongoose.connection })
        // TODO: Fix session options (like expire ..)
    }));
    app.use(Passport.initialize());
    app.use(Passport.session());
    app.use("/static", Express.static(Path.join(__dirname, "../static")));

    // Serve index.html
    app.get("/", (req, res) => {
        // res.sendFile(INDEX-FILE-PATH)
        res.send('Website will be online soon. Please come back later!');
    });

    // Login process
    app.post("/api/login", 
        Passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login'})
    )

    // Signup process
    app.post("/api/signup", (req, res, next) => {
        let newUser = new models.userModel(req.body)
        newUser.save({validateBeforeSave: true}, (err, product) => {
            if (err) {
                 console.log("ERR: " + err); next(HttpError(400))
            } else { 
                res.status(201).send("CREATED")
            }
        })
    })

    // Process search requests
    app.get("/api/search", (req, res, next) => {
        console.log(req.sessionID)
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
            if (err) { next(err); return console.log("ERR: " + err); }
            res.status(201).send("CREATED")
        })
    });

    // catch 404 and forward to error handler
    app.use((req, res, next) => {
        next(HttpError(404));
    });
    
    // error handler
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.send()
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