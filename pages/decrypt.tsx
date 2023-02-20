import Head from "next/head";
import Image from "next/image";
import type { NextPage } from "next";
import { Inter } from "@next/font/google";
import { useState } from "react";
import { useRouter } from "next/router";

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
  Select,
} from "@chakra-ui/react";

const inter = Inter({ subsets: ["latin"] });

async function parseTime(e: { preventDefault: () => void }, message: Uint8Array) {
  // UNIX start of testnet
  console.log("query", message)
  var startTime = 1651677096;
  // const encoder = new TextEncoder();
  // var bytes = encoder.encode(message);
  var messageString = message.toString();

  console.log("Message: " + messageString);
}

const Home: NextPage = () => {
  const router = useRouter();
  const [duration, setDuration] = useState<number>(1);

  const { message } = router.query;

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
            Forgot your password?
          </Heading>
          <Text
            fontSize={{ base: "sm", sm: "md" }}
            color={useColorModeValue("gray.800", "gray.400")}
          >
            You&apos;ll get an email with a reset link
          </Text>
          <FormControl id="email">
            <Input
              placeholder="your-email@example.com"
              _placeholder={{ color: "gray.500" }}
              type="email"
            />
          </FormControl>
          <Stack spacing={6}>
            <Button
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
              onClick = {(e) => parseTime(e, message as string)}
            >
              Request Reset
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </>
  );
};

export default Home;
