"use client";

import NextImage from "next/image";
import Link from "next/link";
import { useColorModeValue } from "@/components/ui/color-mode";
import { Box } from "@chakra-ui/react";

export default function Logo({
  width = 80,
  height = 44,
}: {
  width?: number;
  height?: number;
}) {
  const type = useColorModeValue("black", "white");
  return (
    <Link href="/" aria-label="IEEE Zagazig Student Branch home">
      <Box
        transition="opacity 0.2s ease"
        _hover={{ opacity: 0.85 }}
        display="flex"
        alignItems="center"
      >
        <NextImage
          src={`/images/ieee/ieee-logo-${type}.svg`}
          alt="IEEE-ZSB"
          width={width}
          height={height}
          priority
        />
      </Box>
    </Link>
  );
}
