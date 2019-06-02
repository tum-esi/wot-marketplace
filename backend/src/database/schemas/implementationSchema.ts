import { Schema } from "mongoose";

export default new Schema({
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
    updated: {
        type: Date, 
        default: Date.now 
    },
    shortDescription: {
        type: String,
        minlength: 5,
        maxlength: 180,
        required: true
    },
    longDescription: {
        type: String,
        minlength: 5,
        maxlength: 500,
        required: true
    },
    github: String,
    implementationType: {
        type: String,
        enum: ["template", "code"],
        required: true
    },
    topic: [{
        type: String, 
        enum: ["sensor", "actuator", "robotics", "lighting", "other"]
    }],
    platform: {
        type: String,
        enum: ["raspberry", "arduino", "ESP", "other"],
        required: true
    },
    tags: [String],
    complexity: {
        type: String,
        enum: ["simple", "medium", "expert"]
    },
    version: {
        type: new Schema({
            instance: String
        })
    },
    td: {
        type: String,
        required: true
    }
})