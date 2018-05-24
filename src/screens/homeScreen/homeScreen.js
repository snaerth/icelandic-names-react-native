import React, { Component } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Platform,
  StyleSheet,
  AsyncStorage
} from "react-native";
import { Button, Icon } from "react-native-elements";
import Tile from "../../components/tile";
import { getItemValue } from "../../utils/AsyncStorage";

class HomeScreen extends Component {
  static navigationOptions = {
    title: "Íslensk mannanöfn",
    drawerLabel: "Íslensk mannanöfn"
  };

  constructor(props) {
    super(props);
    this.state = { isLoading: true, error: "", list: null };
  }

  async componentDidMount() {
    try {
      const savedList = await getItemValue("@SavedNamesList");
      const response = await fetch("http://138.68.191.12:1337/names");
      let responseJson = await response.json();

      this.setState({
        isLoading: false,
        list: responseJson,
        savedList: JSON.parse(savedList)
      });
    } catch (error) {
      console.log(error);
      this.setState({
        isLoading: false,
        error: "Úps eitthvað kom upp á"
      });
    }
  }

  renderError(error) {
    const { container } = styles;

    return (
      <View style={container}>
        <Text>{error}</Text>
      </View>
    );
  }

  renderLoading() {
    const { container, loadingText } = styles;

    return (
      <View style={container}>
        <ActivityIndicator
          size={Platform.OS === "ios" ? "large" : 60}
          color="#193446"
        />
        <Text style={loadingText}>Sæki nöfn...</Text>
      </View>
    );
  }

  render() {
    const { isLoading, error, list, savedList } = this.state;
    const { navigation } = this.props;
    const { container, tileContainer } = styles;

    if (error) {
      return this.renderError(error);
    }

    if (isLoading || !list) {
      return this.renderLoading();
    }

    return (
      <View style={container}>
        <View style={tileContainer}>
          <Tile
            onPress={() =>
              navigation.navigate("Details", {
                savedList,
                data: list.boys,
                title: "Strákanöfn"
              })
            }
            title="Strákanöfn"
            start={[0, 0.5]}
            colors={["#F4B69C", "#E8849E"]}
          />
        </View>
        <View style={tileContainer}>
          <Tile
            onPress={() =>
              navigation.navigate("Details", {
                savedList,
                data: list.girls,
                title: "Stelpunöfn"
              })
            }
            title="Stelpunöfn"
            start={[0, 0.5]}
            colors={["#68C2DD", "#77e8b9"]}
          />
        </View>
        <View style={tileContainer}>
          <Tile
            onPress={() =>
              navigation.navigate("Details", {
                savedList,
                data: list.middle,
                title: "Millinöfn"
              })
            }
            title="Millinöfn"
            start={[0, 0.5]}
            colors={["#c2e9fb", "#a1c4fd"]}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2E3859",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10
  },
  loadingText: {
    paddingTop: 15,
    fontSize: 20
  },
  tileContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    width: "100%",
    height: "33%"
  }
});

export default HomeScreen;
