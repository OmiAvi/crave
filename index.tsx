import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Bell, ChevronRight, Search, Sparkles } from "lucide-react-native";
import React, { useMemo, useState } from "react";
import {
  FlatList,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Colors from "@/constants/colors";
import RestaurantCard from "@/components/RestaurantCard";
import { CATEGORIES, RESTAURANTS } from "@/mocks/data";
import { useCrave } from "@/providers/CraveProvider";

export default function HomeScreen() {
  const { credits } = useCrave();
  const [category, setCategory] = useState<string>("all");
  const [query, setQuery] = useState<string>("");

  const featured = useMemo(
    () => RESTAURANTS.filter((r) => r.featured),
    []
  );

  const nearby = useMemo(() => {
    const cat = category.toLowerCase();
    return RESTAURANTS.filter((r) => {
      const hitQ =
        query.trim().length === 0 ||
        r.name.toLowerCase().includes(query.toLowerCase()) ||
        r.cuisine.toLowerCase().includes(query.toLowerCase());
      const hitC =
        cat === "all" ||
        r.cuisine.toLowerCase().includes(cat) ||
        r.tags.some((t) => t.toLowerCase().includes(cat));
      return hitQ && hitC;
    });
  }, [category, query]);

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.hello}>Hey, Gator 👋</Text>
            <Text style={styles.title}>What are you craving?</Text>
          </View>
          <Pressable style={styles.bellBtn} testID="bell">
            <Bell size={20} color={Colors.ink} />
            <View style={styles.bellDot} />
          </Pressable>
        </View>

        <CreditsCard credits={credits} />

        <View style={styles.searchWrap}>
          <Search size={18} color={Colors.slate} />
          <TextInput
            testID="home-search"
            placeholder="Search restaurants or cuisines"
            placeholderTextColor="#9E988F"
            value={query}
            onChangeText={setQuery}
            style={styles.searchInput}
          />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.catRow}
        >
          {CATEGORIES.map((c) => {
            const active = category === c.id;
            return (
              <Pressable
                key={c.id}
                onPress={() => setCategory(c.id)}
                style={[styles.catChip, active && styles.catChipActive]}
              >
                <Text style={styles.catEmoji}>{c.emoji}</Text>
                <Text
                  style={[styles.catLabel, active && styles.catLabelActive]}
                >
                  {c.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <SectionHeader
          title="Featured near campus"
          onPress={() => router.push("/explore")}
        />

        <FlatList
          data={featured}
          keyExtractor={(i) => i.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.featuredRow}
          ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
          renderItem={({ item }) => <RestaurantCard restaurant={item} />}
        />

        <SectionHeader title="Nearby" onPress={() => router.push("/explore")} />
        <View style={{ gap: 10, paddingHorizontal: 20 }}>
          {nearby.slice(0, 5).map((r) => (
            <RestaurantCard key={r.id} restaurant={r} variant="row" />
          ))}
          {nearby.length === 0 && (
            <Text style={styles.empty}>No spots match your search.</Text>
          )}
        </View>

        <View style={{ height: 28 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function CreditsCard({ credits }: { credits: number }) {
  return (
    <Pressable
      testID="credits-card"
      onPress={() => router.push("/wallet")}
      style={styles.creditsCardWrap}
    >
      <LinearGradient
        colors={[Colors.orange, "#FF5E1A"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.creditsCard}
      >
        <View style={styles.pattern} pointerEvents="none">
          <View style={[styles.patternDot, { top: 18, right: 26 }]} />
          <View style={[styles.patternDot, { top: 48, right: 64 }]} />
          <View style={[styles.patternDot, { bottom: 14, right: 110 }]} />
          <View style={[styles.ring, { top: -40, right: -40 }]} />
          <View style={[styles.ring2, { bottom: -60, left: -30 }]} />
        </View>
        <View style={styles.creditsHeader}>
          <Text style={styles.creditsLabel}>Crave Credits</Text>
          <View style={styles.livePill}>
            <Sparkles size={12} color={Colors.white} />
            <Text style={styles.livePillText}>Active</Text>
          </View>
        </View>
        <View style={styles.creditsAmountRow}>
          <Text style={styles.creditsAmount}>{credits}</Text>
          <Text style={styles.creditsUnit}>credits</Text>
        </View>
        <View style={styles.creditsFooter}>
          <Text style={styles.creditsSub}>Tap to pay at any restaurant</Text>
          <Pressable
            onPress={() => router.push("/plans")}
            style={styles.topupBtn}
          >
            <Text style={styles.topupText}>Top up</Text>
            <ChevronRight size={14} color={Colors.ink} />
          </Pressable>
        </View>
      </LinearGradient>
    </Pressable>
  );
}

function SectionHeader({
  title,
  onPress,
}: {
  title: string;
  onPress?: () => void;
}) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {onPress && (
        <Pressable onPress={onPress} style={styles.seeAll}>
          <Text style={styles.seeAllText}>See all</Text>
          <ChevronRight size={14} color={Colors.orangeDeep} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.cream },
  scrollContent: { paddingBottom: 24 },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  hello: { fontSize: 13, color: Colors.slate, fontWeight: "600" },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: Colors.ink,
    letterSpacing: -0.5,
    marginTop: 2,
  },
  bellBtn: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.line,
  },
  bellDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.orange,
    position: "absolute",
    top: 10,
    right: 10,
  },
  creditsCardWrap: {
    marginTop: 18,
    marginHorizontal: 20,
    borderRadius: 28,
    ...Platform.select({
      ios: {
        shadowColor: "#FF5E1A",
        shadowOpacity: 0.25,
        shadowRadius: 20,
        shadowOffset: { width: 0, height: 14 },
      },
      android: { elevation: 6 },
      default: {},
    }),
  },
  creditsCard: {
    borderRadius: 28,
    padding: 22,
    overflow: "hidden",
  },
  pattern: { ...StyleSheet.absoluteFillObject },
  patternDot: {
    position: "absolute",
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(255,255,255,0.35)",
  },
  ring: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 40,
    borderColor: "rgba(255,255,255,0.08)",
  },
  ring2: {
    position: "absolute",
    width: 220,
    height: 220,
    borderRadius: 110,
    borderWidth: 26,
    borderColor: "rgba(255,255,255,0.07)",
  },
  creditsHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  creditsLabel: {
    color: "rgba(255,255,255,0.9)",
    fontWeight: "700",
    letterSpacing: 0.5,
    fontSize: 12,
    textTransform: "uppercase",
  },
  livePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(255,255,255,0.22)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },
  livePillText: { color: Colors.white, fontWeight: "700", fontSize: 11 },
  creditsAmountRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
    marginTop: 12,
  },
  creditsAmount: {
    color: Colors.white,
    fontSize: 54,
    fontWeight: "900",
    letterSpacing: -1.5,
    lineHeight: 56,
  },
  creditsUnit: {
    color: "rgba(255,255,255,0.85)",
    fontWeight: "700",
    fontSize: 14,
    paddingBottom: 8,
  },
  creditsFooter: {
    marginTop: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  creditsSub: { color: "rgba(255,255,255,0.9)", fontSize: 13 },
  topupBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: Colors.white,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  topupText: { color: Colors.ink, fontWeight: "800", fontSize: 13 },
  searchWrap: {
    marginTop: 18,
    marginHorizontal: 20,
    backgroundColor: Colors.white,
    borderRadius: 16,
    paddingHorizontal: 14,
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: Colors.line,
  },
  searchInput: {
    flex: 1,
    color: Colors.ink,
    fontSize: 15,
    fontWeight: "500",
  },
  catRow: {
    paddingHorizontal: 16,
    gap: 8,
    paddingTop: 18,
    paddingBottom: 6,
  },
  catChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.line,
    marginRight: 8,
  },
  catChipActive: {
    backgroundColor: Colors.ink,
    borderColor: Colors.ink,
  },
  catEmoji: { fontSize: 14 },
  catLabel: { fontSize: 13, fontWeight: "700", color: Colors.ink },
  catLabelActive: { color: Colors.white },
  sectionHeader: {
    marginTop: 22,
    marginBottom: 12,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: { fontSize: 18, fontWeight: "800", color: Colors.ink },
  seeAll: { flexDirection: "row", alignItems: "center", gap: 2 },
  seeAllText: { color: Colors.orangeDeep, fontWeight: "700", fontSize: 13 },
  featuredRow: { paddingHorizontal: 20 },
  empty: {
    color: Colors.slate,
    textAlign: "center",
    paddingVertical: 24,
    fontSize: 14,
  },
});
