"use client";

import dynamic from "next/dynamic";
import { Box, Flex, Text } from "@chakra-ui/react";
import { Loader2 } from "lucide-react";

const QrScanner = dynamic(() => import("@/components/QrScanner"), {
  ssr: false,
  loading: () => (
    <Flex
      minH="320px"
      align="center"
      justify="center"
      rounded="2xl"
      bg="black"
      borderWidth="1px"
      borderColor="primary-3"
      color="neutral-3"
      gap={3}
    >
      <Box
        animation="spin 1s linear infinite"
        display="inline-flex"
        css={{ "@keyframes spin": { to: { transform: "rotate(360deg)" } } }}
      >
        <Loader2 size={18} />
      </Box>
      <Text fontSize="sm">Loading scanner…</Text>
    </Flex>
  ),
});

export default function ScannerLoader({
  onDetected,
}: {
  onDetected: (text: string) => void;
}) {
  return <QrScanner onDetected={onDetected} />;
}
