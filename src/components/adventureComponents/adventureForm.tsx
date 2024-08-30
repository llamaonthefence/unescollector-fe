import React from 'react';

import {
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
    Button,
    FormControl, FormLabel, Input, 
    Textarea,
    Box,
    Menu, MenuButton, MenuList, MenuItem 
  } from '@chakra-ui/react'

  interface AdventureFormProps {
    isOpen: boolean; 
    onClose: () => void;  
  }

  const AdventureForm = ({isOpen, onClose}: AdventureFormProps) => {
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        onClose(); //closes modal on form submission
    }

    return (

        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add New Adventure</ModalHeader>
                    <ModalCloseButton />
                        <form>
                        <ModalBody>
                            
                            <FormControl>
                                <FormLabel>Title</FormLabel>
                                <Input placeholder='Give it a name!'/>
                            </FormControl>

                            <FormControl>
                                <FormLabel>Site</FormLabel>
                                <Box>
                                <Input />
                                {isMenuOpen && (
                                    <Menu isOpen={isMenuOpen}>
                                        <MenuButton as={Box} />
                                            <MenuList position="absolute" zIndex={1} w="100%">
                                                {filteredSuggestions.map((suggestion, index) => (
                                                <MenuItem key={index} onClick={() => handleSelect(suggestion)}>
                                                {suggestion}
                                                </MenuItem>
                                                ))}
                                            </MenuList>
                                    </Menu>)}
                                </Box> 
                            </FormControl>
                        
                            <FormControl>
                                <FormLabel>Adventure Description</FormLabel>
                                <Input placeholder='Describe your adventure'/>
                            </FormControl>
                        
                        </ModalBody>

                        <ModalFooter>
                            <Button>Submit</Button>
                            <Button>Cancel</Button>
                        </ModalFooter>

                        </form>
            </ModalContent>
        </Modal>
    )
  }
