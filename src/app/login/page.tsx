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
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { LogIn, Mail, Lock } from "lucide-react";
import { loginUser } from "@/api/auth";
import { useSetAuth, useAuth } from "@/atoms/auth";
import { toaster } from "@/components/ui/toaster";
import { useEffect, useState } from "react";

type FormValues = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const setAuth = useSetAuth();
  const auth = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: { email: "", password: "" },
  });

  useEffect(() => {
    if (auth) router.replace("/");
  }, [auth, router]);

  async function onSubmit(values: FormValues) {
    const res = await loginUser(values);
    if (!res.success) {
      toaster.create({
        type: "error",
        title: "Login failed",
        description: res.message,
        closable: true,
      });
      return;
    }
    setAuth({ token: res.token, user: res.user });
    toaster.create({
      type: "success",
      title: "Welcome back",
      description: res.user.name,
      closable: true,
    });
    router.replace("/");
  }

  return (
    <Container maxW="md" px={{ base: 4, md: 6 }} flex={1} display="flex" alignItems="center" justifyContent="center" py={{ base: 6, md: 10 }}>
      <Box
        w="full"
        bg="primary-5"
        borderWidth="1px"
        borderColor="primary-3"
        backdropFilter="blur(16px)"
        rounded="2xl"
        p={{ base: 6, md: 8 }}
        shadow="xl"
      >
        <Stack gap={6}>
          <Stack gap={2} textAlign="center">
            <Heading size="xl" color="neutral-1">
              Sign in
            </Heading>
            <Text color="neutral-3" fontSize="sm">
              Use your IEEE-ZSB dashboard credentials.
            </Text>
          </Stack>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap={4}>
              <Field.Root invalid={!!errors.email}>
                <Field.Label color="neutral-2" fontWeight="medium">
                  Email
                </Field.Label>
                <Box position="relative" w="full">
                  <Box
                    position="absolute"
                    left={3}
                    top="50%"
                    transform="translateY(-50%)"
                    color="neutral-3"
                    pointerEvents="none"
                  >
                    <Mail size={16} />
                  </Box>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    pl={10}
                    borderColor="primary-3"
                    bg="primary-12"
                    color="neutral-1"
                    _placeholder={{ color: "neutral-3" }}
                    _focus={{ borderColor: "primary-1" }}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: "Enter a valid email",
                      },
                    })}
                  />
                </Box>
                <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
              </Field.Root>

              <Field.Root invalid={!!errors.password}>
                <Field.Label color="neutral-2" fontWeight="medium">
                  Password
                </Field.Label>
                <Box position="relative" w="full">
                  <Box
                    position="absolute"
                    left={3}
                    top="50%"
                    transform="translateY(-50%)"
                    color="neutral-3"
                    pointerEvents="none"
                  >
                    <Lock size={16} />
                  </Box>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="strongpassword"
                    pl={10}
                    pr={16}
                    borderColor="primary-3"
                    bg="primary-12"
                    color="neutral-1"
                    _placeholder={{ color: "neutral-3" }}
                    _focus={{ borderColor: "primary-1" }}
                    {...register("password", {
                      required: "Password is required",
                      minLength: { value: 6, message: "Too short" },
                    })}
                  />
                  <Button
                    type="button"
                    size="xs"
                    variant="ghost"
                    position="absolute"
                    right={2}
                    top="50%"
                    transform="translateY(-50%)"
                    color="neutral-3"
                    _hover={{ color: "primary-1", bg: "transparent" }}
                    onClick={() => setShowPassword((v) => !v)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                </Box>
                <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
              </Field.Root>

              <Button
                type="submit"
                bg="primary-1"
                color="white"
                size="lg"
                rounded="xl"
                loading={isSubmitting}
                loadingText="Signing in…"
                _hover={{ bg: "primary-2" }}
              >
                <LogIn size={18} />
                <Box as="span" ml={2}>
                  Sign in
                </Box>
              </Button>
            </Stack>
          </form>
        </Stack>
      </Box>
    </Container>
  );
}
