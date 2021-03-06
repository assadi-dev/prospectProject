import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { connect } from "react-redux";
import {
  checkUpdate,
  get_entreprise,
  get_entreprise_check,
  get_entreprise_unCheck,
  unCheckUpdate,
} from "../redux/action/EntrepriseAction";

class CardListViewEntreprise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: this.props.checked,
      fadeAnimation: new Animated.Value(0),
      token: this.props.token,
      id: this.props.id,
      userId: this.props.userId,
    };
  }

  buttonSize = new Animated.Value(1);

  fadeIn = () => {
    Animated.timing(this.state.fadeAnimation, {
      toValue: 1,
      duration: 800,
      useNativeDriver: false,
    }).start();
  };

  fadeOut = () => {
    Animated.timing(this.state.fadeAnimation, {
      toValue: 0,
      duration: 800,
      delay: 500,
      useNativeDriver: false,
    }).start();
  };

  componentDidMount() {
    this.fadeIn();
  }

  componentWillUnmount() {
    this.fadeOut();
  }

  handleCheck = async () => {
    Animated.sequence([
      Animated.timing(this.buttonSize, {
        toValue: 1.3,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(this.buttonSize, {
        toValue: 1,
        useNativeDriver: false,
      }),
    ]).start();

    await this.setState({ isChecked: !this.state.isChecked });
    const date_update = new Date();
    const data = {
      checked: this.state.isChecked,
      updateAt: date_update,
      userId: `/api/users/${this.state.userId}`,
    };

    data.checked === true
      ? await this.props.checkUpdate(this.state.token, this.state.id, data)
      : await this.props.unCheckUpdate(this.state.token, this.state.id, data);

    //await this.props.get_entreprise(this.state.token);
    //await this.props.get_entreprise_check(this.state.token);
    //await this.props.get_entreprise_unCheck(this.state.token);
  };

  render() {
    const sizeButton = {
      transform: [{ scale: this.buttonSize }],
    };

    const { id, nom, token } = this.props;
    const { isChecked } = this.state;

    return (
      <Animated.View
        style={[styles.cardContainer, { opacity: this.state.fadeAnimation }]}
      >
        <TouchableHighlight
          style={styles.cardBody}
          onPress={() => console.log("")}
        >
          <View style={styles.content}>
            <TouchableWithoutFeedback onPress={this.handleCheck}>
              <Animated.View style={sizeButton}>
                {isChecked ? (
                  <Ionicons name="checkmark-circle" size={28} color="green" />
                ) : (
                  <MaterialIcons
                    name="radio-button-unchecked"
                    size={28}
                    color="grey"
                  />
                )}
              </Animated.View>
            </TouchableWithoutFeedback>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={
                  this.state.isChecked
                    ? styles.textTitleCheck
                    : styles.textTitle
                }
              >
                {nom}
              </Text>
            </View>
          </View>
        </TouchableHighlight>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    marginVertical: 6,
    height: 50,
    zIndex: 10,
    borderRadius: 5,
    position: "relative",
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 1,
  },
  cardBody: {
    position: "absolute",
    height: "100%",
    width: "100%",
    borderRadius: 5,
    backgroundColor: "purple",
    overflow: "hidden",
    zIndex: 8,
  },
  content: {
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundColor: "rgb(255,255,255)",
    transform: [{ translateX: 5 }],
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 15,
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
  textDate: {
    fontWeight: "bold",
    color: "grey",
  },
  textTitle: {
    fontWeight: "bold",
    marginLeft: 15,
    color: "black",
  },
  textTitleCheck: {
    textDecorationLine: "line-through",
    fontWeight: "bold",
    color: "grey",
    marginLeft: 15,
  },
});

const mapStateToProps = ({ authenticateReducer }) => {
  const token = authenticateReducer.accessToken;
  const userId = authenticateReducer.userId;
  return { token, userId };
};

export default connect(mapStateToProps, {
  checkUpdate,
  unCheckUpdate,
  get_entreprise,
  get_entreprise_check,
  get_entreprise_unCheck,
})(CardListViewEntreprise);
