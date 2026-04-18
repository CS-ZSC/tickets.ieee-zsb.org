"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { system } from "@/lib/theme";
import { ColorModeProvider } from "@/components/ui/color-mode";
import { Toaster } from "@/components/ui/toaster";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider defaultTheme="dark">
        {children}
        <Toaster />
      </ColorModeProvider>
    </ChakraProvider>
  );
}
