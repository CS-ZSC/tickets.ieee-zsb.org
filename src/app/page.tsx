"use client";

import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { ScanLine, QrCode, Ticket } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/atoms/auth";

const MotionBox = motion(Box);

export default function Home() {
  const auth = useAuth();

  return (
    <Container maxW="lg" px={{ base: 4, md: 6 }}>
      <Flex direction="column" align="center" textAlign="center" gap={10}>
        <Stack gap={3} align="center">
          <Heading
            size={{ base: "2xl", md: "3xl" }}
            color="neutral-1"
            fontWeight="bold"
          >
            Tickets Gate
          </Heading>
          <Text color="neutral-3" fontSize={{ base: "md", md: "lg" }} maxW="md">
            Scan attendee QR codes to verify tickets and check people into
            IEEE-ZSB events.
          </Text>
        </Stack>

        <Box position="relative" display="flex" justifyContent="center">
          <Box
            position="absolute"
            inset={0}
            rounded="full"
            bg="primary-1"
            opacity={0.25}
            className="pulse-ring"
          />
          <Box
            position="absolute"
            inset={0}
            rounded="full"
            bg="primary-1"
            opacity={0.2}
            className="pulse-ring"
            style={{ animationDelay: "0.8s" }}
          />
          <MotionBox
            w={{ base: "160px", md: "200px" }}
            h={{ base: "160px", md: "200px" }}
            rounded="full"
            bg="primary-1"
            color="white"
            display="flex"
            alignItems="center"
            justifyContent="center"
            boxShadow="0 20px 60px -20px rgba(0, 102, 153, 0.7)"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <QrCode size={92} strokeWidth={1.4} />
          </MotionBox>
        </Box>

        {auth ? (
          <Button
            asChild
            bg="primary-1"
            color="white"
            size="xl"
            px={10}
            rounded="xl"
            fontSize="lg"
            boxShadow="lg"
            _hover={{ bg: "primary-2", transform: "translateY(-2px)" }}
            transition="all 0.2s ease"
          >
            <Link href="/scanner">
              <ScanLine size={20} />
              <Box as="span" ml={2}>
                Start scanning
              </Box>
            </Link>
          </Button>
        ) : (
          <Stack gap={3} align="center">
            <Button
              asChild
              bg="primary-1"
              color="white"
              size="xl"
              px={10}
              rounded="xl"
              fontSize="lg"
              boxShadow="lg"
              _hover={{ bg: "primary-2", transform: "translateY(-2px)" }}
              transition="all 0.2s ease"
            >
              <Link href="/login">
                <Ticket size={20} />
                <Box as="span" ml={2}>
                  Sign in to start
                </Box>
              </Link>
            </Button>
            <Text color="neutral-3" fontSize="sm">
              You must be signed in as a gate operator to scan tickets.
            </Text>
          </Stack>
        )}
      </Flex>
    </Container>
  );
}
