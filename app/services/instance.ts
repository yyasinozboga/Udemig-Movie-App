import axios from "axios";
import { Endpoints } from "./urls";
import Constants from "expo-constants";

const api = axios.create({
  baseURL: Endpoints.BASE_URL,
  params: { language: "en-US" },
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${Constants.expoConfig?.extra?.API_TOKEN}`,
  },
});

export default api;
