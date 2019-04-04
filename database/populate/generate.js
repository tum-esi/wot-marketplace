//generates lots of JSON data that can be inserted to the database

var jsf = require('json-schema-faker');
const fs = require('fs');

var fakeAmount = 1;

if (process.argv[2]) {
    var secondArgument = parseInt(process.argv[2]);

    if (typeof secondArgument === 'number' && !isNaN(secondArgument)) {
        fakeAmount = process.argv[2];
        console.log("Generating ", fakeAmount, "implementations");
    } else {
        console.error("Second argument should be a number");
        process.exit();
    }
} else {
    console.error("There is NO second argument, generating only one fake implementation JSON");
    fakeAmount = 1;
}

fs.readFile("implementationSchema.json", (err, implementationSchemaFile) => {
    if (err) {
        console.log("implementationSchema.json couldn't be found at the root of the project");
        throw err;
    } else {
        console.log("Taking implementationSchema.json")
    }

    var implementationSchemaJSON = JSON.parse(implementationSchemaFile);

    for (var i = 0; i < fakeAmount; i++) {

        console.log("Generating nb", i)
        var fakeImplementation = jsf.generate(implementationSchemaJSON);

        console.log("generated", i)

        fs.writeFileSync("database/populate/implementations/fake" + i + ".json", JSON.stringify(fakeImplementation));
        console.log("fakeImplementation saved")
                
    };

    console.log("Finished generating ", fakeAmount, "fake implementations")
    

});