import React, { useRef, useState } from "react";
import { Flex, Spacer, useDisclosure } from "@chakra-ui/react";
import { Stack, HStack, VStack, Button, Box, Image } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import "./Navbar.css";
import { auth } from "../../firebase/Firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Divider } from "@chakra-ui/react";
import { BiMenu } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  Input,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import SignupBox from "../Auth/SignupBox";
import Resources from "../Resources/Resources";
export const Navbar = ({ handleLog }) => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const [opend, setOpend] = useState(false);
  const [goingUp, setGoingUp] = useState(false);
  const handleScroll = () => {
    if (window.scrollY >= 104) {
      setGoingUp(true);
    } else {
      setGoingUp(false);
    }
  };
  const loginWithGoogle = () => {
    console.log("login");
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((res) => {
        handleLog();
        navigate("/userevent/userhome");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  window.addEventListener("scroll", handleScroll);
  return (
    <>
      <Drawer
        isOpen={opend}
        placement="right"
        onClose={!opend}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton onClick={() => setOpend(false)} />
          <DrawerHeader>Wellcome to Calendly</DrawerHeader>

          <DrawerBody>
            {/* <Input placeholder='Type here...' /> */}
            {/* <VStack fontWeight={"bold"} align={"left"}>
              <Link to="/individuals">
                {" "}
                <Text cursor={"pointer"} pl={"18px"}>
                  Individuals
                </Text>
              </Link>
              <Divider />
              <Link to="/teams">
                {" "}
                <Text cursor={"pointer"} pl={"18px"}>
                  Teams
                </Text>
              </Link>
              <Divider />
              <Link to="/enterprise">
                {" "}
                <Text cursor={"pointer"} pl={"18px"}>
                  Enterprise
                </Text>
              </Link>
              <Divider />
              <Link to="/pricing">
                {" "}
                <Text cursor={"pointer"} pl={"18px"}>
                  Pricing
                </Text>
              </Link>
              <Accordion
                allowToggle
                width={"100%"}
                bg={"white"}
                outline={"none"}
              >
                <AccordionItem>
                  <AccordionButton>
                    <Box
                      flex="1"
                      textAlign="left"
                      fontWeight={"bold"}
                      pl={"auto"}
                    >
                      <Text>Resources</Text>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4} align={"center"}>
                    <Link to="/about">
                      {" "}
                      <Text cursor={"pointer"} pl={"18px"}>
                        About
                      </Text>
                    </Link>
                    <br />
                    <Link to="/customer">
                      {" "}
                      <Text cursor={"pointer"} pl={"18px"}>
                        Customer
                      </Text>
                    </Link>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </VStack> */}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Modal isOpen={isOpen} border={"1px solid red"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"}>Get started today</ModalHeader>
          <ModalCloseButton onClick={onClose} />
          <ModalBody>
            <SignupBox loginWithGoogle={loginWithGoogle} log={"Sign up"} />
          </ModalBody>
        </ModalContent>
      </Modal>
      <Flex
        className={goingUp ? "shadow_btm" : "no_shadow"}
        pos="fixed"
        top="0"
        left="0"
        zIndex={2}
        w="100%"
        h="104"
        bg="white"
        px={{ base: "6%", md: "5%", lg: "4%" }}
        alignItems="center"
        justifyContent="space-between"
      >
        <Box
          cursor="pointer"
          display={{ base: "none", sm: "block", md: "block" }}
        >
          <Link to="/">
            <Image src="" h="40px" w="auto" alt="" />
          </Link>
        </Box>
        <Box display={{ base: "block", sm: "none" }}>
          <Link to="/">
            <Image src="" h={"40px"} w={"40px"} alt="logo" />
          </Link>
        </Box>
        <Spacer />
        <HStack
          display={{ base: "none", lg: "flex" }}
          justifyContent="center"
          spacing={10}
          w={{ md: "85%", lg: "84%" }}
        >
        </HStack>
        <Spacer />
        <Box>
          <Button
            onClick={onOpen}
            colorScheme={"messenger"}
            variant="solid"
            w="131px"
            height="51px"
            borderRadius="39px"
          >
            Login
          </Button>
        </Box>
        <Box
          fontSize={"2rem"}
          display={{ base: "block", lg: "none" }}
          ml={"10px"}
        >
          <BiMenu ref={btnRef} onClick={() => setOpend(true)} />
        </Box>
      </Flex>
    </>
  );
};
