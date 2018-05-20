import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text, ScrollView, StyleSheet } from "react-native";

class Alphabet extends Component {
  render() {
    const { alphabet, onLetterPressHandler, letter } = this.props;
    const {
      alphabetContainer,
      letterStyles,
      letterActive,
      letterLast
    } = styles;

    return (
      <ScrollView
        style={alphabetContainer}
        showsHorizontalScrollIndicator={false}
      >
        <View>
          {alphabet.map((l, i) => {
            const active = l === letter ? letterActive : "";
            const last = i === alphabet.length - 1 ? letterLast : "";

            return (
              <Text
                key={i}
                style={[letterStyles, active, last]}
                onPress={() => this.onLetterPressHandler(l)}
              >
                {l}
              </Text>
            );
          })}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  alphabetContainer: {
    position: "absolute",
    right: 10,
    top: 10,
    bottom: 10,
    borderWidth: 0.5,
    borderColor: "#9b9b9b",
    backgroundColor: "#fff",
    paddingLeft: 4,
    paddingRight: 4,
    paddingTop: 7,
    borderRadius: 20,
    overflow: "hidden"
  },
  letterStyles: {
    color: "#9b9b9b",
    paddingBottom: 3,
    fontSize: 20,
    textAlign: "center"
  },
  letterLast: {
    paddingBottom: 14
  },
  letterActive: {
    color: "#50d9af"
  }
});

Alphabet.propTypes = {
  alphabet: PropTypes.array.isRequired,
  onLetterPressHandler: PropTypes.func.isRequired,
  letter: PropTypes.string.isRequired
};

export default Alphabet;
