import React, { FC } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useToast
} from "@chakra-ui/react";
import { ContactModelContent } from "./ContactModelContent";
import axios from "axios";
import { BASE_URL } from "../utilities/Constants";
import { UseContactContext } from "../utilities/ContactContext";
import { ContactModelProps } from "../Instances/ContactModel.Instance";

export const ContactModel: FC<ContactModelProps> = ({isOpen, onOpen, onClose, item, isUpdate }) => {
  const toast = useToast()
  const { setContacts } = UseContactContext();

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
            GetContacts();

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

  const UpdateHandler = async ( name : string, email: string, number: string, address : string, id? : string,) => {
    await axios.put(
        BASE_URL + "Contacts/UpdateContact",
        {
            contactId : id,
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
        GetContacts();

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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Contacts</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <ContactModelContent
              submitHandler={SubmitHandler}
              onClose={onClose}
              item={item}
              isUpdate={isUpdate}
              updateHandler={UpdateHandler}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
