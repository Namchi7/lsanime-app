import React from "react";
import {
  StyledImage,
  StyledText,
  StyledTouchableOpacity,
  StyledView,
} from "./NativeStyled";
import icons from "../constants/Icons";

export interface PaginationType {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  lastPage: number;
}

const Pagination: React.FC<PaginationType> = ({ page, setPage, lastPage }) => {
  return (
    <StyledView className="w-full flex-row justify-between items-center mb-4">
      <StyledView className="flex-row justify-start items-center space-x-3">
        <StyledTouchableOpacity
          onPress={() => setPage(1)}
          disabled={page <= 1 ? true : false}
          className={`w-10 h-10 justify-center items-center bg-white rounded-md overflow-hidden border border-gray-300 p-2 ${
            page <= 1 && "opacity-50"
          }`}
        >
          <StyledImage
            source={icons.first}
            resizeMode="contain"
            className="w-full h-full"
          />
        </StyledTouchableOpacity>

        <StyledTouchableOpacity
          onPress={() => setPage(page - 1)}
          disabled={page <= 1 ? true : false}
          className={`w-10 h-10 justify-center items-center bg-white rounded-md overflow-hidden border border-gray-300 p-2 ${
            page <= 1 && "opacity-50"
          }`}
        >
          <StyledImage
            source={icons.prev}
            resizeMode="contain"
            className="w-full h-full"
          />
        </StyledTouchableOpacity>
      </StyledView>

      <StyledView className="w-max min-w-[40px] h-10 shrink-0 justify-center items-center bg-white rounded-md overflow-hidden border border-gray-300 px-2">
        <StyledText className="text-lg font-medium text-center">
          {page}
        </StyledText>
      </StyledView>

      <StyledView className="flex-row justify-start items-center space-x-3">
        <StyledTouchableOpacity
          onPress={() => setPage(page + 1)}
          disabled={page + 1 >= lastPage ? true : false}
          className={`w-10 h-10 justify-center items-center bg-white rounded-md overflow-hidden border border-gray-300 p-2 ${
            page + 1 >= lastPage && "opacity-50"
          }`}
        >
          <StyledImage
            source={icons.next}
            resizeMode="contain"
            className="w-full h-full"
          />
        </StyledTouchableOpacity>

        <StyledTouchableOpacity
          onPress={() => setPage(lastPage)}
          disabled={page + 1 >= lastPage ? true : false}
          className={`w-10 h-10 justify-center items-center bg-white rounded-md overflow-hidden border border-gray-300 p-2 ${
            page + 1 >= lastPage && "opacity-50"
          }`}
        >
          <StyledImage
            source={icons.last}
            resizeMode="contain"
            className="w-full h-full"
          />
        </StyledTouchableOpacity>
      </StyledView>
    </StyledView>
  );
};

export default Pagination;
