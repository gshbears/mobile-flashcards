import React, { Component } from 'react';
import { View, Platform, StatusBar } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { createAppContainer } from 'react-navigation';
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
} from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import Constants from 'expo-constants';

import reducer from './reducers';
import NewDeck from './components/NewDeck';
import DeckList from './components/DeckList';
import Deck from './components/Deck';
import NewCard from './components/NewCard';
import NoCards from './components/NoCards';
import ViewCard from './components/ViewCard';
import Score from './components/Score';
import { white, purple, orange, lightorange, gray } from './utils/colors';

function FlashCardStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

const Tabs = {
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => (
        <Ionicons
          name={Platform.OS === 'ios' ? 'ios-albums' : 'md-albums'}
          size={30}
          color={tintColor}
        />
      ),
    },
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome name="plus-square" size={30} color={tintColor} />
      ),
    },
  },
};

const navigationOptions = {
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? orange : white,
    inactiveTintColor: Platform.OS === 'ios' ? gray : lightorange,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : orange,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowRadius: 6,
      shadowOpacity: 1,
    },
  },
};

const TabNav = createBottomTabNavigator(Tabs, navigationOptions);

const MainNavigator = createAppContainer(
  createStackNavigator({
    Home: {
      screen: TabNav,
      navigationOptions: ({ navigation }) => ({
        headerShown: false,
      }),
    },
    Deck: {
      screen: Deck,
      navigationOptions: ({ navigation }) => ({
        headerTintColor: white,
        headerStyle: {
          backgroundColor: orange,
        },
      }),
    },
    NoCards: {
      screen: NoCards,
      navigationOptions: ({ navigation }) => ({
        headerTintColor: white,
        title: 'No Flash Cards Available',
        headerStyle: {
          backgroundColor: orange,
        },
      }),
    },
    ViewCard: {
      screen: ViewCard,
      navigationOptions: ({ navigation }) => ({
        headerTintColor: white,
        title: 'Flash Card',
        headerStyle: {
          backgroundColor: orange,
        },
      }),
    },
    NewCard: {
      screen: NewCard,
      navigationOptions: ({ navigation }) => ({
        headerTintColor: white,
        title: 'New Card',
        headerStyle: {
          backgroundColor: orange,
        },
      }),
    },
    Score: {
      screen: Score,
      navigationOptions: ({ navigation }) => ({
        headerTintColor: white,
        title: 'Your Score',
        headerStyle: {
          backgroundColor: orange,
        },
      }),
    },
  })
);

export default class App extends Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1 }}>
          <FlashCardStatusBar
            backgroundColor={orange}
            barStyle="light-content"
          />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
