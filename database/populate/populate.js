var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

// Connection URL
var localUrl = 'mongodb://localhost:27017/';

var onlineUrl = "mongodb+srv://<username>:<password>:youcantimagine@wotify-uwq9g.mongodb.net/test?retryWrites=true"

var databaseName = "wotify_development"
var collectionName = "implementations"

// Use connect method to connect to the server
// Must change the url to be parsed as an option
MongoClient.connect(onlineUrl, async function (err, client) {
    console.log(err)
    assert.equal(null, err);
    
    console.log("Connected successfully to server");

    const db = client.db(databaseName)

    await db.collection(collectionName).insertOne({
        name: 'journal',
        github: 25,
        type: 'template',
        td: {
            "id": "urn:dev:wot:com:example:servient:lamp",
            "name": "MyLampThing",
            "securityDefinitions": {
                "basic_sc": {
                    "scheme": "basic",
                    "in": "header"
                }
            },
            "security": ["basic_sc"],
            "properties": {
                "status": {
                    "type": "string",
                    "forms": [{
                        "href": "https://mylamp.example.com/status"
                    }]
                }
            },
            "actions": {
                "toggle": {
                    "forms": [{
                        "href": "https://mylamp.example.com/toggle"
                    }]
                }
            },
            "events": {
                "overheating": {
                    "data": {
                        "type": "string"
                    },
                    "forms": [{
                        "href": "https://mylamp.example.com/oh",
                        "subprotocol": "longpoll"
                    }]
                }
            }

        }
    });

    client.close();

});
