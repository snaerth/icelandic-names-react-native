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

class HomeScreen extends Component {
  static navigationOptions = {
    title: "Home"
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
        <View style={styles.buttonContainer}>
          <Button
            title="Öll mannanöfn"
            titleStyle={styles.titleStyle}
            buttonStyle={styles.button}
            onPress={() =>
              this.props.navigation.navigate("Details", { list: list.boys })
            }
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Strákar"
            titleStyle={styles.titleStyle}
            buttonStyle={styles.button}
            onPress={() =>
              this.props.navigation.navigate("Details", { list: list.boys })
            }
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Stelpur"
            titleStyle={styles.titleStyle}
            buttonStyle={styles.button}
            onPress={() =>
              this.props.navigation.navigate("Details", { list: list.girls })
            }
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Millinöfn"
            titleStyle={styles.titleStyle}
            buttonStyle={styles.button}
            onPress={() =>
              this.props.navigation.navigate("Details", { list: list.middle })
            }
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
    justifyContent: "center"
  },
  loadingText: {
    paddingTop: 15,
    fontSize: 20
  },
  button: {
    backgroundColor: "rgba(92, 99,216, 1)",
    width: 300,
    height: 45,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 5
  },
  buttonTitle: { fontWeight: "700" },
  buttonContainer: { paddingTop: 10, paddingBottom: 10 }
});

export default HomeScreen;
