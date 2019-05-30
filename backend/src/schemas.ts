import { Schema } from "mongoose";

export let ImplementationSchema  = new Schema({
    name: {
        type: String,
        minlength: 5,
        unique: true,
        required: true,
        trim: true
    },
    owner: {
        type: String,
        required: true
    },
    shortDescription: {
        type: String,
        minlength: 5,
        maxlength: 180
    },
    longDescription: {
        type: String,
        minlength: 5,
        maxlength: 500
    },
    github: String,
    implementationType: {
        type: String,
        enum: ["template", "code"]
    },
    topic: [{
        type: String, 
        enum: ["sensor", "actuator", "robotics", "other"]
    }],
    platform: {
        type: String,
        enum: ["raspberry", "arduino", "ESP", "other"]
    },
    tags: [String],
    complexity: {
        type: String,
        enum: ["simple", "medium", "expert"]
    },
    td: Object,
})

export let UserSchema  = new Schema({
    userName: {
        type: String,
        minlength: 5,
        maxlength: 39,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        minlength: 1,
        maxlength: 50,
        unique: true,
        required: true,
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
    passwordHash: {
        type: String,
        required: true
    },
    implementations: {
        type: Array
    }
})