import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { FormLabel } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toDateTime from "../../utils/date";
import { auth, db } from "../../firebase/Firebase";
import { doc, setDoc } from "firebase/firestore";

export default function EventCard({ e }) {
  const [newEvent, setNewEvent] = useState({
    startDate: "",
    endDate: "",
  });

  const toast = useToast();

  const handleSave = async () => {
    if (!newEvent.startDate || !newEvent.endDate) {
      return;
    }
    const exist = e.schedules.find((s) => s.email === auth?.currentUser?.email);
    const ref = doc(db, "events", e.id);
    // console.log("exist", exist);
    if (!exist) {
      await setDoc(ref, {
        ...e,
        schedules: [
          ...e?.schedules,
          {
            email: auth?.currentUser?.email,
            ...newEvent,
          },
        ],
      });
    } else {
      await setDoc(ref, {
        ...e,
        schedules: e?.schedules?.map((s) => {
          if (s.email === auth?.currentUser?.email) {
            s.startDate = newEvent.startDate;
            s.endDate = newEvent.endDate;
          }
          return s;
        }),
      });
    }

    toast({
      title: "Save time successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top-center",
    });
  };

  useEffect(() => {
    const exist = e.schedules.find((s) => s.email === auth?.currentUser?.email);

    if (exist) {
      setNewEvent({
        startDate: toDateTime(exist.startDate.seconds),
        endDate: toDateTime(exist.endDate.seconds),
      });
    }
  }, []);

  return (
    <Center py={6}>
      <Box
        maxW={"320px"}
        w={"300px"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"xl"}
        rounded={"xl"}
        borderTop={"0.5rem solid #0e18cc"}
        p={4}
        textAlign={"left"}
      >
        <Flex direction={"row"} justifyContent={"space-between"}></Flex>
        <Box mb={5}>
          <Heading fontSize={"xl"} fontWeight={600}>
            {}
          </Heading>
          <Text fontWeight={400} color={"gray.500"} mb={4} mt={4}>
            Event name : {e.eventName}
          </Text>
          <Text fontWeight={400} color={"gray.500"} mb={4}>
            Location : {e.location}
          </Text>
          <Text fontWeight={400} color={"gray.500"} mb={4}>
            Description : {e.location}
          </Text>
          <Text fontWeight={400} color={"gray.500"} mb={4}>
            Start date : {toDateTime(e.startDate.seconds).toLocaleString()}
          </Text>
          <Text fontWeight={400} color={"gray.500"} mb={4}>
            End date : {toDateTime(e.endDate.seconds).toLocaleString()}
          </Text>

          <Text fontWeight={400} color={"gray.500"} mb={4}>
            Meeting length : {e.longTime} minutes
          </Text>

          <FormLabel>Choose time to meeting</FormLabel>
          <DatePicker
            showTimeSelect
            timeIntervals={15}
            dateFormat="MMMM d, yyyy h:mm aa"
            className="time-input"
            placeholderText="Start time"
            selected={newEvent.startDate}
            onChange={(startDate) => setNewEvent({ ...newEvent, startDate })}
          />
          <DatePicker
            className="time-input"
            showTimeSelect
            timeIntervals={15}
            dateFormat="MMMM d, yyyy h:mm aa"
            placeholderText="End time"
            selected={newEvent.endDate}
            onChange={(endDate) => setNewEvent({ ...newEvent, endDate })}
          />
        </Box>

        <Stack direction={"row"} spacing={4}>
          <Button
            onClick={handleSave}
            flex={1}
            fontSize={"sm"}
            rounded={"full"}
            color={"blue.400"}
            variant={"outline"}
            border={"1px solid "}
            borderColor={"blue.500"}
          >
            Save
          </Button>
        </Stack>
      </Box>
    </Center>
  );
}
