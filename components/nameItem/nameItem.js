import React, { PureComponent } from "react";
import { View, Text, StyleSheet } from "react-native";

class NameItem extends PureComponent {
  render() {
    const { name, subtitle } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.circle}>
          <Text style={styles.letter}>{name.charAt(0)}</Text>
        </View>
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    borderWidth: 0.5,
    borderColor: "#dcdcdc"
  },
  letter: {
    fontSize: 30,
    color: "#9b9b9b"
  },
  name: {
    fontSize: 20,
    paddingLeft: 20
  },
  subtitle: {
    color: "#9b9b9b",
    paddingLeft: 20
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    borderWidth: 0.5,
    borderColor: "#9b9b9b",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default NameItem;
