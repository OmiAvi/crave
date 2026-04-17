import { router } from "expo-router";
import { Check, ChevronLeft, Star } from "lucide-react-native";
import React from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CraveButton from "@/components/CraveButton";
import Colors from "@/constants/colors";
import { MEAL_PLANS } from "@/mocks/data";
import { useCrave } from "@/providers/CraveProvider";

export default function PlansScreen() {
  const { planId, setPlan, addCredits } = useCrave();

  const handleSelect = (id: string) => {
    const plan = MEAL_PLANS.find((p) => p.id === id);
    if (plan) {
      setPlan(id);
      addCredits(plan.credits);
      router.back();
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <ChevronLeft size={22} color={Colors.ink} />
        </Pressable>
        <Text style={styles.title}>Meal Plans</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.subtitle}>
          Choose a plan that fits your dining habits. Upgrade or switch anytime.
        </Text>

        {MEAL_PLANS.map((plan) => {
          const isActive = planId === plan.id;
          return (
            <View
              key={plan.id}
              style={[styles.planCard, isActive && styles.planCardActive]}
            >
              {plan.popular && (
                <View style={styles.popularBadge}>
                  <Star size={11} color={Colors.white} fill={Colors.white} />
                  <Text style={styles.popularText}>Most Popular</Text>
                </View>
              )}

              <View style={styles.planHeader}>
                <Text
                  style={[
                    styles.planName,
                    isActive && styles.planNameActive,
                  ]}
                >
                  {plan.name}
                </Text>
                {isActive && (
                  <View style={styles.activePill}>
                    <Check size={12} color={Colors.white} />
                    <Text style={styles.activeText}>Current</Text>
                  </View>
                )}
              </View>

              <Text
                style={[styles.planDesc, isActive && styles.planDescActive]}
              >
                {plan.description}
              </Text>

              <View style={styles.planPriceRow}>
                <Text
                  style={[
                    styles.planPrice,
                    isActive && styles.planPriceActive,
                  ]}
                >
                  ${plan.price}
                </Text>
                <Text
                  style={[
                    styles.planCredits,
                    isActive && styles.planCreditsActive,
                  ]}
                >
                  {plan.credits} credits
                </Text>
              </View>

              <Text
                style={[
                  styles.planPerCredit,
                  isActive && styles.planPerCreditActive,
                ]}
              >
                ${plan.perCredit.toFixed(2)} per credit
              </Text>

              {!isActive && (
                <CraveButton
                  label={`Switch to ${plan.name}`}
                  variant="primary"
                  onPress={() => handleSelect(plan.id)}
                  style={{ marginTop: 14 }}
                />
              )}
            </View>
          );
        })}

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.cream },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.line,
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    color: Colors.ink,
  },
  content: { paddingHorizontal: 20, paddingTop: 8 },
  subtitle: {
    fontSize: 14,
    color: Colors.slate,
    lineHeight: 20,
    marginBottom: 20,
  },
  planCard: {
    backgroundColor: Colors.white,
    borderRadius: 22,
    padding: 20,
    marginBottom: 14,
    borderWidth: 1.5,
    borderColor: Colors.line,
  },
  planCardActive: {
    backgroundColor: Colors.ink,
    borderColor: Colors.ink,
  },
  popularBadge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: Colors.orange,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 10,
  },
  popularText: {
    color: Colors.white,
    fontSize: 11,
    fontWeight: "800",
  },
  planHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  planName: { fontSize: 22, fontWeight: "900", color: Colors.ink },
  planNameActive: { color: Colors.white },
  activePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: Colors.orange,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  activeText: { color: Colors.white, fontWeight: "800", fontSize: 11 },
  planDesc: { color: Colors.slate, fontSize: 13, marginTop: 6 },
  planDescActive: { color: "rgba(255,255,255,0.7)" },
  planPriceRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
    marginTop: 14,
  },
  planPrice: { fontSize: 36, fontWeight: "900", color: Colors.ink },
  planPriceActive: { color: Colors.white },
  planCredits: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.slate,
    paddingBottom: 6,
  },
  planCreditsActive: { color: "rgba(255,255,255,0.7)" },
  planPerCredit: { color: Colors.slate, fontSize: 12, marginTop: 4 },
  planPerCreditActive: { color: "rgba(255,255,255,0.5)" },
});
