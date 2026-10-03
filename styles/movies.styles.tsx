// app/(tabs)/watch/watch.styles.ts
import Colors from "@/constants/Colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  screenCanvas: {
    flex: 1,
    backgroundColor: "#fff",
  },

  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listWrapper: {
    paddingTop: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: 90,
    backgroundColor: Colors.primarybg, // Use the primary color from the Color object
  },
  gridSpacing: {
    justifyContent: "space-between",
  },
  cardNode: {
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: "#1E1E1E",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
  },
  imageBackgroundLayer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  imageCanvasRadius: {
    borderRadius: 12,
  },
  textVeilOverlay: {
    paddingLeft: 20,
    paddingBottom: 20,
    paddingTop: 45,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  titleText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: -0.2,
    padding: 12,
    fontFamily: "Poppins-Medium",
  },
  head: {
    backgroundColor: "#fff",
  },
  headerrow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12, // Ensures standard bounding padding
  },
  headtxt: {
    fontSize: 16,
    color: "#202C43",
    fontFamily: "Poppins-Medium",
  },
});

export default styles;
