import type { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/user.model';
import { JWT_SECRET } from '../utils/const.utility';
import { IUser } from '../types/user.type';

const signJWT = (u: IUser) => jwt.sign({ id: u._id, isAdmin: u.isAdmin }, JWT_SECRET, { expiresIn: '14d' });

export const register: RequestHandler = async (req, res, next) => {
    const { firstName, lastName, email, password, regions } = req.body;

    const exists = await User.findOne({ email: String(email).toLowerCase() });
    if (exists) {
        res.status(409).send('User already exists');
        return;
    }

    const user = new User({
        firstName: String(firstName).trim(),
        lastName: String(lastName).trim(),
        email: String(email).toLowerCase(),
        password,
        regions,
    });
    await user.save();

    const token = signJWT(user);
    res.status(201).json({ token });
};

export const login: RequestHandler = async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email: String(email).toLowerCase() });
    if (!user) {
        res.status(401).send('Invalid email or password');
        return;
    }

    const ok = await bcrypt.compare(String(password), user.password);
    if (!ok) {
        res.status(401).send('Invalid email or password');
        return;
    }

    const token = signJWT(user);
    res.json({ token });
};
