import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { get_entreprise_single } from "../redux/action/EntrepriseAction";
import { AntDesign } from "@expo/vector-icons";
const SingleEntreprise = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [state, setState] = useState({ id: "", token: "", userId: "" });
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const [editData, setEditData] = useState({
    nom: "",
    secteur: "",
    adresse: "",
    ville: "",
    codePostal: "",
    description: "",
    checked: false,
    telephone: "",
    email: "",
    siteWeb: "",
    updateAt: "2021-06-22T17:35:51.498Z",
  });

  const [editMode, setEditMode] = useState(false);

  const entrepriseData = useSelector((state) => state.entrepriseReducer);
  const authenticate = useSelector((state) => state.authenticateReducer);
  const { id } = route.params;

  useEffect(() => {
    (async () => {
      try {
        await setState({
          ...state,
          id: id,
          token: authenticate.accessToken,
          userId: authenticate.userId,
        });
        await dispatch(get_entreprise_single(state.token, id));
        await setEditData({
          ...editData,
          nom: entrepriseData.currentData.nom,
          secteur: entrepriseData.currentData.secteur,
          adresse: entrepriseData.currentData.adresse,
          ville: entrepriseData.currentData.ville,
          codePostal: entrepriseData.currentData.codePostal,
          description: entrepriseData.currentData.description,
          checked: entrepriseData.currentData.checked,
          telephone: entrepriseData.currentData.telephone,
          email: entrepriseData.currentData.email,
          siteWeb: entrepriseData.currentData.siteWeb,
          updateAt: new Date(),
          userId: `\/api\/users\/${state.userId}`,
        });
        navigation.setOptions({
          headerTitle: entrepriseData.currentData.nom,
          headerRight: () => (
            <TouchableWithoutFeedback
              onPress={() => {
                setEditMode(!editMode);
              }}
            >
              <View style={styles.hedearBar}>
                <AntDesign name="edit" size={24} color="purple" />
              </View>
            </TouchableWithoutFeedback>
          ),
        });
        setIsLoading(entrepriseData.isLoading);
      } catch (error) {}
    })();
  }, [dispatch, isLoading, editMode]);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <ScrollView style={styles.wrapper}>
          {editMode ? (
            <View>
              <Text>Editer</Text>
            </View>
          ) : (
            <View>{!isLoading && <Text> Normal </Text>}</View>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default SingleEntreprise;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  hedearBar: {
    right: 20,
    justifyContent: "center",
    alignContent: "center",
    padding: 8,
  },
  wrapper: {
    paddingVertical: 15,
  },
});
