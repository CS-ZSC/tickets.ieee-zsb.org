"use client";

import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";

type Status = "loading" | "success" | "error";

const size = 96;

export default function VerifyStatusIcon({ status }: { status: Status }) {
  if (status === "loading") {
    return (
      <Box
        as={motion.div}
        // @ts-expect-error framer motion prop
        animate={{ rotate: 360 }}
        // @ts-expect-error framer motion prop
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
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
        // @ts-expect-error framer motion prop
        initial={{ scale: 0 }}
        // @ts-expect-error framer motion prop
        animate={{ scale: 1 }}
        // @ts-expect-error framer motion prop
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
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
