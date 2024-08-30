import { Box, Flex, Text } from '@chakra-ui/react' 
import Logo from '../../assets/logo.png'
// import {HamburgerIcon} from '@chakra-ui/icons'; 
import { useLocation } from 'react-router-dom';

import './Header.css'; 


function Header() {

    const location = useLocation(); 

    //mapping pathnames to header titles
    const getTitle = (pathname) => {
        if (pathname.startsWith('/home')) return 'Home';
        if (pathname.startsWith('/map')) return 'Map';
        if (pathname.startsWith('/site')) return 'Site';
        if (pathname.startsWith('/adventure')) return 'Adventure';
        if (pathname.startsWith('/user')) return 'User';
        return '';
        };

    const title = getTitle(location.pathname); 

    return (
        <Box className="header-container" >
            <Flex justifyContent="start" alignItems="left">
                
                <Flex>
                    <Box as="img" src={Logo} alt="UNESCOllector Logo" boxSize="40px" mr={3}/>
                    <Text fontSize="xl" fontWeight="bold" color="white">{title}</Text>
                </Flex>

                    {/* <IconButton 
                    aria-label="menu" 
                    icon={<HamburgerIcon/>}
                    ml="10"
                    size="md"
                    variant="outline"
                    colorScheme='whiteAlpha'
                    borderRadius="md"
                    />  */}


            </Flex>
        </Box>
    )
}

export default Header;