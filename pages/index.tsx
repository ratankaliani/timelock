import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import { useState } from "react";
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


async function handleEncrypt(
  e: { preventDefault: () => void },
  message: string,
  duration: number,
  durationType: string
) {
  var multiplier = 1;
  if (durationType == "min") {
    multiplier = 60;
  } else if (durationType == "h") {
    multiplier = 60*60;
  } else if (durationType == "d") {
    multiplier = 24*60*60;
  } else if (durationType == "w") {
    multiplier = 7*24*60*60;
  } else if (durationType == "mo") {
    multiplier = 30*24*60*60;
  }
  console.log("Encrypting message: " + message + " for " + duration * multiplier + " seconds.")
  e.preventDefault();
  const res = await fetch("/api/encrypt", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: message, duration: duration }),
  });
  const data = await res.json();
  console.log(data);

}




export default function Home() {
  const [message, setMessage] = useState<string>("");
  const [duration, setDuration] = useState<number>(1);
  const [durationType, setDurationType] = useState<string>("min");

  async function handleDurationType(e: any) {
    setDurationType(e.target.value);
  }

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
            <FormControl id="message">
              <FormLabel>Message</FormLabel>
              <Input 
              type="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)} />
            </FormControl>
            <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
              <FormControl id="duration">
              <FormLabel>Duration</FormLabel>
              <NumberInput defaultValue={1}
                onChange={(_, n) => setDuration(n)}>
                <NumberInputField/>
                <NumberInputStepper>
                <NumberIncrementStepper/>
                <NumberDecrementStepper/>
                </NumberInputStepper>
              </NumberInput>
              </FormControl>
              <FormControl id="durationtype">
              <FormLabel>Type</FormLabel>
              <Select defaultValue={"min"}
              onChange={handleDurationType}>
                <option value='min'>Minute(s)</option>
                <option value='h'>Hour(s)</option>
                <option value='d'>Day(s)</option>
                <option value='w'>Week(s)</option>
                <option value='mo'>Month(s)</option>
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
                }}
                onClick={(e) => handleEncrypt(e, message, duration, durationType)}>
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
