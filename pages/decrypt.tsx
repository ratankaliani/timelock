import Head from "next/head";
import Image from "next/image";
import type { NextPage } from "next";
import { Inter } from "@next/font/google";
import { useState } from "react";
import { useRouter } from "next/router";
import {defaultClientInfo, roundForTime, timelockDecrypt} from "tlock-js";
require('isomorphic-fetch');



import {
  Flex,
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
  Textarea,
  Select,
  VStack,
} from "@chakra-ui/react";
import timelock from "./components/timelock";

const inter = Inter({ subsets: ["latin"] });
// async function getInfo(e: { preventDefault: () => void }, hashedURL: string) {
//   // UNIX start of testnet
//   console.log("query", hashedURL)
//   // var startTime = 1651677096;
//   // const encoder = new TextEncoder();
//   const decoder = new TextDecoder();
//   // var bytes = encoder.encode(message);
//   // var messageString = decoder.decode(hashedURL);

//   console.log("Message: " + messageString);
// }

const Home: NextPage = () => {
  const router = useRouter();
  const [duration, setDuration] = useState<number>(1);
  const [message, setMessage] = useState<string>("");
  const [encryptedMessage, setEncryptedMessage] = useState<string>("");
  const [isDecrypted, setIsDecrypted] = useState<boolean>(false);

  async function decrypt(encMessage: string) {
    console.log(encMessage)
    const ongoingDecryption = setTimeout(() => timelockDecrypt(encMessage)
            .then(c => setMessage(c))
            .catch(err => {
                console.error(err)
            })
            .finally(() => {
                setIsDecrypted(true);
            })
    )
    // const decryptedMessage = await timelockDecrypt(encMessage);
    // setMessage(decryptedMessage as string);
    // setIsDecrypted(true);
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
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack
          spacing={4}
          w={"full"}
          maxW={"md"}
          bg={useColorModeValue("white", "gray.700")}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
          my={12}
        >
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
            Decrypt a Message
          </Heading>
          <Text
            fontSize={{ base: "sm", sm: "md" }}
            color={useColorModeValue("gray.800", "gray.400")}
          >
            Paste in the encrypted message below!
          </Text>
          <Input
            placeholder=""
            _placeholder={{ color: "gray.500" }}
            type="text"
            defaultValue={router.query.message as string}
            onChange={(e) => setEncryptedMessage(e.target.value)}
          />
          <Stack spacing={6}>
            <Button
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
              onClick = {(e) => {
                decrypt(encryptedMessage);
              }}
              // onClick = {(e) => parseTime(e, message as string)
              // }
            >
              Decrypt
            </Button>
          </Stack>
          <Stack spacing={6}>
            <Textarea
              color={"white"}
              value={message}
              // onClick = {(e) => parseTime(e, message as string)
              // }
            >
              
            </Textarea>
        </Stack>
        </Stack> 
      </Flex>
    </>
  );
};

export default Home;
