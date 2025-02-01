import Bookmakers from './Bookmakers';

function calculateSurebet(bookmakers) {
    //             home, away, draw
    let bestOdds = [0, 0, 0];

    bookmakers.forEach(bookmaker => {
        bookmaker.markets.forEach(market => {
            if (market.key !== "h2h") return
            const outcomes = market.outcomes;
            bestOdds[0] = Math.max(outcomes[0].price, bestOdds[0]);
            bestOdds[1] = Math.max(outcomes[1].price, bestOdds[1]);
            if (outcomes.length == 3) bestOdds[2] = Math.max(outcomes[2].price, bestOdds[2]);
        });
    });

    const sumInverseOdds = bestOdds.reduce((sum, odd) => (odd !== 0 ? sum + 1 / odd : sum), 0);

    const res = (1 - sumInverseOdds) * 100;
    if(res > 0) return `${res.toFixed(2)}%`
}

export default function Matches({ region, data }) {
    return (
        <ul className='space-y-6'>
            {data.map(
                (match, index) =>
                    match.bookmakers.length > 0 && (
                        <li
                            key={index}
                            id={region + '_' + match.home_team + '_' + match.away_team}
                            className='p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md'
                        >
                            {/* Sport, Teams and surebet */}
                            <div className='flex justify-between'>
                                <h3 className='text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 pb-1'>
                                    {match.sport_title} - {match.home_team}{' '}
                                    <span className='font-bold text-red-500'>VS</span> {match.away_team}
                                </h3>
                                <span className='text-sm font-bold text-green-300'>{calculateSurebet(match.bookmakers)}</span>
                            </div>

                            {/* Bookmakers Section */}
                            <Bookmakers bookmakers={match.bookmakers} />
                        </li>
                    )
            )}
        </ul>
    );
}
