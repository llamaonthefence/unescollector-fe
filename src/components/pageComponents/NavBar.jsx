import { Box, IconButton, Text, Image } from "@chakra-ui/react";

import { Link } from 'react-router-dom'

import listIcon from "../../assets/list.png"
import mapIcon from "../../assets/map.png"
import siteIcon from "../../assets/site.png"
import recordIcon from "../../assets/record.png"
import userIcon from "../../assets/user.png"

import './navbar.css';

function Navbar() {


return(

<Box className="navbar-container">
  
  <Link to='/home'>
    <Box className="navbar-item">
        <IconButton
          icon={<Image src={listIcon} boxSize="24px" />}
          aria-label="Home"
          variant="ghost"
          fontSize="24px"
        />
        <Text fontSize="xs">Home</Text>
    </Box>
  </Link>

  <Link to='/map'>
    <Box className="navbar-item">
        <IconButton
          icon={<Image src={mapIcon} boxSize="24px" />}
          aria-label="Map"
          variant="ghost"
          fontSize="24px"
        />
        <Text fontSize="xs">Map</Text>
    </Box>
  </Link>

  <Link to='/site'>
    <Box className="navbar-item">
        <IconButton
          icon={<Image src={siteIcon} boxSize="24px" />}
          aria-label="Site"
          variant="ghost"
          fontSize="24px"
        />
        <Text fontSize="xs">Site</Text>
    </Box>
  </Link>

  <Link to='/record'>
    <Box className="navbar-item">
        <IconButton
          icon={<Image src={recordIcon} boxSize="24px" />}
          aria-label="Adventure"
          variant="ghost"
          fontSize="24px"
        />
        <Text fontSize="xs">Adventure</Text>
    </Box>
  </Link>

  <Link to='/user'>
    <Box className="navbar-item">
        <IconButton
          icon={<Image src={userIcon} boxSize="24px" />}
          aria-label="User"
          variant="ghost"
          fontSize="24px"
        />
        <Text fontSize="xs">User</Text>
    </Box>
  </Link>


</Box>

)}


export default Navbar
