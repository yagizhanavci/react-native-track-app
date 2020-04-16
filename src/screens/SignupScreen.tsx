import * as React from "react";
import { View, StyleSheet } from "react-native";
import { NavigationStackScreenProps } from "react-navigation-stack";
import { Context as AuthContext } from "../contexts/AuthContext";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";

interface ISignupScreenProps extends NavigationStackScreenProps {}

const SignupScreen: React.FC<ISignupScreenProps> = ({ navigation }) => {
  const { state, signup, clearErrorMessage } = React.useContext(AuthContext);

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
        buttonText="Sign Up"
        headerText="Sign Up for Tracker"
        errorMessage={state.errorMessage}
        onButtonPress={signup}
      />
      <NavLink
        routeName="Signin"
        text="Already have an account? Sign in instead."
        navigation={navigation}
      />
    </View>
  );
};

(SignupScreen as any).navigationOptions = {
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

export default SignupScreen;
