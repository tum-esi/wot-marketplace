import express from 'express';
//import Ajv from 'ajv';
//import * as tdValidationSchema from '../assets/tdJsonSchema.json';

//const ajv = new Ajv();

import { ProjectType, Project } from '../database';

export const projects_post = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        /*try{
            console.log("validating td");
            if(!ajv.validate(tdValidationSchema, JSON.parse(req.body.thingDesc))){
                let error = new Error();
                error.name = "InvalidTDError";
                next(error);
                return;
            }
        }catch(error){
            console.log(error);
            next(error);
            return;
        }*/
        var newProject: ProjectType = new Project({
            ...req.body,
            author: req.user._id
        });
        var createdProject: ProjectType = await newProject.save({ validateBeforeSave: true });
        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

export const projects_title_get = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        var foundProject = await Project.findOne(req.params).populate('author').exec();
        if (!foundProject) {
            let error = new Error();
            error.name = "NotFoundError";
            return next(error);
        }
        res.status(200).json(foundProject);
    } catch (error) {
        next(error);
    }
}

export const projects_title_put = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        
    } catch (err) {
        
    }
}
