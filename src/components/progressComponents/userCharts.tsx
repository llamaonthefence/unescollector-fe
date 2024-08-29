import React, {useEffect, useState } from 'react'; 
import DonutChart from './donutChart';
import { ApexOptions } from 'apexcharts';
import { Box } from '@chakra-ui/react';
import ChartContinent from '../../hooks/userChartData1';

const UserCharts = () => {

    return (
        <Box>
        <Box><ChartContinent /></Box>
        <Box>Chart2</Box>
        <Box>Chart3</Box>
        <Box>Chart4</Box>
        </Box>
    )
}

export default UserCharts; 