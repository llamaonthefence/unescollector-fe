//states 

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

const ChartStates: React.FC = () => {

    const userId = getUser();
    const [statesPercentage, setStatesPercentage] = useState<number | null>(null); 


    async function fetchSites(): Promise<Site[]> {
        const response = await fetch('/whc-en-copy.json');
        if (!response.ok) {
            throw new Error ('Failed to load json file')
        }
        const data: TopLevelData = await response.json();
        return data.sites as Site[]
    } 

    console.log("fetchSites:", fetchSites())

    async function getUniqueStates(userId: string): Promise<string[]> {
        try {
            const beenTo = await getUserBeenTo(userId);  //user's beenTo sites
            const sitesData = await fetchSites();  //sitesData based on json id_number

            console.log("BeenTo", beenTo)
            console.log("jsonData:", sitesData)

            const matchedStates: string[] = [] 

            beenTo.forEach((beenToId: number) => {
                const site = sitesData.find((site: Site) => site.id_number === beenToId)
                if (site) {
                    matchedStates.push(...site.states) 
                    //concatenate states array, then store "states" of matched "sites" 
                }
            }); 

            const uniqueStates = Array.from(new Set(matchedStates))
            return uniqueStates; 

        } catch (error: any) {
            console.error(`Error fetching unique states: ${error.message}`);
            throw error;
        }
    }

     async function statePercentage(userId: string): Promise<void> {
         const uniqueStates = await getUniqueStates(userId);
         const percentageStates = (uniqueStates.length/195) * 100;
         setStatesPercentage (percentageStates); 
    } 

    useEffect(() => {    
           statePercentage(userId);
    }, [userId]); 

    const chartOptions: ApexOptions = {
        labels: ['Visited Countries', 'Remaining Countries'],
        colors: ['#00E396', '#FF4560'],
        legend: {
          position: 'bottom',
        },
      };

    return (
        <div>
            {statesPercentage !== null ? (
        <DonutChart
          data={[statesPercentage, 100 - statesPercentage]} // Pass the percentage data to the chart
          options={chartOptions}
        />
      ) : (
        <div>Loading...</div>
      )}
        </div>
    )

}

export default ChartStates;
