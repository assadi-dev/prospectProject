import React , { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView,
  Image,
  StatusBar,
  Animated,
  TouchableOpacity,
  TextInput
} from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import CardListViewRDV from "../../components/CardListViewRDV";
import HiddenLeftButton from "../../components/HiddenLeftButtons";
import { Feather } from "@expo/vector-icons";


  const listDataS = [
    { key: "1", title: "Axiom", checked: false },
    { key: "2", title: "Axa", checked: true },
    { key: "3", title: "Groupama", checked: true },
    { key: "4", title: "Credit Agricole", checked: false },
    { key: "5", title: "Credit Agricole", checked: false },
    { key: "6", title: "Credit Agricole", checked: false },
    { key: "7", title: "Credit Agricole", checked: false },
    { key: "8", title: "Credit Agricole", checked: false },
  ];


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
  
};


const renderItem = (data, rowMap) => {
  return <CardListViewRDV />;
};


const ListRendezVous = () => {
  const [fadeAnimation, setFadeAnimation] = useState(new Animated.Value(0));
  const [listData, setListData] = useState(listDataS);
  const [isRowOpen, setIsRowOpen] = useState(false);

  


  const renderHiddenItem = (data, rowMap) => {
    return (
      <HiddenLeftButton
        data={data}
        rowMap={rowMap}
        onClose={() => closeRow(rowMap, data.item.key)}
        onDelete={() => deleteRow(rowMap, data.item.key)}
       
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
              <Text style={[styles.colorText, styles.titleText]}>50</Text>{" "}
              Rendez-vous enregistrées
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
            source={require("../../assets/icons/calendarColor.png")}
            style={styles.iconReminders}
          />
        </View>
        <View style={styles.sectionList}>
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
            rightActivationValue={-200}
            rightActionValue={0}
          />
        </View>
      </SafeAreaView>
    </View>
  
  );
};

export default ListRendezVous;

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
    alignItems:"center"
  },
  input: {
    color: "#fff",
    marginLeft: 3,
    width: "100%",
  },
});
