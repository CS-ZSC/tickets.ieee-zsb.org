"use client";

import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Calendar,
  CheckCircle2,
  Mail,
  MapPin,
  ScanLine,
  UserRound,
} from "lucide-react";
import {
  checkInTicket,
  verifyTicket,
  VerifiedTicket,
} from "@/api/tickets";
import { useAuth } from "@/atoms/auth";
import { toaster } from "@/components/ui/toaster";
import { playUnverified, playVerified } from "@/lib/sounds";
import VerifyStatusIcon from "@/components/VerifyStatusIcon";
import { motion } from "framer-motion";

type State =
  | { stage: "loading" }
  | { stage: "verified"; data: VerifiedTicket }
  | { stage: "checked_in" }
  | { stage: "invalid"; message: string };

const MotionStack = motion.create(Stack);

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
}

export default function VerifyPage() {
  const params = useParams<{ qrCode: string }>();
  const router = useRouter();
  const auth = useAuth();
  const qrCode = decodeURIComponent(params.qrCode);

  const [state, setState] = useState<State>({ stage: "loading" });
  const [checkingIn, setCheckingIn] = useState(false);
  const [checkedIn, setCheckedIn] = useState(false);
  const ranRef = useRef(false);

  useEffect(() => {
    if (auth === null) {
      router.replace("/login");
    }
  }, [auth, router]);

  const runVerify = useCallback(async () => {
    const res = await verifyTicket(qrCode);
    if (res.success) {
      playVerified();
      setState({ stage: "verified", data: res.data });
    } else if ("stage" in res && res.stage === "checked_in") {
      playVerified();
      setState({ stage: "checked_in" });
    } else {
      playUnverified();
      setState({ stage: "invalid", message: res.message });
    }
  }, [qrCode]);

  useEffect(() => {
    if (!auth) return;
    if (ranRef.current) return;
    ranRef.current = true;
    void runVerify();
  }, [auth, runVerify]);

  async function handleCheckIn() {
    setCheckingIn(true);
    const res = await checkInTicket(qrCode);
    setCheckingIn(false);
    if (res.success) {
      setCheckedIn(true);
      playVerified();
      toaster.create({
        type: "success",
        title: res.message,
        description: "Attendee has been checked in.",
        closable: true,
      });
    } else {
      playUnverified();
      toaster.create({
        type: "error",
        title: "Check-in failed",
        description: res.message,
        closable: true,
      });
    }
  }

  return (
    <Container maxW="lg" px={{ base: 4, md: 6 }} flex={1} display="flex" alignItems="center" justifyContent="center" py={{ base: 6, md: 10 }}>
      <Stack gap={6} w="full">
        <Flex direction="column" align="center" gap={4}>
          <VerifyStatusIcon
            status={
              state.stage === "loading"
                ? "loading"
                : state.stage === "verified"
                  ? "success"
                  : state.stage === "checked_in"
                    ? "checked_in"
                    : "error"
            }
          />

          <Stack gap={1} textAlign="center">
            {state.stage === "loading" && (
              <Heading size="xl" color="neutral-1">
                Verifying…
              </Heading>
            )}
            {state.stage === "verified" && (
              <>
                <Heading size="xl" color="success-1">
                  Ticket verified
                </Heading>
                <Text color="neutral-3" fontSize="sm">
                  {state.data.ticket_status === "verified"
                    ? "Ready to check in."
                    : state.data.ticket_status}
                </Text>
              </>
            )}
            {state.stage === "checked_in" && (
              <>
                <Heading size="xl" color="primary-1">
                  Already checked in
                </Heading>
                <Text color="neutral-3" fontSize="sm">
                  This attendee has already been checked in.
                </Text>
              </>
            )}
            {state.stage === "invalid" && (
              <>
                <Heading size="xl" color="danger-1">
                  Not verified
                </Heading>
                <Text color="neutral-3" fontSize="sm">
                  {state.message}
                </Text>
              </>
            )}
          </Stack>
        </Flex>

        {state.stage === "verified" && (
          <MotionStack
            gap={4}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
          >
            <Box
              bg="primary-5"
              borderWidth="1px"
              borderColor="primary-3"
              backdropFilter="blur(16px)"
              rounded="2xl"
              p={{ base: 5, md: 6 }}
              shadow="lg"
            >
              <Stack gap={5}>
                <Stack gap={1}>
                  <Text
                    fontSize="xs"
                    color="neutral-3"
                    textTransform="uppercase"
                    letterSpacing="wider"
                  >
                    Attendee
                  </Text>
                  <HStack>
                    <UserRound size={18} />
                    <Heading size="lg" color="neutral-1">
                      {state.data.user.name}
                    </Heading>
                  </HStack>
                  <HStack color="neutral-3" fontSize="sm">
                    <Mail size={14} />
                    <Text>{state.data.user.email}</Text>
                  </HStack>
                  <HStack gap={2} pt={1}>
                    <Badge
                      bg="primary-7"
                      color="primary-1"
                      rounded="md"
                      px={2}
                      py={1}
                      textTransform="capitalize"
                    >
                      {state.data.role}
                    </Badge>
                  </HStack>
                </Stack>

                <Box h="1px" bg="neutral-4" />

                <Stack gap={2}>
                  <Text
                    fontSize="xs"
                    color="neutral-3"
                    textTransform="uppercase"
                    letterSpacing="wider"
                  >
                    Event
                  </Text>
                  <Heading size="md" color="neutral-1">
                    {state.data.event.name}
                  </Heading>
                  <HStack color="neutral-3" fontSize="sm">
                    <MapPin size={14} />
                    <Text>{state.data.event.location}</Text>
                  </HStack>
                  <HStack color="neutral-3" fontSize="sm">
                    <Calendar size={14} />
                    <Text>
                      {formatDate(state.data.event.start_date)} —{" "}
                      {formatDate(state.data.event.end_date)}
                    </Text>
                  </HStack>
                </Stack>
              </Stack>
            </Box>

            <Button
              onClick={handleCheckIn}
              disabled={checkedIn}
              loading={checkingIn}
              loadingText="Checking in…"
              bg={checkedIn ? "success-1" : "primary-1"}
              color="white"
              size="xl"
              rounded="xl"
              _hover={{ bg: checkedIn ? "success-1" : "primary-2" }}
            >
              <CheckCircle2 size={20} />
              <Box as="span" ml={2}>
                {checkedIn ? "Checked in" : "Check in"}
              </Box>
            </Button>
          </MotionStack>
        )}

        <Flex gap={3} justify="center" pt={2}>
          <Button
            onClick={() => router.push("/scanner")}
            variant="outline"
            borderColor="primary-1"
            color="primary-1"
            rounded="xl"
            _hover={{ bg: "primary-7" }}
          >
            <ScanLine size={16} />
            <Box as="span" ml={2}>
              Scan another
            </Box>
          </Button>
        </Flex>
      </Stack>
    </Container>
  );
}
