import React from "react";
import { Href, Link, useRouter } from "expo-router";

import {
  StyledImage,
  StyledText,
  StyledTouchableOpacity,
  StyledView,
} from "./NativeStyled";
import { AnimeDetailsResponseDataType } from "@/constants/types";

export interface PosterCardType {
  data: AnimeDetailsResponseDataType;
}

const PosterCard: React.FC<PosterCardType> = ({ data }) => {
  const router = useRouter();
  return (
    <StyledView className="justify-start items-start space-y-2">
      <StyledTouchableOpacity
        onPress={() => router.push(`/anime/${data?.mal_id}` as Href)}
        className="aspect-[2/3] w-full justify-center items-center bg-gray-300 rounded-[4px] overflow-hidden"
      >
        <StyledImage
          source={{ uri: data.images.jpg.image_url }}
          resizeMode="cover"
          className="w-full h-full"
        />
      </StyledTouchableOpacity>

      <Link href={`/anime/${data?.mal_id}` as Href}>
        <StyledText numberOfLines={2} className="text-base font-regular">
          {data.title}
        </StyledText>
      </Link>
    </StyledView>
  );
};

export default PosterCard;
