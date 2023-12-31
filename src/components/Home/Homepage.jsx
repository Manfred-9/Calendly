import React from 'react'
import {
    Container,
    Stack,
    Flex,
    Box,
    Input,
    Heading,
    Text,
    Button,
    Image,
    Icon,
    createIcon,
    useColorModeValue,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure
  } from '@chakra-ui/react'
import SignupBox from '../Auth/SignupBox';
import { auth } from "../../firebase/Firebase";
import scheduling1 from "../../images/scheduling1.webp";

  export default function Home() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const finalRef = React.useRef(null);
    const loginWithGoogle = ()=>{
      console.log('login')
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth,provider)
    .then((res)=>{
      console.log(res.user.accessToken);
    })
    .catch((err)=>{
      console.log(err);
    })
  
    }
    return (
      <>
       <Modal isOpen={isOpen} border={"1px solid red"}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton onClick={onClose}/>
          <ModalBody>
           <SignupBox loginWithGoogle={loginWithGoogle} log={"Login"}/>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Container maxW={'7xl'} py={"60px"}>
        <Stack
          align={'center'}
          spacing={{ base: 8, md: 10 }}
          textAlign={{base:"center",md:"left"}}
          py={{ base: 40, md: 28 }}
          direction={{ base: 'column', md: 'row' }}>
          <Stack flex={1} spacing={{ base: 5, md: 10 }}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}>
              <Text
                as={'span'}
                color={'blue.900'}
                fontSize={'1.3em'}
                fontWeight={'bold'}
                position={'relative'}
                _after={{
                  content: "''",
                  width: 'full',
                  height: '30%',
                  position: 'absolute',
                  bottom: 1,
                  left: 0,
                  zIndex: -1,
                }}>
                Easy,
              </Text>
              <br />
              <Text as={'span'}color={'blue.900'} fontSize={'1.3em'} fontWeight={'bold'}>
              scheduling
              </Text>
              <br />
              <Text as={'span'} color={'blue.500'} fontSize={'1.3em'} fontWeight={'bold'}>
                ahead
              </Text>
            </Heading>
            <Text color={'gray.500'}fontSize={"1.7em"}>
            Calendly is your hub for scheduling <br /> meetings professionally 
            and efficiently,<br /> eliminating the hassle of back-and-forth <br />
            emails so you can get back to work.
            </Text>
            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={{ base: 'column', sm: 'row' }}>
             <Box  position={'relative'}  w={'100%'}>
            <Input boxShadow={'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;'} focusBorderColor='gray.400' placeholder='Enter your email' h={"4.5em"} w={'70%'} pl={'2em'} borderRadius={'40px'} outline={'none'} />
            <Button zIndex={3} top={0} right={'22%'} position={'absolute'} colorScheme={'blue'} w={'120px'} h={'100%'} borderRadius={'40px'} onClick={onOpen}>Login</Button>
            </Box>
            
            </Stack>
            <Box color={'#476788'}>
            <Text fontSize={'1.2em'} fontWeight={'bold'}>Don't have an account?<Text as={'span'} color={'blue.400'}> Sign Up</Text></Text>
            </Box>
          </Stack>
          <Flex
            flex={1}
            justify={'center'}
            align={'center'}
            position={'relative'}
            w={'full'}>
            <Blob
              w={'150%'}
              h={'150%'}
              position={'absolute'}
              top={'-20%'}
              left={0}
              zIndex={-1}
              color={useColorModeValue('red.50', 'red.400')}
            />
              <Image
                alt={'Home Image'}
                fit={'cover'}
                align={'center'}
                w={'100%'}
                h={'100%'}
                src={
                  scheduling1
                }
              />
          </Flex>
        </Stack>
      </Container>
      </>
    );
  }

  
  export const Blob = (props) => {
    return (
      <Icon
        width={'100%'}
        viewBox="0 0 578 440"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M239.184 439.443c-55.13-5.419-110.241-21.365-151.074-58.767C42.307 338.722-7.478 282.729.938 221.217c8.433-61.644 78.896-91.048 126.871-130.712 34.337-28.388 70.198-51.348 112.004-66.78C282.34 8.024 325.382-3.369 370.518.904c54.019 5.115 112.774 10.886 150.881 49.482 39.916 40.427 49.421 100.753 53.385 157.402 4.13 59.015 11.255 128.44-30.444 170.44-41.383 41.683-111.6 19.106-169.213 30.663-46.68 9.364-88.56 35.21-135.943 30.551z"
          fill="currentColor"
        />
      </Icon>
    );
  };