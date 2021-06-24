import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Image,
  TextInput,
} from "react-native";
import { connect } from "react-redux";
import { Feather } from "@expo/vector-icons";

export class SingleEntrepriseSection extends Component {
  state = {
    fadeAnimation: new Animated.Value(0),
    loading: true,
  };

  fadeIn = () => {
    Animated.timing(this.state.fadeAnimation, {
      toValue: 1,
      duration: 800,
      useNativeDriver: false,
    }).start();
  };

  componentDidMount = () => {
    this.fadeIn();
    this.setState({ ...this.state, loading: false });
  };

  render() {
    const { loading, fadeAnimation } = this.state;
    const {
      nom,
      secteur,
      telephone,
      email,
      siteWeb,
      checked,
      ville,
      description,
    } = this.props.data;
    return (
      <View
        containerStyle={styles.container}
        animationDirection="horizontalLeft"
        isLoading={loading}
        layout={[
          { key: "someId", width: 220, height: 20, marginBottom: 6 },
          { key: "someFirdId", width: 180, height: 20, marginBottom: 6 },
          { key: "someOtherId", width: 180, height: 20, marginBottom: 6 },
        ]}
      >
        <Animated.View style={{ opacity: fadeAnimation }}>
          <Text
            style={{
              marginBottom: "15%",
              textAlign: "center",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            {checked ? " prospecté" : "Pas encore Prospecté"}
          </Text>
          <View style={styles.rowHeader}>
            <Image
              style={styles.imageIcon}
              source={require("../assets/icons/id-card.png")}
            />
            <View style={{ width: "60%" }}>
              <Text style={styles.entrepriseName} numberOfLines={2}>
                {nom}
              </Text>
              <Text style={styles.entrepriseInfo} numberOfLines={2}>
                {secteur}
              </Text>
              <View
                style={{
                  height: 2,
                  backgroundColor: "rgba(0,0,0,0.3)",
                  borderRadius: 20,
                  marginVertical: 10,
                }}
              />
              {telephone ? (
                <Text style={styles.entrepriseInfo} numberOfLines={1}>
                  {telephone}
                </Text>
              ) : null}
              {email ? (
                <Text style={styles.entrepriseInfo} numberOfLines={1}>
                  {email}{" "}
                </Text>
              ) : null}
              {ville ? (
                <Text style={styles.entrepriseInfo} numberOfLines={1}>
                  {ville}
                </Text>
              ) : null}
            </View>
          </View>
          <View style={styles.buttonSection}>
            {telephone ? (
              <View style={[styles.buttonAction, styles.callButton]}>
                <Feather name="phone-call" size={34} color="#fff" />
              </View>
            ) : null}
            <View style={{ width: "5%" }}></View>
            {email ? (
              <View style={[styles.buttonAction, styles.emailButton]}>
                <Feather name="mail" size={34} color="#fff" />
              </View>
            ) : null}
            <View style={styles.lineSectionButton} />
          </View>
          <View style={styles.demarcheSection}>
            <View style={styles.demarcheContent}>
              <Text style={styles.titleDemarche}>Démarche Effectué</Text>
              {description ? (
                <Text>{description}</Text>
              ) : (
                <Text>Aucune demarche effectué pour le moment</Text>
              )}
            </View>
          </View>
        </Animated.View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleEntrepriseSection);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  rowHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    position: "relative",
    paddingHorizontal: 20,
    width: "100%",
  },
  imageIcon: {
    width: 80,
    height: 80,
  },
  buttonSection: {
    position: "relative",
    marginTop: 20,
    justifyContent: "center",
    flexDirection: "row",
    width: "100%",
    marginBottom: 15,
  },

  buttonAction: {
    borderRadius: 100,
    padding: 15,
  },
  callButton: {
    backgroundColor: "green",
  },
  emailButton: {
    backgroundColor: "red",
  },
  iconAction: {
    resizeMode: "cover",
  },
  lineSectionButton: {
    height: 2,
    backgroundColor: "rgba(0,0,0,0.3)",
    position: "absolute",
    left: 0,
    width: "100%",
    zIndex: -10,
    top: "50%",
  },
  demarcheSection: {
    paddingHorizontal: 20,
  },
  demarcheContent: {
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "purple",
    padding: 15,
  },
  titleDemarche: {
    color: "purple",
    fontWeight: "bold",
    marginVertical: 10,
    fontSize: 16,
  },
  entrepriseName: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 8,
  },
  entrepriseInfo: {
    fontSize: 15,
    marginBottom: 8,
  },
});
