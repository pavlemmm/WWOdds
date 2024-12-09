import { OddsData } from '../types/oddsData.types';
import { Region } from '../types/regionsEnum';
import { RegionOdds } from './regionOdds.service';

const data: Record<Region, RegionOdds> = {
    [Region.EUROPE]: new RegionOdds(Region.EUROPE),
    [Region.UNITED_KINGDOM]: new RegionOdds(Region.UNITED_KINGDOM),
    [Region.UNITED_STATES]: new RegionOdds(Region.UNITED_STATES),
};

const getOdds = async (region: Region) : Promise<OddsData> => {
    return data[region].getRegionOdds()
}
