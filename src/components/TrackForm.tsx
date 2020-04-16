import * as React from "react";
import { StyleSheet } from "react-native";
import { Input, Button } from "react-native-elements";
import Spacer from "./Spacer";
import { Context as LocationContext } from "../contexts/LocationContext";
import { useSaveTrack } from "../hooks/useSaveTrack";

interface ITrackFormProps {}

const TrackForm: React.FC<ITrackFormProps> = () => {
  const {
    startRecording,
    stopRecording,
    changeName,
    state: { name, recording, locations },
  } = React.useContext(LocationContext);

  const [saveTrack] = useSaveTrack();

  return (
    <>
      <Spacer>
        <Input
          placeholder="Enter Track Name"
          onChangeText={changeName}
          value={name}
        />
      </Spacer>
      <Spacer>
        <Button
          title={`${recording ? "Stop Recording" : "Start Recording"}`}
          onPress={recording ? stopRecording : startRecording}
        />
      </Spacer>
      {!recording && locations.length > 0 && (
        <Spacer>
          <Button title="Save Record" onPress={saveTrack} />
        </Spacer>
      )}
    </>
  );
};

const styles = StyleSheet.create({});

export default TrackForm;
