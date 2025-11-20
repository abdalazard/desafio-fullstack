import { Platform } from "react-native";

const SEU_IP_LOCAL = "192.168.1.5";
const PORTA = "9001";

const API_URL = (() => {
  if (Platform.OS === 'web') {
    return `http://localhost:${PORTA}`;
  }

  return `http://${SEU_IP_LOCAL}:${PORTA}`;
})();

export default API_URL;