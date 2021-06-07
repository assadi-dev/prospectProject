import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Tabs from "./src/navigation/Tabs";
import { createStackNavigator } from "@react-navigation/stack";
import EmptyScreen from "./src/screens/EmptyScreen";
import AddSociety from "./src/screens/HomeScreen/AddSociety";
import ListEntrprise from "./src/screens/ListEntrprise";
import ListRendezVous from "./src/screens/HomeScreen/ListRendezVous";
import Informations from "./src/screens/Informations";
import About from "./src/screens/About";

export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{
          headerTintColor: "purple",
          headerShown: false,
          headerBackTitleVisible: false,
          headerTransparent: true,
          headerStyle: {
            shadowColor: "transparent",
          },
        }}
      >
        <Stack.Screen name="Main" component={Tabs} />
        <Stack.Screen
          options={{ headerShown: true, headerTitle: "Ajouter une Entreprise" }}
          name="AddSociety"
          component={AddSociety}
        />
        <Stack.Screen
          options={{ headerShown: true, headerTitle: "Ajouter Rendez-vous" }}
          name="AddRDV"
          component={EmptyScreen}
        />
        <Stack.Screen
          options={{ headerShown: true, headerTitle: "Mes Entreprises" }}
          name="listEntreprises"
          component={ListEntrprise}
        />
        <Stack.Screen
          options={{ headerShown: true, headerTitle: "Mes Rendez-vous" }}
          name="listRdv"
          component={ListRendezVous}
        />
        <Stack.Screen
          options={{ headerShown: true, headerTitle: "Mes Informations" }}
          name="informations"
          component={Informations}
        />
        <Stack.Screen
          options={{ headerShown: true, headerTitle: "A Propos" }}
          name="about"
          component={About}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
