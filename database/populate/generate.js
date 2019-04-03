//generates lots of JSON data that can be inserted to the database

var jsf = require('json-schema-faker');
const fs = require('fs');

fs.readFile("implementationSchema.json", (err, implementationSchemaFile) => {
    if (err) {
        console.error("../implementationSchema.json couldn't be found at the root of the project", storedTdAddress);
        throw err;
    };

    var implementationSchemaJSON = JSON.parse(implementationSchemaFile);

    var fakeImplementation = jsf.generate(implementationSchemaJSON);
});