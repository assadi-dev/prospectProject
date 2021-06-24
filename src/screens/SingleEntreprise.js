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
import SingleEntrepriseSection from "./SingleEntrepriseSection";
import { AntDesign } from "@expo/vector-icons";
import SkeletonContent from "react-native-skeleton-content";
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
    <ScrollView>
      <View style={styles.container}>
        <SafeAreaView>
          {isLoading ? (
            <View
              style={{
                flexDirection: "row",
                marginTop: "18%",
                marginBottom: 50,
              }}
            >
              <SkeletonContent
                containerStyle={{
                  width: "50%",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingHorizontal: 25,
                }}
                layout={[
                  { borderRadius: 100, width: 80, height: 80, marginBottom: 6 },
                ]}
                isLoading={isLoading}
              ></SkeletonContent>
              <SkeletonContent
                containerStyle={{
                  width: "50%",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingHorizontal: 25,
                }}
                layout={[
                  { width: "100%", height: 20, marginBottom: 8 },
                  { width: "100%", height: 20, marginBottom: 8 },
                  { width: "100%", height: 20, marginBottom: 8 },
                  { width: "100%", height: 20, marginBottom: 8 },
                ]}
                isLoading={isLoading}
              ></SkeletonContent>
            </View>
          ) : null}
          <SkeletonContent
            containerStyle={{
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 25,
            }}
            isLoading={isLoading}
            layout={[
              { key: "someId", width: "100%", height: 150, marginBottom: 6 },
            ]}
          >
            {!editMode ? <SingleEntrepriseSection data={editData} /> : null}
          </SkeletonContent>
        </SafeAreaView>
      </View>
    </ScrollView>
  );
};

export default SingleEntreprise;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "20%",
  },
  hedearBar: {
    right: 20,
    justifyContent: "center",
    alignContent: "center",
    padding: 8,
  },
  wrapper: {
    paddingVertical: 10,
  },
});
