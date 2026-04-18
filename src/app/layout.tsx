import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import Navbar from "@/components/Navbar";
import { Box } from "@chakra-ui/react";

export const metadata: Metadata = {
  title: "IEEE-ZSB Tickets",
  description:
    "Ticket verification and check-in gate for IEEE Zagazig Student Branch events.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Providers>
          <Box minH="100dvh" bg="bg" color="fg">
            <Navbar />
            <Box as="main" pt={{ base: "96px", md: "110px" }} pb={16}>
              {children}
            </Box>
          </Box>
        </Providers>
      </body>
    </html>
  );
}
