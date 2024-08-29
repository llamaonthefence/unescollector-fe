import React, {useEffect, useState } from 'react'; 
import DonutChart from './donutChart';
import { ApexOptions } from 'apexcharts';
import { Box } from '@chakra-ui/react';
import ChartContinent from '../../hooks/userChartData1';
import ChartStates from '../../hooks/userChartData2';
import ChartWHSTotal from '../../hooks/userChartData3';

import './userCharts.css';

const UserCharts = () => {

    return (
        <Box className='charts-container'>
        <Box><ChartContinent /></Box>
        <Box><ChartStates/></Box>
        <Box><ChartWHSTotal/></Box>
        <Box>Chart4</Box>
        </Box>
    )
}

export default UserCharts; 