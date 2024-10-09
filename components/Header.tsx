import React from "react";
import { StyledImage, StyledView } from "./NativeStyled";
import images from "../constants/Images";

const Header = () => {
  return (
    <StyledView className="w-full flex-row justify-start items-center bg-primary px-4 py-4">
      <StyledImage
        source={images.mainLogo}
        resizeMode="contain"
        className="w-[111px] h-8"
      />
    </StyledView>
  );
};

export default Header;
