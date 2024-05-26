import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import React, { FC, ReactNode, createContext, useContext, useState } from "react";
import axios from 'axios';
import { BASE_URL } from "./Constants";

interface Item {
  contactId: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
}

interface ContactContextProps {
    children: ReactNode;
}

interface ContactContextType {
  contacts: Item[];
  setContacts: React.Dispatch<React.SetStateAction<Item[]>>;
}

const ContactContext = createContext<ContactContextType>({} as ContactContextType);

export const ContactContextProvider: FC<ContactContextProps> = ({
  children
}) => {
  const [contacts, setContacts] = useState<Item[]>([]);
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
    <ContactContext.Provider value={{ contacts, setContacts }}>
      {children}
    </ContactContext.Provider>
  );
};

export const UseContactContext = () => {
    return useContext<ContactContextType>(ContactContext)
}
