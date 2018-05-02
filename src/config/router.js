
import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

// TODO Routing
import Friends from '';
import Profile from '';
import Journals from '';

export const Tabs = TabNavigator({
  Friends: {
    screen: Friends,
    navigationOptions: {
      tabBarLabel: 'Friends',
      tabBarIcon: ({ tintColor }) => <Icon name="list" size={35} color={tintColor} />,
    },
  },
  Journals: {
    screen: Journals,
    navigationOptions: {
      tabBarLabel: 'Journals',
      tabBarIcon: ({ tintColor }) => <Icon name="list" size={35} color={tintColor} />,
    },
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: ({ tintColor }) => <Icon name="account-circle" size={35} color={tintColor} />
    },
  },
});