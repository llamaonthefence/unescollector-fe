import { Heading, Container, Box } from '@chakra-ui/react';
import React from 'react'; 

const HomeDashboard: React.FC = () => {

    return(
        <Container maxW="100%" p={4} mt="20px">
            <Box
            bg="gray.100"
            p={4}
            textAlign="center"
            borderRadius="md"
            >
                <Heading as="h3" size="md">Your UNESCOllector Snapshot</Heading>
            </Box>
        </Container>
    )
}

export default HomeDashboard