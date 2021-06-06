import React from "react";
import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  Image,
  SafeAreaView,
  Platform,
} from "react-native";
import { FontAwesome, Feather, Ionicons, AntDesign } from "@expo/vector-icons";
import MenuButtonProfil from "../components/MenuButtonProfil";
import { TouchableHighlight } from "react-native-gesture-handler";

const Profile = () => {
  const colorIcon = "blue";

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView>
        <View style={{ paddingHorizontal: 15, height: "18%" }}></View>
        <View style={styles.bodyCard}>
          <View style={styles.topCard}>
            {/*<Image
              source={require("../assets/icons/reminders_icons.png")}
              style={styles.avatar}
            />*/}
            <FontAwesome name="user-circle" size={80} color="black" />
            <View style={styles.infoUserText}>
              <Text style={styles.nameUser}>Assadi Halifa</Text>
              <Text style={styles.jobUser}>Developpeur web junior</Text>
            </View>
          </View>
          <View style={{ marginTop: 120, height: "100%" }}>
            <View style={styles.rowSection}>
              <MenuButtonProfil
                title="Mes Entreprise"
                icon={
                  <FontAwesome name="building-o" size={24} color={colorIcon} />
                }
              />

              <MenuButtonProfil
                title="Mes Entretiens / RDV"
                icon={
                  <Ionicons name="calendar-sharp" size={24} color={colorIcon} />
                }
              />
            </View>
            <View style={styles.rowSection}>
              <MenuButtonProfil
                title="Mes Coordonées"
                icon={
                  <FontAwesome name="wpforms" size={24} color={colorIcon} />
                }
              />
              <MenuButtonProfil
                title="A propos"
                icon={
                  <Ionicons
                    name="information-circle-outline"
                    size={24}
                    color={colorIcon}
                  />
                }
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "blue",
  },
  bodyCard: {
    minHeight: "100%",
    backgroundColor: "rgba(250,255,255,1)",
    paddingHorizontal: 15,
    paddingVertical: 10,
    position: "relative",
  },
  topCard: {
    backgroundColor: "rgba(240,240,240,1)",
    width: "90%",
    paddingVertical: 25,
    paddingHorizontal: 20,
    justifyContent: "center",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    position: "absolute",
    transform: [{ translateY: -90 }],
    shadowColor: "rgba(24,97,130,1)",
    shadowOffset: {
      width: 8,
      height: 5,
    },
    shadowOpacity: 0.35,
    shadowRadius: 3.5,
    elevation: 5,
  },
  avatar: {
    resizeMode: "cover",
    height: 80,
    width: 80,
  },
  infoUserText: { marginTop: 15 },
  nameUser: { fontWeight: "bold", fontSize: 18, textAlign: "center" },
  jobUser: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    color: "grey",
  },
  rowSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: "12%",
    marginBottom: 10,
  },
});

export default Profile;
