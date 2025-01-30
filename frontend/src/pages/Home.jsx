import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import ScrollToTop from '../components/ScrollToTop';
import Sidebar from '../components/Sidebar';
import { Spinner } from '../components/Spinner';
import { regionNames, regionFlags } from '../utils/Regions';

function Home() {
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const { state: authState } = useAuth();
    const { token, user } = authState;

    const getOdds = async () => {
        try {
            const response = await fetch(import.meta.env.VITE_API_URL + '/info', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', Authorization: token },
            });

            if (!response.ok) {
                throw new Error(await response.text());
            }

            setData(await response.json());
        } catch (err) {
            console.log(err);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        getOdds();

        const interval = setInterval(() => {
            console.log('Refreshing data...');
            getOdds();
        }, 10 * 60 * 1000); // 10 minutes in milliseconds

        return () => clearInterval(interval); // Cleanup interval on unmount
    }, []);

    if (isLoading) {
        return <div className='absolute inset-0 flex justify-center items-center'><Spinner/></div>;
    }

    return (
        <div className='flex min-h-screen'>
            <Sidebar data={data} />

            {/* Main Content */}
            <div className='lg:w-3/4 md:w-3/5 w-full px-5 xl:px-16 py-4'>
                {Object.entries(data).map(([region, array]) => (
                    <div key={region} className='mb-8'>
                        {/* Region Heading */}
                        <div id={region} className='border-b dark:border-gray-700 mb-6 flex justify-between py-2'>
                            <h3 className='text-2xl font-bold text-blue-600 dark:text-blue-400'>
                                {regionNames[region]}
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
            <ScrollToTop />
        </div>
    );
}

export default Home;
