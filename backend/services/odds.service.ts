import { OddsData } from '../types/odds.type';
import { Region } from '../types/regions.type';
import { RegionOdds } from './regionOdds.service';

const data: Record<Region, RegionOdds> = {
    [Region.EUROPE]: new RegionOdds(Region.EUROPE),
    [Region.UNITED_KINGDOM]: new RegionOdds(Region.UNITED_KINGDOM),
    [Region.UNITED_STATES]: new RegionOdds(Region.UNITED_STATES),
    [Region.AUSTRALIA]: new RegionOdds(Region.AUSTRALIA),
};

export const getOdds = (region: Region) : Promise<OddsData> => {
    return data[region].getRegionOdds()
}
