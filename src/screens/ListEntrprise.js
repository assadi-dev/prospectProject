import React, { useState, useEffect } from "react";

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Image,
  StatusBar,
  Animated,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Ripple from "react-native-material-ripple";
import { SwipeListView } from "react-native-swipe-list-view";
import CardListViewEntreprise from "../components/CardListViewEntreprise";
import HiddenButtons from "../components/HiddenButtons";
import HiddenLeftButton from "../components/HiddenLeftButtons";
import { Feather } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import {
  delete_entreprise,
  get_entreprise,
} from "../redux/action/EntrepriseAction";
import { useNavigation } from "@react-navigation/native";

const ListEntrprise = () => {
  const [fadeAnimation, setFadeAnimation] = useState(new Animated.Value(0));
  const [isLoading, setIsloadig] = useState(true);
  const listEntreprise = useSelector((state) => state.entrepriseReducer);
  const userToken = useSelector(
    (state) => state.authenticateReducer.accessToken
  );
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [listData, setListData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    (async () => {
      if (userToken) {
        await dispatch(get_entreprise(userToken));
      }
      if (listEntreprise) {
        const listEntrepriseData = listEntreprise.dataCollection.map(
          (data) => ({
            key: data.id.toString(),
            nom: data.nom,
            checked: data.checked,
          })
        );
        const array = listEntrepriseData.filter((item) => {
          return item.nom.toLowerCase().includes(searchTerm.toLowerCase());
        });

        setListData(array);
        setIsloadig(listEntreprise.isLoading);
      }
    })();
  }, [dispatch, isLoading, searchTerm]);

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const detail = async (rowMap, rowKey) => {
    await closeRow(rowMap, rowKey);
    navigation.navigate("informations", { id: rowKey });
  };

  const deleteRow = async (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);

    const newData = [...listData];
    const prevIndex = listData.findIndex((item) => item.key === rowKey);
    newData.splice(prevIndex, 1);
    await dispatch(delete_entreprise(userToken, rowKey)).then(
      setListData(newData)
    );
  };
  const [isRowOpen, setIsRowOpen] = useState(false);
  const onRowDidOpen = () => {
    // console.log("This row opened");
    setIsRowOpen(true);
  };

  const renderItem = (data, rowMap) => {
    return (
      <CardListViewEntreprise
        id={data.item.key}
        nom={data.item.nom}
        checked={data.item.checked}
      />
    );
  };

  const renderHiddenItem = (data, rowMap) => {
    return (
      <HiddenLeftButton
        id={data.item.key}
        rowMap={rowMap}
        onClose={() => detail(rowMap, data.item.key)}
        onDelete={() => deleteRow(rowMap, data.item.key)}
        isRowOpen={isRowOpen}
        navigation={navigation}
        dispatch={dispatch}
        token={userToken}
      />
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.topCard}>
          <View style={{ width: "77%" }}>
            <Text style={[styles.colorText, { marginBottom: 10 }]}>
              <Text style={[styles.colorText, styles.titleText]}>
                {listEntreprise.dataCollection.length != 0
                  ? listEntreprise.dataCollection.length
                  : " "}
              </Text>{" "}
              {listEntreprise.dataCollection.length != 0
                ? `Entreprises enregistrées`
                : `Aucun entreprises enregistrées`}
            </Text>

            <View style={styles.inputContainer}>
              <Feather name="search" size={14} color="rgba(255,255,255,0.5)" />
              <TextInput
                style={styles.input}
                placeholder="Rechercher une entreprise"
                placeholderTextColor="rgba(255,255,255,0.5)"
                selectionColor="rgba(255,255,255,0.5)"
                onChangeText={(term) => setSearchTerm(term)}
              />
            </View>
          </View>
          <Image
            source={require("../assets/icons/reminders_icons.png")}
            style={styles.iconReminders}
          />
        </View>
        <View style={styles.sectionList}>
          {searchTerm ? (
            <View>
              <Text>{`${listData.length} entreprise(s) trouvée(s)`}</Text>
            </View>
          ) : null}
          {listData && (
            <SwipeListView
              data={listData}
              renderItem={renderItem}
              renderHiddenItem={renderHiddenItem}
              keyExtractor={listData.key}
              showsVerticalScrollIndicator={false}
              rightOpenValue={-136}
              disableRightSwipe={true}
              previewRowKey={"0"}
              previewOpenValue={-40}
              previewOpenDelay={3000}
              onRowOpen={onRowDidOpen}
              rightActivationValue={-200}
              rightActionValue={0}
            />
          )}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default ListEntrprise;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  topCard: {
    backgroundColor: "rgba(24, 49, 160,1)",
    width: "100%",
    paddingVertical: 18,
    paddingHorizontal: 20,
    justifyContent: "center",
    borderRadius: 8,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    position: "relative",
    top: 60,
  },
  iconReminders: {
    resizeMode: "cover",
    height: 80,
    width: 80,
  },
  colorText: {
    color: "rgba(255,255,255,1)",
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 28,
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 20,
  },
  infoText: {
    fontWeight: "400",
  },
  sectionList: {
    height: "74%",
    position: "relative",
    top: 60,
    marginBottom: 10,
  },
  inputContainer: {
    backgroundColor: "rgba(255,255,255,0.3)",
    padding: 10,
    width: "90%",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    color: "#fff",
    marginLeft: 3,
    width: "100%",
  },
});
