import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import { NavigationStackScreenProps } from "react-navigation-stack";
import { Context as TrackContext } from "../contexts/TrackContext";
import MapView, { Circle, Polyline } from "react-native-maps";

interface ITrackDetailScreenProps extends NavigationStackScreenProps {}

const TrackDetailScreen: React.FC<ITrackDetailScreenProps> = ({
  navigation,
}) => {
  const { state } = React.useContext(TrackContext);
  const _id = navigation.getParam("_id");

  const track = state.find((track: any) => track._id === _id);

  return (
    <View>
      <Text style={styles.textStyles} h3>
        {track.name}
      </Text>
      <MapView
        style={styles.mapStyles}
        initialRegion={{
          ...track.locations[0].coords,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Polyline
          coordinates={track.locations.map((location: any) => location.coords)}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  textStyles: {
    textAlign: "center",
  },
  mapStyles: {
    height: 300,
  },
});

export default TrackDetailScreen;
