import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
  TextInput,
} from 'react-native';
import { connect } from 'react-redux';
import { purple, orange, white, blue } from '../utils/colors';
import { clearLocalNotification, setLocalNotification } from '../utils/helpers';

class Score extends Component {
  componentDidMount() {
    clearLocalNotification().then(setLocalNotification);
  }

  toDeck = () => {
    const { id, deck } = this.props;

    this.props.navigation.navigate('Deck', {
      id,
      name: deck.name,
      deck,
    });
  };
  toStartQuiz = () => {
    const { id, deck } = this.props;

    this.props.navigation.navigate('ViewCard', {
      id,
      deck,
    });
  };

  render() {
    const { deck, score } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          Your score for this deck: {score} out of {deck.cards.length}
        </Text>
        <TouchableOpacity
          style={
            Platform.OS === 'ios'
              ? styles.iosSubmitBtn
              : styles.androidSubmitBtn
          }
          onPress={this.toStartQuiz}>
          <Text style={styles.submitBtnText}>Restart Quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            Platform.OS === 'ios'
              ? styles.iosSubmitBtn
              : styles.androidSubmitBtn
          }
          onPress={this.toDeck}>
          <Text style={styles.submitBtnText}>Back to Deck</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 40,
    backgroundColor: white,
  },
  iosSubmitBtn: {
    backgroundColor: blue,
    padding: 10,
    borderRadius: 7,
    height: 45,
    margin: 10,
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 1,
      height: 4,
    },
  },
  androidSubmitBtn: {
    backgroundColor: blue,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 2,
    height: 45,
    margin: 10,
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 1,
      height: 4,
    },
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
  text: {
    fontSize: 25,
    padding: 20,
  },
});

function mapStateToProps(state, { navigation }) {
  const { id, deck, score } = navigation.state.params;

  return {
    score,
    id,
    deck,
  };
}

export default connect(mapStateToProps)(Score);
