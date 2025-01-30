import { Request, Response } from 'express';
import User from '../models/user.model.ts';
import { IUser } from '../types/user.type.ts';

export const getUsers = async (req: Request, res: Response) => {
    if (!req.user?.isAdmin) {
        res.status(401).send('User is not admin');
        return;
    }

    const users: IUser[] | null = await User.find();
    res.json(users);
};

export const deleteUser = async (req: Request, res: Response) => {
    if (!req.user?.isAdmin) {
        res.status(401).send('User is not admin');
        return;
    }

    const deletedUser = await User.deleteOne({ _id: req.params.id });

    if (!deletedUser) {
        res.status(404).send('User not found');
        return;
    }

    res.json(deletedUser);
};

export const patchUser = async (req: Request, res: Response) => {
    if (!req.user?.isAdmin) {
        res.status(401).send('User is not admin');
        return;
    }

    const user = await User.findById(req.params.id);

    if (!user) {
        return res.status(404).send('User not found');
    }

    if (req.body.firstName) user.firstName = req.body.firstName;
    if (req.body.lastName) user.lastName = req.body.lastName;
    if (req.body.email) user.email = req.body.email;
    if (req.body.password) user.password = req.body.password;
    if (req.body.regions) user.regions = req.body.regions;

    const updatedUser = await user.save();

    res.json(updatedUser);
};
