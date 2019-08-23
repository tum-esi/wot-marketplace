import express from 'express';

import authRoutes from './auth';
import userRoutes from './users';
import projectRoutes from './projects';
import searchRoutes from './search';

export const initializeRoutes = (app: express.Application) => {
    app.use('/api/auth', authRoutes);
    app.use('/api/users', userRoutes);
    app.use('/api/projects', projectRoutes);
    app.use('/api/search', searchRoutes);
}