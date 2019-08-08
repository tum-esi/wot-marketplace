import express from 'express';

import * as projectsController from '../controllers/projectsController';

const router = express.Router();

router.post('/', projectsController.projects_post);

router.get('/:name', projectsController.projects_name_get);

//router.put('/:username', projectsController.);

export default router;