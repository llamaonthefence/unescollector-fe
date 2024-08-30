import React, {useState, useEffect} from 'react';
import {Box, Image, Text, Flex, IconButton} from '@chakra-ui/react';
import { FaHeart, FaMapMarkerAlt, FaComment } from 'react-icons/fa';
import { handleLikes, handleBeenTo, getUserDetails, getUser } from '../../service/users';


interface Site {
    id_number: number; 
    image_url: string; 
    site: string; 
    states: string[];
    region: string; 
    short_description: string; 
}

interface SiteLoadedProps {
    siteData: Site;
}

const SiteLoaded: React.FC<SiteLoadedProps> = ({siteData}) => {
    const [liked, setLiked] = useState<boolean>(false);
    const [beenTo, setBeenTo] = useState<boolean>(false);
    const [likedList, setLikedList] = useState<number[]>([]);
    const [beenToList, setBeenToList] = useState<number[]>([]);  //these lists save site IDs 

    const userId = getUser() //is an object with an 'id' field
    console.log('userID from siteRoutedComponent:', userId)

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await getUserDetails(userId);
                setLiked(userData.likes.includes(siteData.id_number));
                setBeenTo(userData.beenTo.includes(siteData.id_number));
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUserData();
    }, [siteData, userId]);

    // const onLikedClick = async () => {
    //     try {
    //     //     const updatedLikes = await handleLikes(userId, siteData.id_number.toString());
    //     //     setLikedList(updatedLikes);
    //     //     setLiked(!liked);
    //     // } catch (error) {
    //     //     console.error('Error updating likes:', error);
    //     // console.log('userId:', userId);
    // //       // console.log('siteData:', siteData?.id_number);

    // //     if (userId && siteData) {

    // //       const fetchUserData = async() => {
    // //         try {
    // //           const userData = await getUserDetails(userId)
              
    // //           // const isLiked = userData.likes.includes(siteData.id_number)
    // //           // const isBeenTo = userData.beenTo.includes(siteData.id_number)
    // //           console.log('This is userData:', userData)
    // //           // console.log('This is user likes:', userLikes)

    // //           // setLiked(isLiked);
    // //           // setBeenTo(isBeenTo);
    // //         } catch (error) {
    // //           console.error('Error fetching user data:', error); 
    // //         }}
    // //         fetchUserData();

    // //         if (!liked) {
    // //             const updatedLikes = await handleLikes(userId, siteData!.id_number.toString())
    // //             setLikedList(updatedLikes);
    // //             setLiked(true); 
    // //         } else {
    // //           const updatedLikes = await handleLikes(userId, siteData!.id_number.toString())
    // //           setLikedList(updatedLikes);
    // //           setLiked(false); 
    // //         }}
    // //     } catch(error) {
    // //         console.error('Error adding to favourites:', error)
    // //     }
    // //   } 

    //     }
    // };

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
                  // console.log('This is user likes:', userLikes)
    
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
            const updatedBeenToList = await handleBeenTo(userId, siteData.id_number.toString());
            setBeenToList(updatedBeenToList);
            setBeenTo(!beenTo);
        } catch (error) {
            console.error('Error updating beenTo list:', error);
        }
    };

    return (
        <Box textAlign="center">
            <Image src={siteData.image_url} alt={siteData.site} width="20%" mx="auto" />
            <Text fontSize="xl" fontWeight="bold">{siteData.site}</Text>
            <Text mt={2}>{siteData.states.join(', ')}{siteData.region ? `, ${siteData.region}` : ''}</Text>
            <Text mt={2} mb={10}>{siteData.short_description}</Text>

            <Flex justifyContent="center" mt={4} gap={4}>
                <IconButton 
                    aria-label="Like"
                    icon={<FaHeart />}
                    onClick={onLikedClick}
                    colorScheme={liked ? 'red' : 'gray'}
                    isRound    
                />
                <IconButton
                    aria-label="Been to"
                    icon={<FaMapMarkerAlt />}
                    onClick={onBeenToClick}
                    colorScheme={beenTo ? 'green' : 'gray'}
                    isRound    
                />
                <IconButton 
                    aria-label="Comment"
                    icon={<FaComment />}
                    colorScheme="blue"
                    isRound    
                />
            </Flex>
        </Box>
    );
};

export default SiteLoaded;
