//WHS total

import React, { useEffect, useState } from 'react'; 
// import { Box } from '@chakra-ui/react'; 
import { getUser, getUserBeenTo } from '../service/users';
import DonutChart from '../components/progressComponents/donutChart';
import { ApexOptions } from 'apexcharts';


interface Site {
    id_number: number; 
    image_url: string; 
    site: string; 
    states: string[];
    region: string; 
    short_description: string; 
}

interface TopLevelData {
    sites: Site[]
}

const ChartWHSTotal: React.FC = () => {

    const userId = getUser();
    const [whssPercentage, setWhsPercentage] = useState<number | null>(null); 


    async function fetchSites(): Promise<Site[]> {
        const response = await fetch('/whc-en-copy.json');
        if (!response.ok) {
            throw new Error ('Failed to load json file')
        }
        const data: TopLevelData = await response.json();
        return data.sites as Site[]
    } 

    // console.log("fetchSites:", fetchSites())

    async function getUniqueWhs(userId: string): Promise<{uniqueWhss:string[], percentageWhsVisited: number}> {
        try {
            const beenTo = await getUserBeenTo(userId);  //user's beenTo sites
            const sitesData = await fetchSites();  //sitesData based on json id_number

            const matchedWHS: string[] = [] 

            beenTo.forEach((beenToId: number) => {
                const site = sitesData.find((site: Site) => site.id_number === beenToId)
                if (site) {
                    matchedWHS.push(...site.site) 
                    //concatenate sites array, then store "site" of matched "sites" 
                }
            }); 

            const uniqueWhss = Array.from(new Set(matchedWHS))
            const percentageWhsVisited = (beenTo.length / sitesData.length) * 100;

            return { uniqueWhss, percentageWhsVisited }

        } catch (error: any) {
            console.error(`Error fetching unique sites: ${error.message}`);
            throw error;
        }
    }

     async function whsPercentage(userId: string): Promise<void> {
         const {percentageWhsVisited} = await getUniqueWhs(userId);
         setWhsPercentage (percentageWhsVisited); 
    } 

    useEffect(() => {    
           whsPercentage(userId);
    }, [userId]); 

    const chartOptions: ApexOptions = {
        labels: ['Visited WHS', 'Remaining WHS'],
        colors: ['#00E396', '#FF4560'],
        legend: {
          position: 'bottom',
        },
      };

    return (
        <div>
            {whssPercentage !== null ? (
        <DonutChart
          data={[whssPercentage, 100 - whssPercentage]} // Pass the percentage data to the chart
          options={chartOptions}
        />
      ) : (
        <div>Loading...</div>
      )}
        </div>
    )

}

export default ChartWHSTotal;
