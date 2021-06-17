import React, { useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { logout } from "../redux/action/AuthAction";
import { useDispatch, useSelector } from "react-redux";
import { signOutAsync } from "../config/AuthServices";

const Informations = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.authenticateReducer);

  useEffect(() => {
    //console.log(data.accessToken);
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Text></Text>
      <Button
        title="Me déconnecter"
        onPress={async () => {
          dispatch(logout());
          await signOutAsync();
        }}
      />
    </View>
  );
};

export default Informations;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
