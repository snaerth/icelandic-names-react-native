import React, { Component } from "react";
import { View, FlatList, StyleSheet, Text, Alert } from "react-native";
import NameItem from "../../components/nameItem";
import Alphabet from "../../components/alphabet";
import updateListActiveState from "../../utils/updateListActiveState";

const ROW_HEIGHT = 80;

class DetailsScreen extends Component {
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
      alphabet,
      letter: "A",
      letterIndexes,
      letterIndexesValues: Object.values(letterIndexes),
      savedList: savedList || [],
      list,
      updated: false
    };

    this.onLetterPressHandler = this.onLetterPressHandler.bind(this);
  }

  componentWillMount() {
    const { list, savedList, refreshFlatList, updated } = this.state;

    this.setState({
      list: updateListActiveState(list, savedList),
      updated: !updated
    });
  }

  /**
   * Updates list names state with new state
   */
  onClick = savedList => {
    const { list, updated } = this.state;

    this.setState({
      list: updateListActiveState(list, savedList),
      updated: !updated
    });
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
        animated: true,
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
      updated,
      letter
    } = this.state;
    const { container } = styles;

    return (
      <View className={container}>
        <FlatList
          data={list}
          keyExtractor={item => item.id}
          renderItem={this.renderItem}
          getItemLayout={this.getItemLayout}
          initialNumToRender={20}
          onScrollEndDrag={this.handleScroll}
          extraData={updated}
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
