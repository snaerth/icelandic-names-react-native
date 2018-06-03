import { NetInfo, Platform } from "react-native";

/**
 * Checks internet connection for device
 * @returns {Boolean}
 */
export async function internetConnection() {
  let isConnected = false;

  if (Platform.OS === "ios") {
    const res = await fetch("https://www.google.com");

    if (res) {
      isConnected = true;
    }
  } else {
    isConnected = await NetInfo.isConnected.fetch();
  }

  return isConnected;
}
