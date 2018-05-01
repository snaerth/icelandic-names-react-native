import React, { PureComponent } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  Platform,
  AsyncStorage
} from "react-native";
import { Icon } from "react-native-elements";

class NameItem extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      savedList: []
    };
  }

  saveName = async () => {
    const { item } = this.props;

    let exists = false;

    try {
      let savedList = await AsyncStorage.getItem("@SavedNamesList");
      savedList = JSON.parse(savedList);
      console.log(savedList);
      if (savedList && savedList.length === 0) {
        savedList.push(item);
      } else {
        for (let i = 0; i < savedList.length; i++) {
          if (savedList[i].name === item.name) {
            exists = true;
            break;
          }
        }

        if (exists) {
          savedList.push(item);
        }
      }

      await AsyncStorage.setItem("@SavedNamesList", JSON.stringify(savedList));
    } catch (error) {
      console.error(error);
      this.notifyToast(`Villa kom upp við að vista nafn!`);
    }

    this.notifyToast(`Nafn ${item.name} vistað!`);
  };

  notifyToast(text) {
    if (Platform.OS === "android") {
      ToastAndroid.show(text, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
    }
  }

  render() {
    const { item, circleColor, active } = this.props;
    const { container, name, subtitle, letter, circle, iconContainer } = styles;

    return (
      <View style={container}>
        <View style={[circle, { backgroundColor: circleColor }]}>
          <Text style={letter}>{item.name.charAt(0)}</Text>
        </View>
        <View>
          <Text style={name}>{item.name}</Text>
          <Text style={subtitle}>{item.subtitle}</Text>
        </View>
        <View style={iconContainer}>
          <Icon
            name="star"
            type="octicon"
            color={active ? "#E9C77B" : "#dcdcdc"}
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
    paddingRight: 40,
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
