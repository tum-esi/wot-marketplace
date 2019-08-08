import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

import { ProjectType } from "./project";

const SALT_WORK_FACTOR = 10;

export interface UserType extends Document {
    username: string;
    password: string;
    //email: string;
    //firstName: string;
    //lastName: string;
    //projects?: ProjectType[];
}

const UserSchema: Schema = new Schema({
    username: {
        type: String,
        minlength: 5,
        maxlength: 39,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,    
    }/*,
    email: {
        type: String,
        minlength: 1,
        maxlength: 50,
        unique: true,
        required: true,
        lowercase: true,
        trim: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
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
    Projects: {
        type: Array
    }
    */
});

UserSchema.pre('save', function(next) {
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if(err){
            return next(err);
        }
        bcrypt.hash(this.get('password'), salt, (err, hash) => {
            if(err){
                return next(err);
            }
            this.set('password', hash);
            next();
        });
    });
});

export const User = mongoose.model<UserType>("User", UserSchema, "users");