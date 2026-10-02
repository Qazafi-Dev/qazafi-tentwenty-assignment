import { Tabs } from "expo-router";

import Colors from "@/constants/Colors";
import styles from "@/styles/index.styles";
import { Entypo, Feather, FontAwesome, FontAwesome5 } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.secondarybg, // Color when focused
        tabBarInactiveTintColor: Colors.tabIconDefault, // Color when not focused',
        tabBarStyle: { ...styles.container },
        tabBarLabelStyle: { ...styles.label },
        headerShown: false, // Hide the header for all tabs
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color }) => (
            <Entypo name="grid" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="watch"
        options={{
          title: "Watch",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="youtube-play" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="media-library"
        options={{
          title: "Media Library",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="layer-group" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: "More",

          tabBarIcon: ({ color }) => (
            <Feather name="list" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
