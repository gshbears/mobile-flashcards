import {
  RECEIVE_DECKS,
  ADD_DECK,
  ADD_CARD,
  DELETE_DECK
} from '../actions';

Object.removeDeck = (obj, id) =>
  Object.keys(obj)
    .filter(key => key !== id)
    .reduce((res, key) => ((res[key] = obj[key]), res), {});

function decks(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks,
      };
    case ADD_DECK:
      return {
        ...state,
        ...action.deck,
      };
    case ADD_CARD:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          cards: state[action.id].cards.concat([action.card]),
        },
      };
    case DELETE_DECK:
      return Object.removeDeck(state, action.id)
    default:
      return state;
  }
}

export default decks;
