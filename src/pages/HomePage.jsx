import { Box, Image,Text } from "@chakra-ui/react";
import HomeDashboard from "../components/homeComponents/homeDashboard";
import UserCharts from "../components/progressComponents/userCharts";

import homeImage from '../assets/homeImage.jpg'
import appLogo from '../assets/logo.png'

function HomePage() {

    return(
        <>
        {/*home-image*/}
        <Box>
            <Box>
                <Image 
                src={homeImage}
                alt="Home-image"
                width="100%"
                height="auto"
                objectFit="cover"
                />
            </Box>

        {/*logo-setup*/}
            <Box 
                position="absolute"
                top="20%"
                left="50%"
                transform="translate(-50%, -50%)"
                width="100px"
                height="100px"
                borderRadius="50%"
                bgColor="black"
                opacity="0.7"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Image 
                src={appLogo}
                alt="App-logo"
                width="80px"
                height="80px"
                opacity="100%"
                objectFit="contain"
                />
            </Box>
        </Box>

        {/*title-setup*/}
        <Box
            position="absolute"
            top="30%"
            left="50%"
            transform="translate(-50%, -50%)"
            textAlign="center"
        >
            
            <Text
            color="white"
            fontSize="md"
            >Welcome to</Text>
            <Text
            color="white"
            fontSize="xl"
            fontWeight="bold"
            >UNESCOllector</Text>
            
        </Box>

        <Box maxWidth="550px" mx="auto">
        <HomeDashboard />
        <UserCharts />
        </Box>
        </>
    )
}; 


export default HomePage; 