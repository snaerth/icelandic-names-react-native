import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo";

class Tile extends Component {
  render() {
    const { onPress, title, colors } = this.props;
    const { containerOuter, titleText } = styles;

    return (
      <TouchableOpacity onPress={() => onPress()} activeOpacity={0.75}>
        <LinearGradient colors={colors} style={containerOuter}>
          <Text style={titleText}>{title}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  containerOuter: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    borderRadius: 5,
    borderWidth: 0,
    borderColor: "transparent",
    marginLeft: 10,
    marginRight: 10
  },
  titleText: {
    fontWeight: "700",
    fontSize: 50,
    color: "#fff"
  }
});

Tile.propTypes = {
  colors: PropTypes.array.isRequired,
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
};

export default Tile;
