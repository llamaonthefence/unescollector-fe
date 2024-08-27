import React from 'react';
import { Box, Image, Heading, Text } from '@chakra-ui/react';
import { Image as ImageType } from '../../util/types'; 

import africaImg from '../../assets/region-africa-img-sq.png';
import apacImg from '../../assets/region-apac-img-sq.png';
import arabImg from '../../assets/region-arab-img-sq.png';
import eurImg from '../../assets/region-eur-img-sq.png';
import latinaImg from '../../assets/region-latina-img-sq.png';  

//union type for region names
//RegionName will always be 1 of these 5
export type RegionName = 'Africa' | 'the Arab States' | 'Asia and the Pacific' | 'Europe and North America' | 'Latin America and the Caribbean';

//"Record" is util used to define key-type pairs
//Here, key=RegionName, value={src+alt}
export const RegionImgs: Record<RegionName, {src: string; alt: string }> = {
    Africa: { src: africaImg, alt: 'Africa' },
    'the Arab States': { src: arabImg, alt: 'The Arab States' },
    'Asia and the Pacific': { src: apacImg, alt: 'Asia and the Pacific' },
    'Europe and North America': { src: eurImg, alt: 'Europe and North America' },
    'Latin America and the Caribbean': { src: latinaImg, alt: 'Latin America and the Caribbean' }
}

interface RegionCardProps {
    image: ImageType; 
    region: string
    siteCount: number
}

const RegionCard: React.FC<RegionCardProps> = ({region, image, siteCount}) => {
    return (
        <Box>
            <Image
            src={image.src}
            alt={image.alt}
            boxSize="150px"
            objectFit="cover"
            mb={2}
            />
            <Heading size="sm">{region}</Heading>
            <Text>{siteCount} Sites</Text> 
        </Box>
    )
}

export default RegionCard;
