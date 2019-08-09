import express from 'express';

import bodyParser from 'body-parser';

import { initializeDatabase } from './database';
import { initializeMiddlewares } from './middlewares';

import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import projectRoutes from './routes/projects';

let app = express();
initializeDatabase();
initializeMiddlewares(app);

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);

app.listen(3000, () => {
    console.log('Server listening on port 3000.');
});