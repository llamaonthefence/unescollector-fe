import { AddIcon } from "@chakra-ui/icons"
import { IconButton, useDisclosure, Box, Flex, useToast,Spinner } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { checkPermission } from "../../service/users"

const AddAdventure = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isCheckingPermission, setIsCheckingPermission] = useState<boolean>(false);
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null)
    const toast = useToast();

    const checkUserPermission = async () => {
        setIsCheckingPermission(true);
        try {
            const res = await checkPermission(); // Call the API to check permission
            setIsAdmin(res.user.is_admin); // Update the state with the is_admin status
        } catch (error) {
            console.error("Error fetching admin status:", error);
            toast({
                title: "Error",
                description: "An error occurred while checking permissions.",
                status: "error",
                duration: 5000,
                isClosable: true,
                containerStyle: {
                    marginBottom: "10px"   
                }
            });
        } finally {
            setIsCheckingPermission(false);
        }
    };

    const handleButtonClick = async () => {
        await checkUserPermission(); // Check permissions before handling the click

        if (isAdmin) {
            onOpen(); // Open modal if the user is an admin
        } else {
            toast({
                title: "Access Denied",
                description: "You do not have permission to add adventures.",
                status: "error",
                duration: 5000,
                isClosable: true,
                containerStyle: {
                    marginBottom: "100px"   
                }
            });
        }
    };


    return (
        <>
        <Flex
        w="100%"
        justifyContent="center"
        alignItems="flex-start"
        mt={0}
        mb={4}
        >
            <Box
            w="100%"
            h="0"
            bg="gray.200"
            position="relative"
            >
                <IconButton
                icon={isCheckingPermission ? <Spinner size="sm"/> : <AddIcon/>}
                aria-label="Add adventure"
                onClick={handleButtonClick}
                position="absolute"
                top="-20px"
                left="50px"
                transform="translateX(100%)"
                borderRadius="full"
                size="lg"
                isDisabled={isCheckingPermission} // Disable button while checking permissions
                />
            </Box>
        </Flex>


        </>
    )
}

export default AddAdventure;