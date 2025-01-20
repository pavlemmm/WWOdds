import { OddsData } from '../types/odds.type';
import { Region } from '../types/regions.type';
import { ODDS_API_KEY } from '../utils/const.utility';

const ODDS_API_URL = 'https://api.the-odds-api.com/v4/sports/upcoming/odds/'

export class RegionOdds {
    private fetchedAt: Date;
    private data: OddsData;

    constructor(private region: Region) {}

    public getRegionOdds = async () : Promise<OddsData> => {
        if (this.fetchedAt && Date.now() - this.fetchedAt.getTime() < 2 * 60 * 60 * 1000) return this.data;

        const url = new URL(ODDS_API_URL);
        url.search = new URLSearchParams({ regions: this.region, apiKey: ODDS_API_KEY }).toString();

        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Response status: ${res.status}`);
        }

        this.data = await res.json();
        this.fetchedAt = new Date();

        return this.data;
    };
}
