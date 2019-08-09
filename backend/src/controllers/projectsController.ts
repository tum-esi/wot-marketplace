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
        res.status(200).json(createdProject);
    } catch (err) {
        next(createError(500, err));
    }
}

export const projects_name_get = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        var foundProject = await Project.findOne(req.params).populate('author').exec();
        if (!foundProject) {
            return next(createError(404, 'Project not found.'));
        }
        res.status(200).json(foundProject);
    } catch (err) {
        next(createError(500, err));
    }
}

export const projects_name_put = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        
    } catch (err) {
        
    }
}
