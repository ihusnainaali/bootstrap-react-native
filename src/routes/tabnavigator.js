import React from 'react';
import { Text, View } from 'react-native';
import { createStackNavigator, TabNavigator, TabBarBottom, withNavigation } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Pangyou from '../pages/pangyou/pangyou.index';
import Friends from '../pages/friends/friends.index';
import Journals from '../pages/journals/journals.index';
import Profile from '../pages/profile/profile.index';
import Settings from '../pages/settings/settings.index';

import theme from '../styles/theme.style';

// Create Pangyou Stack
const PangyouStack = createStackNavigator({
  pangyou: { 
    screen: Pangyou,
    navigationOptions:() => ({
        title: "Pangyou"
    })
  },
  settings: { 
    screen: Settings,
    navigationOptions:() => ({
        title: "Settings"
    })
  },
})

// Create Friends Stack
const FriendsStack = createStackNavigator({
  friends: { 
    screen: Friends,
    navigationOptions:() => ({
        title: "Friend List"
    })
  },
  // TODO add friend screen redirection
})

// Create Journals Stack
const JournalsStack = createStackNavigator({
  journals: { 
    screen: Journals,
    navigationOptions:() => ({
        title: "Journal List"
    })
  },
  // TODO add journal screen redirection
})

// Create Journals Stack
const ProfileStack = createStackNavigator({
  profile: { 
    screen: Settings,
    navigationOptions:() => ({
        title: "User Profile"
    })
  },
  // TODO add edit profile screen redirection
})

export default TabNavigator(
  {
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
        activeTintColor: theme.COLOR_SECONDARY,
        inactiveTintColor: theme.COLOR_PRIMARY_DARK,
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: false,
  }
);
