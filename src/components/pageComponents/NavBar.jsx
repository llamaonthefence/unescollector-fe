import { Box, Flex, IconButton, Text, Image } from "@chakra-ui/react";

import { Link } from 'react-router-dom'

import listIcon from "../../assets/list.png"
import mapIcon from "../../assets/map.png"
import siteIcon from "../../assets/site.png"
import recordIcon from "../../assets/record.png"
import userIcon from "../../assets/user.png"

function Navbar() {


return(
<div>
<Box
  position="fixed"
  bottom="0"
  width="100%"
  bg="gray.200"
  p="4"
  display="flex"
  justifyContent="space-around"
  left="50%"
  transform="translateX(-50%)"
  maxWidth="400px"
  borderRadius="md"
  boxShadow="md"
>
  
  <Link to='/home'>
    <Flex direction="column" alignItems="center">
        <IconButton
          icon={<Image src={listIcon} boxSize="24px" />}
          aria-label="Home"
          variant="ghost"
          fontSize="24px"
        />
        <Text fontSize="xs">Home</Text>
    </Flex>
  </Link>

  <Link to='/map'>
    <Flex direction="column" alignItems="center">
        <IconButton
          icon={<Image src={mapIcon} boxSize="24px" />}
          aria-label="Map"
          variant="ghost"
          fontSize="24px"
        />
        <Text fontSize="xs">Map</Text>
    </Flex>
  </Link>

  <Link to='/site'>
    <Flex direction="column" alignItems="center">
        <IconButton
          icon={<Image src={siteIcon} boxSize="24px" />}
          aria-label="Site"
          variant="ghost"
          fontSize="24px"
        />
        <Text fontSize="xs">Site</Text>
    </Flex>
  </Link>

  <Link to='/record'>
    <Flex direction="column" alignItems="center">
        <IconButton
          icon={<Image src={recordIcon} boxSize="24px" />}
          aria-label="Adventure"
          variant="ghost"
          fontSize="24px"
        />
        <Text fontSize="xs">Adventure</Text>
    </Flex>
  </Link>

  <Link to='/user'>
    <Flex direction="column" alignItems="center">
        <IconButton
          icon={<Image src={userIcon} boxSize="24px" />}
          aria-label="User"
          variant="ghost"
          fontSize="24px"
        />
        <Text fontSize="xs">User</Text>
    </Flex>
  </Link>


</Box>
</div>

)}


export default Navbar
