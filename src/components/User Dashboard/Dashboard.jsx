import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  HStack,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export function Dashboard() {
  return (
    <>
      <Box
        bg={useColorModeValue("white", "gray.900")}
        px={4}
        my={"5rem"}
        mx={"25rem"}
      >
        <Flex
          h={16}
          justifyContent="space-between"
          alignItems={"center"}
          w={["90%", "85%", "80%"]}
          py={4}
          maxW="container.lg"
          mx="auto"
        >
          <VStack spacing={8}>
            <HStack as={"nav"} spacing={4} justifyContent={"space-between"}>
              <Link to={"/userevent/userhome/created-events"}>
                <Button
                  variant={"solid"}
                  bg={"#3372cc"}
                  color={"white"}
                  size={"lg"}
                  mr={4}
                  borderRadius={8}
                >
                  My created events
                </Button>
              </Link>
            </HStack>
          </VStack>
          <VStack spacing={8}>
            <HStack as={"nav"} spacing={4} justifyContent={"space-between"}>
              <Link to={"/userevent/userhome/yourevent"}>
                <Button
                  variant={"solid"}
                  bg={"#3372cc"}
                  color={"white"}
                  size={"lg"}
                  mr={4}
                  borderRadius={8}
                >
                  My events
                </Button>
              </Link>
            </HStack>
          </VStack>
          <Flex alignItems={"center"}>
            <Link to={"/userevent/userhome/eventforms"}>
              <Button
                variant={"solid"}
                bg={"#3372cc"}
                color={"white"}
                size={"lg"}
                mr={4}
                leftIcon={<AddIcon />}
                borderRadius={8}
              >
                Create
              </Button>
            </Link>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
