import React from 'react'; 
import ApexCharts from 'react-apexcharts';
import { ApexOptions } from 'apexcharts'; 
import { Box } from '@chakra-ui/react'; 

interface DonutChartProps {
    data: number[]; // numbers array for chart series 
    options: ApexOptions; //chart option type
}

const DonutChart: React.FC<DonutChartProps> = ({ data, options }) => (
    <div>
        <Box>
            <ApexCharts 
                options={options}
                series={data}
                type="donut"
                width="100%"
            />
        </Box>
    </div>
)

export default DonutChart