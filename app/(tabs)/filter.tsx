import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, ScrollView } from "react-native";
import { Href, Link, useRouter } from "expo-router";
import {
  StyledImage,
  StyledText,
  StyledTouchableOpacity,
  StyledView,
} from "@/components/NativeStyled";
import { ListItem } from "@rneui/themed";

import DropdownSelect from "./../../components/DropdownSelect";
import { AnimeFilterResponseType, filtersType } from "@/constants/types";
import { filterData } from "@/constants/filterData";
import { genres } from "@/constants/genres";
import Button from "@/components/Button";
import icons from "@/constants/Icons";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchFilteredData } from "@/redux/reducers/filterSlice";
import Pagination from "@/components/Pagination";

export interface ScrollableListType {
  filters: filtersType;
  setFilters: React.Dispatch<React.SetStateAction<filtersType>>;
}

export const ScrollableList: React.FC<ScrollableListType> = ({
  filters,
  setFilters,
}) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const getPlaceholder = () => {
    const placeholderArr: string[] = genres
      .filter((item) => filters.genres.includes(item.mal_id))
      .map((genre) => genre.name)
      .filter((item, i: number) => i < 2);

    const placeholderStr: string =
      placeholderArr.join(", ") + (filters.genres.length > 2 ? "..." : "");

    return placeholderStr;
  };

  return (
    <StyledView className="w-full">
      <StyledText className="text-base font-medium mb-1">Genres</StyledText>
      <StyledView className="w-full shadow-sm border border-gray-300 font-regular rounded-md overflow-hidden mb-2">
        <ListItem.Accordion
          content={
            <>
              <ListItem.Content>
                <ListItem.Title>
                  <StyledText
                    numberOfLines={1}
                    className="w-32 text-sm font-regular"
                  >
                    {filters.genres && filters.genres.length > 0
                      ? getPlaceholder()
                      : `Select Genre`}
                  </StyledText>
                </ListItem.Title>
              </ListItem.Content>
            </>
          }
          isExpanded={expanded}
          onPress={() => {
            setExpanded(!expanded);
          }}
        >
          <ListItem containerStyle={{ padding: 0 }} topDivider>
            <ListItem.Content>
              <StyledView className="w-full h-80">
                <FlatList
                  data={[1]}
                  keyExtractor={(item) => item.toString()}
                  renderItem={({ item }) => (
                    <StyledView
                      className="w-full flex-row flex-wrap justify-start items-start p-3"
                      key={item}
                    >
                      {genres.map((g, i: number) => (
                        <StyledTouchableOpacity
                          onPress={() =>
                            setFilters((prev) => {
                              let prevG = prev.genres;
                              if (prevG.includes(g.mal_id)) {
                                prevG = prevG.filter((id) => id !== g.mal_id);
                              } else {
                                prevG.push(g.mal_id);
                              }

                              return {
                                ...prev,
                                genres: prevG,
                              };
                            })
                          }
                          className={`grow items-center rounded-[4px] shadow-sm border border-gray-300 ${
                            filters.genres.includes(g.mal_id)
                              ? "bg-button/30"
                              : "bg-white"
                          } px-2 py-1 mr-1 mb-1`}
                          key={i}
                        >
                          <StyledText className="text-sm font-regular">
                            {g.name}
                          </StyledText>
                        </StyledTouchableOpacity>
                      ))}
                    </StyledView>
                  )}
                />
              </StyledView>
            </ListItem.Content>
          </ListItem>
        </ListItem.Accordion>
      </StyledView>
    </StyledView>
  );
};

export const FilteredDataList: React.FC<{
  data: AnimeFilterResponseType;
}> = ({ data }) => {
  const router = useRouter();

  const posterWidth: string = `${Dimensions.get("window").width / 2 - 16}px`;

  return (
    <StyledView className="w-full flex-row justify-start items-start">
      {
        <FlatList
          data={data?.data}
          keyExtractor={(item) => item?.mal_id.toString()}
          renderItem={({ item, index }) => (
            <>
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
            </>
          )}
          numColumns={2}
        />
      }
    </StyledView>
  );
};

const initialFilters: filtersType = {
  type: "",
  rating: "",
  startDate: null,
  endDate: null,
  minScore: 0,
  status: "",
  orderBy: "",
  sortBy: "",
  genres: [],
  page: 1,
};

const Filter: React.FC = () => {
  const dispatch = useAppDispatch();

  const [filters, setFilters] = useState<filtersType>(initialFilters);

  const data: AnimeFilterResponseType | null = useAppSelector(
    (state) => state.filterTab.data
  );
  const isLoading: boolean = useAppSelector(
    (state) => state.filterTab.isLoading
  );

  const [showFilters, setShowFilters] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  const getFilteredData = () => {
    dispatch(fetchFilteredData(filters));
  };

  useEffect(() => {
    if (data) {
      setShowFilters(false);
    } else {
      setShowFilters(true);
    }
  }, [data]);

  useEffect(() => {
    setFilters((prev) => {
      return { ...prev, page: page };
    });
    dispatch(fetchFilteredData({ ...filters, page: page }));
  }, [page]);

  return (
    <>
      <ScrollView>
        <StyledView className="w-full px-4 my-4">
          <StyledView className="w-full flex-row justify-between items-center">
            <StyledText className="text-2xl font-bold">Filter</StyledText>
            <StyledTouchableOpacity
              onPress={() => setShowFilters((prev) => !prev)}
              className={`aspect-square w-7 justify-center items-center border border-gray-300 rounded-md ${
                showFilters ? "bg-button/70" : "bg-white"
              }`}
            >
              <StyledImage
                source={icons.filter}
                resizeMode="contain"
                tintColor={showFilters ? "black" : "black"}
                className="w-4 h-4"
              />
            </StyledTouchableOpacity>
          </StyledView>

          <StyledView
            className={`w-full bg-white rounded-lg p-4 mt-2 ${
              showFilters ? "flex" : "hidden"
            }`}
          >
            {filterData.map((filter, i: number) => (
              <StyledView className="w-full justify-start items-start" key={i}>
                <StyledText className="text-base font-medium mb-1">
                  {filter.title}
                </StyledText>
                <DropdownSelect
                  data={filter}
                  selected={filters}
                  setSelected={setFilters}
                />
              </StyledView>
            ))}

            <ScrollableList filters={filters} setFilters={setFilters} />

            <Button
              title="Filter"
              handlePress={getFilteredData}
              containerStyles="mt-2"
              textStyles=""
              isLoading={false}
            />
          </StyledView>
        </StyledView>

        {data && <FilteredDataList data={data} />}

        <StyledView className="w-full px-4">
          {data && (
            <Pagination
              page={filters.page}
              setPage={setPage}
              lastPage={data?.pagination.last_visible_page}
            />
          )}
          {isLoading && (
            <StyledView className="w-full h-60 justify-center items-center">
              <StyledText className="text-base font-semibold">
                Loading...
              </StyledText>
            </StyledView>
          )}
        </StyledView>
      </ScrollView>
    </>
  );
};

export default Filter;
