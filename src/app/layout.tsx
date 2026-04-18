import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Box, Stack } from "@chakra-ui/react";
import { Toaster } from "@/components/ui/toaster";
import { Provider } from "@/components/ui/provider";

export const metadata: Metadata = {
  title: "IEEE-ZSB Tickets",
  description:
    "Ticket verification and check-in gate for IEEE Zagazig Student Branch events.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      {/* Added suppressHydrationWarning here to protect against browser extensions */}
      <body suppressHydrationWarning>
        <Provider>
          <Stack
            gap={0}
            margin={"auto"}
            maxWidth={"3040px"}
            minHeight={"100dvh"}
            padding={"var(--global-spacing)"}
            color={"natural-2"}
          >
            <Navbar />
            <Box flex={1} display="flex" flexDirection="column">
              {children}
            </Box>
            <Footer />
          </Stack>
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
