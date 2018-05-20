import React, { Component } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Platform,
  StyleSheet,
  AsyncStorage
} from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import Tile from "../../components/tile";
import { getItemValue } from "../../utils/AsyncStorage";

class HomeScreen extends Component {
  static navigationOptions = {
    title: "Íslensk mannanöfn"
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
            color="#E2B49A"
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
            color="#E9C77B"
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
            color="#9AABB9"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff"
  },
  loadingText: {
    paddingTop: 15,
    fontSize: 20
  },
  tileContainer: {
    paddingTop: 5,
    paddingBottom: 5,
    width: "100%",
    height: "33%"
  }
});

export default HomeScreen;
