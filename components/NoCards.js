import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from 'react-native';
import { purple } from '../utils/colors';

class NoCards extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('name'),
  });

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Sorry, You can not start the quiz as there are no flashcards in this
          deck.
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 25,
    padding: 20,
  },
});

export default NoCards;
