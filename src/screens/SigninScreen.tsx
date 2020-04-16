import * as React from "react";
import { View, StyleSheet } from "react-native";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";
import { NavigationStackScreenProps } from "react-navigation-stack";
import { Context as AuthContext } from "../contexts/AuthContext";

interface ISigninScreenProps extends NavigationStackScreenProps {}

const SigninScreen: React.FC<ISigninScreenProps> = ({ navigation }) => {
  const { state, signin, clearErrorMessage } = React.useContext(AuthContext);

  React.useEffect(() => {
    clearErrorMessage();
    const focusListener = navigation.addListener(
      "didFocus",
      () => clearErrorMessage,
    );

    return () => {
      focusListener.remove();
    };
  }, []);

  return (
    <View style={styles.containerStyles}>
      <AuthForm
        buttonText="Sign In"
        headerText="Sign In for Tracker"
        errorMessage={state.errorMessage}
        onButtonPress={signin}
      />
      <NavLink
        routeName="Signup"
        text="Don't have an account? Sign up instead."
        navigation={navigation}
      />
    </View>
  );
};

(SigninScreen as any).navigationOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({
  containerStyles: {
    flex: 1,
    marginVertical: 10,
    justifyContent: "center",
    marginBottom: 50,
  },
});

export default SigninScreen;
