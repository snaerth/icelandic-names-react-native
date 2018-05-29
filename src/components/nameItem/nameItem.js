import React, { PureComponent } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";

class NameItem extends PureComponent {
  saveName = () => {
    const { onPress, item } = this.props;

    onPress(item);
  };

  render() {
    const {
      item,
      circleColor,
      iconName,
      iconType,
      containerStyles
    } = this.props;
    const { container, name, subtitle, letter, circle, iconContainer } = styles;

    return (
      <View style={[container, containerStyles || {}]}>
        <View style={[circle, { backgroundColor: circleColor }]}>
          <Text style={letter}>{item.name.charAt(0)}</Text>
        </View>
        <View>
          <Text style={name}>{item.name}</Text>
          <Text style={subtitle}>{item.subtitle}</Text>
        </View>
        <View style={iconContainer}>
          <Icon
            name={iconName}
            type={iconType}
            color={item.active ? "#E9C77B" : "#dcdcdc"}
            size={40}
            onPress={this.saveName}
          />
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
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 0.5,
    borderColor: "#dcdcdc",
    backgroundColor: "#ffffff",
    height: 80
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
  },
  iconContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end"
  }
});

export default NameItem;
