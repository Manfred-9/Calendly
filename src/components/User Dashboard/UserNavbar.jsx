import { React } from "react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
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
  Text,
  Image,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { FaUserAlt } from "react-icons/fa";
import { ImCreditCard } from "react-icons/im";
import { AiTwotoneCalendar, AiOutlineAppstore } from "react-icons/ai";
import { MdPeople } from "react-icons/md";
import { BsFillLockFill, BsLink45Deg, BsBoxArrowUpRight } from "react-icons/bs";
import { IoIosLogOut } from "react-icons/io";
import { MdOutlineKeyboardArrowDown, MdOutlineLiveHelp } from "react-icons/md";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/Firebase";

export function Navbar({ handleLog }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  return (
    <>
      <Box bg={useColorModeValue("white", "gray.900")} px={4} mx={"25rem"}>
        <Flex
          h={16}
          justifyContent="space-between"
          alignItems={"center"}
          w={["90%", "85%", "80%"]}
          py={4}
          maxW="container.lg"
          mx="auto"
        >
          <Flex alignItems={"center"}>
            <HStack as={"nav"} marginLeft={"10rem"} spacing={4}>
              <Link to={"/userevent/userhome"}>
                <Button bg={"none"} fontWeight={"semibold"}>
                  Home
                </Button>
              </Link>
              <Link to={"/userevent/userhome/calendar"}>
                <Button bg={"none"} fontWeight={"semibold"}>
                  Calendar
                </Button>
              </Link>
            </HStack>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Flex marginLeft={500}>
                  <Avatar size={"sm"} src={""} />
                  <Box marginLeft={0}>
                    {" "}
                    <Button
                      bg={"none"}
                      rightIcon={<MdOutlineKeyboardArrowDown />}
                    >
                      Account
                    </Button>{" "}
                  </Box>
                </Flex>
              </MenuButton>
              <MenuList marginLeft={500}>
                <MenuItem>
                  {" "}
                  <Box marginRight={1}>
                    {" "}
                    <FaUserAlt size={14} />{" "}
                  </Box>{" "}
                  Account Settings
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  onClick={async () => {
                    handleLog();
                    await auth.signOut();
                    navigate("/");
                  }}
                >
                  <Box marginRight={1}>
                    <IoIosLogOut size={18} />
                  </Box>
                  LogOut
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Box>
      <hr />
    </>
  );
}
