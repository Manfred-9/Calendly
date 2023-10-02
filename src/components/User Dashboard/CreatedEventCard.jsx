import {
  Box,
  Button,
  Center,
  Flex,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import "react-datepicker/dist/react-datepicker.css";
import toDateTime from "../../utils/date";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/Firebase";
import { useNavigate } from "react-router-dom";

export default function CreatedEventCard({ e, handleLoadData }) {
  const toast = useToast();

  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete ?")) return;
    await deleteDoc(doc(db, "events", e.id));
    toast({
      title: "Delete successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top-center",
    });
    handleLoadData();
  };

  return (
    <Center py={6}>
      <Box
        maxW={"350px"}
        w={"300px"}
        height={"100%"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"xl"}
        rounded={"xl"}
        borderTop={"0.5rem solid #0e18cc"}
        p={4}
        flexDirection={"column"}
        display={"flex"}
        textAlign={"left"}
      >
        <Flex direction={"row"} justifyContent={"space-between"}></Flex>
        <Box mb={5} flex={1}>
          <Text fontWeight={400} color={"gray.500"} mb={4} mt={0}>
            Event name : {e.eventName}
          </Text>
          <Text fontWeight={400} color={"gray.500"} mb={4}>
            Location : {e.location}
          </Text>
          <Text fontWeight={400} color={"gray.500"} mb={4}>
            Description : {e.desc}
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
          <Text fontWeight={400} color={"gray.500"} mb={1}>
            Members :
          </Text>
          {e.users?.map((z) => (
            <Text fontWeight={500} color={"gray.500"} mb={1} pl={4} key={z}>
              {z}
            </Text>
          ))}
        </Box>

        <Stack direction={"row"} spacing={4}>
          <Button
            onClick={() => {
              navigate(`/userevent/userhome/update-event/${e.id}`);
            }}
            flex={1}
            fontSize={"sm"}
            rounded={"xl"}
            colorScheme="blue"
          >
            Edit
          </Button>
          <Button
            onClick={handleDelete}
            flex={1}
            fontSize={"sm"}
            rounded={"xl"}
            colorScheme="red"
          >
            Delete
          </Button>
        </Stack>
      </Box>
    </Center>
  );
}
