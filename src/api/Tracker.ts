import axios, { AxiosRequestConfig } from "axios";
import { AsyncStorage } from "react-native";

const instance = axios.create({
  baseURL: "http://738f61de.ngrok.io",
});

instance.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    const token = await AsyncStorage.getItem("token");
    if (!!token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err: any) => {
    return Promise.reject(err);
  },
);

export default instance;
