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
import { deleteDeck, updateDecks, receiveDecks } from '../actions';
import { removeDeck } from '../utils/api';

class Deck extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('name'),
  });

  toAddNewCard = () => {
    const { deck, id } = this.props;

    this.props.navigation.navigate('NewCard', { deck, id });
  };
  toTakeQuiz = () => {
    const { deck, id } = this.props;

    if (deck) {
      if (deck.cards.length !== 0) {
        this.props.navigation.navigate('ViewCard', { deck, id });
      } else {
        this.props.navigation.navigate('NoCards');
      }
    }
  };

  toRemoveDeck = () => {
    const { dispatch, id } = this.props;

    removeDeck(id)
      .then(dispatch(deleteDeck(id)))
      .then(this.props.navigation.navigate('DeckList'));
  };

  render() {
    const { deck, name } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.deck}>
          <Text style={{ fontSize: 20 }}>Deck: {name}</Text>
          <Text style={{ fontSize: 16, color: orange }}>
            {deck.cards.length} Cards
          </Text>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={
              Platform.OS === 'ios'
                ? styles.iosSubmitBtn
                : styles.androidSubmitBtn
            }
            onPress={this.toAddNewCard}>
            <Text style={styles.submitBtnText}>Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              Platform.OS === 'ios'
                ? styles.iosSubmitBtn
                : styles.androidSubmitBtn
            }
            onPress={this.toTakeQuiz}>
            <Text style={styles.submitBtnText}>Take Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.toRemoveDeck}>
            <Text style={styles.txtBtn}>Remove Deck</Text>
          </TouchableOpacity>
        </View>
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
  deck: {
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 17,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 1,
      height: 4,
    },
  },
  row: {
    flex: 1,
    flexDirection: 'column',
  },
  txtBtn: {
    textAlign: 'center',
    color: orange,
  },
});

function mapStateToProps(decks, { navigation }) {
  const { id, deck, name } = navigation.state.params;

  return {
    deck,
    id,
    name,
  };
}

export default connect(mapStateToProps)(Deck);
