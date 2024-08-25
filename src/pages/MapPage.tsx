import React from 'react';
import { Box } from '@chakra-ui/react'
import MapComponent from '../components/mapComponents/mapComponent';
import { Site } from '../components/mapComponents/mapComponent'
import { useEffect, useState } from 'react';
// import '../constants/whc-en.json'

//sites dummy data
const sites = [
    { latitude: 48.8566, longitude: 2.3522, name: 'Eiffel Tower', description: 'A global cultural icon of France.' },
    { latitude: 40.6892, longitude: -74.0445, name: 'Statue of Liberty', description: 'A symbol of freedom.' },
    // Add more sites as needed
  ];


const MapPage: React.FC = () => {

    const [sites, setSites] = useState<Site[]>([]);

    return (
        <Box display="flex" flexDirection="column" height="100vh">
            <Box flex="1" position="relative">
                <MapComponent sites={sites} />
            </Box>
        </Box>
    )

}; 

export default MapPage; 