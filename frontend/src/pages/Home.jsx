import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';

function Home() {
    const { user } = useAuth();
    const [data, setData] = useState({});

    const [regionVisibility, setRegionVisibility] = useState(
        Object.keys(data).reduce((acc, region) => ({ ...acc, [region]: true }), {})
    );

    const regionRefs = useRef(Object.keys(data).reduce((acc, region) => ({ ...acc, [region]: React.createRef() }), {}));

    const toggleRegion = region => {
        setRegionVisibility(prev => ({
            ...prev,
            [region]: !prev[region],
        }));
    };

    const scrollToRegion = region => {
        regionRefs.current[region]?.current.scrollIntoView({ behavior: 'smooth' });
    };

    const getOdds = async () => {
        try {
            const response = await fetch(import.meta.env.VITE_API_URL + '/info', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', Authorization: user },
            });

            if (!response.ok) {
                throw new Error(await response.text());
            }

            setData(await response.json());
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getOdds();
    }, []);

    useEffect(() => {
        console.log(data);
    }, [data]);

    return (
        <div className='min-h-screen flex bg-gray-50 dark:bg-gray-900'>
            {/* Sidebar */}
            <aside className='w-1/4 bg-gray-200 dark:bg-gray-800 p-6 sticky top-0 h-screen overflow-auto'>
                <h2 className='text-xl font-bold text-gray-800 dark:text-gray-100 mb-4'>Regions</h2>
                <ul className='space-y-2'>
                    {Object.keys(data).map(region => (
                        <li key={region}>
                            <button
                                onClick={() => scrollToRegion(region)}
                                className='text-left w-full text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition'
                            >
                                {region.toUpperCase()}
                            </button>
                        </li>
                    ))}
                </ul>
            </aside>

            {/* Main Content */}
            <main className='w-3/4 p-6 container mx-auto'>
                {Object.entries(data).map(([region, array]) => (
                    <div key={region} ref={regionRefs.current[region]} className='mb-8'>
                        {/* Region Header */}
                        <button
                            onClick={() => toggleRegion(region)}
                            className='w-full text-left text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4 border-b border-gray-300 dark:border-gray-700 pb-2 flex justify-between items-center'
                        >
                            {region.toUpperCase()}
                            <span
                                className={`transform transition-transform ${
                                    regionVisibility[region] ? 'rotate-90' : 'rotate-0'
                                }`}
                            >
                                →
                            </span>
                        </button>

                        {/* Region Content */}
                        {regionVisibility[region] && (
                            <ul className='space-y-6'>
                                {array.map((item, index) => (
                                    <li key={index} className='p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md'>
                                        {/* Sport and Teams */}
                                        <h3 className='text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2'>
                                            {item.sport_title} - {item.home_team}{' '}
                                            <span className='font-bold text-red-500'>VS</span> {item.away_team}
                                        </h3>

                                        {/* Bookmakers Section */}
                                        <h4 className='text-md font-bold text-gray-700 dark:text-gray-300 mb-3'>
                                            Bookmakers:
                                        </h4>
                                        <ul className='space-y-4'>
                                            {item.bookmakers.map((bookmaker, bookmakerIndex) => (
                                                <li
                                                    key={bookmakerIndex}
                                                    className='p-3 bg-gray-100 dark:bg-gray-700 rounded-md'
                                                >
                                                    <h4 className='text-md font-semibold text-gray-900 dark:text-gray-100 mb-2'>
                                                        {bookmaker.title}
                                                    </h4>

                                                    {/* Markets and Outcomes */}
                                                    <ul className='space-y-2 mt-2'>
                                                        {bookmaker.markets.map((market, marketIndex) => (
                                                            <div
                                                                key={marketIndex}
                                                                className='border-l-4 border-blue-500 dark:border-blue-400 pl-3'
                                                            >
                                                                <h5 className='text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
                                                                    {market.name}
                                                                </h5>
                                                                <ul className='pl-4 list-disc'>
                                                                    {market.outcomes.map((outcome, outcomeIndex) => (
                                                                        <li
                                                                            key={outcomeIndex}
                                                                            className='text-sm text-gray-600 dark:text-gray-400'
                                                                        >
                                                                            {outcome.name} -{' '}
                                                                            <span className='font-bold text-green-500 dark:text-green-400'>
                                                                                {outcome.price}
                                                                            </span>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        ))}
                                                    </ul>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </main>
        </div>
    );
}

export default Home;
