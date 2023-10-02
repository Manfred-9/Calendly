import { Box, Flex, Grid, Text, useToast } from "@chakra-ui/react";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase/Firebase.js";
import CreatedEventCard from "./CreatedEventCard.jsx";

const CreatedEvent = () => {
  const [events, setEvents] = useState([]);

  const handleLoadData = async () => {
    const querySnapshot = await getDocs(collection(db, "events"));
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    setEvents(data.filter((e) => e?.email === auth.currentUser.email));
  };

  useEffect(() => {
    handleLoadData();
  }, []);

  return (
    <Box mx={"25rem"}>
      <Flex my={4} justifyContent={"space-between"} alignItems={"center"}>
        <Flex>
          <Text fontSize={"3xl"} color={"blue.900"} fontWeight={"bold"}>
            Your created events
          </Text>
        </Flex>
      </Flex>
      <hr />
      <Grid
        templateColumns="repeat(2, 1fr)"
        gap={4}
        justifyItems={"flex-start"}
        alignItems={"flex-start"}
      >
        {events.map((e) => (
          <CreatedEventCard key={e.id} e={e} handleLoadData={handleLoadData} />
        ))}
      </Grid>
    </Box>
  );
};

export default CreatedEvent;
