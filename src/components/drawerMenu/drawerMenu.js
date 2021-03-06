import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { ListItem } from "react-native-elements";
import {
  StackActions,
  NavigationActions,
  DrawerActions
} from "react-navigation";
import { LinearGradient } from "expo";

const MENU_ITEMS = [
  {
    name: "Heim",
    icon: "home",
    screen: "Home",
    iconColor: "#fff"
  },
  {
    name: "Mín nöfn",
    icon: "star",
    screen: "Saved",
    iconColor: "#fff"
  },
  {
    name: "Stillingar",
    icon: "settings",
    screen: "Settings",
    iconColor: "#fff"
  }
];

class DrawerMenu extends Component {
  onPressHandler = screen => {
    const { navigation } = this.props;

    navigation.dispatch(DrawerActions.closeDrawer());

    if (screen === "Home") {
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: screen })]
      });
      navigation.dispatch(resetAction);
    } else {
      navigation.navigate(screen);
    }
  };

  render() {
    const { navigation } = this.props;
    const { container, titleContainer, titleText } = styles;

    return (
      <View style={container}>
        {MENU_ITEMS.map((item, i) => {
          const { name, icon, color, screen } = item;

          return (
            <ListItem
              key={i}
              leftIcon={{ name: icon, color }}
              title={
                <View style={titleContainer}>
                  <Text style={titleText}>{name}</Text>
                </View>
              }
              onPress={() => this.onPressHandler(screen)}
            />
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#fff"
  },
  titleContainer: {
    paddingTop: 10,
    paddingBottom: 10
  },
  titleText: {
    fontSize: 20
  }
});

export default DrawerMenu;
