import * as React from "react";
import { View, StyleSheet } from "react-native";

interface ISpacerProps {}

const Spacer: React.FC<ISpacerProps> = ({ children }) => {
  return <View style={styles.spacer}>{children}</View>;
};

const styles = StyleSheet.create({
  spacer: {
    margin: 15,
  },
});

export default Spacer;
