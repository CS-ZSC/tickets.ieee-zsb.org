"use client";

import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { Alert, Box, Button, Flex, Stack, Text } from "@chakra-ui/react";
import { Camera, CameraOff, ScanLine } from "lucide-react";
import { playBeep } from "@/lib/sounds";

const REGION_ID = "qr-scanner-region";

interface Props {
  onDetected: (text: string) => void;
}

export default function QrScanner({ onDetected }: Props) {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const detectedRef = useRef(false);

  useEffect(() => {
    return () => {
      void stopScanner();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function startScanner() {
    setError(null);
    detectedRef.current = false;

    try {
      const scanner = new Html5Qrcode(REGION_ID);
      scannerRef.current = scanner;

      await scanner.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 240, height: 240 } },
        (decoded) => {
          if (detectedRef.current) return;
          detectedRef.current = true;
          playBeep();
          void stopScanner();
          onDetected(decoded);
        },
        undefined,
      );

      setIsScanning(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to access the camera. Check browser permissions.",
      );
      setIsScanning(false);
    }
  }

  async function stopScanner() {
    const scanner = scannerRef.current;
    if (scanner && scanner.isScanning) {
      try {
        await scanner.stop();
        scanner.clear();
      } catch {
        // ignore
      }
    }
    scannerRef.current = null;
    setIsScanning(false);
  }

  return (
    <Stack gap={5} w="full">
      <Box
        position="relative"
        rounded="2xl"
        overflow="hidden"
        bg="black"
        minH="320px"
        borderWidth="1px"
        borderColor={isScanning ? "primary-1" : "primary-3"}
        transition="border-color 0.3s"
      >
        <Box id={REGION_ID} w="full" minH="320px" />

        {isScanning && (
          <>
            {/* corner frame */}
            <Box
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              w="240px"
              h="240px"
              pointerEvents="none"
            >
              {(["tl", "tr", "bl", "br"] as const).map((corner) => (
                <Box
                  key={corner}
                  position="absolute"
                  w="28px"
                  h="28px"
                  borderColor="primary-1"
                  top={corner.startsWith("t") ? 0 : undefined}
                  bottom={corner.startsWith("b") ? 0 : undefined}
                  left={corner.endsWith("l") ? 0 : undefined}
                  right={corner.endsWith("r") ? 0 : undefined}
                  borderTopWidth={corner.startsWith("t") ? "3px" : 0}
                  borderBottomWidth={corner.startsWith("b") ? "3px" : 0}
                  borderLeftWidth={corner.endsWith("l") ? "3px" : 0}
                  borderRightWidth={corner.endsWith("r") ? "3px" : 0}
                  borderRadius="4px"
                />
              ))}
              <Box
                className="scanline"
                position="absolute"
                top={0}
                left={0}
                right={0}
                h="2px"
                bg="primary-1"
                boxShadow="0 0 12px 2px rgba(0, 102, 153, 0.9)"
              />
            </Box>
          </>
        )}

        {!isScanning && !error && (
          <Flex
            position="absolute"
            inset={0}
            align="center"
            justify="center"
            direction="column"
            gap={3}
            color="neutral-3"
          >
            <ScanLine size={48} strokeWidth={1.2} />
            <Text fontSize="sm">Camera preview will appear here</Text>
          </Flex>
        )}
      </Box>

      <Flex gap={3} justify="center" flexWrap="wrap">
        {!isScanning ? (
          <Button
            onClick={startScanner}
            bg="primary-1"
            color="white"
            size="lg"
            px={8}
            rounded="xl"
            _hover={{ bg: "primary-2" }}
          >
            <Camera size={18} />
            <Box as="span" ml={2}>
              Start scanning
            </Box>
          </Button>
        ) : (
          <Button
            onClick={() => void stopScanner()}
            variant="outline"
            borderColor="primary-1"
            color="primary-1"
            size="lg"
            px={8}
            rounded="xl"
            _hover={{ bg: "primary-7" }}
          >
            <CameraOff size={18} />
            <Box as="span" ml={2}>
              Stop
            </Box>
          </Button>
        )}
      </Flex>

      {error && (
        <Alert.Root status="error" rounded="xl">
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>Camera error</Alert.Title>
            <Alert.Description>{error}</Alert.Description>
          </Alert.Content>
        </Alert.Root>
      )}
    </Stack>
  );
}
