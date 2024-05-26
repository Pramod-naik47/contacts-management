import React, { FC, useEffect, useState } from "react";
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
  useToast
} from "@chakra-ui/react";
import { ContactModel } from "./ContactModel";
import axios from 'axios';
import { BASE_URL } from "../utilities/Constants";

interface Item {
    contactId : string
    name: string;
    email: string;
    phoneNumber: string;
    address: string;
  }
  

export const ContactList: FC = () => {
    const [contacts, setContacts] = useState<Item[]>([])
    const toast = useToast();
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
    useEffect(() => {
        GetContacts();
    },[])
    
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
