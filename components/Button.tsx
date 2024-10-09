import React from "react";
import { StyledText, StyledTouchableOpacity } from "./NativeStyled";

export interface ButtonType {
  title: string;
  handlePress: () => void;
  containerStyles: string;
  textStyles: string;
  isLoading: boolean;
}

const Button: React.FC<ButtonType> = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}) => {
  return (
    <StyledTouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-button rounded-[4px] justify-center items-center px-6 py-4 ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      }`}
      disabled={isLoading}
    >
      <StyledText className={`text-basic font-semibold text-lg ${textStyles}`}>
        {title}
      </StyledText>
    </StyledTouchableOpacity>
  );
};

export default Button;
