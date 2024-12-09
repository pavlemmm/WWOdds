import { Request, Response } from "express";
import User from '../models/user.model.ts';

export const getInfo = async (req: Request, res: Response) => {
    const user = await User.findOne({ _id: req.user.id });
    res.json({ email: user?.email });
};
