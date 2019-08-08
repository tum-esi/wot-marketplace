import express from 'express';
import passport from 'passport';

import * as projectsController from '../controllers/projectsController';

const router = express.Router();

router.post('/', passport.authenticate('jwt', { session: false }), projectsController.projects_post);

router.get('/:name', projectsController.projects_name_get);

//router.put('/:username', passport.authenticate('jwt', { session: false }), projectsController.);

export default router;