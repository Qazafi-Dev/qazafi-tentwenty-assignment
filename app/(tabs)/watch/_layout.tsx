import { Stack } from "expo-router";

export default function WatchLayout() {
  return (
    <Stack>
      {/* The main movie list screen */}
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="searchmovies"
        options={{
          headerShown: false,
        }}
      />
      {/* The dynamic movie details screen */}
      <Stack.Screen
        name="[id]"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
