import React, { FC } from "react";
import { Box, Flex, HStack, IconButton, useDisclosure, Stack, Link, Button } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

export const Navbar: FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
      <Box bg="gray.800" px={4}>
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <IconButton
            size="md"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label="Open Menu"
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems="center">
            <Box color="white" fontWeight="bold">Logo</Box>
            {/* <HStack
              as="nav"
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
            >
              <Link href="#" color="white">Home</Link>
              <Link href="#" color="white">About</Link>
              <Link href="#" color="white">Contact</Link>
            </HStack> */}
          </HStack>
          {/* <Flex alignItems="center">
            <Button colorScheme="teal" size="sm" mr={4}>
              Sign In
            </Button>
            <Button colorScheme="teal" size="sm">
              Sign Up
            </Button>
          </Flex> */}
        </Flex>
  
        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as="nav" spacing={4}>
              {/* <Link href="#" color="white">Home</Link>
              <Link href="#" color="white">About</Link>
              <Link href="#" color="white">Contact</Link> */}
            </Stack>
          </Box>
        ) : null}
      </Box>
    );
}