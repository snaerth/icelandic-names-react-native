import React, { Component } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  ScrollView,
  Alert
} from "react-native";
import NameItem from "../../components/nameItem";
import { getItemValue, removeItemValue } from "../../utils/AsyncStorage";

const ROW_HEIGHT = 80;

class DetailsScreen extends Component {
  constructor(props) {
    super(props);

    const {
      data: { letterIndexes },
      savedList
    } = this.props.navigation.state.params;
    this.state = {
      letter: "A",
      letterIndexes,
      letterIndexesValues: Object.values(letterIndexes),
      savedList
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.title}`
  });

  onClick = async () => {
    const savedList = await getItemValue("@SavedNamesList");
    this.setState({ savedList });
  };

  renderItem = ({ item }) => {
    const { savedList } = this.state;
    let active = false;

    if (savedList) {
      const active = savedList.find(i => item.name === i.name) ? true : false;
    }

    return (
      <NameItem
        key={item.id}
        item={item}
        active={active}
        onClick={this.onClick}
      />
    );
  };

  onLetterPress(letter) {
    const { letterIndexes } = this.state;

    this.setState({ letter });

    try {
      this.flatListRef.scrollToIndex({
        animated: true,
        index: letterIndexes[letter]
      });
    } catch (e) {}
  }

  getItemLayout = (data, index) => {
    return { length: ROW_HEIGHT, offset: ROW_HEIGHT * index, index };
  };

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
      alphabet
    } = this.props.navigation.state.params.data;
    const {
      alphabetContainer,
      container,
      letter,
      letterActive,
      letterLast
    } = styles;

    return (
      <View className={container}>
        <FlatList
          data={list}
          keyExtractor={item => item.id}
          renderItem={this.renderItem}
          getItemLayout={this.getItemLayout}
          initialNumToRender={20}
          onScrollEndDrag={this.handleScroll}
          ref={ref => {
            this.flatListRef = ref;
          }}
        />
        <ScrollView
          style={alphabetContainer}
          showsHorizontalScrollIndicator={false}
        >
          <View>
            {alphabet.map((l, i) => {
              const active = l === this.state.letter ? letterActive : "";
              const last = i === alphabet.length - 1 ? letterLast : "";

              return (
                <Text
                  key={i}
                  style={[letter, active, last]}
                  onPress={() => this.onLetterPress(l)}
                >
                  {l}
                </Text>
              );
            })}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff"
  },
  alphabetContainer: {
    position: "absolute",
    right: 10,
    top: 10,
    bottom: 10,
    borderWidth: 0.5,
    borderColor: "#9b9b9b",
    backgroundColor: "#fff",
    paddingLeft: 4,
    paddingRight: 4,
    paddingTop: 7,
    borderRadius: 20,
    overflow: "hidden"
  },
  letter: {
    color: "#9b9b9b",
    paddingBottom: 3,
    fontSize: 20,
    textAlign: "center"
  },
  letterLast: {
    paddingBottom: 14
  },
  letterActive: {
    color: "#50d9af"
  }
});

export default DetailsScreen;
