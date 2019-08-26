import express from 'express';
import passport from 'passport';

import * as projectsController from '../controllers/projectsController';

const router = express.Router();

router.post('/', passport.authenticate('jwt', { session: false }), projectsController.projects_post);

router.get('/:title', projectsController.projects_title_get);

router.put('/:title', passport.authenticate('jwt', { session: false }), projectsController.projects_title_put);

export default router;