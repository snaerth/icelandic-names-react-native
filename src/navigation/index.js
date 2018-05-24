import React from "react";
import { StackNavigator, DrawerNavigator } from "react-navigation";
import { Icon } from "react-native-elements";
import DrawerMenu from "../components/drawerMenu";
import transitionConfig from "./navigationAnimation";
import HomeScreen from "../screens/homeScreen";
import DetailsScreen from "../screens/detailsScreen";
import SavedListScreen from "../screens/savedListScreen";

// Manifest of possible screens
const RootStack = StackNavigator(
  {
    Home: { screen: HomeScreen },
    Details: { screen: DetailsScreen },
    Saved: { screen: SavedListScreen }
  },
  // Default config for all screens
  {
    transitionConfig,
    initialRouteName: "Home",
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: "#2E3859",
        paddingRight: 25,
        paddingLeft: 10
      },
      headerTintColor: "#FFF",
      headerTitleStyle: {
        color: "#FFF"
      },
      headerRight: (
        <Icon
          name="ios-menu"
          type="ionicon"
          color="#FFF"
          size={35}
          onPress={() => navigation.navigate("DrawerOpen")}
        />
      )
    })
  }
);

const Drawer = DrawerNavigator(
  {
    Main: { screen: RootStack }
  },
  {
    contentComponent: DrawerMenu,
    drawerWidth: 300
  }
);

export default Drawer;
