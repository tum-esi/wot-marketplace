import express from 'express';
import createError from 'http-errors';

import { UserType, User } from '../database';

// TODO: filter what to send back in response
export const users_username_get = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        if (req.user.username === req.params.username) {
            res.json(req.user);
        } else {
            var foundUser: UserType = await User.findOne(req.params).lean().exec();
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
        var userToEdit = req.user;
        if (!userToEdit) {
            return next(createError(404, 'User not found.'));
        }
        if (req.body.password){
            userToEdit.changePassword(req.body.password.old, req.body.password.new).then(() => {
                res.sendStatus(200);
            }).catch((err: Error) => {
                next(createError(401, err));
            });
            return;
        }
        userToEdit.set({
            ...req.body
        });
        var editedUser: UserType = await userToEdit.save({ validateBeforeSave: true });
        res.sendStatus(200);
    } catch (err) {
        next(createError(500, err));
    }
}
