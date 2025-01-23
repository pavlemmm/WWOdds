import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

function Home() {
    const { user } = useAuth();
    const [data, setData] = useState({});

    const regionFlags = {
        eu: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Flag_of_Europe.svg/255px-Flag_of_Europe.svg.png',
        us: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/1235px-Flag_of_the_United_States.svg.png',
        au: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Flag_of_Australia.svg/2560px-Flag_of_Australia.svg.png',
        uk: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Flag_of_the_United_Kingdom_%281-2%29.svg/1200px-Flag_of_the_United_Kingdom_%281-2%29.svg.png',
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

        const interval = setInterval(() => {
            console.log('Refreshing data...');
            getOdds();
        }, 10 * 60 * 1000); // 10 minutes in milliseconds

        return () => clearInterval(interval); // Cleanup interval on unmount
    }, []);

    // useEffect(() => {
    //     console.log(data);
    // }, [data]);

    return (
        <div className='flex min-h-screen'>
            {/* Sidebar */}
            <div className='w-1/4 p-4 border-r border-gray-700 overflow-y-auto h-screen top-0 sticky py-6'>
                <ul>
                    {Object.entries(data).map(([region, array]) => (
                        <li key={region} className='mb-8'>
                            <a href={`#${region}`}>
                                <div className='border-b dark:border-gray-700 mb-2 flex justify-between'>
                                    <h3 className='text-lg font-bold text-blue-600 dark:text-blue-400'>
                                        {region.toUpperCase()}
                                    </h3>
                                    <img src={regionFlags[region]} className='inline-block h-5 ml-4' />
                                </div>
                            </a>
                            <ul>
                                {array.map((item, index) => (
                                    <li key={index} className='text-gray-700 dark:text-gray-300 hover:text-blue-500'>
                                        <a href={'#' + region + '_' + item.home_team + '_' + item.away_team}>
                                            {item.sport_title} - {item.home_team} VS {item.away_team}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Main Content */}
            <div className='w-3/4 px-16 py-4'>
                {Object.entries(data).map(([region, array]) => (
                    <div key={region} className='mb-8'>
                        {/* Region Heading */}
                        <div id={region} className='border-b dark:border-gray-700 mb-6 flex justify-between py-2'>
                            <h3 className='text-2xl font-bold text-blue-600 dark:text-blue-400'>
                                {region.toUpperCase()}
                            </h3>
                            <img src={regionFlags[region]} className='inline-block h-7 ml-4' />
                        </div>

                        {/* Region Content */}
                        <ul className='space-y-6'>
                            {array.map((item, index) => (
                                <li
                                    key={index}
                                    id={region + '_' + item.home_team + '_' + item.away_team}
                                    className='p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md'
                                >
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
                                                <ul className='space-y-2'>
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
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
