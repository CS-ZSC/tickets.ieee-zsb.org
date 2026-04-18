"use client";

import {
  Avatar,
  Box,
  Button,
  ClientOnly,
  Flex,
  HStack,
  Heading,
  Menu,
  Portal,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import Logo from "@/components/Logo";
import { ColorModeButton } from "@/components/ui/color-mode";
import { useAuth, useSetAuth } from "@/atoms/auth";
import { useRouter } from "next/navigation";
import { LogIn, LogOut, UserRound } from "lucide-react";
import { toaster } from "@/components/ui/toaster";

export default function Navbar() {
  const auth = useAuth();
  const setAuth = useSetAuth();
  const router = useRouter();

  function handleLogout() {
    setAuth(null);
    toaster.create({
      type: "info",
      title: "Signed out",
      closable: true,
    });
    router.push("/");
  }

  return (
    <Flex justify="center" align="center" py={4} px={{ base: 3, md: 4 }}>
      <Box
        as="nav"
        position="fixed"
        top="var(--global-spacing)"
        left="50%"
        transform="translateX(-50%)"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        height="64px"
        width={{ base: "calc(100% - 2 * var(--global-spacing))", md: "min(1100px, calc(100% - 2 * var(--global-spacing)))" }}
        px={{ base: 4, md: 5 }}
        bg="primary-5"
        borderWidth="1px"
        borderColor="primary-3"
        borderRadius="2xl"
        backdropFilter="blur(16px)"
        boxShadow="lg"
        zIndex={50}
      >
        <HStack gap={3}>
          <Logo width={70} height={40} />
          <Box
            h="28px"
            w="1px"
            bg="neutral-4"
            display={{ base: "none", md: "block" }}
          />
          <Heading
            size="md"
            color="neutral-1"
            display={{ base: "none", md: "block" }}
          >
            Tickets
          </Heading>
        </HStack>

        <HStack gap={2}>
          <ColorModeButton />

          <ClientOnly fallback={<Skeleton w="80px" h="36px" rounded="xl" />}>
            {!auth ? (
              <Button
                onClick={() => router.push("/login")}
                bg="primary-1"
                color="white"
                rounded="xl"
                size={{ base: "sm", md: "md" }}
                px={{ base: 3, md: 5 }}
                _hover={{ bg: "primary-2" }}
              >
                <LogIn size={16} />
                <Box as="span" ml={2}>
                  Login
                </Box>
              </Button>
            ) : (
              <Menu.Root>
                <Menu.Trigger asChild>
                  <Button
                    variant="ghost"
                    rounded="xl"
                    px={2}
                  >
                    <Avatar.Root size="xs" bg="primary-1" color="white">
                      <Avatar.Fallback name={auth.user.name} />
                      {auth.user.avatar_src && (
                        <Avatar.Image src={auth.user.avatar_src} />
                      )}
                    </Avatar.Root>
                    <Text
                      ml={2}
                      color="neutral-1"
                      display={{ base: "none", md: "inline" }}
                      fontWeight="medium"
                    >
                      {auth.user.name.split(" ")[0]}
                    </Text>
                  </Button>
                </Menu.Trigger>
                <Portal>
                  <Menu.Positioner>
                    <Menu.Content
                      bg="primary-5"
                      borderWidth="1px"
                      borderColor="primary-3"
                      backdropFilter="blur(16px)"
                      rounded="lg"
                      minW="220px"
                      p={2}
                    >
                      <Box px={3} py={2}>
                        <HStack>
                          <UserRound size={16} />
                          <Text fontSize="sm" fontWeight="semibold">
                            {auth.user.name}
                          </Text>
                        </HStack>
                        <Text fontSize="xs" color="neutral-3" mt={1}>
                          {auth.user.email}
                        </Text>
                      </Box>
                      <Menu.Separator />
                      <Menu.Item
                        value="logout"
                        onClick={handleLogout}
                        color="danger-1"
                        _hover={{ bg: "danger-2" }}
                        cursor={"pointer"}
                        rounded={"sm"}
                      >
                        <LogOut size={16} />
                        <Box as="span" ml={2}>
                          Sign out
                        </Box>
                      </Menu.Item>
                    </Menu.Content>
                  </Menu.Positioner>
                </Portal>
              </Menu.Root>
            )}
          </ClientOnly>
        </HStack>
      </Box>
    </Flex>
  );
}
