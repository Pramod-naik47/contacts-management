import React from "react";
import "./App.css";
import { ContactList } from "./Components/ContactsList";
import { Stack, Box, Text } from "@chakra-ui/react";
import { Navbar } from "./Components/Navbar";

function App() {
  return (
    <Box
      width="100%"
      color="white"
      //m={{ sm: 4, md: 16, lg: 10 }}
      //p={{ sm: 5, md: 5, lg: 8 }}
    >
      <Box>
        <Navbar />
      </Box>
      <Stack
        direction="row"
        spacing={4}
        display="flex"
        justifyContent="center"
        p={2}
      >
        <Text fontSize="30px" color="teal.500">
          Contacts Management
        </Text>
      </Stack>
      <ContactList />
    </Box>
  );
}

export default App;
