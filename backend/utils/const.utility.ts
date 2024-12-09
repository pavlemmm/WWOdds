import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 5000;


if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
}

export const JWT_SECRET = process.env.JWT_SECRET;



if (!process.env.ODDS_API_KEY) {
    throw new Error('ODDS_API_KEY is not defined');
}

export const ODDS_API_KEY = process.env.ODDS_API_KEY;




if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is not defined');
}

export const MONGO_URI = process.env.MONGO_URI;


export const ODDS_API_URL = `api.the-odds-api.com/v4/sports/upcoming/odds/?apiKey=${ODDS_API_KEY}`