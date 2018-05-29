import React, { Component } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  AsyncStorage,
  Platform,
  ToastAndroid
} from "react-native";
import { Icon } from "react-native-elements";
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
    this.state = { isLoading: true, error: "", list: [] };
  }

  async componentDidMount() {
    try {
      let savedList = await getItemValue("@SavedNamesList");
      savedList = savedList === null ? [] : savedList;

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
   * Deletes current item from AsyncStorage
   */
  onPress = async item => {
    try {
      const { list } = this.state;

      for (let i = 0; i < list.length; i++) {
        if (list[i].id === item.id) {
          list.splice(i, 1);
          break;
        }
      }

      this.notifyToast(`Nafni ${item.name} eytt!`);

      await AsyncStorage.setItem("@SavedNamesList", JSON.stringify(list));

      this.setState({
        list
      });
    } catch (error) {
      this.notifyToast(`Villa kom upp við að eyða nafni!`);
    }
  };

  notifyToast(text) {
    if (Platform.OS === "android") {
      ToastAndroid.show(text, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
    }
  }

  /**
   * Renders FlatList single item
   */
  renderItem = ({ item }) => {
    return (
      <NameItem
        key={item.id}
        item={item}
        onPress={this.onPress}
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
    const { container, noDataText, noDataTextContainer, noDataIcon } = styles;
    let returnData = null;

    if (error) {
      returnData = <Error>{error}</Error>;
    }

    if (isLoading) {
      returnData = <Loading />;
    }

    if (list && list.length === 0) {
      returnData = (
        <View style={noDataTextContainer}>
          <Text style={noDataText}>Engin vistuð nöfn</Text>
          <Text style={noDataText}>Smelltu á stjörnu til að vista</Text>
          <Icon
            style={noDataIcon}
            name="star"
            type="octicon"
            color="#E9C77B"
            size={40}
          />
        </View>
      );
    } else {
      returnData = (
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

    return returnData;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10
  },
  noDataTextContainer: {
    flex: 1,
    backgroundColor: "#2E3859",
    height: "100%",
    justifyContent: "center",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10
  },
  noDataText: {
    paddingTop: 5,
    textAlign: "center",
    fontSize: 20,
    color: "#fff"
  },
  noDataIcon: {
    paddingTop: 15
  }
});

export default SavedListScreen;
