//this component contains '/site' root components such as search bar
//for when users click directly on 'site' tab
//'SiteRoutedComponent' - routed from 'map' tab 
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom'; 
// import SiteRoutedComponent from './siteRoutedComponent';
import { Box, Input, VStack, Heading, SimpleGrid } from '@chakra-ui/react'
import RegionCard from '../siteComponents/RegionCard'
import { RegionImgs, RegionName } from '../siteComponents/RegionCard'

interface Site {
    region: string; 
    site: string; 
}

interface JSONData {
    sites: Site[] 
}

const SiteRootComponent: React.FC = () => {
    // const { id } = useParams<{id:string}>();
    const [keyword, setKeyword] = useState('');
    const [filteredSites, setFilteredSites] = useState<Site[]>([]); 
    const [regionCount, setRegionCount] = useState<{ [key:string]: number }>({});
    const [jsonData, setJsonData] = useState<JSONData | null>(null);
    // // const [renderRoutedComponent, setRenderRoutedComponent] = useState(false)

    const inputRef = useRef<HTMLInputElement>(null); //Set poisiton of VStack

    // //fetch jsonData from public folder - can't conventional import: 
    useEffect(() => {
        fetch('/whc-en-copy.json')
        .then((response) => response.json())
        .then((data: JSONData) => setJsonData(data))
        .catch((error) => console.error('Error fetching JSON:', error))
    },[])

    // // if (!jsonData) {
    // //     return (
    // //         <div>
    // //             Loading... 
    // //         </div>
    // //     )}

    // //updating state of regionCount 
    // useEffect(() => {

    //    if (jsonData) {
    //     const regionMap: { [key:string]: number } = {};
    //     jsonData.sites.forEach((site: Site) => {
    //         regionMap[site.region] = (regionMap[site.region] || 0) +1
    //     })
    //     setRegionCount(regionMap); //state is updated
    //     }  
    // }, [jsonData]) //use jsonData as dependency array

    //render searchbar with results based on keywords
    useEffect(() => {
        if(jsonData && keyword) {
            const results = jsonData.sites.filter((sites: Site) => 
            sites.site.toLowerCase().includes(keyword.toLowerCase())
        ); 
        setFilteredSites(results); 
        } else {
            setFilteredSites([])
        }
    }, [keyword]); 
    
    //routed component
    // useEffect(()=> {
    //     setRenderRoutedComponent(!!id)
    // }, [id])


    return (
        <>
        {/*Root component - search bar to find specific site*/}
        
        <Box position="relative" minHeight="20vh" overflow="visible" mt="70px">
            <Box>
                <Input
                ref={inputRef}
                type="text"
                placeholder="Search UNESCO Sites"
                value={keyword}
                onChange={(evt) => setKeyword(evt.target.value)}
                mb={2}
                />
            </Box>

        {/*Root component - filtered sites*/}

        {filteredSites.length > 0 && (
            <Box
            position="absolute"
            top={`${inputRef.current ? inputRef.current.offsetHeight + 8 : 0}px`} 
            left="0"
            right="0" 
            bottom="0"
            maxHeight="50vh" 
            overflowY="auto"
            zIndex={1000}
            backgroundColor="transparent"
            >
            <VStack spacing={4}>
                {filteredSites.map((site, index) => (
                    <Box key={index} p={4} 
                    borderWidth={1} borderRadius="md"
                    width="50%">
                    <Heading fontSize="0.9em">{site.site}</Heading>
                    </Box>
                ))}
            </VStack>
             
            </Box>
        )}
        </Box>

        {/*Root component - cards for UNESCO reigons*/}
        <SimpleGrid>
            {Object.keys(regionCount).map((region) => (
                <RegionCard 
                key={region}
                region={region}
                image={RegionImgs[region as RegionName]}
                siteCount={regionCount[region]}
                /> 
            ))}

        </SimpleGrid>

        {/*Conditional render - Routed from 'Map' tab*/}
         {/* {renderRoutedComponent && <SiteRoutedComponent/>}  */}
        </>
    )
    
}


export default SiteRootComponent