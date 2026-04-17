import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  ViewStyle,
  StyleProp,
} from "react-native";

import Colors from "@/constants/colors";

interface CraveButtonProps {
  label: string;
  variant?: "primary" | "dark" | "outline";
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  testId?: string;
  disabled?: boolean;
}

export default function CraveButton({
  label,
  variant = "primary",
  onPress,
  style,
  testId,
  disabled,
}: CraveButtonProps) {
  const bg =
    variant === "primary"
      ? Colors.orange
      : variant === "dark"
        ? Colors.ink
        : "transparent";

  const textColor =
    variant === "outline" ? Colors.ink : Colors.white;

  const borderColor =
    variant === "outline" ? Colors.line : "transparent";

  return (
    <Pressable
      testID={testId}
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.btn,
        {
          backgroundColor: bg,
          borderColor,
          borderWidth: variant === "outline" ? 1.5 : 0,
          opacity: pressed || disabled ? 0.7 : 1,
        },
        style,
      ]}
    >
      <Text style={[styles.label, { color: textColor }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    height: 52,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
});
