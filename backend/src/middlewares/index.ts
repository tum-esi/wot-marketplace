import { Application } from 'express';
import { initPassport } from './passport';

export const initializeMiddlewares = (app: Application) => {
    initPassport(app);
}