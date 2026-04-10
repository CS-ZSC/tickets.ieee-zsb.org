import {
  defineConfig,
  createSystem,
  SystemConfig,
  defaultConfig,
} from "@chakra-ui/react";

const config: SystemConfig = defineConfig({
  theme: {
    semanticTokens: {
      colors: {
        // Background Colors
        bg: { value: { _light: "#EDF8FF", _dark: "#00101a" } },
        fg: { value: { _light: "#00101A", _dark: "#E0F2FA" } },

        // Primary Colors
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
        "primary-10": {
          value: {
            _light: "rgba(0, 34, 53, 0.8)",
            _dark: "rgba(0, 102, 153, 0.8)",
          },
        },
        "primary-11": {
          value: {
            _light: "rgba(0, 34, 53, 0.5)",
            _dark: "rgba(0, 102, 153, 0.5)",
          },
        },
        "primary-12": {
          value: {
            _light: "rgba(172, 225, 255, 0.2)",
            _dark: "rgba(2, 134, 200, 0.2)",
          },
        },

        // Accent Colors
        "accent-1": { value: { _light: "#FFC000", _dark: "#FFC000" } },
        "accent-2": { value: { _light: "#FFE699", _dark: "#997300" } },
        "accent-3": { value: { _light: "#997300", _dark: "#FFE699" } },

        // Neutral Colors
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
        "neutral-5": { value: { _light: "#FFFFFF", _dark: "#000000" } },
        "neutral-6": {
          value: {
            _light: "rgba(255, 255, 255, 0.8)",
            _dark: "rgba(0, 0, 0, 0.8)",
          },
        },
        "neutral-7": {
          value: {
            _light: "rgba(255, 255, 255, 0.5)",
            _dark: "rgba(0, 0, 0, 0.5)",
          },
        },
        "neutral-8": {
          value: {
            _light: "rgba(255, 255, 255, 0.2)",
            _dark: "rgba(0, 0, 0, 0.2)",
          },
        },

        // Constant Colors
        "light-blue": { value: { _light: "#A0D4EB", _dark: "#A0D4EB" } },
        "night-blue": { value: { _light: "#00101A", _dark: "#00101A" } },
        "white-blue": { value: { _light: "#E0F2FA", _dark: "#E0F2FA" } },
        white: { value: { _light: "#FFFFFF", _dark: "#FFFFFF" } },
        "white-80": {
          value: {
            _light: "rgba(255, 255, 255, 0.8)",
            _dark: "rgba(255, 255, 255, 0.8)",
          },
        },
        "white-50": {
          value: {
            _light: "rgba(255, 255, 255, 0.5)",
            _dark: "rgba(255, 255, 255, 0.5)",
          },
        },
        "white-20": {
          value: {
            _light: "rgba(255, 255, 255, 0.2)",
            _dark: "rgba(255, 255, 255, 0.2)",
          },
        },
        black: { value: { _light: "#000000", _dark: "#000000" } },
        "black-80": {
          value: {
            _light: "rgba(0, 0, 0, 0.8)",
            _dark: "rgba(0, 0, 0, 0.8)",
          },
        },
        "black-50": {
          value: {
            _light: "rgba(0, 0, 0, 0.5)",
            _dark: "rgba(0, 0, 0, 0.5)",
          },
        },
        "black-20": {
          value: {
            _light: "rgba(0, 0, 0, 0.2)",
            _dark: "rgba(0, 0, 0, 0.2)",
          },
        },

        // Chapter Colors
        "cs-1": { value: { _light: "#354A5F", _dark: "#354A5F" } },
        "cs-2": { value: { _light: "#E3E2E2", _dark: "#E3E2E2" } },

        "ras-1": { value: { _light: "#F08114", _dark: "#F08114" } },
        "ras-2": { value: { _light: "#007377", _dark: "#007377" } },

        "pes-1": { value: { _light: "#6EB43F", _dark: "#6EB43F" } },
        "pes-2": { value: { _light: "#231F20", _dark: "#231F20" } },

        "wie-1": { value: { _light: "#802C92", _dark: "#802C92" } },
        "wie-2": { value: { _light: "#FFC000", _dark: "#FFC000" } },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
