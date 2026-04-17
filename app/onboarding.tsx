import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { MapPin, ScanLine, Utensils } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CraveButton from "@/components/CraveButton";
import Colors from "@/constants/colors";

export default function Onboarding() {
  return (
    <LinearGradient
      colors={[Colors.orange, "#FF4F00"]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
        <View style={styles.top}>
          <Text style={styles.brand}>CRAVE</Text>
          <Text style={styles.tagline}>Tap. Eat. Done.</Text>
          <Text style={styles.campus}>Off-campus meals for UF students</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>How it works</Text>
          <Step
            icon={<Utensils size={20} color={Colors.orange} />}
            title="Choose a meal plan"
            desc="Flexible credit packages for your budget."
          />
          <Step
            icon={<MapPin size={20} color={Colors.orange} />}
            title="Browse local restaurants"
            desc="On and around the UF campus."
          />
          <Step
            icon={<ScanLine size={20} color={Colors.orange} />}
            title="Tap to pay with credits"
            desc="Skip lines and enjoy instant savings."
          />

          <CraveButton
            label="Get started"
            variant="dark"
            onPress={() => router.replace("/(tabs)")}
            style={{ marginTop: 22 }}
            testId="get-started"
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

function Step({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <View style={styles.step}>
      <View style={styles.stepIcon}>{icon}</View>
      <View style={{ flex: 1 }}>
        <Text style={styles.stepTitle}>{title}</Text>
        <Text style={styles.stepDesc}>{desc}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safe: { flex: 1, justifyContent: "space-between", padding: 22 },
  top: { marginTop: 30, alignItems: "center" },
  brand: {
    color: Colors.white,
    fontSize: 64,
    fontWeight: "900",
    letterSpacing: -2,
  },
  tagline: {
    color: Colors.white,
    fontSize: 22,
    fontWeight: "800",
    marginTop: 6,
  },
  campus: {
    color: "rgba(255,255,255,0.9)",
    marginTop: 8,
    fontSize: 14,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 28,
    padding: 22,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: Colors.ink,
    marginBottom: 8,
  },
  step: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.line,
  },
  stepIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#FFF1E6",
    alignItems: "center",
    justifyContent: "center",
  },
  stepTitle: { color: Colors.ink, fontWeight: "800", fontSize: 15 },
  stepDesc: { color: Colors.slate, marginTop: 2, fontSize: 13 },
});
