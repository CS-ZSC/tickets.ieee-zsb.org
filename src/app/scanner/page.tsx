"use client";

import {
  Box,
  Container,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import ScannerLoader from "@/components/ScannerLoader";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useAuth } from "@/atoms/auth";
import { toaster } from "@/components/ui/toaster";

export default function ScannerPage() {
  const router = useRouter();
  const auth = useAuth();
  const redirectStartedRef = useRef(false);

  useEffect(() => {
    if (auth !== null || redirectStartedRef.current) return;

    redirectStartedRef.current = true;
    const timer = window.setTimeout(() => {
      toaster.create({
        type: "warning",
        title: "Sign in required",
        description: "You must be signed in to scan tickets.",
        closable: true,
      });
      router.replace("/login");
    }, 0);

    return () => window.clearTimeout(timer);
  }, [auth, router]);

  function handleDetected(code: string) {
    router.push(`/verify/${encodeURIComponent(code)}`);
  }

  return (
    <Container maxW="lg" px={{ base: 4, md: 6 }}>
      <Stack gap={6}>
        <Stack gap={2} textAlign="center">
          <Heading size="xl" color="neutral-1">
            Scan a ticket
          </Heading>
          <Text color="neutral-3" fontSize="sm">
            Point the camera at the attendee&apos;s QR code.
          </Text>
        </Stack>

        <Box
          bg="primary-5"
          borderWidth="1px"
          borderColor="primary-3"
          backdropFilter="blur(16px)"
          rounded="2xl"
          p={{ base: 4, md: 6 }}
          shadow="lg"
        >
          <ScannerLoader onDetected={handleDetected} />
        </Box>
      </Stack>
    </Container>
  );
}
