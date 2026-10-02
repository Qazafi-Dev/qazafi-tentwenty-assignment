import { Tabs } from "expo-router";

import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import styles from "@/styles/index.styles";
import { Entypo, Feather, FontAwesome, FontAwesome5 } from "@expo/vector-icons";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.light.secondarybg,
        // Color when focused
        tabBarInactiveTintColor: Colors.light.tabIconDefault, // Color when not focused',
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        tabBarStyle: { ...styles.container },
        tabBarLabelStyle: { ...styles.label },
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
