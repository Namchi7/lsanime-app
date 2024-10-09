import React from "react";
import { Tabs } from "expo-router";

import { StyledSafeAreaView } from "@/components/NativeStyled";
import icons from "../../constants/Icons";
import TabBarIcon from "@/components/navigation/TabBarIcon";
import Header from "@/components/Header";
import { StatusBar } from "expo-status-bar";

const TabsLayout: React.FC = () => {
  return (
    <>
      <StyledSafeAreaView className="w-full h-full">
        <Header />

        <Tabs
          screenOptions={{
            tabBarShowLabel: false,
            tabBarActiveTintColor: "#ffeb33",
            tabBarInactiveTintColor: "#ffffff",
            tabBarStyle: {
              backgroundColor: "#33367E",
              borderTopWidth: 1,
              borderTopColor: "#36889A",
              height: 70,
            },
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: "Home",
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon
                  icon={icons.home}
                  color={color}
                  name="Home"
                  focused={focused}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="explore"
            options={{
              title: "Explore",
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon
                  icon={icons.explore}
                  color={color}
                  name="Explore"
                  focused={focused}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="search"
            options={{
              title: "Search",
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon
                  icon={icons.search}
                  color={color}
                  name="Search"
                  focused={focused}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="filter"
            options={{
              title: "Filter",
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon
                  icon={icons.filter}
                  color={color}
                  name="Filter"
                  focused={focused}
                />
              ),
            }}
          />
        </Tabs>

        <StatusBar backgroundColor="#33367E" style="light" />
      </StyledSafeAreaView>
    </>
  );
};

export default TabsLayout;
