import createDataContext from "./createDataContext";
import { Dispatch } from "react";
import TrackerAPI from "../api/Tracker";

enum TrackActionTypes {
  FetchTracks,
  CreateTrack,
}

interface ITrack {
  name: string;
  locations: any[];
}

type TrackState = ITrack[];

interface ITrackAction {
  type: TrackActionTypes;
  payload?: any;
}

const trackReducer = (state: TrackState, action: ITrackAction) => {
  switch (action.type) {
    case TrackActionTypes.FetchTracks:
      return action.payload;
    default:
      return state;
  }
};

const fetchTracks = (dispatch: Dispatch<ITrackAction>) => async () => {
  const response = await TrackerAPI.get("/tracks");
  dispatch({ type: TrackActionTypes.FetchTracks, payload: response.data });
};

const createTrack = (dispatch: Dispatch<ITrackAction>) => async (
  name: string,
  locations: any[],
) => {
  const response = await TrackerAPI.post("/tracks", { name, locations });
};

export const { Context, Provider } = createDataContext(
  trackReducer,
  { fetchTracks, createTrack },
  [],
);
