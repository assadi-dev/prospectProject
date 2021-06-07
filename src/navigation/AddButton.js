import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons, Entypo, FontAwesome } from "@expo/vector-icons";
import Modal from "react-native-modal";
import AddSociety from "../screens/HomeScreen/AddSociety";
import { useNavigation } from "@react-navigation/native";

const AddButton = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [addSocietyModal, setAddSocietyModal] = useState(false);
  const navigation = useNavigation();

  //Instansation de la class Animated pour utiliser Animer l'icone
  const mode = new Animated.Value(0);

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(mode, {
        toValue: mode._value === 0 ? 1 : 0,
        duration: 100,
        useNativeDriver: false,
      }),
    ]).start();
    setModalVisible(true);
  };

  const rotation = mode.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "45deg"],
  });

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={handlePress}>
        <Animated.View
          style={[
            styles.icon,
            styles.shadow,
            { transform: [{ rotate: rotation }] },
          ]}
        >
          <Entypo name="plus" size={30} color="white" />
        </Animated.View>
      </TouchableWithoutFeedback>

      <Modal
        backdropOpacity={0.3}
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        style={styles.contentView}
      >
        <View style={styles.content}>
          <View
            style={{
              width: "90%",
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 25,
            }}
          >
            <Text style={{ textAlign: "left", fontSize: 20 }}>Ajouter</Text>
            <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableWithoutFeedback>
          </View>

          <View style={{ marginVertical: 15 }}>
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate("AddSociety");
                setModalVisible(false);
              }}
            >
              <View style={styles.modalButon}>
                <View style={styles.iconBordure}>
                  <FontAwesome name="building-o" size={24} color="black" />
                </View>
                <Text style={styles.textButton}>Ajouter une societé</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate("AddRDV");
                setModalVisible(false);
              }}
            >
              <View style={styles.modalButon}>
                <View style={styles.iconBordure}>
                  <Ionicons name="calendar-sharp" size={24} color="black" />
                </View>

                <Text style={styles.textButton}>
                  Ajouter un rendez-vous / entretient
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    bottom: 22,
  },

  icon: {
    borderRadius: 100,
    backgroundColor: "purple",
    padding: 10,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  content: {
    backgroundColor: "white",
    paddingVertical: 15,
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: 17,
    borderTopLeftRadius: 17,
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 12,
  },
  contentView: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalButon: {
    marginVertical: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  textButton: {
    marginLeft: 25,
  },
  iconBordure: {
    borderRadius: 50,
    backgroundColor: "rgba(200,200,200,0.5)",
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  shadow: {
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 3,
  },
});

export default AddButton;
