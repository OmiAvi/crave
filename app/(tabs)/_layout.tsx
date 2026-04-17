import { Tabs } from "expo-router";
import { Home, Map, Wallet, User } from "lucide-react-native";
import React from "react";
import { Platform, StyleSheet, View } from "react-native";

import Colors from "@/constants/colors";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.orange,
        tabBarInactiveTintColor: "#B5B0A8",
        headerShown: false,
        tabBarShowLabel: true,
        tabBarLabelStyle: { fontSize: 11, fontWeight: "600", marginTop: -2 },
        tabBarStyle: {
          backgroundColor: Colors.white,
          borderTopColor: Colors.line,
          borderTopWidth: StyleSheet.hairlineWidth,
          height: Platform.OS === "ios" ? 88 : 64,
          paddingTop: 8,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon focused={focused}>
              <Home color={color} size={22} strokeWidth={2.3} />
            </TabIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon focused={focused}>
              <Map color={color} size={22} strokeWidth={2.3} />
            </TabIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: "Wallet",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon focused={focused}>
              <Wallet color={color} size={22} strokeWidth={2.3} />
            </TabIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon focused={focused}>
              <User color={color} size={22} strokeWidth={2.3} />
            </TabIcon>
          ),
        }}
      />
    </Tabs>
  );
}

function TabIcon({
  children,
  focused,
}: {
  children: React.ReactNode;
  focused: boolean;
}) {
  return (
    <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  iconWrap: {
    width: 42,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
  iconWrapActive: {
    backgroundColor: "#FFF1E6",
  },
});
