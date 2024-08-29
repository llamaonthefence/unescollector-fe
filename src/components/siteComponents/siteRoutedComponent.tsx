//this is the data display when a site is selected
//for when user is directed from the 'map' tab after selecting specific site
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { Box, Image, Text, Spinner, Flex, IconButton } from '@chakra-ui/react'; 
import { FaHeart, FaMapMarkerAlt, FaComment } from 'react-icons/fa';

import { handleLikes, handleBeenTo, getUserDetails } from '../../service/users'
import { getUser } from '../../service/users';

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

    const [liked, setLiked] = useState<boolean>(false);
    const [beenTo, setBeenTo] = useState<boolean>(false);
    const [likedList, setLikedList] = useState<number[]>([]);
    const [beenToList, setBeenToList] = useState<number[]>([]);  //these lists save site IDs 

    const userId = getUser() //is an object with an 'id' field
    console.log('userID from siteRoutedComponent:', userId) 

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
            console.log('Site ID:', site?.id_number);

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


    //likes & beenTo functions 
    // useEffect(() => {
    //     if (siteData) {
    //         // Check if site is in liked/beenTo lists
    //         setLiked(likedList.includes(siteData.id_number));
    //         // setBeenTo(beenToList.includes(siteData.id_number));
    //     }
    // }, [siteData, likedList, beenToList])

    const onLikedClick = async () => {
        try {
          // console.log('userId:', userId);
          // console.log('siteData:', siteData?.id_number);

        if (userId && siteData) {

          const fetchUserData = async() => {
            try {
              const userData = await getUserDetails(userId)
              
              // const isLiked = userData.likes.includes(siteData.id_number)
              // const isBeenTo = userData.beenTo.includes(siteData.id_number)
              console.log('This is userData:', userData)
              

              // setLiked(isLiked);
              // setBeenTo(isBeenTo);
            } catch (error) {
              console.error('Error fetching user data:', error); 
            }}
            fetchUserData();

            if (!liked) {
                const updatedLikes = await handleLikes(userId, siteData!.id_number.toString())
                setLikedList(updatedLikes);
                setLiked(true); 
            } else {
              const updatedLikes = await handleLikes(userId, siteData!.id_number.toString())
              setLikedList(updatedLikes);
              setLiked(false); 
            }}
        } catch(error) {
            console.error('Error adding to favourites:', error)
        }
      } 

    const onBeenToClick = async () => {
        try {
           if (userId && siteData) { 
            if(!beenTo) {
                const updateBeenToList = await handleBeenTo(userId, siteData!.id_number.toString());
                setBeenToList(updateBeenToList);
                setBeenTo(true)
            } else {
                const updateBeenToList = await handleBeenTo(userId, siteData!.id_number.toString());
                setBeenToList(updateBeenToList)
                setBeenTo(false)
            }}
        } catch (error) {
            console.error('Error adding to beenTo list:', error)
        }
    }

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
            <Text mt={2} mb={10}>{siteData.short_description}</Text>

        <Flex justifyContent="center" mt={4} gap={4}>
            <IconButton 
            aria-label="Like"
            icon={<FaHeart/>}
            onClick={ onLikedClick }
            colorScheme={liked? 'red' : 'gray'}
            isRound    
            />
            <IconButton
            aria-label="Been to"
            icon={<FaMapMarkerAlt/>}
            onClick={ onBeenToClick }
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