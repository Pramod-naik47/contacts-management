import React, { FC, useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  useToast,
  Button,
  Stack
} from "@chakra-ui/react";
import { MdPhone, MdOutlineEmail } from "react-icons/md";
import { BsPerson } from "react-icons/bs";
import { ContactModelContentProps } from "../Instances/ContactModelContent.Instance";

export const ContactModelContent: FC<ContactModelContentProps> = ({
  submitHandler,
  onClose,
  item,
  isUpdate,
  updateHandler,
}) => {
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [number, setNumber] = useState<string>();
  const [address, setAddress] = useState<string>();
  const [id, setId] = useState<string>();
  //To display toast message
  const toast = useToast();

  useEffect(() => {
    if(item && isUpdate) {
      setName(item?.name);
      setEmail(item?.email);
      setNumber(item?.phoneNumber);
      setAddress(item?.address);
      setId(item.contactId);
    } else {
      setName(undefined);
      setEmail(undefined);
      setNumber(undefined);
      setAddress(undefined);
      setId(undefined);
    }
  },[item])

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!name || !email || !number || !address) {
            toast({
              title: "Please fill all the feilds",
              status: "warning",
              duration: 5000,
              isClosable: true,
              position: "top-right",
            });
            return;
          } else if (number.length !== 10) {
            toast({
              title: "Please enter valid phone number",
              status: "warning",
              duration: 5000,
              isClosable: true,
              position: "top-right",
            });
            return;
          } else if (number.length !== 10) {
            toast({
              title: "Please enter valid phone number",
              status: "warning",
              duration: 5000,
              isClosable: true,
              position: "top-right",
            });
            return;
          }
          if (!isUpdate) {
            submitHandler(name, email, number, address);
          } else {
            updateHandler(name, email, number, address, id);
          }
         
        }}
      >
        <FormControl id="name">
          <FormLabel>Name</FormLabel>
          <InputGroup borderColor="#E0E1E7">
            <InputLeftElement
              pointerEvents="none"
              children={<BsPerson color="gray.800" />}
            />
            <Input
              type="text"
              size="md"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </InputGroup>
        </FormControl>

        <FormControl id="email">
          <FormLabel>Mail</FormLabel>
          <InputGroup borderColor="#E0E1E7">
            <InputLeftElement
              pointerEvents="none"
              children={<MdOutlineEmail color="gray.800" />}
            />
            <Input
              type="email"
              size="md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputGroup>
        </FormControl>
        <FormControl id="number">
          <FormLabel>Phone</FormLabel>
          <InputGroup borderColor="#E0E1E7">
            <InputLeftElement
              pointerEvents="none"
              children={<MdPhone color="gray.800" />}
            />
            <Input
              type="number"
              size="md"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
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
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </FormControl>
        <Stack
          direction="row"
          spacing={4}
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          <Button colorScheme="blue" mr={3} type="submit">
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </Stack>
      </form>
    </>
  );
};
