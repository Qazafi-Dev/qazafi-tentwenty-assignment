import { Entypo } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { wp } from "./ScreenContainer";

interface ButtonProps {
  btntitle?: string;
  bgc?: string;
  onPress?: () => void;
  width?: number | null;
}

const Button = ({ btntitle, bgc, onPress, width }: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.btn,
        { backgroundColor: bgc || undefined, width: width || wp(65) },
      ]}
    >
      {!bgc && (
        <>
          <Entypo name="controller-play" size={20} color={"#fff"} />
        </>
      )}
      <View style={{ marginRight: !bgc ? 8 : 0 }}>
        <Text style={styles.txt}>{btntitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  btn: {
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#61C3F2",
    marginVertical: 8,
    flexDirection: "row",
    gap: 8,
  },
  txt: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
    fontFamily: "Poppins-Medium",
  },
});
