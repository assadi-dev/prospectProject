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
} from "react-native";
import Swiper from "react-native-swiper";
import { MaterialIcons } from "@expo/vector-icons";
import SwipeButton from "./SwipeButton";
import { FontAwesome, Feather, Ionicons, AntDesign } from "@expo/vector-icons";
import Ripple from "react-native-material-ripple";
import { useDispatch, useSelector } from "react-redux";
import {
  add_entreprise,
  get_entreprise,
  get_entreprise_check,
  get_entreprise_unCheck,
} from "../../redux/action/EntrepriseAction";
import { useNavigation } from "@react-navigation/native";

const AddSociety = () => {
  const windowWidth = Dimensions.get("window").width;
  const errorInput = { borderColor: "red", borderWidth: 1 };
  const colorIcon = "#fff";
  const colorPlaceHolder = "rgba(255,255,255,0.5)";
  const defautValue = {
    name: "",
    activity: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
    email: "",
    description: "",
    email: "",
    siteWeb: "",
  };
  const [inputValues, setInputValue] = useState(defautValue);

  const date = new Date();

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const authenticateUser = useSelector((state) => state.authenticateReducer);
  useEffect(() => {}, [dispatch]);

  const submitData = async () => {
    let data = {
      nom: inputValues.name,
      secteur: inputValues.activity,
      adresse: inputValues.address,
      ville: inputValues.city,
      codePostal: inputValues.zip,
      description: inputValues.description,
      checked: false,
      telephone: inputValues.phone,
      email: inputValues.email,
      siteWeb: inputValues.siteWeb,
      createAt: date,
      updateAt: date,
      userId: `\/api\/users\/${authenticateUser.userId}`,
    };

    try {
      await dispatch(add_entreprise(authenticateUser.accessToken, data));
      await dispatch(get_entreprise_unCheck(authenticateUser.accessToken));
      await dispatch(get_entreprise_check(authenticateUser.accessToken));
      await dispatch(get_entreprise(authenticateUser.accessToken));
      // await setInputValue(defautValue);
      navigation.navigate("Home");
    } catch (error) {
      console.log(error);
    }
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
              name="name"
              onChangeText={(name) =>
                setInputValue({ ...inputValues, name: name })
              }
            />
            <TextInput
              placeholder="Secteur d'activité"
              style={styles.input}
              clearButtonMode="always"
              placeholderTextColor={colorPlaceHolder}
              onChangeText={(activity) =>
                setInputValue({ ...inputValues, activity: activity })
              }
            />
            <TextInput
              placeholder="Numéro de téléphone"
              style={styles.input}
              clearButtonMode="always"
              keyboardType="phone-pad"
              textContentType="telephoneNumber"
              placeholderTextColor={colorPlaceHolder}
              onChangeText={(phone) =>
                setInputValue({ ...inputValues, phone: phone })
              }
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
                textContentType="streetAddressLine1"
                onChangeText={(address) =>
                  setInputValue({ ...inputValues, address: address })
                }
              />
              <TextInput
                placeholder="Ville"
                style={styles.input}
                clearButtonMode="always"
                placeholderTextColor={colorPlaceHolder}
                textContentType="addressCity"
                onChangeText={(city) =>
                  setInputValue({ ...inputValues, city: city })
                }
              />
              <TextInput
                placeholder="Code Postale"
                style={styles.input}
                clearButtonMode="always"
                placeholderTextColor={colorPlaceHolder}
                keyboardType="number-pad"
                textContentType="postalCode"
                onChangeText={(zip) =>
                  setInputValue({ ...inputValues, zip: zip })
                }
              />
              <TextInput
                placeholder="Adress email (facultatif)"
                style={styles.input}
                clearButtonMode="always"
                placeholderTextColor={colorPlaceHolder}
                keyboardType="email-address"
                textContentType="emailAddress"
                onChangeText={(email) =>
                  setInputValue({ ...inputValues, email: email })
                }
              />
            </View>
          </ScrollView>
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
                {inputValues.name}
              </Text>
              <Text numberOfLines={2} style={styles.textResume}>
                {inputValues.activity}
              </Text>
              <View style={styles.hairLine} />
              <Text style={styles.textResume}>{inputValues.phone}</Text>

              <Text style={styles.textResume}>{inputValues.email}</Text>
            </View>
          </View>
          <View style={styles.addressRow}>
            <View style={styles.addressCard}>
              <Text numberOfLines={2} style={styles.addressResume}>
                {" "}
                {inputValues.address}{" "}
              </Text>
              <Text numberOfLines={2} style={styles.addressResume}>
                {inputValues.city}
              </Text>
              <Text style={styles.addressResume}>{inputValues.zip}</Text>
            </View>
          </View>
          <Ripple onPress={() => submitData()}>
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
    fontSize: 22,
    marginBottom: 10,
  },
  textResume: {
    fontSize: 18,
    color: "rgba(255,255,255,0.7)",
  },
  addressResume: {
    fontSize: 20,
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
});

export default AddSociety;
