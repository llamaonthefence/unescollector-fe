import { AddIcon } from "@chakra-ui/icons"
import { IconButton, useDisclosure, Box, Flex } from "@chakra-ui/react"
import React from "react"

const AddAdventure = () => {
    const { isOpen, onOpen, onClose } = useDisclosure() //for ChakraUI modal

    return (
        <>
        <Flex
        w="100%"
        justifyContent="center"
        alignItems="center"
        mt={4}
        mb={4}
        >
            <Box
            w="100%"
            h="4px"
            bg="gray.200"
            position="relative"
            >
                <IconButton
                icon={<AddIcon/>}
                aria-label="Add adventure"
                onClick={onOpen}
                position="absolute"
                top="-20px"
                left="50px"
                transform="translateX(-50%)"
                borderRadius="full"
                size="lg"
                />
            </Box>
        </Flex>


        </>
    )
}

export default AddAdventure;