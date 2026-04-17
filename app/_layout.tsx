import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";

import { CraveProvider } from "@/providers/CraveProvider";

export default function RootLayout() {
  return (
    <CraveProvider>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="plans"
          options={{
            presentation: "modal",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="restaurant/[id]"
          options={{
            presentation: "card",
            headerShown: false,
          }}
        />
      </Stack>
    </CraveProvider>
  );
}
