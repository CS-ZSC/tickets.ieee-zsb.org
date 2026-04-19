"use client";

import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";

type Status = "loading" | "success" | "checked_in" | "error";

const size = 96;

export default function VerifyStatusIcon({ status }: { status: Status }) {
  if (status === "loading") {
    return (
      <Box
        as={motion.div}
        w={`${size}px`}
        h={`${size}px`}
        rounded="full"
        borderWidth="4px"
        borderColor="primary-3"
        borderTopColor="primary-1"
      />
    );
  }

  if (status === "success") {
    return (
      <Box
        as={motion.div}
        w={`${size}px`}
        h={`${size}px`}
        rounded="full"
        bg="success-2"
        display="flex"
        alignItems="center"
        justifyContent="center"
        color="success-1"
      >
        <svg
          className="draw-check"
          width="52"
          height="52"
          viewBox="0 0 52 52"
          fill="none"
        >
          <path
            d="M14 27 L23 36 L39 18"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Box>
    );
  }

  if (status === "checked_in") {
    return (
      <Box
        as={motion.div}
        w={`${size}px`}
        h={`${size}px`}
        rounded="full"
        bg="primary-7"
        display="flex"
        alignItems="center"
        justifyContent="center"
        color="primary-1"
      >
        <svg
          className="draw-check"
          width="52"
          height="52"
          viewBox="0 0 52 52"
          fill="none"
        >
          <path
            d="M8 27 L17 36 L33 18"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20 27 L29 36 L45 18"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Box>
    );
  }

  return (
    <Box
      className="shake"
      w={`${size}px`}
      h={`${size}px`}
      rounded="full"
      bg="danger-2"
      display="flex"
      alignItems="center"
      justifyContent="center"
      color="danger-1"
    >
      <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
        <motion.path
          d="M16 16 L36 36"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.25, delay: 0.05 }}
        />
        <motion.path
          d="M36 16 L16 36"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.25, delay: 0.25 }}
        />
      </svg>
    </Box>
  );
}
