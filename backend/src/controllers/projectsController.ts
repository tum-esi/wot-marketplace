import express from 'express';
import Ajv from 'ajv';
import * as tdValidationSchema from '../assets/tdJsonSchema.json';

const ajv = new Ajv();

import { ProjectType, Project } from '../database';
import { UserType } from '../database';

export const projects_post = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        try{
            req.body.thingDesc = JSON.parse(req.body.thingDesc);
        }catch(error){
            next(error);
            return;
        }

        try{
            if(!ajv.validate(tdValidationSchema, req.body.thingDesc)){
                let error = new Error();
                error.name = "InvalidTDError";
                next(error);
                return;
            }
        }catch(error){
            next(error);
            return;
        }

        if(req.body.repoUrl && !req.body.repoUrl.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#()?&//=]*)/igm)){
            let error = new Error();
            error.name = "InvalidUrlError";
            next(error);
            return;
        }

        var newProject: ProjectType = new Project({
            ...req.body,
            author: (req.user as UserType)._id
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
            next(error);
            return;
        }
        res.status(200).json(foundProject);
    } catch (error) {
        next(error);
    }
}

export const projects_title_put = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        var projectToEdit = await Project.findById(req.body._id).populate("author").exec();
        delete req.body._id;
        if (!projectToEdit) {
            let error = new Error();
            error.name = "NotFoundError";
            next(error);
            return;
        }else if(projectToEdit.author.username !== (req.user as UserType).username){
            let error = new Error();
            error.name = "UnauthorizedError";
            next(error);
            return;
        }

        try{
            req.body.thingDesc = JSON.parse(req.body.thingDesc);
        }catch(error){
            next(error);
            return;
        }

        try{
            if(!ajv.validate(tdValidationSchema, req.body.thingDesc)){
                let error = new Error();
                error.name = "InvalidTDError";
                next(error);
                return;
            }
        }catch(error){
            next(error);
            return;
        }

        projectToEdit.set({
            ...req.body
        });
        await projectToEdit.save({ validateBeforeSave: true });
        res.sendStatus(200);
    } catch (error) {
        next(error);
    }
}

export const projects_title_delete = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        var projectToDelete = await Project.findOne({ title: req.params.title }).populate("author").exec();
        if(!projectToDelete){
            let error = new Error();
            error.name = "NotFoundError";
            next(error);
            return;    
        }else if(projectToDelete.author.username !== (req.user as UserType).username){
            let error = new Error();
            error.name = "UnauthorizedError";
            next(error);
            return;
        }else{
            await Project.deleteOne({ title: req.params.title }).exec();
            res.sendStatus(204);            
        }
    } catch (error) {
        next(error);
    }
}
