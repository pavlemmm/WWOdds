import React from 'react';
import { regionNames, regionFlags } from '../utils/Regions';

export default function Sidebar({data}) {
    return (
        <div className='max-md:hidden sticky w-1/4 top-0 h-screen scrollbar-thin overflow-y-auto border-r border-gray-700 px-4 py-6 mt-4'>
            <ul>
                {Object.entries(data).map(([region, array]) => (
                    <li key={region} className='mb-8'>
                        <a href={`#${region}`}>
                            <div className='border-b dark:border-gray-700 mb-2 flex justify-between'>
                                <h3 className='text-lg font-bold text-blue-600 dark:text-blue-400'>
                                    {regionNames[region]}
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
    );
}
