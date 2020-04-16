import * as React from "react";
import { StyleSheet } from "react-native";
import { Text, Button, Input } from "react-native-elements";
import Spacer from "./Spacer";

interface IAuthFormProps {
  headerText: string;
  errorMessage: string;
  buttonText: string;
  onButtonPress: ({ email, password }: any) => void;
}

const AuthForm: React.FC<IAuthFormProps> = ({
  buttonText,
  errorMessage,
  headerText,
  onButtonPress,
}) => {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  return (
    <>
      <Spacer>
        <Text h3>{headerText}</Text>
      </Spacer>
      <Spacer>
        <Input
          label="Email"
          value={email}
          autoCorrect={false}
          autoCapitalize="none"
          onChangeText={setEmail}
        />
      </Spacer>
      <Spacer>
        <Input
          label="Password"
          value={password}
          secureTextEntry
          autoCorrect={false}
          autoCapitalize="none"
          onChangeText={setPassword}
        />
      </Spacer>
      {!!errorMessage && <Text style={styles.errorStyles}>{errorMessage}</Text>}
      <Spacer>
        <Button
          title={buttonText}
          onPress={() => onButtonPress({ email, password })}
        />
      </Spacer>
    </>
  );
};

const styles = StyleSheet.create({
  errorStyles: {
    fontSize: 16,
    color: "red",
    marginLeft: 15,
    marginTop: 15,
  },
});

export default AuthForm;
