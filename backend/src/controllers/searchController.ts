import express from 'express';
import createError from 'http-errors';

import { ProjectType, Project } from '../database';

export const search_get = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        let filter = req.query.term ? {$text: {$search: req.query.term}} : {};
        let limit = parseInt(req.query.pageSize, 10);
        let page = parseInt(req.query.page, 10);

        var results: Promise<ProjectType[]> = await Project.find(
          	filter,
			null,
			{
                limit,
                skip: (page-1)*limit,
                projection: { score: { $meta: "textScore" }},
                sort: { score:{ $meta: "textScore" }}
			}
        ).lean().exec();
        var totalResults = await Project.countDocuments(filter);
        var totalDocs = await Project.countDocuments();
        res.status(200).json({
            results,
            page,
            totalResults,
            totalDocs
        });
    } catch (err) {
        next(createError(500, err));
    }
}