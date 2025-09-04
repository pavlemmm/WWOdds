import { body } from 'express-validator';
import { Region } from '../types/regions.type';

const namePattern = /^[\p{L}][\p{L}\s'-]*[\p{L}]$/u;

export const registerRules = [
  body('firstName')
    .trim()
    .isLength({ min: 3, max: 40 }).withMessage('First name 3-40 chars')
    .matches(namePattern).withMessage("Only letters, space, '-' and '''"),

  body('lastName')
    .trim()
    .isLength({ min: 3, max: 40 }).withMessage('Last name 3-40 chars')
    .matches(namePattern).withMessage("Only letters, space, '-' and '''"),

  body('email')
    .trim()
    .normalizeEmail()
    .isEmail().withMessage('Invalid email'),

  body('password')
    .isLength({ min: 8, max: 64 }).withMessage('Password 8-64 chars')
    .matches(/[A-Za-z]/).withMessage('Needs a letter')
    .matches(/\d/).withMessage('Needs a digit'),

  body('regions')
    .isArray({ min: 1 }).withMessage('Regions must be non-empty array')
    .custom((arr: unknown[]) => {
      if (!Array.isArray(arr)) return false;
      const allowed = new Set(Object.values(Region) as string[]);
      const seen = new Set<string>();
      for (const r of arr) {
        if (typeof r !== 'string' || !allowed.has(r) || seen.has(r)) return false;
        seen.add(r);
      }
      return true;
    }).withMessage('Invalid regions')
];

export const loginRules = [
  body('email').trim().normalizeEmail().isEmail().withMessage('Invalid email'),
  body('password').isLength({ min: 8, max: 64 }).withMessage('Invalid password')
];
