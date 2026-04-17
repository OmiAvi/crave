import { router } from "expo-router";
import { Heart, MapPin, Star } from "lucide-react-native";
import React from "react";
import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import Colors from "@/constants/colors";
import { Restaurant } from "@/mocks/data";
import { useCrave } from "@/providers/CraveProvider";

interface Props {
  restaurant: Restaurant;
  variant?: "card" | "row";
}

export default function RestaurantCard({ restaurant, variant = "card" }: Props) {
  const { favorites, toggleFavorite } = useCrave();
  const isFav = favorites.includes(restaurant.id);

  const handlePress = () => {
    router.push({
      pathname: "/restaurant/[id]",
      params: { id: restaurant.id },
    });
  };

  if (variant === "row") {
    return (
      <Pressable onPress={handlePress} style={styles.row}>
        <Image source={{ uri: restaurant.image }} style={styles.rowImage} />
        <View style={styles.rowInfo}>
          <Text style={styles.rowName} numberOfLines={1}>
            {restaurant.name}
          </Text>
          <Text style={styles.rowCuisine}>{restaurant.cuisine}</Text>
          <View style={styles.rowMeta}>
            <Star size={12} color="#F5A623" fill="#F5A623" />
            <Text style={styles.rowRating}>{restaurant.rating}</Text>
            <MapPin size={12} color={Colors.slate} />
            <Text style={styles.rowDist}>{restaurant.distance}</Text>
          </View>
        </View>
        <View style={styles.rowCost}>
          <Text style={styles.rowCostNum}>{restaurant.creditCost}</Text>
          <Text style={styles.rowCostLabel}>credits</Text>
        </View>
      </Pressable>
    );
  }

  return (
    <Pressable onPress={handlePress} style={styles.card}>
      <View style={styles.imageWrap}>
        <Image source={{ uri: restaurant.image }} style={styles.cardImage} />
        <Pressable
          onPress={() => toggleFavorite(restaurant.id)}
          style={styles.heartBtn}
        >
          <Heart
            size={16}
            color={isFav ? "#FF4D6A" : Colors.white}
            fill={isFav ? "#FF4D6A" : "transparent"}
          />
        </Pressable>
        <View style={styles.creditBadge}>
          <Text style={styles.creditBadgeText}>
            {restaurant.creditCost} credits
          </Text>
        </View>
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.cardName} numberOfLines={1}>
          {restaurant.name}
        </Text>
        <View style={styles.cardMeta}>
          <Star size={12} color="#F5A623" fill="#F5A623" />
          <Text style={styles.cardRating}>{restaurant.rating}</Text>
          <Text style={styles.cardDot}>•</Text>
          <Text style={styles.cardCuisine}>{restaurant.cuisine}</Text>
          <Text style={styles.cardDot}>•</Text>
          <Text style={styles.cardDist}>{restaurant.distance}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 230,
    backgroundColor: Colors.white,
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.line,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
      },
      android: { elevation: 2 },
      default: {},
    }),
  },
  imageWrap: { position: "relative" },
  cardImage: { width: "100%", height: 140, borderTopLeftRadius: 20, borderTopRightRadius: 20 },
  heartBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(0,0,0,0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  creditBadge: {
    position: "absolute",
    bottom: 10,
    left: 10,
    backgroundColor: Colors.orange,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  creditBadgeText: {
    color: Colors.white,
    fontSize: 11,
    fontWeight: "800",
  },
  cardBody: { padding: 12 },
  cardName: { fontSize: 15, fontWeight: "800", color: Colors.ink },
  cardMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 6,
  },
  cardRating: { fontSize: 12, fontWeight: "700", color: Colors.ink },
  cardDot: { fontSize: 10, color: Colors.slate },
  cardCuisine: { fontSize: 12, color: Colors.slate },
  cardDist: { fontSize: 12, color: Colors.slate },

  /* Row variant */
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: Colors.white,
    borderRadius: 18,
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.line,
  },
  rowImage: { width: 64, height: 64, borderRadius: 14 },
  rowInfo: { flex: 1 },
  rowName: { fontSize: 15, fontWeight: "800", color: Colors.ink },
  rowCuisine: { fontSize: 12, color: Colors.slate, marginTop: 2 },
  rowMeta: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 4 },
  rowRating: { fontSize: 12, fontWeight: "700", color: Colors.ink },
  rowDist: { fontSize: 12, color: Colors.slate },
  rowCost: { alignItems: "center" },
  rowCostNum: { fontSize: 18, fontWeight: "900", color: Colors.orange },
  rowCostLabel: { fontSize: 10, color: Colors.slate },
});
