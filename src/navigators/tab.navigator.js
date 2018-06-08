import React, { Component } from 'react';
import { Text, View, Button, AsyncStorage} from 'react-native';
import { navigation, createStackNavigator, createBottomTabNavigator, withNavigation } from 'react-navigation';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HeaderButtons from 'react-navigation-header-buttons'

import Pangyou from '../pages/pangyou/pangyou.index';
import Friends from '../pages/friends/friends.index';
import Journals from '../pages/journals/journals.index';
import Profile from '../pages/profile/profile.index';
import Settings from '../pages/settings/settings.index';
import Matchmaking from '../pages/matchmaking/matchmaking.index';
import EditProfile from '../pages/profile/profile.edit';
import AddProfile from '../pages/profile/profile.add';

import { route } from '../routes/routes.constants';

import theme from '../styles/theme.style';


// Create Pangyou Stack
const PangyouStack = createStackNavigator({

    pangyou: {
      screen: Pangyou,
    },
    matchmaking: {
      screen: Matchmaking,
    },
    settings: {
      screen: Settings,
    }
  },
  {
    initialRouteName: 'pangyou',
  }

)

// Create Friends Stack
const FriendsStack = createStackNavigator({

    friends: {
      screen: Friends,
    }
    // TODO add Friend Redirection Profile
    // TODO add Edit Friends List
  },
  {
    initialRouteName: 'friends',
  }
)

// Create Journals Stack
const JournalsStack = createStackNavigator({

    journals: {
      screen: Journals,
    }
    // TODO add Specific Journal Redirection
  },
  {
    initialRouteName: 'journals'
  }
  // TODO add journal screen redirection
)

// Create Profile Stack
const ProfileStack = createStackNavigator({

    profile: {
      screen: Profile,
    },
    addprofile: {
      screen: AddProfile,
    },
    editprofile: {
      screen: EditProfile,
    },
  },
  {
    initialRouteName: 'profile'
  }

)

const TabNavigator = createBottomTabNavigator({

		Pangyou: PangyouStack,
		Friends: FriendsStack,
		Journals: JournalsStack,
    Profile: ProfileStack

  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Pangyou') {
          iconName = `face`;
				} else if (routeName === 'Friends') {
					iconName = `people${focused ? '' : '-outline'}`;
				} else if (routeName === 'Journals') {
          iconName = `library-books`;
				} else if (routeName === 'Profile') {
					iconName = `person${focused ? '' : '-outline'}`;
				}
        return <MaterialIcons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: theme.COLOR_SECONDARY_DARK,
      inactiveTintColor: theme.COLOR_PRIMARY_DARK,
    },
    animationEnabled: true,
    swipeEnabled: false,
  }

);

export default TabNavigator;
