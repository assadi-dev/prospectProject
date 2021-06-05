import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import Profile from "../screens/Profile";
import Stats from "../screens/Stats";
import EmptyScreen from "../screens/EmptyScreen";
import AddButton from "./AddButton";
import MenuIconButton from "./MenuIconButton";
import { Ionicons, Entypo, FontAwesome, Feather } from "@expo/vector-icons";

const TabBar = createBottomTabNavigator();

const Tabs = () => {
  return (
    <TabBar.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        showLabel: false,
        style: {
          elevation: 0,
          position: "absolute",
          bottom: 15,
          left: 20,
          right: 20,
          height: 60,
          borderRadius: 15,
          ...styles.shadow,
        },
      }}
    >
      <TabBar.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <MenuIconButton
              focused={focused}
              label="Accueil"
              color={focused ? "blue" : "rgba(93,44,97,0.5)"}
              icon={
                <Feather
                  name="home"
                  size={20}
                  color={focused ? "blue" : "rgba(93,44,97,0.5)"}
                />
              }
            />
          ),
        }}
      />
      <TabBar.Screen
        name="Add"
        component={EmptyScreen}
        options={{
          tabBarButton: () => <AddButton />,
        }}
      />

      <TabBar.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <MenuIconButton
              focused={focused}
              label="Mon Profil"
              color={focused ? "blue" : "rgba(93,44,97,0.5)"}
              icon={
                <FontAwesome
                  name="user-circle-o"
                  size={20}
                  color={focused ? "blue" : "rgba(93,44,97,0.5)"}
                />
              }
            />
          ),
        }}
      />
    </TabBar.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default Tabs;
