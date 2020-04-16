import * as React from "react";
import { StyleSheet, ActivityIndicator } from "react-native";
import MapView, { Polyline, Circle } from "react-native-maps";
import { Context as LocationContext } from "../contexts/LocationContext";

interface IMapProps {}

const Map: React.FC<IMapProps> = () => {
  const {
    state: { currentLocation, locations },
  } = React.useContext(LocationContext);

  if (!currentLocation) {
    return (
      <ActivityIndicator
        size="large"
        style={{ flex: 1, justifyContent: "center" }}
      />
    );
  }

  return (
    <MapView
      style={styles.mapStyles}
      initialRegion={{
        ...currentLocation.coords,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
    >
      <Circle
        center={currentLocation.coords}
        radius={30}
        strokeColor="rgba(158,158,255,1.0)"
        fillColor="rgba(158,158,255,0.3)"
      />
      <Polyline coordinates={locations.map((loc: any) => loc.coords)} />
    </MapView>
  );
};

const styles = StyleSheet.create({
  mapStyles: {
    height: 300,
  },
});

export default Map;
