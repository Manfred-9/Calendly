import React from "react";
import {
  Box,
  Flex,
  Avatar,
  Heading,
  Grid,
} from "@chakra-ui/react";
import EventCard from "./EventCard";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { useToast } from "@chakra-ui/react";
import { auth, db } from "../../firebase/Firebase.js";

const EventTypes = () => {
  const [events, setEvents] = useState([]);
  const toast = useToast();
  // console.log(events);

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
      setEvents(data.filter((e) => e?.users?.includes(auth.currentUser.email)));
    })();
  }, []);

  return (
    <Box mx={"25rem"}>
      <Flex my={4} justifyContent={"space-between"}>
        <Flex gap={8}>
          <Avatar />
          <Heading as={"h2"} fontWeight={"normal"}>
            {auth.currentUser?.displayName}
          </Heading>
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
