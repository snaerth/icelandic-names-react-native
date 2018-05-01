import React, { PureComponent } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  ScrollView,
  Alert
} from "react-native";
import NameItem from "../../components/nameItem";

const ROW_HEIGHT = 80;

class DetailsScreen extends PureComponent {
  constructor(props) {
    super(props);

    const { letterIndexes } = this.props.navigation.state.params.data;
    this.state = {
      letter: "A",
      letterIndexes,
      letterIndexesValues: Object.values(letterIndexes)
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.title}`
  });

  renderItem = ({ item }) => <NameItem key={item.id} item={item} />;

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

    return (
      <View className={styles.container}>
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
        <ScrollView style={styles.alphabetContainer}>
          <View>
            {alphabet.map((letter, i) => {
              const active = letter === this.state.letter ? true : false;

              return (
                <Text
                  key={i}
                  style={[styles.letter, active ? styles.letterActive : ""]}
                  onPress={() => this.onLetterPress(letter)}
                >
                  {letter}
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
    flex: 1,
    borderWidth: 0.5,
    borderColor: "#9b9b9b",
    backgroundColor: "#fff",
    paddingLeft: 7,
    paddingRight: 4,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 20
  },
  letter: {
    color: "#9b9b9b",
    paddingBottom: 3
  },
  letterActive: {
    color: "#50d9af"
  }
});

export default DetailsScreen;
