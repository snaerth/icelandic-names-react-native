import { AsyncStorage } from "react-native";

/**
 * Removes item from AsyncStorage
 * @param {String} key - Key item to remove
 * @returns {Boolean}
 */
export async function removeItemValue(key) {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (exception) {
    return false;
  }
}

/**
 * Gets item from AsyncStorage
 * @param {String} key - Key item
 * @returns {<Any>|Boolean}
 */
export async function getItemValue(key) {
  try {
    return await AsyncStorage.getItem(key);
  } catch (exception) {
    return null;
  }
}
