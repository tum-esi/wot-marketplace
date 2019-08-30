import { Application } from 'express';

import winston from 'winston';
import expressWinston from 'express-winston';

/**
 * Logger for express application
 * 
 * @param app 
 */
export const initLogger = (app: Application) => {
    const options = {

    }

    const winstonInstance = winston.createLogger({
        ...options,
        transports: [
            new winston.transports.Console()
        ]
    });

    app.use(expressWinston.logger({ winstonInstance }));
}