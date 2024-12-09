import { OddsData } from '../types/oddsData.types';
import { Region } from '../types/regionsEnum';
import { ODDS_API_URL } from '../utils/const.utility';

export class RegionOdds {
    private fetchedAt: Date;
    private data: OddsData;

    constructor(private region: Region) {}

    public getRegionOdds = async () : Promise<OddsData> => {
        if (this.fetchedAt && Date.now() - this.fetchedAt.getTime() < 2 * 60 * 60 * 1000) return this.data;

        const url = new URL(ODDS_API_URL);
        url.search = new URLSearchParams({ regions: this.region }).toString();
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Response status: ${res.status}`);
        }

        this.data = await res.json();
        this.fetchedAt = new Date();

        return this.data;
    };
}
