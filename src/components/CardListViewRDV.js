import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { connect } from "react-redux";
import {
  check_update_rendez_vous,
  unCheck_update_rendez_vous,
  get_rendez_vous,
  get_rendez_vous_uncheck,
  get_rendez_vous_checked,
} from "../redux/action/RendezVousAction";

class CardListViewRDV extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: this.props.checked,
      fadeAnimation: new Animated.Value(0),
    };
  }

  buttonSize = new Animated.Value(1);

  date_to_string_Min = (timestamp) => {
    const date = new Date(timestamp);
    let day = date.getDate();
    let month = date.getMonth() + 1;

    if (day < 10) {
      day = "0" + day;
    }
    if (month < 10) {
      month = "0" + month;
    }

    let fullDate = `${day}/${month}`;

    return fullDate;
  };

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
      useNativeDriver: false,
    }).start();
  };

  componentDidMount() {
    this.fadeIn();

    this.setState({ ...this.state, isChecked: this.props.checked });
  }
  /* componentDidUpdate() {
    this.state.isChecked && this.fadeOut();
    }*/
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
    const updateDate = new Date();
    const data = {
      checked: this.state.isChecked,
      updatedAt: updateDate,
      userId: `\/api\/users\/${this.props.userId}`,
    };

    data.checked === true
      ? await this.props.check_update_rendez_vous(
          this.props.token,
          this.props.id,
          data
        )
      : await this.props.unCheck_update_rendez_vous(
          this.props.token,
          this.props.id,
          data
        );
    //await get_rendez_vous_uncheck(this.props.token);
    //await get_rendez_vous_checked(this.props.token);
  };

  render() {
    const sizeButton = {
      transform: [{ scale: this.buttonSize }],
    };

    const { nom, date } = this.props;
    return (
      <Animated.View
        style={[styles.cardContainer, { opacity: this.state.fadeAnimation }]}
      >
        <View style={styles.cardBody}>
          <View style={styles.content}>
            <TouchableWithoutFeedback onPress={this.handleCheck}>
              <Animated.View style={sizeButton}>
                {this.state.isChecked ? (
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
                {" "}
                <Text style={styles.textDate}>
                  {" "}
                  {this.date_to_string_Min(date)}{" "}
                </Text>{" "}
                {nom}
              </Text>
            </View>
          </View>
        </View>
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
    backgroundColor: "orange",
    overflow: "hidden",
    zIndex: 8,
  },
  content: {
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundColor: "rgb(255,255,255)",
    left: 5,
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
    color: "black",
  },
  textTitleCheck: {
    textDecorationLine: "line-through",
    fontWeight: "bold",
    color: "grey",
  },
});

const mapStateToProps = ({ authenticateReducer }) => {
  const token = authenticateReducer.accessToken;
  const userId = authenticateReducer.userId;
  return { token, userId };
};

export default connect(mapStateToProps, {
  check_update_rendez_vous,
  unCheck_update_rendez_vous,
  get_rendez_vous,
})(CardListViewRDV);
