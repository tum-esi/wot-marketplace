import express from 'express';

import * as authController from '../controllers/authController';

const router = express.Router();

router.post('/register', authController.auth_register_post);

router.post('/login', authController.auth_login_post);

export default router;