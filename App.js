import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Tabs from "./src/navigation/Tabs";
import { createStackNavigator } from "@react-navigation/stack";
import EmptyScreen from "./src/screens/EmptyScreen";
import AddSociety from "./src/screens/HomeScreen/AddSociety";
import ListEntrprise from "./src/screens/ListEntrprise";
import ListRendezVous from "./src/screens/HomeScreen/ListRendezVous";
import Informations from "./src/screens/Informations";
import About from "./src/screens/About";
import AddRDV from "./src/screens/HomeScreen/AddRDV";
import LoginPage from "./src/screens/LoginPage";
import { getCachedAuthAsync } from "./src/config/AuthServices";
import { useDispatch, useSelector } from "react-redux";
import rootReducer from "./src/redux/store";
import { login } from "./src/redux/action/AuthAction";
import {
  get_entreprise,
  get_entreprise_unCheck,
} from "./src/redux/action/EntrepriseAction";

export default function App() {
  const Stack = createStackNavigator();

  const dispatch = useDispatch();
  const authenticateUser = useSelector((state) => state.authenticateReducer);

  const [authhenticate, setAuthhenticate] = useState(false);

  useEffect(() => {
    (async () => {
      let cacheAuth = await getCachedAuthAsync();

      if (cacheAuth) {
        try {
          dispatch(login(cacheAuth));
        } catch (error) {
          console.log(error.response.data);
        }
      }
    })();
  }, [dispatch]);

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
        {!authenticateUser.accessToken ? (
          <>
            <Stack.Screen name="login" component={LoginPage} />
          </>
        ) : (
          <>
            <Stack.Screen name="Main" component={Tabs} />
            <Stack.Screen
              options={{
                headerShown: true,
                headerTitle: "Ajouter une Entreprise",
              }}
              name="AddSociety"
              component={AddSociety}
            />
            <Stack.Screen
              options={{
                headerShown: true,
                headerTitle: "Ajouter Rendez-vous",
              }}
              name="AddRDV"
              component={AddRDV}
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
          </>
        )}
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
