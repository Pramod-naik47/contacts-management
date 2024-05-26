import React, { FC } from "react";
import {
  Stack,
  Button,
  UseDisclosureReturn,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Box,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td
} from "@chakra-ui/react";
import { MdCreate } from "react-icons/md";
import { ContactModel } from "./ContactModel";

export const ContactList: FC = () => {
  const { isOpen, onOpen, onClose }: UseDisclosureReturn = useDisclosure();
  return (
    <>
      <Stack
        direction="row"
        spacing={4}
        display="flex"
        justifyContent="flex-end"
        p={2}
      >
        <Button
          leftIcon={<MdCreate />}
          colorScheme="teal"
          variant="solid"
          onClick={onOpen}
        >
          Create
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create Contacts</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <ContactModel />
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Stack>
      <Box m={{ sm: 4, md: 16, lg: 10 }}>
        <TableContainer>
          <Table variant='striped' colorScheme='teal'>
            <TableCaption>Imperial to metric conversion factors</TableCaption>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Phone</Th>
                <Th>Address</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td></Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};
