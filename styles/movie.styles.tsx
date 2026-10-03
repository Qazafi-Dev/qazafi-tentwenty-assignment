import { wp } from "@/components/ScreenContainer";
import Colors from "@/constants/Colors";
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
  listWrapper: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: 90,
  },
  gridSpacing: {
    justifyContent: "space-between",
  },
  cardNode: {
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: "#1E1E1E",
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
  },
  imageBackgroundLayer: {
    flex: 1,
    justifyContent: "flex-end",
    width: "100%",
    height: "100%",
  },
  imageCanvasRadius: {
    borderRadius: 12,
  },
  textVeilOverlay: {
    paddingLeft: 20,
    paddingBottom: 20,
    paddingTop: 45,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  itemTitleText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: -0.2,
  },
  detailsRoot: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  landscapeSplitWrapper: {
    flex: 1,
    flexDirection: "row",
  },
  heroPosterPortrait: {
    width: "100%",
    height: 480,
    justifyContent: "space-between",
  },
  heroPosterLandscape: {
    width: "45%",
    height: "100%",
    justifyContent: "space-between",
  },
  imageScaling: {
    width: "100%",
    height: "100%",
    left: 5,
    borderRadius: 8,
  },
  backActionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    marginLeft: 16,
  },
  heroTextOverlayContainer: {
    paddingHorizontal: 32,
    paddingBottom: 24,
    alignItems: "center",
    // backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingTop: 60,
  },
  metaDateText: {
    color: "#FFFFFF",
    fontSize: 16,
    marginBottom: 5,
    textAlign: "center",
    fontFamily: "Poppins-Medium",
  },

  secondaryOutlineButton: {
    flexDirection: "row",
    borderWidth: 1.5,
    borderColor: "#2F80ED",
    width: "100%",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  playVectorIcon: {
    marginRight: 8,
  },
  secondaryActionLabel: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
  contentBodyWrapperPortrait: {
    paddingHorizontal: 40,
    paddingTop: 24,
    paddingBottom: 60,
  },
  contentBodyWrapperLandscape: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
  },
  sectionHeadingTitle: {
    fontSize: wp(4),
    fontWeight: "500",
    color: Colors.text,
    marginTop: 16,
    marginBottom: 5,
    fontFamily: "Poppins-Medium",
  },
  tagsContainerRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12,
  },
  tagBadgeNode: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagBadgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
    fontFamily: "Poppins-Medium",
  },
  bodyOverviewParagraphText: {
    fontSize: 14,
    color: "#8F8F8F",
    lineHeight: 22,
    fontWeight: "400",
    fontFamily: "Poppins-Medium",
    paddingBottom: 30,
  },
});

export default styles;
