import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

class Error extends Component {
  render() {
    const { container, text } = styles;
    const { children } = this.props;

    return (
      <View style={container}>
        <Text style={text}>{children}</Text>
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
  text: {
    textAlign: "center",
    fontSize: 20,
    color: "#fff"
  }
});

export default Error;
