import { Dimensions } from "react-native";

interface ScreenDimensions {
  width: number;
  height: number;
}

interface PercentageValue {
  percentage: number;
}

const { width, height }: ScreenDimensions = Dimensions.get("window");

export const wp = (percentage: PercentageValue["percentage"]): number => {
  return width * (percentage / 100);
};

export const hp = (percentage: PercentageValue["percentage"]): number => {
  return height * (percentage / 100);
};
