import React, { PureComponent } from "react";
import { View, FlatList, StyleSheet, Text, ScrollView } from "react-native";
import NameItem from "../../components/nameItem";
import Alphabet from "../../utils/alphabet";

class DetailsScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      list: this.props.navigation.state.params.list,
      alphabet: Alphabet
    };
  }

  renderItem = ({ item }) => (
    <NameItem key={item.key} name={item.name} subtitle={item.extra} />
  );

  render() {
    const { list, alphabet } = this.state;

    return (
      <View>
        <FlatList
          data={list}
          keyExtractor={item => item.name}
          renderItem={this.renderItem}
        />
        <ScrollView style={styles.alphabetContainer}>
          <View>
            {alphabet.map((letter, i) => {
              return (
                <Text key={i} style={styles.letter}>
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
  alphabetContainer: {
    position: "absolute",
    right: 10,
    top: 10,
    flex: 1,
    borderWidth: 0.5,
    borderColor: "#9b9b9b",
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
