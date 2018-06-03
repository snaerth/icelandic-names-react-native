import React, { PureComponent } from "react";
import {
  View,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  Alert,
  AsyncStorage
} from "react-native";
import Toast from "react-native-root-toast";
import NameItem from "../../components/nameItem";
import Alphabet from "../../components/alphabet";
import updateListActiveState from "../../utils/updateListActiveState";

const ROW_HEIGHT = 80;

class DetailsScreen extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title
  });

  constructor(props) {
    super(props);

    const {
      data: { list, letterIndexes, alphabet },
      savedList
    } = this.props.navigation.state.params;
    this.state = {
      screenHeight: Dimensions.get("window").height,
      alphabet,
      letter: "A",
      letterIndexes,
      letterIndexesValues: Object.values(letterIndexes),
      savedList: savedList || [],
      list,
      showToast: false,
      toastMessage: ""
    };

    this.onLetterPressHandler = this.onLetterPressHandler.bind(this);
  }

  componentWillMount() {
    const { list, savedList, refreshFlatList } = this.state;

    this.setState({
      list: updateListActiveState(list, savedList)
    });
  }

  onPress = async item => {
    let exists = false;

    // Delete active prop from item object
    if (item && item.active) {
      delete item.active;
    }

    try {
      let savedList = await AsyncStorage.getItem("@SavedNamesList");

      if (savedList === null) {
        savedList = [];
        savedList.push(item);
      } else {
        savedList = JSON.parse(savedList);

        for (let i = 0; i < savedList.length; i++) {
          if (savedList[i].id === item.id) {
            exists = true;
            savedList.splice(i, 1);
            break;
          }
        }

        if (!exists) {
          savedList.push(item);
          this.notifyToast(`Nafn ${item.name} vistað!`);
        } else {
          this.notifyToast(`Nafn ${item.name} eytt!`);
        }
      }

      await AsyncStorage.setItem("@SavedNamesList", JSON.stringify(savedList));
    } catch (error) {
      this.notifyToast(`Villa kom upp við að vista nafn!`);
    }
  };

  /**
   * Displays toast message
   * @param {String} toastMessage - Message for toast
   */
  notifyToast(toastMessage) {
    this.setState({ showToast: true, toastMessage }, () => {
      setTimeout(() => {
        this.setState({ showToast: false, toastMessage: "" });
      }, Toast.durations.SHORT);
    });
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
        iconName="star"
        iconType="octicon"
        containerStyles={{ paddingRight: 50 }}
      />
    );
  };

  /**
   * When letter in alphabet is pressed then
   * we scroll to desired index in FlatList View
   *
   * @param {String} letter - Any letter in alphabet
   */
  onLetterPressHandler(letter) {
    const { letterIndexes } = this.state;

    this.setState({ letter });

    try {
      this.flatListRef.scrollToIndex({
        animated: false,
        index: letterIndexes[letter]
      });
    } catch (e) {}
  }

  /**
   * Gets FlatList row item layout
   */
  getItemLayout = (data, index) => {
    return { length: ROW_HEIGHT, offset: ROW_HEIGHT * index, index };
  };

  /**
   * Handles scroll event in FlatList
   */
  handleScroll = event => {
    const { letterIndexes, letterIndexesValues } = this.state;
    const y = event.nativeEvent.contentOffset.y + ROW_HEIGHT;
    const index = parseInt(y / ROW_HEIGHT);

    let letter = "A";
    let cnt = 0;

    for (const key in letterIndexes) {
      if (letterIndexes.hasOwnProperty(key)) {
        const startIndex = letterIndexes[key];
        const endIndex =
          letterIndexesValues[cnt + 1] !== undefined
            ? letterIndexesValues[cnt + 1]
            : startIndex;

        if (startIndex <= index && index <= endIndex) {
          letter = key;
          break;
        }
      }

      cnt += 1;
    }

    if (letter !== this.state.letter) {
      this.setState({ letter });
    }
  };

  render() {
    const {
      list,
      letterIndexes,
      alphabet,
      savedList,
      letter,
      screenHeight,
      showToast,
      toastMessage
    } = this.state;
    const { container } = styles;

    return (
      <View className={container}>
        <Toast
          visible={showToast}
          position={Toast.positions.CENTER}
          animation={true}
          shadow={false}
        >
          {toastMessage}
        </Toast>
        <FlatList
          data={list}
          keyExtractor={item => item.id}
          renderItem={this.renderItem}
          getItemLayout={this.getItemLayout}
          initialNumToRender={parseInt(screenHeight / 80, 10)}
          onScrollEndDrag={this.handleScroll}
          ref={ref => {
            this.flatListRef = ref;
          }}
        />
        <Alphabet
          alphabet={alphabet}
          onLetterPressHandler={this.onLetterPressHandler}
          letter={letter}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 15,
    paddingRight: 15
  }
});

export default DetailsScreen;
