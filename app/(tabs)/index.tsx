import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl } from "react-native";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { StyledView, StyledText } from "../../components/NativeStyled";
import HorizontalList from "@/components/HorizontalList";
import { fetchHomeData } from "@/redux/reducers/homePageSlice";
import { HomeListsItemType, HomePageDataType } from "@/constants/types";

const Home = () => {
  const dispatch = useAppDispatch();
  const data: HomePageDataType | null = useAppSelector(
    (state) => state?.homeTab?.data
  );
  const isLoading: boolean = useAppSelector(
    (state) => state?.homeTab?.isLoading
  );

  const [refreshing, setRefreshing] = useState<boolean>(false);

  const onRefresh = async () => {
    setRefreshing(true);
    dispatch(fetchHomeData());
    setRefreshing(false);
  };

  const lists: HomeListsItemType[] = [
    { key: "thisSeason", title: "This Season" },
    { key: "upcoming", title: "Upcoming Season" },
    { key: "top", title: "Top Animes" },
  ];

  // const data = [
  //   {
  //     id: 1,
  //     title: "Title 1",
  //   },
  //   {
  //     id: 2,
  //     title: "Title 2",
  //   },
  //   {
  //     id: 3,
  //     title: "Title 3",
  //   },
  //   {
  //     id: 4,
  //     title: "Title 4",
  //   },
  //   {
  //     id: 5,
  //     title: "Title 5",
  //   },
  //   {
  //     id: 6,
  //     title: "Title 6",
  //   },
  //   {
  //     id: 7,
  //     title: "Title 7",
  //   },
  //   {
  //     id: 8,
  //     title: "Title 8",
  //   },
  //   {
  //     id: 9,
  //     title: "Title 9",
  //   },
  // ];

  useEffect(() => {
    dispatch(fetchHomeData());
  }, []);

  return (
    <StyledView className="w-full h-full justify-start items-start space-y-4">
      {isLoading && (
        <StyledView className="w-full h-60 justify-center items-center">
          <StyledText className="text-base font-semibold">
            Loading...
          </StyledText>
        </StyledView>
      )}

      {data && (
        <FlatList
          data={lists}
          keyExtractor={(item) => item.key.toString()}
          renderItem={({ item, index }) => (
            <StyledView
              className={`w-full mb-4 ${index > 0 ? "mt-2" : "mt-4"}`}
            >
              <HorizontalList data={data[item.key].data} listItem={item} />
            </StyledView>
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </StyledView>
  );
};

export default Home;
