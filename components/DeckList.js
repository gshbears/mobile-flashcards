import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import { purple, orange, white, blue } from '../utils/colors';
import { AppLoading } from 'expo';
import { receiveDecks, addDeck } from '../actions';
import { fetchDecks } from '../utils/api';

function Deck({ deck, onPress }) {
  return (
    <TouchableOpacity style={styles.deck} onPress={onPress}>
      <Text style={{ fontSize: 20 }}>Deck: {deck.name}</Text>
      <Text style={{ fontSize: 16, color: orange }}>
        {deck.cards.length} Cards
      </Text>
    </TouchableOpacity>
  );
}

class DeckList extends Component {
  state = {
    ready: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;

    fetchDecks()
      .then(decks => dispatch(receiveDecks(decks)))
      .then(() =>
        this.setState(() => ({
          ready: true,
        }))
      );
  }

  toDeck = (id, deck) => {
    this.props.navigation.navigate('Deck', {
      id,
      name: deck.name,
      deck,
    });
  };


  render() {
    const { decks } = this.props;
    const { ready } = this.state;

    if (ready === false) {
      return <AppLoading />;
    }

    return (
      <View style={styles.container}>
        <Text style={styles.title}>My Mobile Flash Cards </Text>
        { decks[Object.keys(decks)[0]]?.name !== undefined  ? (
          <ScrollView>
            {Object.keys(decks).map(
              deck =>
                  <Deck
                    key={deck}
                    id={deck}
                    deck={decks[deck]}
                    onPress={() => this.toDeck(deck, decks[deck])}
                  />
            )}
          </ScrollView>
        ) : (
          <View>
            <Text style={styles.nodecks}>Click Add Deck to get started</Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  title: {
    fontSize: 25,
    paddingTop: 20,
    paddingBottom: 20,
    alignSelf: 'center',
    color: orange,
  },
  nodecks: {
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 20,
    alignSelf: 'center',
  },
});

function mapStateToProps(decks) {
  return {
    decks,
  };
}

export default connect(mapStateToProps)(DeckList);
