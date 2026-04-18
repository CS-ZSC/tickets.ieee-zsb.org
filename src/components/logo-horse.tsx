"use client";
import NextImage from "next/image";
import { Box } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import type { SystemStyleObject } from "@chakra-ui/react";

export type LogoType = "black" | "white" | "blue";
export interface LogoOptions {
  type?: LogoType;
  width?: SystemStyleObject["w"];
  height?: SystemStyleObject["h"];
}

export default function LogoHorse({ width = "200px", height = "200px", type }: LogoOptions) {
  const defaultColor = useColorModeValue("black", "white");
  const logoType: LogoType = type ?? defaultColor;

  return (
    <Box
      w={width}
      h={height}
      transition="opacity 0.2s ease-in-out"
      _hover={{ opacity: 0.9 }}
    >
      <NextImage
        src={`/images/ieee/ieee-horse-${logoType}.png`}
        alt="IEEE-ZSB Horse"
        width={500}
        height={500}
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
      />
    </Box>
  );
}

