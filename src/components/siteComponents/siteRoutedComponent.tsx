//this is the data display when a site is selected
//for when user is directed from the 'map' tab after selecting specific site
import React, { useState, useEffect } from 'react';
import { Box, Image, Text, Heading } from '@chakra-ui/react'; 

interface Site {
    image_url: string; 
    site: string; 
    states: string[];
    region: string; 
    short_description: string; 
}

const SiteRoutedComponent: React.FC = () =>  {
    const [siteData, setSiteData] = useState<Site | null>(null); 

    


    return (

    )
}

export default SiteRoutedComponent