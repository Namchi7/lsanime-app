import React from "react";
import { FlatList } from "react-native";

import { StyledText, StyledView } from "./NativeStyled";
import PosterCard from "./PosterCard";
import { HomeListsItemType, SeasonsResponseDataType } from "@/constants/types";

export interface HorizontalListType {
  data: SeasonsResponseDataType[];
  listItem: HomeListsItemType;
}

const HorizontalList: React.FC<HorizontalListType> = ({ data, listItem }) => {
  return (
    <StyledView className="w-full justify-start items-start space-y-4">
      <StyledView className="w-full flex-row justify-between items-baseline gap-0 px-4">
        <StyledText className="text-2xl font-bold">{listItem.title}</StyledText>

        <StyledText className="text-sm font-medium">View All</StyledText>
      </StyledView>

      <FlatList
        data={data}
        keyExtractor={(item) => `${listItem.key}-${item.mal_id.toString()}`}
        renderItem={({ item, index }) => (
          <StyledView
            className={`w-[180px] ml-4 ${
              index === data.length - 1 ? "mr-4" : "mr-0"
            }`}
          >
            <PosterCard data={item} />
          </StyledView>
        )}
        horizontal
      />
    </StyledView>
  );
};

export default HorizontalList;
