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

export default function Home() {
  return (
    <Box minH="100vh" bg="bg" color="fg">
      <Container maxW="lg" py={20}>
        <Flex direction="column" align="center" gap={8} textAlign="center">
          <Heading size="2xl" color="primary-1">
            IEEE Zagazig Student Branch Tickets
          </Heading>
          <Text fontSize="lg" color="neutral-3">
            IEEE Zagazig Student Branch Ticketing System
          </Text>
          <Stack direction={{ base: "column", sm: "row" }} gap={4} mt={4}>
            <Button
              asChild
              bg="primary-1"
              color="white"
              size="lg"
              px={8}
              _hover={{ bg: "primary-2" }}
            >
              <Link href="/login">Login</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              borderColor="primary-1"
              color="primary-1"
              size="lg"
              px={8}
              _hover={{ bg: "primary-7" }}
            >
              <Link href="/scanner">QR Scanner</Link>
            </Button>
          </Stack>
        </Flex>
      </Container>
    </Box>
  );
}
