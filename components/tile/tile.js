import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

class Tile extends Component {
  render() {
    const { onPress, title, color } = this.props;

    return (
      <TouchableOpacity onPress={() => onPress()} activeOpacity={0.75}>
        <View style={[styles.container, { backgroundColor: color }]}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E9C77B",
    height: "100%",
    borderRadius: 5,
    borderWidth: 0,
    borderColor: "transparent",
    marginLeft: 10,
    marginRight: 10
  },
  title: {
    fontWeight: "700",
    fontSize: 50,
    color: "#fff"
  }
});

export default Tile;
