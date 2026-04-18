import {
  defineConfig,
  createSystem,
  SystemConfig,
  defaultConfig,
} from "@chakra-ui/react";

const config: SystemConfig = defineConfig({
  theme: {
    tokens: {
      fonts: {
        heading: { value: "var(--font-primary)" },
        body: { value: "var(--font-primary)" },
      },
    },
    semanticTokens: {
      colors: {
        bg: { value: { _light: "#EDF8FF", _dark: "#00101a" } },
        fg: { value: { _light: "#00101A", _dark: "#E0F2FA" } },

        "primary-1": { value: { _light: "#006699", _dark: "#006699" } },
        "primary-2": { value: { _light: "#0076B8", _dark: "#0076B8" } },
        "primary-3": { value: { _light: "#C5DDE9", _dark: "#005481" } },
        "primary-4": { value: { _light: "#003A5A", _dark: "#003A5A" } },
        "primary-5": {
          value: {
            _light: "rgba(242, 251, 255, 0.8)",
            _dark: "rgba(0, 34, 53, 0.8)",
          },
        },
        "primary-6": {
          value: {
            _light: "rgba(0, 102, 153, 0.5)",
            _dark: "rgba(0, 34, 53, 0.5)",
          },
        },
        "primary-7": {
          value: {
            _light: "rgba(0, 102, 153, 0.2)",
            _dark: "rgba(0, 34, 53, 0.2)",
          },
        },
        "primary-8": { value: { _light: "#002235", _dark: "#A0D4EB" } },
        "primary-9": { value: { _light: "#A0D4EB", _dark: "#002235" } },
        "primary-12": {
          value: {
            _light: "rgba(172, 225, 255, 0.2)",
            _dark: "rgba(2, 134, 200, 0.2)",
          },
        },

        "accent-1": { value: { _light: "#FFC000", _dark: "#FFC000" } },

        "neutral-1": { value: { _light: "#000000", _dark: "#FFFFFF" } },
        "neutral-2": {
          value: {
            _light: "rgba(0, 0, 0, 0.8)",
            _dark: "rgba(255, 255, 255, 0.8)",
          },
        },
        "neutral-3": {
          value: {
            _light: "rgba(0, 0, 0, 0.5)",
            _dark: "rgba(255, 255, 255, 0.5)",
          },
        },
        "neutral-4": {
          value: {
            _light: "rgba(0, 0, 0, 0.2)",
            _dark: "rgba(255, 255, 255, 0.2)",
          },
        },

        "success-1": { value: { _light: "#1FAD5E", _dark: "#35D47E" } },
        "success-2": {
          value: {
            _light: "rgba(31, 173, 94, 0.15)",
            _dark: "rgba(53, 212, 126, 0.15)",
          },
        },
        "danger-1": { value: { _light: "#D7263D", _dark: "#FF5B6E" } },
        "danger-2": {
          value: {
            _light: "rgba(215, 38, 61, 0.15)",
            _dark: "rgba(255, 91, 110, 0.15)",
          },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
