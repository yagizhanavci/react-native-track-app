import createDataContext from "./createDataContext";
import { Dispatch } from "react";
import TrackerAPI from "../api/Tracker";
import { AsyncStorage } from "react-native";
import { navigate } from "../navigationRef";

enum AuthActionTypes {
  Signin,
  Signup,
  Signout,
  add_error,
  clear_error,
}

interface IAuthInput {
  email: string;
  password: string;
}

interface IAuthAction {
  type: AuthActionTypes;
  payload?: any;
}

const AuthReducer = (state: any, action: IAuthAction) => {
  switch (action.type) {
    case AuthActionTypes.Signup:
      return { token: action.payload, errorMessage: "" };
    case AuthActionTypes.Signin:
      return { token: action.payload, errorMessage: "" };
    case AuthActionTypes.Signout:
      return { token: null, errorMessage: "" };
    case AuthActionTypes.add_error:
      return { ...state, errorMessage: action.payload };
    case AuthActionTypes.clear_error:
      return { ...state, errorMessage: "" };
    default:
      return state;
  }
};

const clearErrorMessage = (dispatch: Dispatch<IAuthAction>) => {
  return () => {
    dispatch({ type: AuthActionTypes.clear_error });
  };
};

const tryLocalSignin = (dispatch: Dispatch<IAuthAction>) => {
  return async () => {
    const token = await AsyncStorage.getItem("token");

    if (token) {
      dispatch({ type: AuthActionTypes.Signin, payload: token });
      navigate("TrackList");
    } else {
      navigate("Signup");
    }
  };
};

const signup = (dispatch: Dispatch<IAuthAction>) => {
  return async ({ email, password }: IAuthInput) => {
    //make api request
    try {
      const response = await TrackerAPI.post("/signup", { email, password });
      await AsyncStorage.setItem("token", response.data.token);
      dispatch({ type: AuthActionTypes.Signup, payload: response.data.token });
      navigate("TrackList", {});
    } catch (err) {
      dispatch({
        type: AuthActionTypes.add_error,
        payload: "Something went wrong with sign up.",
      });
      console.log(err.response.data);
    }
    //modify state
    // if error reflect error to user
  };
};

const signin = (dispatch: Dispatch<IAuthAction>) => {
  return async ({ email, password }: IAuthInput) => {
    try {
      const response = await TrackerAPI.post("/signin", { email, password });
      await AsyncStorage.setItem("token", response.data.token);
      dispatch({ type: AuthActionTypes.Signin, payload: response.data.token });
      navigate("TrackList", {});
    } catch (err) {
      dispatch({
        type: AuthActionTypes.add_error,
        payload: "Something went wrong with sign in.",
      });
      console.log(err.response.data);
    }
  };
};

const signout = (dispatch: Dispatch<IAuthAction>) => {
  return async () => {
    try {
      await AsyncStorage.removeItem("token");
      dispatch({ type: AuthActionTypes.Signout });
      navigate("Signin", {});
    } catch (err) {
      dispatch({
        type: AuthActionTypes.add_error,
        payload: "Something went wrong with sign out.",
      });
      console.log(err);
    }
  };
};

export const { Provider, Context } = createDataContext(
  AuthReducer,
  { signup, signin, signout, clearErrorMessage, tryLocalSignin },
  { token: null, errorMessage: "" },
);
