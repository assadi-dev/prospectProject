import React from "react";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CardListViewEntreprise from "../components/CardListViewEntreprise";
import CardListViewRDV from "../components/CardListViewRDV";
import {
  get_entreprise,
  get_entreprise_check,
  get_entreprise_unCheck,
} from "../redux/action/EntrepriseAction";
import {
  get_rendez_vous,
  get_rendez_vous_uncheck,
  get_rendez_vous_checked,
} from "../redux/action/RendezVousAction";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const userConnect = useSelector((state) => state.authenticateReducer);
  const listEntreprise = useSelector((state) => state.entrepriseReducer);
  const listRendezVous = useSelector((state) => state.rendezVousReducer);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState("");

  useEffect(() => {
    (async () => {
      if (userConnect.accessToken) {
        setToken(userConnect.accessToken);
      }
      try {
        await dispatch(get_entreprise_unCheck(token));
        await dispatch(get_entreprise_check(token));
        await dispatch(get_rendez_vous_uncheck(token));
        await dispatch(get_rendez_vous_checked(token));
        await setIsLoading(listEntreprise.isLoading);
      } catch (error) {}
    })();
  }, [dispatch, isLoading]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

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
                {`Vous avez passé ${
                  listRendezVous ? listRendezVous.checkCollection.length : 0
                } Entretiens`}
              </Text>
              <Text style={[styles.colorText, styles.infoText]}>
                {` Vous avez prospecté ${
                  listEntreprise.checkCollection
                    ? listEntreprise.checkCollection.length
                    : 0
                } entreprises`}
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
                {listEntreprise.unCheckCollection &&
                  listEntreprise.unCheckCollection
                    .map((item) => (
                      <CardListViewEntreprise
                        key={item.id}
                        id={item.id}
                        nom={item.nom}
                        checked={item.checked}
                      />
                    ))
                    .slice(0, 5)}
              </View>
              <Text style={{ color: "grey", fontWeight: "bold" }}>
                Vos Prochaines Entretiens
              </Text>
              <View style={{ padding: 5, marginBottom: 50 }}>
                {listRendezVous.unCheckCollection &&
                  listRendezVous.unCheckCollection
                    .map((item) => (
                      <CardListViewRDV
                        key={item.id}
                        id={item.id}
                        nom={item.nom}
                        date={item.date}
                        checked={item.checked}
                      />
                    ))
                    .slice(0, 5)}
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
    backgroundColor: "rgb(24, 49, 160)",
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
