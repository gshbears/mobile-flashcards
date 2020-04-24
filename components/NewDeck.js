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
import { submitDeck } from '../utils/api';
import { generateID } from '../utils/helpers';
import { addDeck } from '../actions';

class NewDeck extends Component {
  state = {
    name: '',
  };

  updateName = name => {
    this.setState(() => ({
      name,
    }));
  };

  submit = () => {
    const { dispatch } = this.props;
    const { name } = this.state;
    const id = generateID();

    let newDeck = {
      name,
      timestamp: Date.now(),
      cards: [],
    };

    submitDeck(id, newDeck);

    dispatch(
      addDeck({
        [id]: newDeck,
      })
    );

    this.toNewDeck(id, name, newDeck);

  };

  toNewDeck = (id, name, deck) => {
    const { navigation } = this.props;

    navigation.navigate('Deck', {
      id,
      name,
      deck,
    });
  };

  render() {
    const { deck } = this.props;
    const { name } = this.state;

    return (
      <View style={styles.container}>
        <TextInput
          placeholder={'New Deck Name'}
          style={styles.textBox}
          onChangeText={text => this.updateName(text)}
        />
        <TouchableOpacity
          style={
            Platform.OS === 'ios'
              ? styles.iosSubmitBtn
              : styles.androidSubmitBtn
          }
          onPress={this.submit}
          disabled={name === ''}>
          <Text style={styles.submitBtnText}>Create Deck</Text>
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

export default connect()(NewDeck);
