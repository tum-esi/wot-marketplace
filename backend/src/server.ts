import express from 'express';
import { join } from 'path';

import { initializeDatabase } from './database';
import { initializeMiddlewares, initializeErrorHandler } from './middlewares';
import { initializeRoutes } from './routes'; 

let app = express();
initializeDatabase();
initializeMiddlewares(app);

app.get("/", (req, res) => {
    res.sendFile(join(__dirname, "..", "..", "frontend", "dist", "index.html"));
})

initializeRoutes(app);
initializeErrorHandler(app);

app.listen(3000, () => {
    console.log('Server listening on port 3000.');
});