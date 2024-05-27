import React from "react";
import { ReactNode } from "react";

export interface Item {
    contactId: string;
    name: string;
    email: string;
    phoneNumber: string;
    address: string;
  }

export interface ContactContextProps {
    children: ReactNode;
}

export interface ContactContextType {
    contacts: Item[];
    setContacts: React.Dispatch<React.SetStateAction<Item[]>>;
  }