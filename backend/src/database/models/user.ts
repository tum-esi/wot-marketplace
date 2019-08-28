import mongoose, { Schema, Document } from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

export interface UserType extends Document {
    [x: string]: any;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
}

const UserSchema: Schema = new Schema({
    username: {
        type: String,
        minlength: 5,
        maxlength: 40,
        unique: true,
        require: true,
        trim: true
    },
    firstName: {
        type: String,
        minlength: 1,
        maxlength: 50,
        trim: true
    },
    lastName: {
        type: String,
        minlength: 1,
        maxlength: 50,
        trim: true
    },
    email: {
        type: String,
        minlength: 1,
        maxlength: 50,
        unique: true,
        required: true,
        lowercase: true,
        trim: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    }
});

UserSchema.plugin(passportLocalMongoose); // plugin for authentication and encryption of password

export const User = mongoose.model<UserType>("User", UserSchema as mongoose.PassportLocalSchema, "users"); //UserType is specified so documents generated from this model is typed correctly