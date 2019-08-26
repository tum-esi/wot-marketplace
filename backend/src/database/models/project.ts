import * as WoT from 'wot-typescript-definitions';
import mongoose, { Schema, Document } from "mongoose";

import { UserType } from "./user";

export interface ProjectType extends Document{
    title: string;
    author: UserType;
    updated: Date;
    summary: string;
    repoUrl: string;
    description: string;
    thingDesc: WoT.ThingDescription;
    topic: string[];
    platform: string[];
    type: string;
    complexity: string;
    tags: string[];
}

const ProjectSchema = new Schema({
    title: {
        type: String,
        minlength: 5,
        unique: true,
        required: true,
        trim: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    updated: {
        type: Date, 
        default: Date.now 
    },
    summary: {
        type: String,
        minlength: 5,
        maxlength: 180,
        required: true
    },
    repoUrl: {
        type: String
    },
    description: {
        type: String,
        minlength: 5,
        maxlength: 10000,
        required: true
    },
    thingDesc: {
        type: Object,
        required: true
    },
    topic: [{
        type: String, 
        enum: ["Sensors", "Robotics", "Actuators", "Others"]
    }],
    platform: {
        type: String,
        enum: ["Raspberry Pi", "Arduino", "ESP", "Others"],
        required: true
    },
    type: {
        type: String,
        enum: ["TD", "Code"],
        required: true
    },
    complexity: {
        type: String,
        enum: ["Beginner", "Medium", "Expert"]
    },
    tags: [String]
});

ProjectSchema.index(
    {
        title: "text",
        tags: "text",
        summary: "text"
    },
    {
        weights: {
            name: 4,
            tags: 3,
            summary: 1
        },
        name: "text_index"
    }
);

export const Project = mongoose.model<ProjectType>("Project", ProjectSchema, "projects");
