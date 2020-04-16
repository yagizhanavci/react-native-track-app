import createDataContext from "./createDataContext";
import { Dispatch } from "react";

enum LocationActions {
  StartRecording,
  StopRecording,
  AddCurrentLocation,
  AddLocation,
  ChangeName,
  Reset,
}

interface ILocationAction {
  type: LocationActions;
  payload?: any;
}

interface ILocationState {
  recording: boolean;
  locations: any[];
  currentLocation: any;
}

const LocationReducer = (state: ILocationState, action: ILocationAction) => {
  switch (action.type) {
    case LocationActions.AddCurrentLocation:
      return { ...state, currentLocation: action.payload };
    case LocationActions.AddLocation:
      return {
        ...state,
        locations: [...state.locations, action.payload],
        currentLocation: action.payload,
      };
    case LocationActions.ChangeName:
      return { ...state, name: action.payload };
    case LocationActions.StartRecording:
      return { ...state, recording: true };
    case LocationActions.StopRecording:
      return { ...state, recording: false };
    case LocationActions.Reset:
      return { ...state, recording: false, name: "", locations: [] };
    default:
      return state;
  }
};

const changeName = (dispatch: Dispatch<ILocationAction>) => (name: string) => {
  dispatch({ type: LocationActions.ChangeName, payload: name });
};

const startRecording = (dispatch: Dispatch<ILocationAction>) => () => {
  dispatch({ type: LocationActions.StartRecording });
};

const stopRecording = (dispatch: Dispatch<ILocationAction>) => () => {
  dispatch({ type: LocationActions.StopRecording });
};

const addLocation = (dispatch: Dispatch<ILocationAction>) => (
  location: any,
  recording: boolean,
) => {
  dispatch({ type: LocationActions.AddCurrentLocation, payload: location });
  if (recording) {
    dispatch({ type: LocationActions.AddLocation, payload: location });
  }
};

const reset = (dispatch: Dispatch<ILocationAction>) => () => {
  dispatch({ type: LocationActions.Reset });
};

export const { Context, Provider } = createDataContext(
  LocationReducer,
  { startRecording, stopRecording, addLocation, changeName, reset },
  {
    name: "",
    recording: false,
    locations: [],
    currentLocation: null,
  },
);
