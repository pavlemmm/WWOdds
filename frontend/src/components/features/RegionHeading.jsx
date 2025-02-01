import React from 'react';
import { regionNames, regionFlags } from '../../utils/Regions';

const RegionHeading = ({region}) => (
    <div id={region} className='border-b dark:border-gray-700 border-gray-300 mb-6 flex justify-between py-2'>
        <h3 className='text-2xl font-bold text-blue-600 dark:text-blue-400'>{regionNames[region]}</h3>
        <img src={regionFlags[region]} className='inline-block h-7 ml-4' />
    </div>
);

export default RegionHeading;
