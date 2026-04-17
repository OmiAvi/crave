import { MapPin, Search, Star } from "lucide-react-native";
import React, { useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import RestaurantCard from "@/components/RestaurantCard";
import Colors from "@/constants/colors";
import { CATEGORIES, RESTAURANTS } from "@/mocks/data";

export default function ExploreScreen() {
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
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
      <Text style={styles.title}>Explore</Text>

      <View style={styles.searchWrap}>
        <Search size={18} color={Colors.slate} />
        <TextInput
          placeholder="Search restaurants or cuisines"
          placeholderTextColor="#9E988F"
          value={query}
          onChangeText={setQuery}
          style={styles.searchInput}
        />
      </View>

      <FlatList
        data={CATEGORIES}
        keyExtractor={(c) => c.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.catRow}
        renderItem={({ item }) => {
          const active = category === item.id;
          return (
            <Pressable
              onPress={() => setCategory(item.id)}
              style={[styles.catChip, active && styles.catChipActive]}
            >
              <Text style={styles.catEmoji}>{item.emoji}</Text>
              <Text style={[styles.catLabel, active && styles.catLabelActive]}>
                {item.label}
              </Text>
            </Pressable>
          );
        }}
      />

      <FlatList
        data={filtered}
        keyExtractor={(r) => r.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        renderItem={({ item }) => (
          <RestaurantCard restaurant={item} variant="row" />
        )}
        ListEmptyComponent={
          <View style={styles.emptyWrap}>
            <MapPin size={40} color={Colors.slate} />
            <Text style={styles.emptyText}>No restaurants found</Text>
          </View>
        }
        ListHeaderComponent={
          <View style={styles.resultHeader}>
            <Text style={styles.resultCount}>
              {filtered.length} restaurant{filtered.length !== 1 ? "s" : ""}{" "}
              nearby
            </Text>
            <View style={styles.sortPill}>
              <Star size={12} color={Colors.orange} />
              <Text style={styles.sortText}>Top rated</Text>
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.cream },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: Colors.ink,
    letterSpacing: -0.5,
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  searchWrap: {
    marginTop: 14,
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
    paddingTop: 14,
    paddingBottom: 10,
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
  list: { paddingHorizontal: 20, paddingBottom: 24 },
  resultHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  resultCount: { fontSize: 14, fontWeight: "700", color: Colors.slate },
  sortPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: Colors.white,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.line,
  },
  sortText: { fontSize: 12, fontWeight: "700", color: Colors.ink },
  emptyWrap: {
    alignItems: "center",
    paddingTop: 60,
    gap: 12,
  },
  emptyText: { color: Colors.slate, fontSize: 16, fontWeight: "600" },
});
