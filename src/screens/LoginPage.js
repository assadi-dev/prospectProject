import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  SafeAreaView,
  ScrollView,
} from "react-native";
import {
  cacheAuthAsync,
  getCachedAuthAsync,
  signInAsync,
  signOutAsync,
} from "../config/AuthServices";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/action/AuthAction";
import { api } from "../Api/Api";

const LoginPage = () => {
  const [dataField, setDataFieald] = useState({ username: "", password: "" });
  const [fieldError, setFieldError] = useState({ isError: false, message: "" });

  const dispatch = useDispatch();
  const authenticateUser = useSelector((state) => state.authenticateReducer);

  const handleSubmitPass = async ({ username, password }) => {
    await api
      .post("/login", { username, password })
      .then((res) => {
        let authState = res.data;
        setFieldError({
          ...fieldError,
          isError: false,
          message: "Connexion Reussi !",
        });
        cacheAuthAsync(authState);
        dispatch(login(authState));
      })
      .catch((e) => {
        setFieldError({
          ...fieldError,
          isError: true,
          message: "Votre Email ou Mot de passe sont incorrect !",
        });
      });
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ width: "100%", alignItems: "center" }}>
        <Text>Login</Text>
        <TextInput
          placeholder="Email"
          keyboardType="email-address"
          style={[styles.input, fieldError.isError && styles.errorStyle]}
          autoCapitalize="none"
          textContentType="username"
          onChangeText={(username) =>
            setDataFieald({ ...dataField, username: username })
          }
        />
        <TextInput
          placeholder="Password"
          textContentType="password"
          secureTextEntry={true}
          autoCapitalize="none"
          style={[styles.input, fieldError.isError && styles.errorStyle]}
          autoCapitalize="none"
          onChangeText={(password) =>
            setDataFieald({ ...dataField, password: password })
          }
        />
        <Text>{fieldError.message}</Text>
        <Button
          title="Se connecter"
          onPress={() => handleSubmitPass(dataField)}
        />
      </SafeAreaView>
    </View>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    marginVertical: 15,
    width: "80%",
    fontSize: 20,
    padding: 15,
    backgroundColor: "lightgrey",
    borderRadius: 5,
  },
  sendButton: {
    marginTop: 10,
  },
  errorStyle: {
    borderWidth: 1,
    borderColor: "red",
  },
});
