import express from 'express';

import { ProjectType, Project } from '../database';

/**
 * Route handler for GET request to /api/search
 * Handles searches with filters and pagination of the results
 * Search requirements are passed as route queries from client
 * Partial text search is not implemented, only full text will give corresponding results
 * e.g. Searching for Sense will not give SenseHAT as a result
 * 
 * @param req 
 * @param res 
 * @param next 
 */
export const search_get = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        let filter = {};
        let sort = "";
        let limit = 0, page = 0;

        for (var element in req.query) {
            if (element === "pageSize") {
                limit = parseInt(req.query.pageSize, 10);
            } else if (element === "page") {
                page = parseInt(req.query.page, 10);
            } else if (element === "term") {
                req.query.term !== '' ? Object.assign(filter, { $text: { $search: req.query.term } }) : null;
            } else if (element === "sort") {
                sort = req.query.sort === "Date" ? "updated" : "avg_rating";
            } else {
                Object.assign(filter, { [element]: { $in: req.query[element] } });
            }
        }

        var results: Promise<ProjectType[]> = await Project.find(
            filter,
            null,
            {
                limit, // for page size
                skip: (page - 1) * limit, // for page nagivation
                projection: { score: { $meta: "textScore" } },
                sort: { [sort]: -1 } // sorting results
            }
        ).lean().exec(); // results are JSON objects and not mongoose documents
        var totalResults = await Project.countDocuments(filter); 
        var totalDocs = await Project.countDocuments(); // fetched from mongoDB metadata
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