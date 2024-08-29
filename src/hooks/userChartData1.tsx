//continents 

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

const ChartContinent: React.FC = () => {

    const userId = getUser();
    const [continentPercentage, setContinentPercentage] = useState<number | null>(null); 


    async function fetchSites(): Promise<Site[]> {
        const response = await fetch('/whc-en-copy.json');
        if (!response.ok) {
            throw new Error ('Failed to load json file')
        }
        const data: TopLevelData = await response.json();
        return data.sites as Site[]
    } 

    console.log("fetchSites:", fetchSites())

    async function getUniqueRegions(userId: string): Promise<string[]> {
        try {
            const beenTo = await getUserBeenTo(userId);  //user's beenTo sites
            const sitesData = await fetchSites();  //regions from local json based on id_number

            console.log("BeenTo", beenTo)
            console.log("jsonData:", sitesData)

            const matchedRegions: string[] = [] 
            //map beenTo site ID to corresponding object in JSON.
    //         const visitedRegions = beenTo.data.map((id_number: number) => {
    //             const site = sitesData.find((region: Site) => region.id_number === id_number)
    //             console.log(site)
    //             return site ? site.region : null; 
    //         })
    //         .filter((region: string | null) => region !== null) as string[]; 

    //         const uniqueRegions = [...new Set(visitedRegions)]
    //         return uniqueRegions;
    //     } catch (error: any) {
    //         console.error(`Error fetching unique regions: ${error.message}`);
    //         throw error; 
    //     }
    // }

            beenTo.forEach((beenToId: number) => {
                const site = sitesData.find((site: Site) => site.id_number === beenToId)
                if (site) {
                    matchedRegions.push(site.region) //store "region" of matched "sites" 
                }
            }); 

            const uniqueRegions = Array.from(new Set(matchedRegions))
            return uniqueRegions; 

        } catch (error: any) {
            console.error(`Error fetching unique regions: ${error.message}`);
            throw error;
        }
    }

     async function regionPercentage(userId: string): Promise<void> {
         const uniqueRegions = await getUniqueRegions(userId);
         const percentageContinent = (uniqueRegions.length/7) * 100;
         setContinentPercentage (percentageContinent); 
    } 

    useEffect(() => {    
           regionPercentage(userId);
    }, [userId]); 

    const chartOptions: ApexOptions = {
        labels: ['Visited Continents', 'Remaining Continents'],
        colors: ['#00E396', '#FF4560'],
        legend: {
          position: 'bottom',
        },
      };

    return (
        <div>
            {continentPercentage !== null ? (
        <DonutChart
          data={[continentPercentage, 100 - continentPercentage]} // Pass the percentage data to the chart
          options={chartOptions}
        />
      ) : (
        <div>Loading...</div>
      )}
        </div>
    )

}

export default ChartContinent
