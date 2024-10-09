import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { Href, useRouter } from "expo-router";

import {
  StyledImage,
  StyledText,
  StyledTouchableOpacity,
  StyledView,
} from "@/components/NativeStyled";
import { ExploreResponseType } from "@/constants/types";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchExploreData } from "@/redux/reducers/exploreSlice";
import Pagination from "@/components/Pagination";

const Explore: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [page, setPage] = useState<number>(1);

  const exploreData: ExploreResponseType | null = useAppSelector(
    (state) => state?.exploreTab.data
  );
  const isLoading: boolean = useAppSelector(
    (state) => state?.exploreTab.isLoading
  );

  useEffect(() => {
    dispatch(fetchExploreData(page));
  }, [page]);

  return (
    <ScrollView>
      <StyledView className="w-full justify-start items-start bg-gray-100 space-y-4">
        <StyledText className="text-2xl font-bold px-4 mt-4">
          Explore Similar Anime
        </StyledText>

        <StyledView className="w-full h-full justify-start items-center mt-4 px-4">
          {isLoading && (
            <StyledView className="w-full h-60 justify-center items-center">
              <StyledText className="text-base font-semibold">
                Loading...
              </StyledText>
            </StyledView>
          )}

          {exploreData &&
            exploreData.data?.map((item, i: number) => (
              <StyledView
                className="w-full h-max justify-start items-start bg-white divide-y divide-gray-300 rounded-lg shadow-lg overflow-hidden mb-4"
                key={i}
              >
                <StyledView className="w-full shrink-0 flex-row justify-start items-start divide-x divide-gray-300">
                  <StyledView className="w-1/2 shrink">
                    <StyledView className="justify-start items-start grow">
                      <StyledText className="w-full text-base font-medium text-center p-2">
                        If You Liked
                      </StyledText>

                      <StyledTouchableOpacity
                        onPress={() =>
                          router.push(
                            `/anime/${item?.entry[0]?.mal_id}` as Href
                          )
                        }
                        className="w-full justify-center items-center rounded-[4px] overflow-hidden px-2"
                      >
                        <StyledView className="aspect-[2/3] w-full justify-center items-center bg-gray-300 rounded-[4px] overflow-hidden shadow-md">
                          <StyledImage
                            source={{
                              uri: item.entry[0].images.jpg.image_url,
                            }}
                            resizeMode="cover"
                            className="w-full h-full"
                          />
                        </StyledView>
                      </StyledTouchableOpacity>

                      <StyledTouchableOpacity
                        onPress={() =>
                          router.push(
                            `/anime/${item?.entry[0]?.mal_id}` as Href
                          )
                        }
                        className="w-full"
                      >
                        <StyledText
                          numberOfLines={2}
                          className="w-full text-base font-medium text-center p-2"
                        >
                          {item.entry[0]?.title}
                        </StyledText>
                      </StyledTouchableOpacity>
                    </StyledView>
                  </StyledView>

                  <StyledView className="w-1/2 shrink">
                    <StyledView className="justify-start items-start grow">
                      <StyledText className="w-full text-base font-medium text-center p-2">
                        You Might Like
                      </StyledText>

                      <StyledTouchableOpacity
                        onPress={() =>
                          router.push(
                            `/anime/${item?.entry[1]?.mal_id}` as Href
                          )
                        }
                        className="w-full justify-center items-center rounded-[4px] overflow-hidden px-2"
                      >
                        <StyledView className="aspect-[2/3] w-full justify-center items-center bg-gray-300 rounded-[4px] overflow-hidden shadow-md">
                          <StyledImage
                            source={{
                              uri: item.entry[1].images.jpg.image_url,
                            }}
                            resizeMode="cover"
                            className="w-full h-full"
                          />
                        </StyledView>
                      </StyledTouchableOpacity>

                      <StyledTouchableOpacity
                        onPress={() =>
                          router.push(
                            `/anime/${item?.entry[1]?.mal_id}` as Href
                          )
                        }
                        className="w-full"
                      >
                        <StyledText
                          numberOfLines={2}
                          className="w-full text-base font-medium text-center p-2"
                        >
                          {item.entry[1]?.title}
                        </StyledText>
                      </StyledTouchableOpacity>
                    </StyledView>
                  </StyledView>
                </StyledView>

                <StyledText
                  numberOfLines={2}
                  className="w-full p-2 text-sm font-regular"
                >
                  {item.content}
                </StyledText>
              </StyledView>
            ))}

          {/* TODO: Implement Pagination here */}

          {exploreData && (
            <Pagination page={page} setPage={setPage} lastPage={20} />
          )}

          {/* <StyledView className="w-full h-max justify-start items-start bg-white divide-y divide-gray-300 rounded-lg shadow-lg overflow-hidden mb-4">
            <StyledView className="w-full shrink-0 flex-row justify-start items-start divide-x divide-gray-300">
              <StyledView className="w-1/2 shrink">
                <StyledView className="justify-start items-start">
                  <StyledText className="w-full text-base font-medium text-center p-2">
                    If You Liked
                  </StyledText>

                  <StyledView className="w-full justify-center items-center rounded-[4px] overflow-hidden px-2">
                    <StyledView className="aspect-[2/3] w-full justify-center items-center bg-gray-300 overflow-hidden">
                      
                    </StyledView>
                  </StyledView>

                  <StyledText
                    numberOfLines={2}
                    className="w-full text-base font-medium text-center p-2"
                  >
                    Anime Title
                  </StyledText>
                </StyledView>
              </StyledView>

              <StyledView className="w-1/2 shrink">
                <StyledView className="justify-start items-start">
                  <StyledText className="w-full text-base font-medium text-center p-2">
                    You Might Like
                  </StyledText>

                  <StyledView className="w-full justify-center items-center rounded-[4px] overflow-hidden px-2">
                    <StyledView className="aspect-[2/3] w-full justify-center items-center bg-gray-300 overflow-hidden">
                      
                    </StyledView>
                  </StyledView>

                  <StyledText
                    numberOfLines={2}
                    className="w-full text-base font-medium text-center p-2"
                  >
                    Anime Title
                  </StyledText>
                </StyledView>
              </StyledView>
            </StyledView>

            <StyledText
              numberOfLines={2}
              className="w-full p-2 text-base font-regular"
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
              maiores fugit sapiente natus. Velit, omnis suscipit doloribus est
              neque numquam deleniti quisquam odio cumque expedita sapiente
              aliquid ducimus ipsam rerum?
            </StyledText>
          </StyledView> */}
        </StyledView>
      </StyledView>
    </ScrollView>
  );
};

export default Explore;
