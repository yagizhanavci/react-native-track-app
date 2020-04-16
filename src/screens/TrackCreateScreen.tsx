// import "../mockLocation";
import * as React from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import {
  SafeAreaView,
  withNavigationFocus,
  NavigationFocusInjectedProps,
} from "react-navigation";
import Map from "../components/Map";
import { Context as LocationContext } from "../contexts/LocationContext";
import { useLocation } from "../hooks/useLocation";
import TrackForm from "../components/TrackForm";
import { FontAwesome } from "@expo/vector-icons";

interface ITrackCreateScreenProps extends NavigationFocusInjectedProps {}

const TrackCreateScreen: React.FC<ITrackCreateScreenProps> = ({
  isFocused,
}) => {
  const {
    addLocation,
    state: { recording },
  } = React.useContext(LocationContext);
  const locationCallback = React.useCallback(
    (location) => {
      addLocation(location, recording);
    },
    [recording],
  );
  const [err] = useLocation(isFocused || recording, locationCallback);

  return (
    <SafeAreaView style={styles.containerStyles} forceInset={{ top: "always" }}>
      <Text style={{ textAlign: "center" }} h3>
        Create Track
      </Text>
      <Map />
      {!!err && <Text>Please enable location services</Text>}
      <TrackForm />
    </SafeAreaView>
  );
};

(TrackCreateScreen as any).navigationOptions = {
  title: "Add Track",
  tabBarIcon: <FontAwesome name="plus" size={20} />,
  style: {
    paddingVertical: 10,
  },
};

const styles = StyleSheet.create({
  containerStyles: {
    flex: 1,
    marginHorizontal: 10,
  },
});

export default withNavigationFocus(TrackCreateScreen);
