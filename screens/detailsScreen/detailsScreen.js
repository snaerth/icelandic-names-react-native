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
import Alphabet from "../../utils/alphabet";

class DetailsScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      list: this.props.navigation.state.params.list,
      alphabet: Alphabet,
      letter: "A"
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.title}`
  });

  renderItem = ({ item }) => (
    <NameItem key={item.key} name={item.name} subtitle={item.extra} />
  );

  onLetterPress(letter) {
    this.setState({ letter });
  }

  scrollToItem = () => {
    this.flatListRef.scrollToIndex({ animated: false, index: 100 });
  };

  getItemLayout = (data, index) => {
    return { length: 80, offset: 80 * 100, index };
  };

  render() {
    const { list, alphabet } = this.state;

    return (
      <View className={styles.container}>
        <FlatList
          data={list}
          keyExtractor={item => item.name}
          renderItem={this.renderItem}
          //getItemLayout={this.getItemLayout}
          ref={ref => {
            this.flatListRef = ref;
          }}
        />
        <ScrollView style={styles.alphabetContainer}>
          <View>
            {alphabet.map((letter, i) => {
              return (
                <Text
                  key={i}
                  style={styles.letter}
                  //onPress={() => this.onLetterPress(letter)}
                  onPress={this.scrollToItem}
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
  }
});

export default DetailsScreen;
