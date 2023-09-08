import React from "react";
import {
  Box,
  Flex,
  Avatar,
  Heading,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Grid,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { AiOutlineSearch } from "react-icons/ai";
import { RiSettings2Fill } from "react-icons/ri";
import { BiLink, BiCodeAlt } from "react-icons/bi";
import EventCard from "./EventCard";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { useToast } from "@chakra-ui/react";
import { auth, db } from "../../firebase/Firebase.js";

const EventTypes = () => {
  const [events, setEvents] = useState([]);
  const toast = useToast();
  console.log(events);

  useEffect(() => {
    (async () => {
      const querySnapshot = await getDocs(collection(db, "events"));
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setEvents(data);
    })();
  }, []);

  return (
    <Box mx={"25rem"}>
      <Flex my={4} justifyContent={"space-between"}>
        <Flex gap={8}>
          <Avatar />
          <Heading as={"h2"} fontWeight={"normal"}>
            Username
          </Heading>
        </Flex>
        <Flex>
          <Link to={"/userevent/userhome/eventforms"}>
            <Button
              color={"blue.500"}
              rounded={"full"}
              borderColor={"blue.500"}
              variant={"outline"}
            >
              + New Event
            </Button>
          </Link>
        </Flex>
      </Flex>
      <hr />
      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
        {events
          .filter((t) => t?.users?.includes(auth?.currentUser.email))
          .map((e) => (
            <EventCard key={e.id} e={e} />
          ))}
      </Grid>
    </Box>
  );
};

export default EventTypes;
