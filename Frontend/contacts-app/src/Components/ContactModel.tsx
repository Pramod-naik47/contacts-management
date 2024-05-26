import React, { FC } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Stack,
  useDisclosure,
  useToast
} from "@chakra-ui/react";
import { ContactModelContent } from "./ContactModelContent";
import { MdCreate } from "react-icons/md";
import axios from "axios";
import { BASE_URL } from "../utilities/Constants";

export const ContactModel: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast()

  const SubmitHandler = async (name : string, email: string, number: string, address : string) => {
        await axios.post(
            BASE_URL + "Contacts/AddContact",
            {
                name : name,
                email: email,
                phoneNumber: number,
                address: address
            }
            
        ).then((res) => {
            toast({
                title: res.data,
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top-right",
              });
            onClose();
        }).catch(e => {
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
      </Stack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Contacts</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <ContactModelContent submitHandler={SubmitHandler} onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
