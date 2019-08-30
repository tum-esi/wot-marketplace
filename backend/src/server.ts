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
initializeErrorHandler(app); // Initialized last to catch all errors.

app.listen(process.env.SVR_PORT, () => {
    console.log(`Server listening on port ${process.env.SVR_PORT}.`);
});