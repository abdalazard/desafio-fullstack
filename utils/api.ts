import { Platform } from "react-native";

const API_URL = Platform.select({
  android: "http://10.0.2.2:9001",
  ios: "http://localhost:9001",
  default: "http://10.80.10.253:9001",
});

export default API_URL;
