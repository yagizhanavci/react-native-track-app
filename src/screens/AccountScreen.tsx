import * as React from "react";
import { StyleSheet } from "react-native";
import { Button, Text } from "react-native-elements";
import { Context as AuthContext } from "../contexts/AuthContext";
import { SafeAreaView } from "react-navigation";
import Spacer from "../components/Spacer";
import { FontAwesome } from "@expo/vector-icons";

interface IAccountScreenProps {}

const AccountScreen: React.FC<IAccountScreenProps> = () => {
  const { signout } = React.useContext(AuthContext);

  return (
    <SafeAreaView forceInset={{ top: "always" }} style={styles.containerStyles}>
      <Text h3 style={styles.textStyles}>
        Account
      </Text>
      <Spacer>
        <Button title="Sign Out" onPress={signout} />
      </Spacer>
    </SafeAreaView>
  );
};

(AccountScreen as any).navigationOptions = {
  title: "Account",
  tabBarIcon: <FontAwesome name="gear" size={20} />,
};

const styles = StyleSheet.create({
  containerStyles: {},
  textStyles: {
    textAlign: "center",
  },
});

export default AccountScreen;
