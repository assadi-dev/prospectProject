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
import { get_entreprise } from "../redux/action/EntrepriseAction";

const ListEntrprise = () => {
  const [fadeAnimation, setFadeAnimation] = useState(new Animated.Value(0));

  const listEntreprise = useSelector((state) => state.entrepriseReducer);

  const [listData, setListData] = useState({
    key: null,
    nom: null,
    checked: null,
  });

  useEffect(() => {
    (async () => {
      const listEntrepriseData = await listEntreprise.data.map((data) => ({
        key: data.id.toString(),
        nom: data.nom,
        checked: data.checked,
      }));
      setListData(listEntrepriseData);
    })();
  }, []);

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    const newData = [...listData];
    const prevIndex = listData.findIndex((item) => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setListData(newData);
    //sconsole.log("delete");
  };
  const [isRowOpen, setIsRowOpen] = useState(false);
  const onRowDidOpen = () => {
    // console.log("This row opened");
    setIsRowOpen(true);
  };

  const renderItem = (data, rowMap) => {
    return (
      <CardListViewEntreprise
        id={data.item.id}
        nom={data.item.nom}
        checked={data.item.checked}
      />
    );
  };

  const renderHiddenItem = (data, rowMap) => {
    return (
      <HiddenLeftButton
        data={data}
        rowMap={rowMap}
        onClose={() => closeRow(rowMap, data.item.key)}
        onDelete={() => deleteRow(rowMap, data.item.key)}
        isRowOpen={isRowOpen}
      />
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView>
        <View style={styles.topCard}>
          <View style={{ width: "77%" }}>
            <Text style={[styles.colorText, { marginBottom: 10 }]}>
              <Text style={[styles.colorText, styles.titleText]}>
                {listData.length ? listData.length : " "}
              </Text>{" "}
              {listData.length
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
              />
            </View>
          </View>
          <Image
            source={require("../assets/icons/reminders_icons.png")}
            style={styles.iconReminders}
          />
        </View>
        <View style={styles.sectionList}>
          {listData.length && (
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
