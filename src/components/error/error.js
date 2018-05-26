import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

class Error extends Component {
  render() {
    const { container, children } = styles;

    return (
      <View style={container}>
        <Text>{children}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2E3859",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10
  }
});

export default Error;
