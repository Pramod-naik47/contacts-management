import React, { FC } from "react";
import {
  Box,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { ContactModel } from "./ContactModel";
import { UseContactContext } from "../utilities/ContactContext";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import axios from "axios";
import { BASE_URL } from "../utilities/Constants";

export const ContactList: FC = () => {
  const { contacts, setContacts } = UseContactContext();
  const toast = useToast();


  const ContactDeleteHandler = async (contactId: string) => {
    await axios
      .delete(BASE_URL + `Contacts/DeleteContact/${contactId}`)
      .then((res) => {
        toast({
          title: res.data,
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
        GetContacts();
      })
      .catch((e) => {
        console.log(e);
        toast({
          title: "Something went wrong",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      });
  };

  const GetContacts = async () => {
    await axios.get(BASE_URL+"Contacts/GetContactList").
    then(res => {
        if (res.data) {
            setContacts(res.data);
        } else {
            setContacts([]);
        }
    }).catch (() => {
        toast({
            title: "Something went wrong!!!!",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top-right",
          });
    })
}

  return (
    <>
      <ContactModel />
      <Box m={{ sm: 4, md: 16, lg: 10 }}>
        <TableContainer>
          <Table variant="striped" colorScheme="teal" color="black">
            <TableCaption>Contacts List</TableCaption>
            <Thead bg="gray.800" color="white">
              <Tr>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Phone</Th>
                <Th>Address</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {contacts?.map((item) => {
                return (
                  <Tr key={item.contactId}>
                    <Td> {item.name}</Td>
                    <Td>{item.email}</Td>
                    <Td>{item.phoneNumber}</Td>
                    <Td>{item.address}</Td>
                    <Td>
                      <IconButton
                        aria-label="Delete item"
                        icon={<DeleteIcon />}
                        onClick={() => ContactDeleteHandler(item.contactId)}
                        colorScheme="red"
                      />
                      &nbsp;&nbsp;
                      <IconButton
                        aria-label="Edit item"
                        icon={<EditIcon />}
                        colorScheme="teal"
                      />
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};
