import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Image,
  StatusBar,
  TouchableWithoutFeedback,
} from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import CardListViewEntreprise from "../components/CardListViewEntreprise";
import HiddenLeftButtons from "../components/HiddenLeftButtons";

const listData = [
  { id: 1, title: "Axiom", checked: false },
  { id: 2, title: "Axa", checked: true },
  { id: 3, title: "Groupama", checked: true },
  { id: 4, title: "Credit Agricole", checked: false },
  { id: 5, title: "Credit Agricole", checked: false },
  { id: 6, title: "Credit Agricole", checked: false },
  { id: 7, title: "Credit Agricole", checked: false },
  { id: 8, title: "Credit Agricole", checked: false },
];

const renderItem = (data, rowMap) => {
  return <CardListViewEntreprise />;
};

const renderHiddenItem = (data, rowMap) => {
  return (
    <TouchableWithoutFeedback onPress={console.log("close")}>
      <HiddenLeftButtons id={data} rowMap={rowMap} />
    </TouchableWithoutFeedback>
  );
};

const closeRows = (rowMap, rowKey) => {
  if (rowMap[rowKey]) {
    rowMap[rowKey].closeRow();
  }
};

const ListEntrprise = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView>
        <View style={styles.topCard}>
          <View style={{ width: "77%" }}>
            <Text style={[styles.colorText, styles.titleText]}>50</Text>

            <Text
              style={[styles.colorText, styles.infoText, { marginBottom: 5 }]}
            >
              Vous avez prospecté 10 sur 50
            </Text>
          </View>
          <Image
            source={require("../assets/icons/reminders_icons.png")}
            style={styles.iconReminders}
          />
        </View>
        <View style={styles.sectionList}>
          <SwipeListView
            data={listData}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            keyExtractor={listData.id}
            showsVerticalScrollIndicator={false}
            rightOpenValue={-136}
            disableRightSwipe={true}
          />
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
});
