"use client";

import { Box, Flex, HStack, Link, Text } from "@chakra-ui/react";
import Logo from "@/components/Logo";

export default function Footer() {
  return (
    <Flex justify="center" align="center" py={4} px={{ base: 3, md: 4 }}>
      <Box
        as="footer"
        width={{
          base: "calc(100% - 2 * var(--global-spacing))",
          md: "min(1100px, calc(100% - 2 * var(--global-spacing)))",
        }}
        px={{ base: 4, md: 5 }}
        py={4}
        bg="primary-5"
        borderWidth="1px"
        borderColor="primary-3"
        borderRadius="2xl"
        backdropFilter="blur(16px)"
      >
        <Flex
          direction={{ base: "column", md: "row" }}
          align="center"
          justify="space-between"
          gap={3}
        >
          <HStack gap={3}>
            <Logo width={50} height={28} />
            <Text fontSize="sm" color="neutral-3">
              IEEE Zagazig Student Branch
            </Text>
          </HStack>
          <Text fontSize="xs" color="neutral-3">
            &copy; {new Date().getFullYear()} IEEE-ZSB. All rights reserved.
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
}
