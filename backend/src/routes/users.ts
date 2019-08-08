import express from 'express';

import * as usersController from '../controllers/usersController';

const router = express.Router();

router.post('/', usersController.users_post);

router.get('/:username', usersController.users_username_get);

router.put('/:username', usersController.users_username_put);

export default router;