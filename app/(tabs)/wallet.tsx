import { ArrowDownLeft, ArrowUpRight, CreditCard, Plus } from "lucide-react-native";
import React from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import Colors from "@/constants/colors";
import { MEAL_PLANS } from "@/mocks/data";
import { useCrave } from "@/providers/CraveProvider";

export default function WalletScreen() {
  const { credits, transactions, planId } = useCrave();
  const plan = MEAL_PLANS.find((p) => p.id === planId) ?? MEAL_PLANS[1];

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Wallet</Text>

        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Available balance</Text>
          <View style={styles.balanceRow}>
            <Text style={styles.balanceAmount}>{credits}</Text>
            <Text style={styles.balanceUnit}>credits</Text>
          </View>
          <Text style={styles.balancePlan}>
            {plan.name} Plan • {plan.credits} credits/cycle
          </Text>

          <View style={styles.actionRow}>
            <Pressable
              style={styles.actionBtn}
              onPress={() => router.push("/plans")}
            >
              <Plus size={18} color={Colors.white} />
              <Text style={styles.actionText}>Top up</Text>
            </Pressable>
            <Pressable style={[styles.actionBtn, styles.actionBtnOutline]}>
              <CreditCard size={18} color={Colors.ink} />
              <Text style={[styles.actionText, { color: Colors.ink }]}>
                Manage
              </Text>
            </Pressable>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Recent activity</Text>

        {transactions.length === 0 ? (
          <Text style={styles.emptyText}>No transactions yet.</Text>
        ) : (
          <View style={styles.txList}>
            {transactions.map((tx) => (
              <View key={tx.id} style={styles.txRow}>
                <View
                  style={[
                    styles.txIcon,
                    tx.type === "topup" && styles.txIconTopup,
                  ]}
                >
                  {tx.type === "purchase" ? (
                    <ArrowUpRight size={16} color="#D64545" />
                  ) : (
                    <ArrowDownLeft size={16} color="#2D9B4E" />
                  )}
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.txName}>{tx.restaurantName}</Text>
                  <Text style={styles.txDate}>{tx.date}</Text>
                </View>
                <Text
                  style={[
                    styles.txAmount,
                    tx.type === "topup"
                      ? styles.txAmountPositive
                      : styles.txAmountNegative,
                  ]}
                >
                  {tx.type === "topup" ? "+" : "-"}
                  {tx.credits}
                </Text>
              </View>
            ))}
          </View>
        )}

        <View style={{ height: 28 }} />
      </ScrollView>
    </SafeAreaView>
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
  balanceCard: {
    backgroundColor: Colors.ink,
    borderRadius: 24,
    padding: 22,
    marginTop: 16,
  },
  balanceLabel: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  balanceRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
    marginTop: 8,
  },
  balanceAmount: {
    color: Colors.white,
    fontSize: 48,
    fontWeight: "900",
    letterSpacing: -1.5,
    lineHeight: 50,
  },
  balanceUnit: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 16,
    fontWeight: "700",
    paddingBottom: 6,
  },
  balancePlan: {
    color: "rgba(255,255,255,0.55)",
    fontSize: 13,
    marginTop: 8,
  },
  actionRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
  },
  actionBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: Colors.orange,
    paddingVertical: 12,
    borderRadius: 14,
  },
  actionBtnOutline: {
    backgroundColor: Colors.white,
  },
  actionText: { color: Colors.white, fontWeight: "800", fontSize: 14 },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: Colors.slate,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginTop: 28,
    marginBottom: 12,
  },
  emptyText: {
    color: Colors.slate,
    textAlign: "center",
    paddingVertical: 24,
    fontSize: 14,
  },
  txList: {
    backgroundColor: Colors.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.line,
    overflow: "hidden",
  },
  txRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.line,
  },
  txIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "#FDEAEA",
    alignItems: "center",
    justifyContent: "center",
  },
  txIconTopup: {
    backgroundColor: "#E5F5EB",
  },
  txName: { fontSize: 14, fontWeight: "700", color: Colors.ink },
  txDate: { fontSize: 12, color: Colors.slate, marginTop: 2 },
  txAmount: { fontSize: 16, fontWeight: "900" },
  txAmountPositive: { color: "#2D9B4E" },
  txAmountNegative: { color: "#D64545" },
});
