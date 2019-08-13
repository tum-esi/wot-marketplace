import { Application } from 'express';
import { initStatic } from './static';
import { initOther } from './other';
import { initPassport } from './passport';

export const initializeMiddlewares = (app: Application) => {
    initStatic(app);
    initOther(app);
    initPassport(app);
}