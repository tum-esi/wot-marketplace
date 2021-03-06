import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

import { UserType, User } from '../database';

/**
 * Route handler for POST request to /api/auth/register
 * Handles creation of a User following the mongoDB model defined in database
 * 
 * @param req 
 * @param res 
 * @param next 
 */
export const auth_register_post = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        User.register(new User({ //register method from User comes from passport-local-mongoose plugin
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
        }), req.body.password, (err, createdUser: UserType) => {
            if (err) {
                return next(err);
            }
            return res.sendStatus(201);
        });
    } catch (error) {
        return next(error);
    }
}

/**
 * Route handler for POST request to /api/auth/login
 * Handles client-side authentication and token generation to be stored in the client for server-side authentication
 * 
 * @param req 
 * @param res 
 * @param next 
 */
export const auth_login_post = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        if(!req.body.username || !req.body.password) {
            let error = new Error();
            error.name = 'MissingFieldsError';
            return next(error);
        }
        passport.authenticate('local', { session: false }, (error, user) => {
            if(error) {
                return next(error);
            }
            if(!user) {
                let error = new Error();
                error.name = 'UnauthorizedError';
                return next(error);
            }
            req.login(user, (err) => {
                if(err) return next(err);
                const token = jwt.sign({ id: user.id, username: user.username }, process.env.SECRET_CODE as string);
                return res.status(200).json({
                    username: user.username,
                    token
                });
            });
        })(req, res, next);
    } catch (error) {
        return next(error);
    }
}