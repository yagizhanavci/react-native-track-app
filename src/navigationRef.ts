import { NavigationActions } from "react-navigation";

let _navigator: any;

export const setNavigator = (nav: any) => {
  _navigator = nav;
};

export const getNavigator = () => {
  return _navigator;
};

export const navigate = (routeName: string, params?: any) => {
  _navigator.dispatch(NavigationActions.navigate({ routeName, params }));
};
