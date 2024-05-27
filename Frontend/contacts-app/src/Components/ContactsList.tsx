import React, { FC, useState } from "react";
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
  Stack,
  Button,
  useDisclosure
} from "@chakra-ui/react";
import { ContactModel } from "./ContactModel";
import { UseContactContext } from "../utilities/ContactContext";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import axios from "axios";
import { BASE_URL } from "../utilities/Constants";
import { MdCreate } from "react-icons/md";
import { Item } from "../Instances/ContactContext.Instance";

export const ContactList: FC = () => {
  const { contacts, setContacts } = UseContactContext();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [item, setItem] = useState<any>();

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

const UpdateHandler = (item : Item) =>{
    onOpen();
    setIsUpdate(true);
    setItem(item);
}

const SubmitHandler = () => {
    setIsUpdate(false);
    onOpen();
}

  return (
    <>
      <ContactModel isOpen={isOpen} onOpen={onOpen} onClose={onClose} item={item} isUpdate={isUpdate} />
      <Box m={{ sm: 4, md: 16, lg: 10 }}>
      <Stack
        direction="row"
        //spacing={4}
        display="flex"
        justifyContent="flex-end"
        p={2}
      >
        <Button
          leftIcon={<MdCreate />}
          colorScheme="teal"
          variant="solid"
          onClick={() => SubmitHandler()}
        >
          Create
        </Button>
      </Stack>
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
                        onClick={() => UpdateHandler(item)}
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
