import {
  Box,
  Container,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import ScannerLoader from "@/components/ScannerLoader";
import Link from "next/link";

export default function ScannerPage() {
  return (
    <Box minH="100vh" bg="bg" color="fg">
      <Container maxW="lg" py={12}>
        <Stack gap={8}>
          {/* Page header */}
          <Stack gap={1} textAlign="center">
            <Heading size="xl" color="primary-1">
              QR Code Scanner
            </Heading>
            <Text color="neutral-3" fontSize="sm">
              Point your camera at a ticket QR code to validate it
            </Text>
          </Stack>

          {/* Scanner card */}
          <Box
            bg="primary-5"
            borderWidth="1px"
            borderColor="primary-3"
            borderRadius="xl"
            p={6}
            shadow="md"
          >
            <ScannerLoader />
          </Box>

          {/* Back link */}
          <Text textAlign="center" fontSize="sm" color="neutral-3">
            <Link
              href="/login"
              style={{ color: "var(--chakra-colors-primary-1)" }}
            >
              ← Back to Login
            </Link>
          </Text>
        </Stack>
      </Container>
    </Box>
  );
}
