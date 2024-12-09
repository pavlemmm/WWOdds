import jwt from 'jsonwebtoken';
import User from '../models/user.model.ts';
import bcrypt from 'bcryptjs';
import { Request, Response } from "express";
import { JWT_SECRET } from '../utils/const.utility.ts';

// Email regex, false if undefined
const checkEmail = email => email && /^[\w\.]{1,40}@\w{1,15}\.\w{2,4}$/.test(email);

// Password regex (characters, numbers and symbols), false if undefined
const checkPassword = password => password && /^[\w!@#$%^&*()+={}\[\]:;"'<>,.?/\\|`~^-]{8,60}$/.test(password);

const signJWT = (user) => jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  // Validate email and password
  if (!checkEmail(email) || !checkPassword(password)) {
    res.status(400).send('Invalid request');
    return;
  }

  // Check if the user exists
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404).send('User not found');
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
  const { email, password: passwordRaw, regions, isPremium } = req.body;

  // Validate email and password
  if (!checkEmail(email) || !checkPassword(passwordRaw)) {
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
  const newUser = new User({ email, password, regions, isPremium });
  await newUser.save();

  // Generate and return the token
  const token = signJWT(newUser);
  res.status(201).json({ token });
};