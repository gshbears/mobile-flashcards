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
import { addCard } from '../actions';
import { submitCard } from '../utils/api';

class ViewCard extends Component {
  state = {
    correct: 0,
    show: false,
    qindex: 0,
  };

  showAnswer = () => {
    this.setState(() => ({
      show: true,
    }));
  };

  updateScore = point => {
    const { correct, qindex } = this.state;
    const { deck, id } = this.props;
    let newindex = qindex + 1;
    let score = correct + point;

    if (newindex === deck.cards.length) {
      this.props.navigation.navigate('Score', { id, deck, score });

      this.setState(() => ({
        correct: 0,
        show: false,
        qindex: 0,
      }));
    } else {
      this.setState(() => ({
        correct: score,
        show: false,
        qindex: newindex,
      }));
    }
  };

  render() {
    const { deck, id } = this.props;
    const { qindex, answer, show, correct } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.textBox}>{deck.cards[qindex].question}</Text>
        {show ? (
          <Text style={styles.textBox}>{deck.cards[qindex].answer}</Text>
        ) : (
          <TouchableOpacity
            style={
              Platform.OS === 'ios'
                ? styles.iosSubmitBtn
                : styles.androidSubmitBtn
            }
            onPress={this.showAnswer}>
            <Text style={styles.submitBtnText}>Show Answer</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={
            Platform.OS === 'ios'
              ? styles.iosSubmitBtn
              : styles.androidSubmitBtn
          }
          onPress={() => this.updateScore(1)}>
          <Text style={styles.submitBtnText}>Correct</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            Platform.OS === 'ios'
              ? styles.iosSubmitBtn
              : styles.androidSubmitBtn
          }
          onPress={() => this.updateScore(0)}>
          <Text style={styles.submitBtnText}>Incorrect</Text>
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
  textBox: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    margin: 10,
    padding: 10,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 1,
      height: 4,
    },
  },
});

function mapStateToProps(decks, { navigation }) {
  const { deck, id } = navigation.state.params;

  return {
    deck,
    id,
  };
}

export default connect(mapStateToProps)(ViewCard);
