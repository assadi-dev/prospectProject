import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import Swiper from "react-native-swiper";
import { MaterialIcons } from "@expo/vector-icons";
import SwipeButton from "./SwipeButton";
import { FontAwesome, Feather, Ionicons, AntDesign } from "@expo/vector-icons";

const AddSociety = () => {
  const windowWidth = Dimensions.get("window").width;
  const errorInput = { borderColor: "red", borderWidth: 1 };
  const colorIcon = "#fff";
  const colorPlaceHolder = "rgba(255,255,255,0.5)";
  return (
    <Swiper
      dotStyle={{ marginBottom: 100 }}
      activeDotStyle={{ marginBottom: 100 }}
      buttonWrapperStyle={{
        flexDirection: "column-reverse",
        justifyContent: "flex-start",
      }}
      style={styles.wrapper}
      loop={false}
      scrollEnabled={false}
      showsButtons={true}
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
            <Text style={styles.text}>Information de l'entreprise</Text>
            <View style={styles.iconSection}>
              <Image
                style={styles.imageIcon}
                source={require("../../assets/icons/id-card.png")}
              />
            </View>
            <TextInput
              placeholder="Nom de l'entreprise"
              style={[styles.input]}
              clearButtonMode="always"
              placeholderTextColor={colorPlaceHolder}
            />
            <TextInput
              placeholder="Secteur d'activité"
              style={styles.input}
              clearButtonMode="always"
              placeholderTextColor={colorPlaceHolder}
            />
            <TextInput
              placeholder="Numéro de téléphone"
              style={styles.input}
              clearButtonMode="always"
              keyboardType="phone-pad"
              placeholderTextColor={colorPlaceHolder}
            />
          </View>
        </SafeAreaView>
      </View>
      <View testID="Beautiful" style={styles.slide2}>
        <SafeAreaView>
          <ScrollView
            style={{
              position: "relative",
              top: 50,
              width: "80%",
            }}
          >
            <View>
              <Text style={styles.text}>Adresse de L'entreprise</Text>
              <View style={styles.iconSection}>
                <Image
                  style={styles.imageIcon}
                  source={require("../../assets/icons/map.png")}
                />
              </View>
              <TextInput
                placeholder="N° et Rue"
                style={[styles.input]}
                clearButtonMode="always"
                placeholderTextColor={colorPlaceHolder}
              />
              <TextInput
                placeholder="Ville"
                style={styles.input}
                clearButtonMode="always"
                placeholderTextColor={colorPlaceHolder}
              />
              <TextInput
                placeholder="Code Postale"
                style={styles.input}
                clearButtonMode="always"
                placeholderTextColor={colorPlaceHolder}
                keyboardType="number-pad"
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
      <View testID="Simple" style={styles.slide3}>
        <Text style={styles.text}>Resumé</Text>
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
});

export default AddSociety;
