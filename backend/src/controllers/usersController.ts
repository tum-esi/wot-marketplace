import express from 'express';
import createError from 'http-errors';

import { UserType, User } from '../database';

export const users_post = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        var newUser: UserType = new User(req.body);
        var createdUser: UserType = await newUser.save({ validateBeforeSave: true });
        res.status(200).json(createdUser);
    } catch (err) {
        next(createError(500, err));
    }
}

export const users_username_get = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        if (!req.user) {
            return next(createError(401, 'Please log-in and try again.'));
        }
        if (req.user.username === req.params.username) {
            res.json(req.user);
        } else {
            var foundUser: UserType = await User.findOne(req.params, '-password').lean().exec();
            if (!foundUser) {
                return next(createError(404, 'User not found.'));
            }
            res.status(200).json(foundUser);
        }
    } catch (err) {
        next(createError(500, err));
    }
}

export const users_username_put = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        if (!req.user) {
            return next(createError(401, 'Please log-in and try again.'));
        }   
        var userToEdit = await User.findOne({ username: req.params.username }).exec();
        if (!userToEdit) {
            return next(createError(404, 'User not found.'));
        }
        userToEdit.set(req.body);
        var editedUser: UserType = await userToEdit.save({ validateBeforeSave: true });
        res.status(200).json(editedUser);
    } catch (err) {
        next(createError(500, err));
    }
}
