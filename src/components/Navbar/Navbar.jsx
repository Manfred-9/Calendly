import React, { useRef, useState } from "react";
import {
  Flex,
  Spacer,
  useDisclosure,
  HStack,
  VStack,
  Button,
  Box,
  Image,
} from "@chakra-ui/react";
import "./Navbar.css";
import { auth } from "../../firebase/Firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { BiMenu } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
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

      <Modal isOpen={isOpen} border={"1px solid red"}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton onClick={onClose} />
          <ModalBody>
            <SignupBox loginWithGoogle={loginWithGoogle} log={"Login"} />
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
        <Spacer />
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
      </Flex>
    </>
  );
};
