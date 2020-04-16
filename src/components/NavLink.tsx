import * as React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import Spacer from "./Spacer";

interface INavLinkProps {
  text: string;
  routeName: string;
  params?: any;
  navigation: any;
}

const NavLink: React.FC<INavLinkProps> = ({
  navigation,
  routeName,
  params,
  text,
}) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate(routeName, params)}>
      <Spacer>
        <Text style={styles.linkStyles}>{text}</Text>
      </Spacer>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  linkStyles: {
    color: "blue",
  },
});

export default withNavigation(NavLink);
