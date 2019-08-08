import express from 'express';

import bodyParser from 'body-parser';

import { initializeDatabase } from './database';

import userRoutes from './routes/users';
import projectRoutes from './routes/projects';

let app = express();
initializeDatabase();

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);

app.listen(3000, () => {
    console.log('server started');
});