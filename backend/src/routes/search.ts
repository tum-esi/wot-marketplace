import express from 'express';
import passport from 'passport';

import * as searchController from '../controllers/searchController';

const router = express.Router();

router.get('/', searchController.search_get);

export default router;