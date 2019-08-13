import mongoose, { Schema, Document } from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

import { ProjectType } from "./project";

const SALT_WORK_FACTOR = 10;

export interface UserType extends Document {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    //projects?: ProjectType[];
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
    }/*,
    projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    }]*/
});

UserSchema.plugin(passportLocalMongoose);

export const User = mongoose.model<UserType>("User", UserSchema as mongoose.PassportLocalSchema, "users");