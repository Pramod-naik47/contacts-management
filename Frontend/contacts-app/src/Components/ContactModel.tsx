import React, { FC, useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea
} from "@chakra-ui/react";
import {
  MdPhone,
  MdOutlineEmail,
} from "react-icons/md";
import { BsPerson } from "react-icons/bs";


export const ContactModel: FC = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [number, setNumber] = useState();
  const [address, setAddress] = useState();

  return (
    <>
      <FormControl id="name">
        <FormLabel>Name</FormLabel>
        <InputGroup borderColor="#E0E1E7">
          <InputLeftElement
            pointerEvents="none"
            children={<BsPerson color="gray.800" />}
          />
          <Input type="text" size="md" />
        </InputGroup>
      </FormControl>

      <FormControl id="email">
        <FormLabel>Mail</FormLabel>
        <InputGroup borderColor="#E0E1E7">
          <InputLeftElement
            pointerEvents="none"
            children={<MdOutlineEmail color="gray.800" />}
          />
          <Input type="text" size="md" />
        </InputGroup>
      </FormControl>
      <FormControl id="number">
        <FormLabel>Phone</FormLabel>
        <InputGroup borderColor="#E0E1E7">
          <InputLeftElement
            pointerEvents="none"
            children={<MdPhone color="gray.800" />}
          />
          <Input type="text" size="md" />
        </InputGroup>
      </FormControl>
      <FormControl id="address">
        <FormLabel>Address</FormLabel>
        <Textarea
          borderColor="gray.300"
          _hover={{
            borderRadius: "gray.300",
          }}
          placeholder="message"
        />
      </FormControl>
    </>
  );
};
