import { Stack } from "expo-router";

export default function WatchLayout() {
  return (
    <Stack>
      {/* The main movie list screen */}
      <Stack.Screen name="index" options={{ headerShown: false }} />
      {/* The dynamic movie details screen */}
      <Stack.Screen
        name="[id]"
        options={{
          title: "Movie Details",
          headerBackTitle: "Watch",
        }}
      />
    </Stack>
  );
}
