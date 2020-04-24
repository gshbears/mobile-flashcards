import { AsyncStorage } from 'react-native';
import { DECKS_STORAGE_KEY, checkFetchDeckResults } from './_decks';
import { generateID } from './helpers';

export function fetchDecks() {
  return  AsyncStorage.getItem(DECKS_STORAGE_KEY).then(checkFetchDeckResults)
}

export function submitDeck(id, deck) {
  return AsyncStorage.mergeItem(
    DECKS_STORAGE_KEY,
    JSON.stringify({
      [id]: deck,
    })
  );
}

export function submitCard(id, card) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(results => {
    const data = JSON.parse(results);
    data[id].cards.concat([card]);
    AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data));
  });
}

export function removeDeck(id) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(results => {
    const data = JSON.parse(results);
    data[id] = undefined;
    delete data[id];
    AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data));
  });
}
