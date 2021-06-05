import React from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Image,
} from "react-native";
import CardListViewEntreprise from "../components/CardListViewEntreprise";
import CardListViewRDV from "../components/CardListViewRDV";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="blue" />

      <SafeAreaView>
        <View style={{ paddingHorizontal: 15 }}>
          <View style={styles.welcomCard}>
            <Text style={[styles.colorText, styles.welcomeText]}>
              Bonjour Assadi
            </Text>
            <Text style={[styles.colorText, styles.infoText]}>
              Développeur Web Junior
            </Text>
          </View>

          <View style={styles.topCard}>
            <View style={{ width: "77%" }}>
              <Text style={[styles.colorText, styles.titleText]}>
                Recapulatif
              </Text>

              <Text
                style={[styles.colorText, styles.infoText, { marginBottom: 5 }]}
              >
                Vous avez passé 5 Entretiens
              </Text>
              <Text style={[styles.colorText, styles.infoText]}>
                Vous avez prospecté 5 entreprises
              </Text>
            </View>
            <Image
              source={require("../assets/icons/reminders_icons.png")}
              style={styles.iconReminders}
            />
          </View>
        </View>
        <View style={styles.bodyCard}>
          <View style={{ height: "45%" }}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={{ color: "grey", fontWeight: "bold" }}>
                Derniere(s) Entreprises Ajouté
              </Text>
              <View style={{ padding: 5 }}>
                <CardListViewEntreprise />
                <CardListViewEntreprise />
              </View>
              <Text style={{ color: "grey", fontWeight: "bold" }}>
                Vos Prochaines Entretiens
              </Text>
              <View style={{ padding: 5, marginBottom: 50 }}>
                <CardListViewRDV />
                <CardListViewRDV />
              </View>
            </ScrollView>
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
  topCard: {
    backgroundColor: "rgba(255,255,255,0.5)",
    width: "100%",
    paddingVertical: 18,
    paddingHorizontal: 20,
    justifyContent: "center",
    borderRadius: 8,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  colorText: {
    color: "rgba(255,255,255,1)",
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 20,
  },
  infoText: {
    fontWeight: "400",
  },
  welcomCard: {
    marginVertical: 15,
  },
  bodyCard: {
    minHeight: "100%",
    backgroundColor: "rgba(250,255,255,1)",
    paddingHorizontal: 15,
    paddingVertical: 10,
    position: "relative",
  },
  iconReminders: {
    resizeMode: "cover",
    height: 80,
    width: 80,
  },
});

export default HomeScreen;
