# Database

## Database configuration

### Local database

We use MongoDB as the database engine. To be installed [here](https://docs.mongodb.com/manual/administration/install-community/)

Then run it with `mongod --dbpath wot-marketplace/database/data`

This will initiate the database under data and create a 300 Mb journal file.

### Online version

Hosted on MongoDB Free Atlas Cluster

Link: `wotify-uwq9g.mongodb.net:27017`

Database is called `wotify-development` while we are developing, another one will be created later.

The main collection we will use is called `implementations`, that is where you will find all the JSON files of implementations

You will need a username and its password to access it that you can obtain by asking @egekorkan

There is also a dashboard at https://cloud.mongodb.com/user#/atlas/login

You will need a username and its password to access it that you can obtain by asking @egekorkan

For scripts and clients: the url should be mongodb+srv://<user>:<pw>@wotify-uwq9g.mongodb.net/

## Using the database

### MongoDB Compass

Just to play with it, it is recommended to use MongoDB Compass. This is a GUI MongoDB client that shows all the collections, lets you query and insert data.

### MongoDB Driver

Example script with node.js

```
var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

// Connection URL

var onlineUrl = "mongodb+srv://<username>:<password>@wotify-uwq9g.mongodb.net/test?retryWrites=true"

var databaseName = "wotify_development"
var collectionName = "implementations"

// Use connect method to connect to the server
MongoClient.connect(onlineUrl, async function (err, client) {
    
    assert.equal(null, err);
    
    console.log("Connected successfully to server");

    const db = client.db(databaseName)

    await db.collection(collectionName).insertOne(
        {
            "name": "senseHat-native",
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

```

## Database population

You can run populate.js to populate it with 100 random entries that all respect the implementationSchema.