import * as React from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Text } from "react-native-elements";
import { ListItem } from "react-native-elements";
import { NavigationStackScreenProps } from "react-navigation-stack";
import { Context as TrackContext } from "../contexts/TrackContext";

interface ITrackListScreenProps extends NavigationStackScreenProps {}

const TrackListScreen: React.FC<ITrackListScreenProps> = ({ navigation }) => {
  const { fetchTracks, state } = React.useContext(TrackContext);

  React.useEffect(() => {
    fetchTracks();
    const listener = navigation.addListener("willFocus", fetchTracks);

    return () => listener.remove();
  }, []);

  return (
    <View>
      <FlatList
        data={state}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("TrackDetail", { _id: item._id })
              }
            >
              <ListItem chevron title={item.name} />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

(TrackListScreen as any).navigationOptions = {
  title: "Tracks",
};

const styles = StyleSheet.create({
  textStyles: {
    textAlign: "center",
  },
});

export default TrackListScreen;
