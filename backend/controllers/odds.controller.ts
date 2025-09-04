import { Request, Response } from 'express';
import User from '../models/user.model';
import { IUser } from '../types/user.type';
import { getData } from '../services/odds.service';
import { OddsData } from '../types/odds.type';
import { Region } from '../types/regions.type';

export const getOdds = async (req: Request, res: Response) => {
    const user: IUser | null = await User.findOne({ _id: req.user?.id });

    if (!user) {
        res.status(404).send('User not found');
        return;
    }

    const userOddsData: Partial<Record<Region, OddsData>> = {};
    for (let region of user.regions) {
        userOddsData[region] = await getData(region);
    }

    res.json(userOddsData);
};
