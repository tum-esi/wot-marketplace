import { Application } from 'express';

import winston from 'winston';
import expressWinston from 'express-winston';

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