import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Button,
  Link,
  Badge,
  useColorModeValue,
  Checkbox,
  Flex,

} from "@chakra-ui/react";
import { BiCopy, BiNote } from "react-icons/bi";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { FormControl, FormLabel } from "@chakra-ui/react";

export default function EventCard({e}) {
  const [newEvent, setNewEvent] = useState({
    startDate: "",
    endDate: "",
    longTime: "",
  });

  return (
    <Center py={6}>
      <Box
        maxW={"320px"}
        w={"300px"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"xl"}
        rounded={"xl"}
        borderTop={"0.5rem solid #8046f3"}
        p={4}
        textAlign={"left"}
      >
        <Flex direction={"row"} justifyContent={"space-between"}></Flex>
        <Box mb={5}>
          <Heading fontSize={"xl"} fontWeight={600}>
           {}
          </Heading>
          <Text fontWeight={400} color={"gray.500"} mb={4} mt={4}>
            30 mins, One-on-One
          </Text>
          <Text fontWeight={400} color={"gray.500"} mb={4}>
            30 mins, One-on-One
          </Text>
          <Text fontWeight={400} color={"gray.500"} mb={4}>
            30 mins, One-on-One
          </Text>

          <FormLabel>Choose time</FormLabel>
          <DatePicker
            showTimeSelect
            timeIntervals={30}
            dateFormat="MMMM d, yyyy h:mm aa"
            className="time-input"
            placeholderText="Start Date"
            selected={newEvent.startDate}
            onChange={(startDate) => setNewEvent({ ...newEvent, startDate })}
          />
          <DatePicker
            className="time-input"
            showTimeSelect
            timeIntervals={30}
            dateFormat="MMMM d, yyyy h:mm aa"
            placeholderText="End Date"
            selected={newEvent.endDate}
            onChange={(endDate) => setNewEvent({ ...newEvent, endDate })}
          />
        </Box>

        <Stack direction={"row"} spacing={4}>
          <Button
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
