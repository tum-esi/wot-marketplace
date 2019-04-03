import Express from "express";
import Path from "path";
import HttpError from "http-errors";
import { MongoClient } from "mongodb";

const DB_ADDR = "mongodb+srv://esi:youcantimagine@wotify-uwq9g.mongodb.net/wotify_development"
let app = Express();

// Serve static files
app.use("/static", Express.static(Path.join(__dirname, "static")));

// Serve index.html
app.get("/", (req, res) => {
    res.send('Website will be online soon. Please come back later!');
});

// Process search requests
app.get("/search", (req, res) => {
    let search = req.query.q
    MongoClient.connect(DB_ADDR, (err, client) => {
        if (err) { console.error("DB-ERROR: " + err); return; }
        let db = client.db("wotify_development").collection("implementations");
        db.count((err, res) => {
            if (err) console.error(err)
            console.log("Count: " + res)
        })
        res.send("DB workers...")
    })
});

// Return a list of all packages
app.get("/packages", (req, res) => {
    MongoClient.connect(DB_ADDR, (err, client) => {
        let db = client.db("wotify_development").collection("implementations");
    })
});

// Return a certain package
app.get("/package/:packageName", (req, res) => {
    MongoClient.connect(DB_ADDR, (err, client) => {
        let db = client.db("wotify_development").collection("implementations");
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

// Start server
app.listen(8080, () => { console.info("Server listening on port 8080!") });