//this component contains '/site' root components such as search bar
//for when users click directly on 'site' tab
//'SiteRoutedComponent' - routed from 'map' tab 
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; 
// import SiteRoutedComponent from './siteRoutedComponent';
import { Box, Input, VStack, Heading, SimpleGrid } from '@chakra-ui/react'
import RegionCard from '../siteComponents/RegionCard'
import { RegionImgs, RegionName } from '../siteComponents/RegionCard'
import SiteLoaded from './siteLoadedComponent';

interface Site {
    id_number: number; 
    image_url: string; 
    site: string; 
    states: string[];
    region: string; 
    short_description: string; 
}

interface JSONData {
    sites: Site[] 
}

const SiteRootComponent: React.FC = () => {
    const { id } = useParams<{id:string}>();
    const [keyword, setKeyword] = useState('');
    const [filteredSites, setFilteredSites] = useState<Site[]>([]); 
    const [regionCount, setRegionCount] = useState<{ [key:string]: number }>({});
    const [jsonData, setJsonData] = useState<JSONData | null>(null);
    // // const [renderRoutedComponent, setRenderRoutedComponent] = useState(false)
    const [selectedSite, setSelectedSite] = useState<Site | null>(null); 

    const inputRef = useRef<HTMLInputElement>(null); //Set poisiton of VStack
    const navigate = useNavigate() // URL navigation to update with latest user's action

    // //fetch jsonData from public folder - can't conventional import: 
    useEffect(() => {
        fetch('/whc-en-copy.json')
        .then((response) => response.json())
        .then((data: JSONData) => setJsonData(data))
        .catch((error) => console.error('Error fetching JSON:', error))
    },[])

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
    }, [keyword, jsonData]); 

    // Select site based on URL param
    useEffect(() => {
        if (id && jsonData) {
            const foundSite = jsonData.sites.find(site => site.id_number.toString() === id);
            if (foundSite) {
                setSelectedSite(foundSite);
            }
        }
    }, [id, jsonData]);

    const handleSiteClick = (site: Site) => {
        const siteStatesWithArray = {
            ...site,
            states: typeof site.states === 'string' ? [site.states]: site.states
        }

        setSelectedSite(siteStatesWithArray)
        navigate(`/site/${site.id_number}`);
    }
    
    return (
        <>
        {/*Root component - search bar to find specific site*/}
        
        <Box position="relative" minHeight="20vh" overflow="visible" >
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
            top={`${inputRef.current ? inputRef.current.offsetHeight + 4 : 0}px`} 
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
                    <Box 
                    key={index} 
                    p={4} 
                    borderWidth={1} 
                    borderRadius="md"
                    width="80%"
                    cursor="pointer"
                    onClick={()=> handleSiteClick(site)}>
                    
                    <Heading fontSize="0.9em">{site.site}</Heading>
                    </Box>
                ))}
            </VStack>
             
        </Box>
        )}
    </Box>

        {/* {selectedSite && <SiteLoaded siteData={selectedSite}/>} */}
        {/* {selectedSite && <SiteLoaded siteData={selectedSite}/>} */}

        {/*Root component - cards for UNESCO reigons*/}
        {/* <SimpleGrid>
            {Object.keys(regionCount).map((region) => (
                <RegionCard 
                key={region}
                region={region}
                image={RegionImgs[region as RegionName]}
                siteCount={regionCount[region]}
                /> 
            ))}

        </SimpleGrid> */}

        {/*Conditional render - Routed from 'Map' tab*/}
         {/* {renderRoutedComponent && <SiteRoutedComponent/>}  */}
        </>
    )
    
}


export default SiteRootComponent