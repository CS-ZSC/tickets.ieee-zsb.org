"use client";

import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import {
  Alert,
  Box,
  Button,
  Code,
  Flex,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";

const SCANNER_ELEMENT_ID = "qr-scanner-region";

export default function QrScanner() {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);

  useEffect(() => {
    return () => {
      stopScanner();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function startScanner() {
    setError(null);
    setScanResult(null);

    try {
      const scanner = new Html5Qrcode(SCANNER_ELEMENT_ID);
      scannerRef.current = scanner;

      await scanner.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText) => {
          setScanResult(decodedText);
          stopScanner();
        },
        undefined
      );

      setIsScanning(true);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to start camera.";
      setError(message);
      setIsScanning(false);
    }
  }

  async function stopScanner() {
    if (
      scannerRef.current &&
      scannerRef.current.isScanning
    ) {
      try {
        await scannerRef.current.stop();
        scannerRef.current.clear();
      } catch {
        // ignore stop errors
      }
    }
    scannerRef.current = null;
    setIsScanning(false);
  }

  function handleReset() {
    setScanResult(null);
    setError(null);
  }

  return (
    <Stack gap={6} width="full">
      {/* Camera viewfinder */}
      <Box
        id={SCANNER_ELEMENT_ID}
        borderRadius="lg"
        overflow="hidden"
        bg="night-blue"
        minH="280px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderWidth="2px"
        borderColor={isScanning ? "primary-1" : "primary-3"}
      >
        {!isScanning && (
          <Text color="neutral-3" fontSize="sm">
            Camera preview will appear here
          </Text>
        )}
      </Box>

      {/* Controls */}
      <Flex gap={3} justify="center">
        {!isScanning ? (
          <Button
            onClick={startScanner}
            bg="primary-1"
            color="white"
            size="lg"
            px={8}
            _hover={{ bg: "primary-2" }}
          >
            Start Scanning
          </Button>
        ) : (
          <Button
            onClick={stopScanner}
            variant="outline"
            borderColor="primary-1"
            color="primary-1"
            size="lg"
            px={8}
            _hover={{ bg: "primary-7" }}
          >
            Stop
          </Button>
        )}
        {(scanResult || error) && (
          <Button
            onClick={handleReset}
            variant="ghost"
            color="neutral-3"
            size="lg"
            _hover={{ bg: "primary-7" }}
          >
            Reset
          </Button>
        )}
      </Flex>

      {/* Result */}
      {scanResult && (
        <Alert.Root status="success" borderRadius="lg" bg="primary-7" borderWidth="1px" borderColor="primary-3">
          <Alert.Indicator color="primary-1" />
          <Alert.Content>
            <Alert.Title color="primary-1">QR Code Detected</Alert.Title>
            <Alert.Description color="fg">
              <Code
                mt={1}
                display="block"
                whiteSpace="pre-wrap"
                wordBreak="break-all"
                bg="primary-12"
                color="fg"
                p={2}
                borderRadius="md"
              >
                {scanResult}
              </Code>
            </Alert.Description>
          </Alert.Content>
        </Alert.Root>
      )}

      {/* Error */}
      {error && (
        <Alert.Root status="error" borderRadius="lg">
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>Camera Error</Alert.Title>
            <Alert.Description>{error}</Alert.Description>
          </Alert.Content>
        </Alert.Root>
      )}
    </Stack>
  );
}
