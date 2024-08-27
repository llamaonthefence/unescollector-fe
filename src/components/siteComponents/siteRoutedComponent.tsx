//this is the data display when a site is selected
//for when user is directed from the 'map' tab after selecting specific site
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { Box, Image, Text, Spinner, Flex, IconButton } from '@chakra-ui/react'; 
import { FaHeart, FaMapMarkerAlt, FaComment } from 'react-icons/fa';

interface Site {
    id_number: number; 
    image_url: string; 
    site: string; 
    states: string[];
    region: string; 
    short_description: string; 
}

interface SiteRoutedComponent {
    id_number: string; 
}

const SiteRoutedComponent: React.FC = () =>  {
    const { id } = useParams<{ id?: string }>(); 
    const [siteData, setSiteData] = useState<Site | null>(null); 
    const [error, setError] = useState<string | null>(null); 
    const [loading, setLoading] = useState(true)
    const [liked, setLiked] = useState(false);
    const [beenTo, setBeenTo] = useState(false);

    useEffect(() => {

        const fetchSiteFromId = async() => {
            //checking for whether id_number exists & valid
            if(!id) {
                console.log('No ID number provided');
                setLoading(false);
                return;
            }

            const numericId = parseInt(id, 10)
            console.log('Numeric ID:', numericId);

            if (isNaN(numericId)) {
                console.log('Invalid numeric ID');
                setError('Invalid ID number');
                setLoading(false); 
                return; 
            }

        try {
            const response = await fetch('/whc-en-copy.json');
            const data = await response.json();
            console.log('Data fetched:', data);

            const sitesArray = data.sites as Site[]

            //load site that matches "id_number"
            const site = sitesArray.find((site: Site) => site.id_number === numericId);
            console.log('Site found:', site);

            if (site) {
                setSiteData(site);
              } else {
                setError('Site not found');
              }
            } catch (error) {
              console.error('Error fetching data:', error);  
              setError('Error loading data');
            } finally {
              setLoading(false);
            }
        }
        fetchSiteFromId();
    },[id])

    if (loading) {
        if (id) {
          return (
            <Box textAlign="center" mt={8}>
              <Spinner size="xl" />
              <Text mt={4}>Loading...</Text>
            </Box>
          );
        } else {
          return (
            <Box textAlign="center" mt={8}>
              <Text fontSize="lg">Find a site in the Map or Search for a Site</Text>
            </Box>
          );
        }
      }
    
      if (error) {
        return (
          <Box textAlign="center" mt={8}>
            <Text color="red.500">{error}</Text>
          </Box>
        );
      }
    
      if (!siteData) {
        return (
            <Box textAlign="center" mt={8}>
                <Text>No site data available.</Text>
            </Box>
        )
      }

    return (
        <Box textAlign="center">
            <Image src={siteData.image_url} alt={siteData.site} width="20%" mx="auto"></Image>
            <Text fontSize="xl" fontWeight="bold">{siteData.site}</Text>
            <Text mt={2}>{siteData.states.join(', ')}{siteData.region ? `, ${siteData.region}` : ''}</Text>
            <Text mt={2}>{siteData.short_description}</Text>

        <Flex justifyContent="center" mt={4} gap={4}>
            <IconButton 
            aria-label="Like"
            icon={<FaHeart/>}
            onClick={ () => setLiked(!liked) }
            colorScheme={liked? 'red' : 'gray'}
            isRound    
            />
            <IconButton
            aria-label="Been to"
            icon={<FaMapMarkerAlt/>}
            onClick={ () => setBeenTo(!beenTo) }
            colorScheme={beenTo? 'green' : 'gray'}
            isRound    
            />
            <IconButton 
            aria-label="Comment"
            icon={<FaComment/>}
            // onClick={ () => setLiked(!liked) }
            colorScheme="blue"
            isRound    
            />
        </Flex>

        </Box>
    )
}

export default SiteRoutedComponent