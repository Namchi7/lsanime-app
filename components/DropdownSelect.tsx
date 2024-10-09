import React, { useState } from "react";
import { ListItem } from "@rneui/themed";
import { StyledText, StyledView } from "./NativeStyled";

import {
  filterDataRangeType,
  filterDataType,
  filtersType,
} from "./../constants/types";
import { filterData } from "@/constants/filterData";
import { FlatList } from "react-native";

export interface DropdownSelectType {
  data: filterDataType;
  selected: filtersType;
  setSelected: React.Dispatch<React.SetStateAction<filtersType>>;
}

const DropdownSelect: React.FC<DropdownSelectType> = ({
  data,
  selected,
  setSelected,
}) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [selectedValName, setSelectedValName] = useState<
    string | number | undefined
  >();

  const currentYear = new Date().getFullYear();

  const getArrayFromRange = () => {
    if (data.range) {
      const { start, end }: filterDataRangeType = data.range;
      const endValue = end === "today" ? currentYear : end;

      const rangeArray: number[] = Array.from(
        { length: endValue - start + 1 },
        (_, i: number) => start + i
      );

      return rangeArray.reverse();
    }
  };

  const getFromObj = (x: string | number | undefined) => {
    const y = filterData.filter((item) => item.set_to_key === data.set_to_key);

    const t = y[0].options?.filter((item) => item.value === x);
    if (t && t[0]?.name) {
      setSelectedValName(t[0]?.name);
    }
  };

  const setSelectedValue = (val: string | number | undefined) => {
    if (data.type === "range") {
      setSelectedValName(val);
    } else {
      getFromObj(val);
    }

    setSelected((prev) => {
      return { ...prev, [data.set_to_key as keyof typeof selected]: val };
    });
  };

  // const list2 = new Array(5).fill(1);

  return (
    <StyledView className="w-full rounded-md overflow-hidden shadow-sm border border-gray-300 mb-2 font-regular">
      <ListItem.Accordion
        content={
          <>
            <ListItem.Content>
              <ListItem.Title>
                <StyledText className="text-sm font-regular">
                  {selected[data.set_to_key as keyof typeof selected]
                    ? selectedValName
                    : `Select ${data.title}`}
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
        <ListItem
          onPress={() => {
            setSelectedValue("");
            setExpanded(false);
          }}
          topDivider
        >
          <ListItem.Content>
            <ListItem.Title>
              <StyledText className="text-sm font-regular">Any</StyledText>
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>

        {data?.type === "list" && (
          <StyledView className="w-full max-h-52">
            <FlatList
              data={data.options}
              keyExtractor={(item) => item.value}
              renderItem={({ item, index }) => (
                <ListItem
                  key={index}
                  onPress={() => {
                    setSelectedValue(item?.value);
                    // setSelected(item?.value);
                    setExpanded(false);
                  }}
                  topDivider
                  // bottomDivider
                >
                  <ListItem.Content>
                    <ListItem.Title>
                      <StyledText className="text-sm font-regular">
                        {item?.name}
                      </StyledText>
                    </ListItem.Title>
                  </ListItem.Content>
                </ListItem>
              )}
            />
          </StyledView>
        )}
        {/* {data?.type === "list" &&
          data?.options?.map((item, i: number) => (
            <ListItem
              key={i}
              onPress={() => {
                setSelectedValue(item?.value);
                // setSelected(item?.value);
                setExpanded(false);
              }}
              topDivider
              // bottomDivider
            >
              <ListItem.Content>
                <ListItem.Title>{item?.name}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          ))} */}

        {data?.type === "range" &&
          data?.range &&
          getArrayFromRange()?.map((year, i: number) => (
            <ListItem
              key={i}
              onPress={() => {
                setSelectedValue(year);
                // setSelected(year);
                setExpanded(false);
              }}
              topDivider
              // bottomDivider
            >
              <ListItem.Content>
                <ListItem.Title>{year}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          ))}
      </ListItem.Accordion>
    </StyledView>
  );
};

export default DropdownSelect;
