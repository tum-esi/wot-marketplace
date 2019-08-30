import { Application } from 'express';
import { initStatic } from './static';
import { initOther } from './other';
import { initPassport } from './passport';

/**
 * Wrapper for initialization of all the middlewares
 * 
 * @param app 
 */
export const initializeMiddlewares = (app: Application) => {
    initStatic(app);
    initOther(app);
    initPassport(app);
}

export { initializeErrorHandler } from './errorHandler'; // exported seperately because needs to be initialized at the end