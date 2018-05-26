import React, { Component } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import NameItem from "../../components/nameItem";
import Loading from "../../components/loading";
import Error from "../../components/error";
import { getItemValue } from "../../utils/AsyncStorage";

const ROW_HEIGHT = 80;

class SavedListScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Mín nöfn"
  });

  constructor(props) {
    super(props);
    this.state = { isLoading: true, error: "", list: null };
  }

  async componentDidMount() {
    try {
      const savedList = await getItemValue("@SavedNamesList");

      this.setState({
        list: JSON.parse(savedList),
        isLoading: false
      });
    } catch (error) {
      this.setState({
        isLoading: false,
        error: "Úps eitthvað kom upp á"
      });
    }
  }

  /**
   * Updates list names state with new state
   */
  onClick = savedList => {
    console.log(savedList.length);
  };

  /**
   * Renders FlatList single item
   */
  renderItem = ({ item }) => {
    return (
      <NameItem
        key={item.id}
        item={item}
        onClick={this.onClick}
        iconName="trashcan"
        iconType="octicon"
      />
    );
  };

  /**
   * Gets FlatList row item layout
   */
  getItemLayout = (data, index) => {
    return { length: ROW_HEIGHT, offset: ROW_HEIGHT * index, index };
  };

  render() {
    const { isLoading, error, list } = this.state;
    const { container } = styles;

    if (error) {
      return <Error>{error}</Error>;
    }

    if (isLoading || !list) {
      return <Loading />;
    }

    return (
      <View className={container}>
        <FlatList
          data={list}
          keyExtractor={item => item.id}
          renderItem={this.renderItem}
          getItemLayout={this.getItemLayout}
          initialNumToRender={20}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10
  }
});

export default SavedListScreen;
