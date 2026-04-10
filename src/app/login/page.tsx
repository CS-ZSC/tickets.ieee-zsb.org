"use client";

import {
  Box,
  Button,
  Container,
  Field,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { FormEvent, useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    // TODO: implement authentication logic
    setTimeout(() => setIsLoading(false), 1000);
  }

  return (
    <Box minH="100vh" bg="bg" color="fg" display="flex" alignItems="center">
      <Container maxW="md" py={12}>
        <Box
          bg="primary-5"
          borderWidth="1px"
          borderColor="primary-3"
          borderRadius="xl"
          p={8}
          shadow="md"
        >
          <Stack gap={6}>
            {/* Header */}
            <Stack gap={1} textAlign="center">
              <Heading size="xl" color="primary-1">
                Welcome Back
              </Heading>
              <Text color="neutral-3" fontSize="sm">
                Sign in to your IEEE Zagazig Student Branch account
              </Text>
            </Stack>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <Stack gap={4}>
                <Field.Root required>
                  <Field.Label color="fg" fontWeight="medium">
                    Email
                  </Field.Label>
                  <Input
                    type="email"
                    placeholder="you@ieee.org"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    borderColor="primary-3"
                    bg="neutral-5"
                    color="fg"
                    _placeholder={{ color: "neutral-3" }}
                    _focus={{ borderColor: "primary-1", boxShadow: "none" }}
                  />
                </Field.Root>

                <Field.Root required>
                  <Field.Label color="fg" fontWeight="medium">
                    Password
                  </Field.Label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    borderColor="primary-3"
                    bg="neutral-5"
                    color="fg"
                    _placeholder={{ color: "neutral-3" }}
                    _focus={{ borderColor: "primary-1", boxShadow: "none" }}
                  />
                </Field.Root>

                <Button
                  type="submit"
                  bg="primary-1"
                  color="white"
                  size="lg"
                  width="full"
                  mt={2}
                  loading={isLoading}
                  loadingText="Signing in…"
                  _hover={{ bg: "primary-2" }}
                >
                  Sign In
                </Button>
              </Stack>
            </form>

            {/* Footer */}
            <Text textAlign="center" fontSize="sm" color="neutral-3">
              Go to{" "}
              <Link
                href="/scanner"
                style={{ color: "var(--chakra-colors-primary-1)" }}
              >
                QR Scanner
              </Link>
            </Text>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
