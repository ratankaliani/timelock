import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import {   Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,  } from "@chakra-ui/react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Timelock</title>
        <meta name="description" content="Timelock messages into the future." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Timelock a message!</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
          <Link color={'blue.400'}>to experience time capsules with cryptography </Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Message</FormLabel>
              <Input type="email" />
            </FormControl>
            <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
              <FormControl id="duration">
              <FormLabel>Duration</FormLabel>
              <NumberInput defaultValue={1}>
                <NumberInputField/>
                <NumberInputStepper>
                <NumberIncrementStepper/>
                <NumberDecrementStepper/>
                </NumberInputStepper>
              </NumberInput>
              </FormControl>
              <FormControl id="type">
              <FormLabel>Type</FormLabel>
              <Select defaultValue={"option1"}>
                <option value='option1'>Minute(s)</option>
                <option value='option1'>Hour(s)</option>
                <option value='option2'>Day(s)</option>
                <option value='option3'>Week(s)</option>
                <option value='option3'>Month(s)</option>
              </Select>
              </FormControl>
            </Stack>
            <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Encrypt
              </Button>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Share
              </Button>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Post
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
    </>
  );
}
