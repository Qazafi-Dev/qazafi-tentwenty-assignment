import { Entypo } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { wp } from "./ScreenContainer";

interface ButtonProps {
  btntitle: string;
  bgc: string;
  onPress: () => void;
  width: number | null;
}

const Button = ({ btntitle, bgc, onPress, width }: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.btn,
        { backgroundColor: bgc || undefined, width: width || wp(68) },
      ]}
    >
      {bgc === "" && <Entypo name="controller-play" size={24} color={"#fff"} />}
      <Text style={styles.txt}>{btntitle}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  btn: {
    width: wp(68),
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#61C3F2",
    marginVertical: 8,
    flexDirection: "row",
  },
  txt: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
    fontFamily: "Poppins-Medium",
  },
});
