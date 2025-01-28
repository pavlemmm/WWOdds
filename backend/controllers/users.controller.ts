import { Request, Response } from 'express';
import User from '../models/user.model.ts';
import { IUser } from '../types/user.type.ts';

export const getUsers = async (req: Request, res: Response) => {
    if (!req.user?.isAdmin) {
        res.status(401).send('User is not admin')
        return
    }

    const users: IUser[] | null = await User.find();
    res.json(users);
};

export const deleteUser = async (req: Request, res: Response) => {
    if (!req.user?.isAdmin) {
        res.status(401).send('User is not admin')
        return
    }

    const query = User.deleteOne({_id: req.body._id})

    res.json(query);
};


export const patchUser = async (req: Request, res: Response) => {
    if (!req.user?.isAdmin) {
        res.status(401).send('User is not admin')
        return
    }

    const users: IUser[] | null = await User.find();
    res.json(users);
};