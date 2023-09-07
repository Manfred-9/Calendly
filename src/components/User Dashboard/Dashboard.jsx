import { ReactNode } from "react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  VStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Heading,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { HamburgerIcon, CloseIcon, AddIcon } from "@chakra-ui/icons";

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
              <Link to={"/userevent/userhome/yourevent"}>
                <Button
                  variant={"solid"}
                  bg={"#3372cc"}
                  color={"white"}
                  size={"lg"}
                  mr={4}
                  borderRadius={8}
                >
                  Your event
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
