import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Context as AuthContext } from "../contexts/AuthContext";

interface IResolveAuthScreenProps {}

const ResolveAuthScreen: React.FC<IResolveAuthScreenProps> = () => {
  const { tryLocalSignin } = React.useContext(AuthContext);

  React.useEffect(() => {
    tryLocalSignin();
  }, []);

  return null;
};

const styles = StyleSheet.create({});

export default ResolveAuthScreen;
