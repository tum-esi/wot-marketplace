import express from 'express';
import createError from 'http-errors';

import { ProjectType, Project } from '../database';

export const projects_post = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        var newProject: ProjectType = new Project({
            ...req.body,
            author: req.user._id
        });
        var createdProject: ProjectType = await newProject.save({ validateBeforeSave: true });
        res.sendStatus(201);
    } catch (error) {
        next(error);
    }
}

export const projects_name_get = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
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

export const projects_name_put = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        
    } catch (err) {
        
    }
}
