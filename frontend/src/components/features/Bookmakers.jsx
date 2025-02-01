const Bookmakers = ({ bookmakers }) => (
    <ul className='grid lg:grid-cols-2 xl:grid-cols-3 items-start gap-4'>
        {bookmakers.map((bookmaker, bookmakerIndex) => (
            <li key={bookmakerIndex} className='p-3 bg-gray-100 dark:bg-gray-700 rounded-md'>
                <h4 className='text-md font-semibold text-gray-900 dark:text-gray-100 mb-2'>{bookmaker.title}</h4>

                {/* Markets and Outcomes */}
                <div className='space-y-2'>
                    {bookmaker.markets.map(
                        (market, marketIndex) =>
                            market.key === 'h2h' && ( // Only if its h2h and not h2h_lay
                                <ul key={marketIndex}>
                                    {market.outcomes.map((outcome, outcomeIndex) => (
                                        <li
                                            key={outcomeIndex}
                                            className='text-sm text-gray-600 dark:text-gray-400 border-l-4 border-blue-500 dark:border-blue-400 pl-3'
                                        >
                                            {outcome.name} -{' '}
                                            <span className=' font-bold text-green-500 dark:text-green-400'>
                                                {outcome.price}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            )
                    )}
                </div>
            </li>
        ))}
    </ul>
);

export default Bookmakers;
