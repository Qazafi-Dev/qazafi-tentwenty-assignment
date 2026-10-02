import Colors from "@/constants/Colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.tabbg,
    borderTopWidth: 0,
    height: 75,
    paddingBottom: 25,
    paddingTop: 8,
    position: "absolute",
    bottom: 0,
    left: 16,
    right: 16,
    borderRadius: 22,
    elevation: 5, // Android Shadow
    shadowColor: "#000", // iOS Shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  label: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
  },
});
export default styles;
