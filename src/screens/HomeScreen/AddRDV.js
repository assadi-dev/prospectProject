import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  Platform,
} from "react-native";
import Swiper from "react-native-swiper";
import { MaterialIcons } from "@expo/vector-icons";
import SwipeButton from "./SwipeButton";
import {
  FontAwesome,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Ripple from "react-native-material-ripple";
import DateTimePicker from "@react-native-community/datetimepicker";
import { getDateFull, getFullHour, getfullNumber } from "../../config/Utils";
import * as Calendar from "expo-calendar";

const AddRDV = () => {
  const windowWidth = Dimensions.get("window").width;
  const errorInput = { borderColor: "red", borderWidth: 1 };
  const colorIcon = "#fff";
  const colorPlaceHolder = "rgba(255,255,255,0.5)";
  const [inputValues, setInputValue] = useState({
    name: "",
    activity: "",
    date: `${getfullNumber(new Date().getDate())} / ${getfullNumber(
      new Date().getMonth()
    )} / ${new Date().getFullYear()} `,
    time: `${getfullNumber(
      new Date().getHours()
    )} h ${new Date().getMinutes()}`,
    description: "",
  });

  const [timeStampDate, setTimeStampDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    const dateToString = new Date(currentDate);
    setShow(Platform.OS === "ios");
    setTimeStampDate(currentDate);
    setInputValue({
      ...inputValues,
      date: `${getfullNumber(dateToString.getDate())} / ${getfullNumber(
        dateToString.getMonth()
      )} / ${getfullNumber(dateToString.getFullYear())}`,
      time: `${getfullNumber(dateToString.getHours())} h ${getfullNumber(
        dateToString.getMinutes()
      )}`,
    });
  };

  const showMode = (currentMode) => {
    setShow(!show);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  return (
    <Swiper
      dotStyle={{ marginBottom: 100, display: "none" }}
      activeDotStyle={{ marginBottom: 100, display: "none" }}
      buttonWrapperStyle={{
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
      style={styles.wrapper}
      loop={false}
      scrollEnabled={false}
      showsButtons={inputValues.name ? true : false}
      nextButton={
        <SwipeButton
          style={[styles.nextButton, { display: "" }]}
          textColor={"#fff"}
          backgroundColor="purple"
          title="Suivant"
        />
      }
      prevButton={
        <SwipeButton
          style={[styles.nextButton]}
          textColor={"#fff"}
          backgroundColor="orange"
          title="Précedent"
          display="none"
        />
      }
    >
      <View testID="InfoEntreprise" style={styles.slide1}>
        <SafeAreaView>
          <View
            style={{
              position: "relative",
              top: -50,
              width: "80%",
            }}
          >
            <Text style={styles.text}>Information sur le rendez-vous</Text>
            <View style={styles.iconSection}>
              <Image
                style={styles.imageIcon}
                source={require("../../assets/icons/calendarColor.png")}
              />
            </View>
            <TextInput
              placeholder="Nom de l'entreprise"
              style={[styles.input]}
              clearButtonMode="always"
              placeholderTextColor={colorPlaceHolder}
              name="name"
              onChangeText={(name) =>
                setInputValue({ ...inputValues, name: name })
              }
            />
            <TextInput
              placeholder="Description"
              style={styles.input}
              clearButtonMode="always"
              placeholderTextColor={colorPlaceHolder}
              onChangeText={(description) =>
                setInputValue({ ...inputValues, description: description })
              }
            />
            {inputValues.date != "" && (
              <TextInput
                placeholder="Date et heure"
                style={styles.input}
                editable={false}
                placeholderTextColor={colorPlaceHolder}
                value={`${inputValues.date} à ${inputValues.time}`}
              />
            )}

            <View style={styles.timeSection}>
              <TouchableOpacity onPress={showDatepicker}>
                <View style={styles.calendarButton}>
                  <Ionicons name="calendar" size={24} color="black" />
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={showTimepicker}>
                <View style={styles.calendarButton}>
                  <MaterialCommunityIcons
                    name="clock-digital"
                    size={24}
                    color="black"
                  />
                </View>
              </TouchableOpacity>
            </View>

            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={timeStampDate}
                mode={mode}
                is24Hour={true}
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={onChange}
                locale="fr-FR"
              />
            )}
          </View>
        </SafeAreaView>
      </View>

      <View testID="Simple" style={styles.slide3}>
        <SafeAreaView style={styles.slideContent}>
          <View style={styles.presentationRow}>
            <Image
              style={styles.imageResume}
              source={require("../../assets/icons/id-card.png")}
            />
            <View style={styles.resumSection}>
              <Text
                numberOfLines={2}
                style={[styles.titleResume, styles.textColor]}
              >
                Resumé
              </Text>
              <Text numberOfLines={2} style={styles.textResume}>
                {inputValues.activity}
              </Text>
              <View style={styles.hairLine} />
              <Text style={styles.textResume}>
                Ajouter sur votre calendrier ?
              </Text>

              <Text style={styles.textResume}>{inputValues.email}</Text>
            </View>
          </View>
          <View style={styles.addressRow}>
            <View style={styles.addressCard}>
              <Text numberOfLines={2} style={styles.textResume}>
                {`Vous avez rendez-vous avec`}
              </Text>
              <Text numberOfLines={2} style={styles.nameResume}>
                {inputValues.name}
              </Text>
              <Text numberOfLines={2} style={styles.textResume}>
                {`Le ${getDateFull(timeStampDate)}`}
              </Text>
              <Text numberOfLines={2} style={styles.textResume}>
                {`à ${getFullHour(timeStampDate)}`}
              </Text>
              <Text style={styles.addCalendar}>
                Ajouter dans votre calendrier
              </Text>
              <TouchableOpacity>
                <View style={styles.calendarAddButton}>
                  <MaterialCommunityIcons
                    name="calendar-plus"
                    size={24}
                    color="black"
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <Ripple>
            <View style={styles.addButton}>
              <Text style={styles.textButton}>Enregistrer</Text>
            </View>
          </Ripple>
        </SafeAreaView>
      </View>
    </Swiper>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#92BBD9",
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#97CAE5",
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#92BBD9",
  },
  text: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },

  input: {
    marginVertical: 10,
    height: 50,
    padding: 10,
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 10,
    color: "#fff",
    fontSize: 18,
    maxWidth: "100%",
  },
  iconSection: {
    backgroundColor: "rgba(255,255,255,0)",
    borderRadius: 10,
    height: 90,
    width: 90,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    resizeMode: "cover",
    marginVertical: 10,
    padding: 5,
  },
  imageIcon: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  slideContent: {
    height: "75%",
    alignItems: "center",
    width: "90%",
  },
  presentationRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  imageResume: {
    width: 80,
    height: 80,
    resizeMode: "cover",
  },
  resumSection: {
    marginBottom: 5,
    maxWidth: "65%",
  },

  titleResume: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10,
  },
  nameResume: {
    fontSize: 18,
    color: "rgba(255,255,255,0.7)",
    fontWeight: "900",
  },
  textResume: {
    fontSize: 18,
    color: "rgba(255,255,255,0.7)",
  },
  addressResume: {
    fontSize: 18,
    color: "rgba(255,255,255,0.7)",
    marginVertical: 5,
  },
  addCalendar: {
    fontSize: 15,
    color: "rgba(255,255,255,0.7)",
    marginVertical: 5,
  },
  hairLine: {
    height: 2,
    backgroundColor: "rgba(255,255,255,0.2)",
    marginVertical: 15,
    width: "90%",
    alignSelf: "center",
    borderRadius: 50,
  },
  addressRow: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 35,
  },
  addressCard: {
    paddingHorizontal: 15,
    paddingVertical: 25,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 10,
    width: "90%",
    alignItems: "center",
    marginBottom: 25,
    shadowColor: "rgba(0, 0, 0, 0.6)",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 1,
  },
  textColor: {
    color: "#fff",
  },
  addButton: {
    padding: 20,
    width: 130,
    backgroundColor: "#20c997",
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "rgba(0, 0, 0, 0.8)",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.5,
    elevation: 1,
  },
  textButton: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 15,
  },
  timeSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
  },
  calendarButton: {
    width: 50,
    height: 50,
    padding: 10,
    margin: 5,
    backgroundColor: "orange",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
  calendarAddButton: {
    width: 40,
    height: 40,
    padding: 5,
    marginTop: 15,
    backgroundColor: "orange",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
});

export default AddRDV;
