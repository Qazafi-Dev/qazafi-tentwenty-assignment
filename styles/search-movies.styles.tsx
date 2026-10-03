// app/(tabs)/watch/watch.styles.ts
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  screenCanvas: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  head: {
    backgroundColor: "#fff",
  },
  gridSpacing: {
    justifyContent: "space-between",
  },
  // ... Keep previous screen container styles unchanged ...

  // ==========================================
  // HORIZONTAL SEARCH RESULT SYSTEM LIST VIEW
  // ==========================================
  searchResultsContainer: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 100,
  },
  searchHeadingLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#202020",
    marginTop: 16,
    marginBottom: 20,
    letterSpacing: 0.2,
    fontFamily: "Poppins-Medium",
  },
  horizontalRowCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
  },
  thumbnailPosterBox: {
    width: 130, // Precise horizontal thumbnail footprint dimension width
    height: 100, // Matching design panel layout constraints height
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#E0E0E0",
  },
  thumbnailPosterCanvas: {
    width: "100%",
    height: "100%",
  },
  metaTextDetailsBlock: {
    flex: 1,
    paddingLeft: 16,
    justifyContent: "center",
  },
  rowItemTitleLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#202020",
    lineHeight: 22,
    marginBottom: 4,
    fontFamily: "Poppins-Medium",
  },
  rowItemSubcategoryLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "#DBDBDF",
    fontFamily: "Poppins-Medium",
  },
  moreIconInteractiveAnchor: {
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default styles;
