import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import { useState } from "react";
// @ts-ignore
import {defaultClientInfo, roundForTime, timelockEncrypt} from "tlock-js";
require('isomorphic-fetch');
import * as dotenv from 'dotenv'
dotenv.config()

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

async function hashStringToUrl(s: string) {
  // Convert string to numerical value
  let num = 1;
  for (let i = 0; i < s.length; i++) {
    num *= s.charCodeAt(i);
  }

  // Take modulo with large prime number
  var  hashValue = num % 2147483647;

  // Convert hash value to base-62 representation
  const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let digits = [];
  let remainder;
  while (hashValue > 0) {
    remainder = hashValue % 62;
    digits.unshift(alphabet[remainder]);
    hashValue = Math.floor(hashValue / 62);
  }

  // Pad with leading zeros to ensure 6 digits
  while (digits.length < 6) {
    digits.unshift("0");
  }

  // Prepend URL prefix and return final URL
  const prefix = process.env.NEXT_PUBLIC_SITE_URL + "/decrypt/" + "?hash=";
  return prefix + digits.join("");
}


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
  const ciphertext = await encrypt(message, duration * multiplier);

  // const res = await fetch("http://localhost:8080/api/encrypt", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     'Access-Control-Allow-Origin': '*',
  //   },
  //   body: JSON.stringify({ message: message, duration: duration }),
  // });
  // const data = await res.json();

  // const ciphertext = data.body;
  // const round = data.round;

  const url = await hashStringToUrl(ciphertext);

  console.log("Encrypted message: " + ciphertext);
  console.log("URL: " + url);

}

async function encrypt(message: string, duration: number) {
  const clientInfo = defaultClientInfo;
  const messageBuffer = Buffer.from(message)
  const expiry = roundForTime(Date.now() + duration * 1000, clientInfo);
  const encrypted = await timelockEncrypt(expiry, messageBuffer);
  return encrypted;
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
            <Button
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}
              onClick={(e) => handleEncrypt(e, message, duration, durationType)}
              >
              Generate URL
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Flex>
    </>
  );
}
