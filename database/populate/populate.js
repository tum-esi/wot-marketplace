var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

const fs = require('fs');

// Connection URL
var localUrl = 'mongodb://localhost:27017/';

var onlineUrl = "mongodb+srv://esi:youcantimagine@wotify-uwq9g.mongodb.net/test?retryWrites=true"

var databaseName = "wotify_development"
var collectionName = "implementations"

// Use connect method to connect to the server
// Must change the url to be parsed as an option
MongoClient.connect(onlineUrl, async function (err, client) {
    
    assert.equal(null, err);
    
    console.log("Connected successfully to server");

    const db = client.db(databaseName)

    var myDir = fs.readdirSync("database/populate/implementations");
    console.log(myDir);
    myDir.forEach(async (curImplementationAddress) => {
        var curImplementationData = fs.readFileSync("database/populate/implementations/" +
            curImplementationAddress);
        var curImplementationJSON = JSON.parse(curImplementationData);
        console.log(curImplementationJSON);
        await db.collection(collectionName).insertOne(curImplementationJSON);
    })
    await db.collection(collectionName).insertOne(
        {
            "name": "senseHat-native2",
            "shortDescription": "senseHAT implementation using native http libraries",
            "longDescription": "Implemented using the native http libraries of nodejs. Supports all button clicks and sensor readings with a 2ms refresh rate",
            "github": "https://github.com/<#n:MoL2o",
            "implementationType": "code",
            "topic": [
                "actuator",
                "sensor"
            ],
            "platform": "raspberry",
            "tags": [
                "sensehat"
            ],
            "complexity": "simple",
            "td": {
                "name": "senseHAT",
                "id": "urn:dev:wot:com:example:servient:sensehat",
                "securityDefinitions": {
                    "basic_sc": {
                        "scheme": "basic",
                        "in": "header"
                    }
                },
                "security": ["basic_sc"]
            }
        }
    );

    client.close();
    console.log("Succesfully disconnected from server")

});
