"use client";

import {
  Box,
  Button,
  ClientOnly,
  Container,
  Flex,
  Heading,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { ScanLine, Ticket } from "lucide-react";
import { useAuth } from "@/atoms/auth";
import LogoHorse from "@/components/logo-horse";

export default function Home() {
  const auth = useAuth();

  return (
    <Container maxW="lg" px={{ base: 4, md: 6 }} flex={1} display="flex" alignItems="center" justifyContent="center">
      <Flex direction="column" align="center" textAlign="center" gap={{ base: 6, md: 10 }} w="full" py={{ base: 6, md: 10 }}>
        <LogoHorse type="blue" width={{ base: "300px", md: "450px" }} height={{ base: "300px", md: "450px" }} />
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


        <ClientOnly fallback={<Skeleton w="160px" h="48px" rounded="xl" />}>
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
        </ClientOnly>
      </Flex>
    </Container>
  );
}
