import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import ScrollToTop from '../components/common/ScrollToTop';
import Sidebar from '../components/layout/Sidebar';
import { Spinner } from '../components/common/Spinner';
import Matches from '../components/features/Matches';
import RegionHeading from '../components/features/RegionHeading';

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

    // useEffect(() => console.log(data), [data]);

    if (isLoading) {
        return (
            <div className='absolute inset-0 flex justify-center items-center'>
                <Spinner />
            </div>
        );
    }

    return (
        <div className='flex min-h-screen'>
            <Sidebar data={data} />

            {/* Main Content */}
            <div className='lg:w-3/4 md:w-3/5 w-full px-5 xl:px-16 py-4'>
                {Object.entries(data).map(([region, array]) => (
                    <div key={region} className='mb-8'>
                        {/* Region Heading */}
                        <RegionHeading region={region} />

                        <Matches region={region} data={array} />
                    </div>
                ))}
            </div>
            <ScrollToTop />
        </div>
    );
}

export default Home;
