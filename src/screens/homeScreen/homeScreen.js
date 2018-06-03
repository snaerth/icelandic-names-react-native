import React, { Component } from "react";
import { View, Text, StyleSheet, AsyncStorage } from "react-native";
import { Button, Icon } from "react-native-elements";
import Loading from "../../components/loading";
import Error from "../../components/error";
import Tile from "../../components/tile";
import { getItemValue, removeItemValue } from "../../utils/AsyncStorage";
import { internetConnection } from "../../utils/Network";

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
    const isConnected = await internetConnection();

    if (!isConnected) {
      this.setState({
        isLoading: false,
        error: "Úps þú ert ekki með nettengingu"
      });
    } else {
      this.getAndPrepareData();
    }
  }

  checkNet;

  /**
   * Gets data from API and locally saved data as well
   * and stores in in components state
   */
  async getAndPrepareData() {
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

  render() {
    const { isLoading, error, list, savedList } = this.state;
    const { navigation } = this.props;
    const { container, tileContainer } = styles;

    if (error) {
      return <Error>{error}</Error>;
    }

    if (isLoading || !list) {
      return <Loading />;
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
  tileContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    width: "100%",
    height: "33%"
  }
});

export default HomeScreen;
