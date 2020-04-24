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
import { NavigationActions } from 'react-navigation';
import { addCard } from '../actions';
import { submitCard } from '../utils/api';

class NewCard extends Component {
  state = {
    question: '',
    answer: '',
  };

  updateQuestion = question => {
    this.setState(() => ({
      question,
    }));
  };
  updateAnswer = answer => {
    this.setState(() => ({
      answer,
    }));
  };

  submit = () => {
    const { question, answer } = this.state;
    const { dispatch, id, deck } = this.props;

    let newCard = {
      question,
      answer,
    };

    submitCard(id, newCard)
      .then(dispatch(addCard(id, newCard)))
      .then(
        this.props.navigation.navigate('Deck', {
          id,
          name: deck.name,
          deck: { ...deck, cards: deck.cards.concat([newCard]) },
        })
      );
  };

  render() {
    const { deck } = this.props;
    const { question, answer } = this.state;

    return (
      <View style={styles.container}>
        <TextInput
          placeholder={' Card Question'}
          style={styles.textBox}
          onChangeText={text => this.updateQuestion(text)}
        />
        <TextInput
          placeholder={' Card Answer'}
          style={styles.textBox}
          onChangeText={text => this.updateAnswer(text)}
        />
        <TouchableOpacity
          style={
            Platform.OS === 'ios'
              ? styles.iosSubmitBtn
              : styles.androidSubmitBtn
          }
          onPress={this.submit}
          disabled={question === '' && answer === ''}>
          <Text style={styles.submitBtnText}>SUBMIT</Text>
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
    decks,
  };
}

export default connect(mapStateToProps)(NewCard);
