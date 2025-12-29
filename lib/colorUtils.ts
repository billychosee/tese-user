import { zimbabweColors } from "./colors";

export const useColors = () => {
  return zimbabweColors;
};

export const useColorClasses = () => {
  const colors = useColors();

  return {
    // Primary colors
    primary: {
      green: "text-zimbabwe-green",
      yellow: "text-zimbabwe-yellow",
      red: "text-zimbabwe-red",
    },

    // Background colors
    bg: {
      green: "bg-zimbabwe-green",
      yellow: "bg-zimbabwe-yellow",
      red: "bg-zimbabwe-red",
    },

    // Border colors
    border: {
      green: "border-zimbabwe-green",
      yellow: "border-zimbabwe-yellow",
      red: "border-zimbabwe-red",
    },

    // Gradient classes
    gradients: {
      primary: `bg-gradient-to-r ${colors.gradients.primary}`,
      secondary: `bg-gradient-to-r ${colors.gradients.secondary}`,
      success: `bg-gradient-to-r ${colors.gradients.success}`,
      warning: `bg-gradient-to-r ${colors.gradients.warning}`,
      hero: `bg-gradient-to-r ${colors.gradients.hero}`,
      card: `bg-gradient-to-r ${colors.gradients.card}`,
    },

    // Button classes
    buttons: {
      primary: colors.buttons.primary,
      secondary: colors.buttons.secondary,
      accent: colors.buttons.accent,
      outline: colors.buttons.outline,
      ghost: colors.buttons.ghost,
      premium: colors.buttons.premium,
    },

    // Semantic colors
    semantic: {
      success: {
        bg: colors.semantic.success.bg,
        text: "text-zimbabwe-green-700",
        border: colors.semantic.success.border,
        light: colors.semantic.success.light,
      },
      warning: {
        bg: colors.semantic.warning.bg,
        text: "text-zimbabwe-yellow-700",
        border: colors.semantic.warning.border,
        light: colors.semantic.warning.light,
      },
      error: {
        bg: colors.semantic.error.bg,
        text: "text-zimbabwe-red-700",
        border: colors.semantic.error.border,
        light: colors.semantic.error.light,
      },
    },
  };
};
