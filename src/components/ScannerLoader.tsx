"use client";

import dynamic from "next/dynamic";
import { Box, Text } from "@chakra-ui/react";

const QrScanner = dynamic(() => import("@/components/QrScanner"), {
  ssr: false,
  loading: () => (
    <Box
      minH="280px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="night-blue"
      borderRadius="lg"
      borderWidth="2px"
      borderColor="primary-3"
    >
      <Text color="neutral-3" fontSize="sm">
        Loading scanner…
      </Text>
    </Box>
  ),
});

export default function ScannerLoader() {
  return <QrScanner />;
}
