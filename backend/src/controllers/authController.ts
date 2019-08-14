import express from 'express';
import createError from 'http-errors';
import passport from 'passport';
import jwt from 'jsonwebtoken';

import { UserType, User } from '../database';

export const auth_register_post = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        User.register(new User({
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
        }), req.body.password, (err, createdUser: UserType) => {
            if (err) {
                return next(createError(500, 'An error occured: ' + err));
            }
            return res.status(200).send('Successfully created new account');
        })
    } catch (err) {
        return next(createError(500, 'An error occured: ' + err));
    }
}

export const auth_login_post = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        if(!req.body.username || !req.body.password) {
            return next(createError(400, 'Missing fields.'));
        }
        passport.authenticate('local', { session: false }, (err, user) => {
            if(err) return next(createError(400, 'Something went wrong.'));
            if(!user) return next(createError(401, 'Invalid credentials.'));
            req.login(user, (err) => {
                if(err) return next(createError(500, err));
                const token = jwt.sign({ id: user.id, username: user.username }, 'pokemonichooseyou'); // TODO: to config as well
                return res.status(200).json({
                    username: user.username,
                    token
                });
            });
        })(req, res, next);
    } catch (err) {
        return next(createError(500, 'An error occured: ' + err));
    }
}