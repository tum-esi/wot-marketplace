import express from 'express';
import passport from 'passport';

import * as usersController from '../controllers/usersController';

const router = express.Router();

router.get('/:username', passport.authenticate('jwt', { session: false }), usersController.users_username_get);

router.put('/:username', passport.authenticate('jwt', { session: false }), usersController.users_username_put);

export default router;