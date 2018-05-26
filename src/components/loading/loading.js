import React, { Component } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Platform
} from "react-native";

class Loading extends Component {
  render() {
    const { container, loadingText } = styles;

    return (
      <View style={container}>
        <ActivityIndicator
          size={Platform.OS === "ios" ? "large" : 60}
          color="#77e8b9"
        />
        <Text style={loadingText}>Sæki nöfn...</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2E3859",
    height: "100%",
    justifyContent: "center",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10
  },
  loadingText: {
    textAlign: "center",
    paddingTop: 15,
    fontSize: 20,
    color: "#fff"
  }
});

export default Loading;
