import { Request, Response } from 'express';
import User from '../models/user.model.ts';
import { IUser } from '../types/user.type.ts';
import { getOdds } from '../services/odds.service.ts';
import { OddsData } from '../types/odds.type.ts';
import { Region } from '../types/regions.type.ts';

export const getInfo = async (req: Request, res: Response) => {
    const user: IUser | null = await User.findOne({ _id: req.user?.id });

    if (!user) {
        res.status(404).send('User not found');
        return;
    }

    const userOddsData: Partial<Record<Region, OddsData>> = {};
    for (let region of user.regions) {
        userOddsData[region] = await getOdds(region);
    }

    res.json(userOddsData);
};
