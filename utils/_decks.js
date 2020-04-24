import { AsyncStorage } from 'react-native';
import { generateID } from './helpers';

export const DECKS_STORAGE_KEY = 'MobileFlashCards:flashcards';

function createOneDeck() {
  // This is used for testing and can be turned back on for development
  let exampleDeck = {};
  const id = generateID();

  exampleDeck[id] = {
    name: 'Color Wheel',
    timestamp: Date.now(),
    cards: [
      {
        question: 'What two colors make Green',
        answer: 'Blue and Yellow',
      },
      {
        question: 'What two colors make Purple',
        answer: 'Red and Blue',
      },
      {
        question: 'What two colors make Orange',
        answer: 'Red and Yellow',
      },
      {
        question: 'What two colors make Brown',
        answer: 'Red and Green',
      },
    ],
  };

  AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(exampleDeck));
  return exampleDeck;
}

export function checkFetchDeckResults(results) {
  return  results[Object.keys(results)[0]]?.name === undefined ? {} : JSON.parse(results);
}
