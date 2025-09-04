import { Request, Response } from 'express';
import User from '../models/user.model';
import { IUser } from '../types/user.type';

export const getUsers = async (req: Request, res: Response) => {
  const page  = Math.max(1, parseInt(String(req.query.page || '1')));
  const limit = Math.min(100, parseInt(String(req.query.limit || '10')));
  const sort  = String(req.query.sort || '-createdAt');

  const [items, total] = await Promise.all([
    User.find().sort(sort).skip((page - 1) * limit).limit(limit),
    User.countDocuments()
  ]);

  res.json({ items, total, page, pages: Math.ceil(total / limit), limit });
};

export const deleteUser = async (req: Request, res: Response) => {
    const deletedUser = await User.deleteOne({ _id: req.params.id });

    if (!deletedUser) {
        res.status(404).send('User not found');
        return;
    }

    res.json(deletedUser);
};

export const patchUser = async (req: Request, res: Response) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        res.status(404).send('User not found');
        return 
    }

    if (req.body.firstName) user.firstName = req.body.firstName;
    if (req.body.lastName) user.lastName = req.body.lastName;
    if (req.body.email) user.email = req.body.email;
    if (req.body.password) user.password = req.body.password;
    if (req.body.regions) user.regions = req.body.regions;

    const updatedUser = await user.save();

    res.json(updatedUser);
};
