import express from 'express';

import { ProjectType, Project } from '../database';

export const search_get = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        let filter = {};
        let sort = "";
        let limit = 0, page = 0;

        for(var element in req.query) {
            if(element === "pageSize") {
                limit = parseInt(req.query.pageSize, 10);
            } else if (element === "page") {
                page = parseInt(req.query.page, 10);
            } else if (element === "term") {
                req.query.term !== '' ? Object.assign(filter, {$text: {$search: req.query.term}}) : null;
            } else if (element === "sort") {
                sort = req.query.sort === "Date" ? "updated" : "rating";
            } else {
                Object.assign(filter, {[element]: { $in: req.query[element] }});
            }
        }

        var results: Promise<ProjectType[]> = await Project.find(
          	filter,
			null,
			{
                limit,
                skip: (page-1)*limit,
                projection: { score: { $meta: "textScore" }},
                sort: { [sort]: -1 }
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
    } catch (error) {
        next(error);
    }
}