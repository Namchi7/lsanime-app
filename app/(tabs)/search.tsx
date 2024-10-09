import React, { useEffect, useState } from "react";
import { Dimensions, FlatList } from "react-native";
import { Href, Link, useRouter } from "expo-router";
import {
  StyledImage,
  StyledText,
  StyledTextInput,
  StyledTouchableOpacity,
  StyledView,
} from "@/components/NativeStyled";

import Icons from "@/constants/Icons";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  AnimeDetailsResponseDataType,
  AnimeSearchResponseType,
} from "@/constants/types";
import { fetchSearchWithQuery } from "@/redux/reducers/searchSlice";
import Pagination from "@/components/Pagination";

const Search: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const data: AnimeSearchResponseType | null = useAppSelector(
    (state) => state?.searchTab?.data
  );
  const isLoading: boolean = useAppSelector(
    (state) => state?.searchTab?.isLoading
  );

  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const posterWidth: string = `${Dimensions.get("window").width / 2 - 16}px`;

  const searchAnime = () => {
    if (query) {
      dispatch(fetchSearchWithQuery({ query: query, page: page }));
    }
  };

  useEffect(() => {
    if (query) {
      dispatch(fetchSearchWithQuery({ query: query, page: page }));
    }
  }, [page]);

  return (
    <StyledView className="w-full flex-row justify-start items-start">
      {
        <FlatList
          data={data?.data ?? []}
          keyExtractor={(item) => item?.mal_id.toString()}
          renderItem={({ item, index }) => (
            <StyledView
              className={`w-[${posterWidth}] flex-1 space-y-2 mb-4 ml-4 ${
                index % 2 === 0 ? "mr-0" : "mr-4"
              }`}
            >
              <StyledTouchableOpacity
                onPress={() => router.push(`/anime/${item.mal_id}` as Href)}
                className="aspect-[2/3] w-full bg-gray-300 rounded-md shadow-lg overflow-hidden"
              >
                <StyledImage
                  source={{ uri: item.images.jpg.large_image_url }}
                  resizeMode="cover"
                  className="w-full h-full"
                />
              </StyledTouchableOpacity>

              <Link href={`/anime/${item.mal_id}` as Href}>
                <StyledText numberOfLines={2} className="text-sm font-medium">
                  {item?.title}
                </StyledText>
              </Link>
            </StyledView>
          )}
          ListHeaderComponent={
            <StyledView className="w-full px-4">
              <StyledView className="w-full h-11 shrink-0 flex-row justify-start items-center rounded-md border-2 border-accent group my-4">
                <StyledTextInput
                  placeholder="Search for anime..."
                  inputMode="search"
                  value={query}
                  onChangeText={(q) => setQuery(q)}
                  className="w-full h-full shrink text-sm font-regular px-3 p-3"
                />

                <StyledTouchableOpacity
                  onPress={() => searchAnime()}
                  className="aspect-square h-full  justify-center items-center bg-accent"
                >
                  <StyledImage
                    source={Icons.search}
                    resizeMode="contain"
                    className="w-6 h-6"
                  />
                </StyledTouchableOpacity>
              </StyledView>

              {isLoading && (
                <StyledView className="w-full h-60 justify-center items-center">
                  <StyledText className="text-base font-semibold">
                    Loading...
                  </StyledText>
                </StyledView>
              )}
            </StyledView>
          }
          ListFooterComponent={
            <StyledView className="w-full px-4">
              {data && (
                <Pagination page={page} setPage={setPage} lastPage={5} />
              )}
            </StyledView>
          }
          numColumns={2}
        />
      }
    </StyledView>
  );
};

export default Search;
