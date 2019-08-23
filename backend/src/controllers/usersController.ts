import express from 'express';

import { UserType, User } from '../database';

export const users_username_get = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        if (req.user.username === req.params.username) {
            res.status(200).json(req.user);
        } else {
            var foundUser: UserType = await User.findOne(req.params).lean().exec();
            if (!foundUser) {
                let error = new Error();
                error.name = "NotFoundError";
                return next(error);
            }
            res.status(200).json(foundUser);
        }
    } catch (error) {
        next(error);
    }
}

export const users_username_put = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        var userToEdit = req.user;
        if (!userToEdit) {
            let error = new Error();
            error.name = "NotFoundError";
            return next(error);
        }
        if (req.body.password){
            userToEdit.changePassword(req.body.password.old, req.body.password.new).then(() => {
                res.sendStatus(200);
            }).catch((error: Error) => {
                next(error);
            });
            return;
        }
        userToEdit.set({
            ...req.body
        });
        await userToEdit.save({ validateBeforeSave: true });
        res.sendStatus(200);
    } catch (error) {
        next(error);
    }
}
