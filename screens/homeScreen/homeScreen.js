import React, { Component } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Platform,
  StyleSheet
} from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import Tile from "../../components/tile";

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
      const response = await fetch("http://138.68.191.12:1337/names");
      const responseJson = await response.json();

      this.setState({
        isLoading: false,
        list: responseJson
      });
    } catch (error) {
      console.error(error);
      this.setState({
        isLoading: false,
        error: "Úps eitthvað kom upp á"
      });
    }
  }

  renderError(error) {
    return (
      <View style={styles.container}>
        <Text>{error}</Text>
      </View>
    );
  }

  renderLoading() {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          size={Platform.OS === "ios" ? "large" : 60}
          color="#f4511e"
        />
        <Text style={styles.loadingText}>Sæki nöfn...</Text>
      </View>
    );
  }

  render() {
    const { isLoading, error, list } = this.state;

    if (error) {
      return this.renderError(error);
    }

    if (isLoading || !list) {
      return this.renderLoading();
    }

    return (
      <View style={styles.container}>
        <View style={styles.tileContainer}>
          <Tile
            onPress={() =>
              this.props.navigation.navigate("Details", {
                list: list.boys,
                title: "Strákanöfn"
              })
            }
            title="Strákanöfn"
            color="#E9C77B"
          />
        </View>
        <View style={styles.tileContainer}>
          <Tile
            onPress={() =>
              this.props.navigation.navigate("Details", {
                list: list.girls,
                title: "Stelpunöfn"
              })
            }
            title="Stelpunöfn"
            color="#E2B49A"
          />
        </View>
        <View style={styles.tileContainer}>
          <Tile
            onPress={() =>
              this.props.navigation.navigate("Details", {
                list: list.middle,
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
