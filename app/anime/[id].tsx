import React, { useEffect } from "react";
import { ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchAnimeById } from "@/redux/reducers/animeDetailsSlice";
import { AnimeDetailsResponseDataType } from "@/constants/types";
import {
  StyledImage,
  StyledSafeAreaView,
  StyledText,
  StyledView,
} from "@/components/NativeStyled";
import Header from "@/components/Header";

const AnimeInfo = () => {
  const dispatch = useAppDispatch();

  const { id } = useLocalSearchParams();
  const data: AnimeDetailsResponseDataType | null = useAppSelector(
    (state) => state.anime.data
  );

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getResolvedDate = (dt: string) => {
    const date = new Date(dt);

    const dom: number = date.getDate();
    const mon: number = date.getMonth();
    const year: number = date.getFullYear();

    return `${dom} ${months[mon].substring(0, 3)}, ${year}`;
  };

  useEffect(() => {
    const mal_id = Array.isArray(id) ? id[0] : id;
    dispatch(fetchAnimeById(parseInt(mal_id)));
  }, [id]);

  return (
    <StyledSafeAreaView className="w-full h-full">
      <Header />
      <ScrollView>
        {data && (
          <StyledView className="w-full h-full px-4">
            <StyledView className="w-full justify-start items-center rounded-lg space-y-2 p-4 mt-4 mb-2 bg-gray-500/5">
              <StyledView className="aspect-[2/3] w-3/5 justify-center items-center bg-gray-300 rounded-[4px] overflow-hidden shadow-lg">
                <StyledImage
                  source={{ uri: data.images.jpg.image_url }}
                  resizeMode="cover"
                  className="w-full h-full"
                />
              </StyledView>

              <StyledText className="w-full text-xl font-semibold text-center">
                {data?.title}
              </StyledText>

              <StyledText className="w-full text-lg font-medium text-center">
                {`${data?.title_japanese} | ${data.title_english}`}
              </StyledText>

              <StyledText className="w-full text-base font-regular text-left">
                {data?.synopsis}
              </StyledText>
            </StyledView>

            <StyledView className="w-full justify-start items-start rounded-lg divide-y divide-gray-300 mb-2 bg-black/5">
              <StyledView className="w-full flex-row justify-start items-center divide-x divide-gray-300">
                <StyledText className="w-1/2 text-base font-medium text-center p-4">
                  Format
                </StyledText>
                <StyledText className="w-1/2 text-base font-regular text-center p-4">
                  {data.type || "??"}
                </StyledText>
              </StyledView>

              <StyledView className="w-full flex-row justify-start items-center divide-x divide-gray-300">
                <StyledText className="w-1/2 text-base font-medium text-center p-4">
                  Episodes
                </StyledText>
                <StyledText className="w-1/2 text-base font-regular text-center p-4">
                  {data.episodes || "??"}
                </StyledText>
              </StyledView>

              <StyledView className="w-full flex-row justify-start items-center divide-x divide-gray-300">
                <StyledText className="w-1/2 text-base font-medium text-center p-4">
                  Episode Duration
                </StyledText>
                <StyledText className="w-1/2 text-base font-regular text-center p-4">
                  {data?.duration || "??"}
                </StyledText>
              </StyledView>

              <StyledView className="w-full flex-row justify-start items-center divide-x divide-gray-300">
                <StyledText className="w-1/2 text-base font-medium text-center p-4">
                  Status
                </StyledText>
                <StyledText className="w-1/2 text-base font-regular text-center p-4">
                  {data.status || "??"}
                </StyledText>
              </StyledView>

              <StyledView className="w-full flex-row justify-start items-center divide-x divide-gray-300">
                <StyledText className="w-1/2 text-base font-medium text-center p-4">
                  Start Date
                </StyledText>
                <StyledText className="w-1/2 text-base font-regular text-center p-4">
                  {getResolvedDate(data.aired.from) || "??"}
                </StyledText>
              </StyledView>

              <StyledView className="w-full flex-row justify-start items-center divide-x divide-gray-300">
                <StyledText className="w-1/2 text-base font-medium text-center p-4">
                  Season
                </StyledText>
                <StyledText className="w-1/2 text-base font-regular text-center p-4 capitalize">
                  {data.season || "??"}
                </StyledText>
              </StyledView>

              <StyledView className="w-full flex-row justify-start items-center divide-x divide-gray-300">
                <StyledText className="w-1/2 text-base font-medium text-center p-4">
                  Score
                </StyledText>
                <StyledText className="w-1/2 text-base font-regular text-center p-4">
                  {data.score || "??"}
                </StyledText>
              </StyledView>

              <StyledView className="w-full flex-row justify-start items-center divide-x divide-gray-300">
                <StyledText className="w-1/2 text-base font-medium text-center p-4">
                  Source
                </StyledText>
                <StyledText className="w-1/2 text-base font-regular text-center p-4">
                  {data.source || "??"}
                </StyledText>
              </StyledView>
            </StyledView>

            <StyledView className="w-full justify-start items-center divide-y divide-gray-300 rounded-lg mb-2 bg-black/5">
              <StyledText className="w-full text-base font-medium text-center p-4">
                Genres
              </StyledText>
              <StyledText className="w-full text-base font-regular text-center p-4">
                {data.genres.map((item) => item.name).join(", ") || "??"}
              </StyledText>
            </StyledView>

            <StyledView className="w-full justify-start items-center divide-y divide-gray-300 rounded-lg mb-2 bg-black/5">
              <StyledText className="w-full text-base font-medium text-center p-4">
                Themes
              </StyledText>

              <StyledText className="w-full text-base font-regular text-center p-4">
                {data?.themes.map((item) => item.name).join(", ") || "??"}
              </StyledText>
            </StyledView>

            <StyledView className="w-full justify-start items-center divide-y divide-gray-300 rounded-lg mb-2 bg-black/5">
              <StyledText className="w-full text-base font-medium text-center p-4">
                Rating
              </StyledText>
              <StyledText className="w-full text-base font-regular text-center p-4">
                {data?.rating || "??"}
              </StyledText>
            </StyledView>

            <StyledView className="w-full justify-start items-start rounded-lg divide-y divide-gray-300 mb-2 bg-black/5">
              <StyledText className="w-full text-base font-medium text-center p-4">
                Title Synonyms
              </StyledText>
              {data?.title_synonyms.map((item, i: number) => (
                <StyledText
                  className="w-full text-base font-regular text-center p-4"
                  key={i}
                >
                  {item}
                </StyledText>
              )) || (
                <StyledText className="w-full text-base font-regular text-center p-4">
                  ??
                </StyledText>
              )}
            </StyledView>

            <StyledView className="w-full justify-start items-center divide-y divide-gray-300 rounded-lg mb-2 bg-black/5">
              <StyledText className="w-full text-base font-medium text-center p-4">
                Producers
              </StyledText>
              <StyledText className="w-full text-base font-regular text-center p-4">
                {data?.producers.map((item) => item.name).join(", ") || "??"}
              </StyledText>
            </StyledView>

            <StyledView className="w-full justify-start items-center divide-y divide-gray-300 rounded-lg mb-4 bg-black/5">
              <StyledText className="w-full text-base font-medium text-center p-4">
                Studios
              </StyledText>
              <StyledText className="w-full text-base font-regular text-center p-4">
                {data?.studios.map((item) => item.name).join(", ") || "??"}
              </StyledText>
            </StyledView>
          </StyledView>
        )}
      </ScrollView>
    </StyledSafeAreaView>
  );
};

export default AnimeInfo;
