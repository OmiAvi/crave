import { router, useLocalSearchParams } from "expo-router";
import {
  ChevronLeft,
  Clock,
  Heart,
  MapPin,
  Star,
} from "lucide-react-native";
import React from "react";
import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CraveButton from "@/components/CraveButton";
import Colors from "@/constants/colors";
import { RESTAURANTS } from "@/mocks/data";
import { useCrave } from "@/providers/CraveProvider";

export default function RestaurantDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const restaurant = RESTAURANTS.find((r) => r.id === id);
  const { credits, spendCredits, favorites, toggleFavorite } = useCrave();

  if (!restaurant) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={{ textAlign: "center", marginTop: 40, color: Colors.slate }}>
          Restaurant not found.
        </Text>
      </SafeAreaView>
    );
  }

  const isFav = favorites.includes(restaurant.id);
  const canAfford = credits >= restaurant.creditCost;

  return (
    <View style={styles.container}>
      <Image source={{ uri: restaurant.image }} style={styles.heroImage} />

      <SafeAreaView style={styles.headerOverlay} edges={["top"]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <ChevronLeft size={22} color={Colors.ink} />
        </Pressable>
        <Pressable
          onPress={() => toggleFavorite(restaurant.id)}
          style={styles.heartBtn}
        >
          <Heart
            size={20}
            color={isFav ? "#FF4D6A" : Colors.white}
            fill={isFav ? "#FF4D6A" : "transparent"}
          />
        </Pressable>
      </SafeAreaView>

      <ScrollView
        style={styles.sheet}
        contentContainerStyle={styles.sheetContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.handle} />

        <Text style={styles.name}>{restaurant.name}</Text>
        <Text style={styles.cuisine}>{restaurant.cuisine}</Text>

        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Star size={14} color="#F5A623" fill="#F5A623" />
            <Text style={styles.metaText}>{restaurant.rating}</Text>
          </View>
          <View style={styles.metaItem}>
            <MapPin size={14} color={Colors.slate} />
            <Text style={styles.metaText}>{restaurant.distance}</Text>
          </View>
          <View style={styles.metaItem}>
            <Clock size={14} color={Colors.slate} />
            <Text style={styles.metaText}>{restaurant.hours}</Text>
          </View>
        </View>

        <Text style={styles.description}>{restaurant.description}</Text>

        <View style={styles.addressCard}>
          <MapPin size={16} color={Colors.orange} />
          <Text style={styles.addressText}>{restaurant.address}</Text>
        </View>

        <View style={styles.costCard}>
          <View>
            <Text style={styles.costLabel}>Meal cost</Text>
            <View style={styles.costRow}>
              <Text style={styles.costAmount}>{restaurant.creditCost}</Text>
              <Text style={styles.costUnit}>credits</Text>
            </View>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={styles.costLabel}>Your balance</Text>
            <Text style={styles.costBalance}>{credits} credits</Text>
          </View>
        </View>

        <CraveButton
          label={
            canAfford
              ? `Pay ${restaurant.creditCost} credits`
              : "Not enough credits"
          }
          variant="primary"
          disabled={!canAfford}
          onPress={() => {
            spendCredits(restaurant.creditCost, restaurant.name);
            router.back();
          }}
          style={{ marginTop: 20 }}
        />

        {!canAfford && (
          <CraveButton
            label="Top up credits"
            variant="outline"
            onPress={() => router.push("/plans")}
            style={{ marginTop: 10 }}
          />
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.cream },
  safe: { flex: 1, backgroundColor: Colors.cream },
  heroImage: { width: "100%", height: 280 },
  headerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
      },
      android: { elevation: 3 },
      default: {},
    }),
  },
  heartBtn: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: "rgba(0,0,0,0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  sheet: {
    flex: 1,
    marginTop: -28,
    backgroundColor: Colors.cream,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
  },
  sheetContent: { padding: 20, paddingTop: 14 },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.line,
    alignSelf: "center",
    marginBottom: 16,
  },
  name: { fontSize: 26, fontWeight: "900", color: Colors.ink, letterSpacing: -0.5 },
  cuisine: { fontSize: 14, color: Colors.slate, marginTop: 4 },
  metaRow: {
    flexDirection: "row",
    gap: 16,
    marginTop: 14,
  },
  metaItem: { flexDirection: "row", alignItems: "center", gap: 4 },
  metaText: { fontSize: 13, fontWeight: "600", color: Colors.ink },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: Colors.slate,
    marginTop: 18,
  },
  addressCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 14,
    marginTop: 16,
    borderWidth: 1,
    borderColor: Colors.line,
  },
  addressText: { flex: 1, fontSize: 13, color: Colors.ink, fontWeight: "600" },
  costCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.ink,
    borderRadius: 18,
    padding: 18,
    marginTop: 14,
  },
  costLabel: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  costRow: { flexDirection: "row", alignItems: "flex-end", gap: 4, marginTop: 4 },
  costAmount: { color: Colors.white, fontSize: 32, fontWeight: "900", lineHeight: 34 },
  costUnit: { color: "rgba(255,255,255,0.7)", fontSize: 14, fontWeight: "700", paddingBottom: 4 },
  costBalance: { color: Colors.orange, fontSize: 16, fontWeight: "800", marginTop: 4 },
});
