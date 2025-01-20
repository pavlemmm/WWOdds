import jwt from 'jsonwebtoken';
import User from '../models/user.model.ts';
import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { JWT_SECRET } from '../utils/const.utility.ts';
import { IUser } from '../types/user.type.ts';
import { Region } from '../types/regions.type.ts';

// Name regex
const checkName = (name: string) => name && /^\p{L}{3,40}$/u.test(name);

// Email regex, false if undefined
const checkEmail = (email: string) => email && /^[\w\.]{1,40}@\w{1,15}\.\w{2,4}$/.test(email);

// Password regex (characters, numbers and symbols), false if undefined
const checkPassword = (password: string) =>
    password && /^[\w!@#$%^&*()+={}\[\]:;"'<>,.?/\\|`~^-]{8,60}$/.test(password);

// Check if regions is array of regions type
const checkRegions = (regions: Region[]) => {
    const validRegions = Object.values(Region);
    return regions.every(region => validRegions.includes(region));
};

const signJWT = (user: IUser) => jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '14d' });

export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    // Validate email and password
    if (!checkEmail(email) || !checkPassword(password)) {
        res.status(400).send('Invalid request');
        return;
    }

    // Check if the user exists
    const user: IUser | null = await User.findOne({ email });
    if (!user) {
        res.status(404).send('User with this email doesn\'t exist');
        return;
    }

    // Validate the password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        res.status(400).send('Invalid credentials');
        return;
    }

    // Generate and return the token
    const token = signJWT(user);
    res.status(200).json({ token });
};

export const register = async (req: Request, res: Response): Promise<void> => {
    const { firstName, lastName, email, password: passwordRaw, regions } = req.body;

    // Validate email and password
    if (!checkEmail(email) || !checkPassword(passwordRaw) || !checkName(firstName) || !checkName(lastName) || !checkRegions(regions)) {
        res.status(400).send('Invalid request');
        return;
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        res.status(400).send('User already exists');
        return;
    }

    // Hash the password
    const password = await bcrypt.hash(passwordRaw, 10);

    // Create and save the new user
    const newUser = new User({ firstName, lastName, email, password, regions });
    await newUser.save();

    // Generate and return the token
    const token = signJWT(newUser);
    res.status(201).json({ token });
};
