import React, { Component } from "react";
import { StyleSheet, Text, View, Animated, Easing } from "react-native";
import { StackNavigator } from "react-navigation";
import { Icon } from "react-native-elements";
import HomeScreen from "./screens/homeScreen";
import DetailsScreen from "./screens/detailsScreen";

const transitionConfig = () => {
  return {
    transitionSpec: {
      duration: 300,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true
    },
    screenInterpolator: sceneProps => {
      const { position, layout, scene, index, scenes } = sceneProps;
      const toIndex = index;
      const thisSceneIndex = scene.index;
      const height = layout.initHeight;
      const width = layout.initWidth;

      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
        outputRange: [width, 0, 0]
      });

      // Since we want the card to take the same amount of time
      // to animate downwards no matter if it's 3rd on the stack
      // or 53rd, we interpolate over the entire range from 0 - thisSceneIndex
      const translateY = position.interpolate({
        inputRange: [0, thisSceneIndex],
        outputRange: [height, 0]
      });

      const slideFromRight = { transform: [{ translateX }] };
      const slideFromBottom = { transform: [{ translateY }] };

      const lastSceneIndex = scenes[scenes.length - 1].index;

      // Test whether we're skipping back more than one screen
      if (lastSceneIndex - toIndex > 1) {
        // Do not transoform the screen being navigated to
        if (scene.index === toIndex) return;
        // Hide all screens in between
        if (scene.index !== lastSceneIndex) return { opacity: 0 };
        // Slide top screen down
        return slideFromBottom;
      }

      return slideFromRight;
    }
  };
};

const RootStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    Details: {
      screen: DetailsScreen
    }
  },
  {
    transitionConfig,
    initialRouteName: "Home",
    navigationOptions: {
      headerStyle: {
        backgroundColor: "#193446"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
        color: "#fff",
        textAlign: "center",
        justifyContent: "center",
        flex: 1
      },
      headerLeft: <Icon name="grabber" type="octicon" color="#FFF" size={40} />
    }
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
