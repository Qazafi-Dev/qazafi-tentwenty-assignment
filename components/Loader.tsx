import { ActivityIndicator, StyleSheet, View } from "react-native";
import { hp, wp } from "./ScreenContainer";

interface LoaderProps {
  color?: string;
  size?: "small" | "large";
}
function Loader({ color = "#61C3F2", size = "large" }: LoaderProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
}

export default Loader;

const styles = StyleSheet.create({
  container: {
    backfaceVisibility: "visible",
    alignSelf: "center",
    width: wp(100),
    height: hp(100),
    position: "absolute",
    backgroundColor: "rgba(255,255,255,0.3)",
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
