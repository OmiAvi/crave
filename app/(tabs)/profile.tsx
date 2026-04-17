import { router } from "expo-router";
import {
  Bell,
  ChevronRight,
  CreditCard,
  GraduationCap,
  HelpCircle,
  Heart,
  LogOut,
  Shield,
} from "lucide-react-native";
import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Colors from "@/constants/colors";
import { MEAL_PLANS } from "@/mocks/data";
import { useCrave } from "@/providers/CraveProvider";

export default function ProfileScreen() {
  const { credits, favorites, planId, transactions } = useCrave();
  const plan = MEAL_PLANS.find((p) => p.id === planId) ?? MEAL_PLANS[1];

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Profile</Text>

        <View style={styles.userCard}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&q=80",
            }}
            style={styles.avatar}
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>Alex Rivera</Text>
            <Text style={styles.meta}>UF • Class of 2027</Text>
            <View style={styles.badge}>
              <GraduationCap size={12} color={Colors.orangeDeep} />
              <Text style={styles.badgeText}>Verified student</Text>
            </View>
          </View>
        </View>

        <View style={styles.statsRow}>
          <Stat value={credits} label="Credits" />
          <Stat value={transactions.length} label="Orders" />
          <Stat value={favorites.length} label="Favorites" />
        </View>

        <View style={styles.planCard}>
          <View style={{ flex: 1 }}>
            <Text style={styles.planLabel}>Current plan</Text>
            <Text style={styles.planName}>{plan.name}</Text>
            <Text style={styles.planSub}>
              {plan.credits} credits • ${plan.price}
            </Text>
          </View>
          <Pressable
            style={styles.manageBtn}
            onPress={() => router.push("/plans")}
          >
            <Text style={styles.manageText}>Manage</Text>
          </Pressable>
        </View>

        <Section title="Account">
          <Row
            icon={<CreditCard size={18} color={Colors.ink} />}
            label="Payment methods"
          />
          <Row
            icon={<Bell size={18} color={Colors.ink} />}
            label="Notifications"
          />
          <Row
            icon={<Heart size={18} color={Colors.ink} />}
            label="Favorites"
          />
        </Section>

        <Section title="Support">
          <Row
            icon={<HelpCircle size={18} color={Colors.ink} />}
            label="Help center"
          />
          <Row
            icon={<Shield size={18} color={Colors.ink} />}
            label="Privacy & security"
          />
          <Row
            icon={<LogOut size={18} color="#D64545" />}
            label="Sign out"
            danger
          />
        </Section>

        <Text style={styles.footer}>Crave • Made for Gators</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View style={{ marginTop: 22 }}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionCard}>{children}</View>
    </View>
  );
}

function Row({
  icon,
  label,
  danger,
}: {
  icon: React.ReactNode;
  label: string;
  danger?: boolean;
}) {
  return (
    <Pressable style={styles.row}>
      <View style={styles.rowIcon}>{icon}</View>
      <Text style={[styles.rowLabel, danger && { color: "#D64545" }]}>
        {label}
      </Text>
      <ChevronRight size={18} color={Colors.slate} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.cream },
  content: { padding: 20, paddingBottom: 40 },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: Colors.ink,
    letterSpacing: -0.5,
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    backgroundColor: Colors.white,
    borderRadius: 22,
    padding: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: Colors.line,
  },
  avatar: { width: 64, height: 64, borderRadius: 32 },
  name: { fontSize: 18, fontWeight: "800", color: Colors.ink },
  meta: { color: Colors.slate, marginTop: 2, fontSize: 13 },
  badge: {
    alignSelf: "flex-start",
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#FFF1E6",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  badgeText: { color: Colors.orangeDeep, fontWeight: "800", fontSize: 11 },
  statsRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 12,
  },
  stat: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.line,
  },
  statValue: { fontSize: 22, fontWeight: "900", color: Colors.ink },
  statLabel: { fontSize: 12, color: Colors.slate, marginTop: 2 },
  planCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.ink,
    borderRadius: 22,
    padding: 18,
    marginTop: 14,
  },
  planLabel: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  planName: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: "800",
    marginTop: 4,
  },
  planSub: { color: "rgba(255,255,255,0.75)", marginTop: 2, fontSize: 13 },
  manageBtn: {
    backgroundColor: Colors.orange,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
  },
  manageText: { color: Colors.white, fontWeight: "800" },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: Colors.slate,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 8,
  },
  sectionCard: {
    backgroundColor: Colors.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.line,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.line,
  },
  rowIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: Colors.cream,
    alignItems: "center",
    justifyContent: "center",
  },
  rowLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    color: Colors.ink,
  },
  footer: {
    textAlign: "center",
    color: Colors.slate,
    marginTop: 30,
    fontSize: 12,
  },
});
