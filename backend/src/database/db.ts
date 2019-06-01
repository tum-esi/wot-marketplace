import Mongoose from "mongoose";
import UserSchema from "./schemas/userSchema";
import ImplementationSchema from "./schemas/implementationSchema";
import Config from "../../config/config";
import Logger from "../logger";


Mongoose.connect(
    Config.database.url, 
    { 
        useNewUrlParser: true, 
        useCreateIndex: true 
    }
);

Mongoose.connection.on('error', (err) => Logger.error("DB connection error: " + err));
Mongoose.connection.once('open', () => Logger.info("Successfully connected to database!"));

ImplementationSchema.index(
    {
        name: "text",
        shortDescription: "text",
        tags: "text",
        topic: "text"
    },
    {
        weights: {
            name: 4,
            shortDescription: 1,
            tags: 3,
            topic: 1
        },
        name: "TextIndex"
    }
);

export let ImplementationModel = Mongoose.model("ImplementationModel", ImplementationSchema, "implementations" );
export let UserModel =  Mongoose.model("UserModel", UserSchema, "users");

export default {ImplementationModel: ImplementationModel, UserModel: UserModel}