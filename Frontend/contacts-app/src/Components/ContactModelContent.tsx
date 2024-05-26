import React, { FC, useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  useToast,
  Button,
  Stack,
} from "@chakra-ui/react";
import { MdPhone, MdOutlineEmail } from "react-icons/md";
import { BsPerson } from "react-icons/bs";

interface ContactModelContentProps {
  submitHandler: (
    name: string,
    email: string,
    number: string,
    address: string
  ) => void;
  onClose: () => void;
}

export const ContactModelContent: FC<ContactModelContentProps> = ({
  submitHandler,
  onClose,
}) => {
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [number, setNumber] = useState<string>();
  const [address, setAddress] = useState<string>();
  //To display toast message
  const toast = useToast();
  
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
          }
          submitHandler(name, email, number, address);
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
