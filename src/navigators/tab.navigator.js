import React from 'react';
import { Text, View, Button} from 'react-native';
import { navigation, createStackNavigator, createBottomTabNavigator, withNavigation } from 'react-navigation';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HeaderButtons from 'react-navigation-header-buttons'

import Pangyou from '../pages/pangyou/pangyou.index';
import Friends from '../pages/friends/friends.index';
import Journals from '../pages/journals/journals.index';
import Profile from '../pages/profile/profile.index';
import Settings from '../pages/settings/settings.index';
import Matchmaking from '../pages/matchmaking/matchmaking.index'

import { route } from '../routes/routes.constants';

import theme from '../styles/theme.style';

// Create Pangyou Stack
const PangyouStack = createStackNavigator({

    pangyou: {
      screen: Pangyou,
      navigationOptions: ({ navigation }) => ({ 
        tabBarVisible: false
      })
    },
    matchmaking: { 
      screen: Matchmaking,
    },
    settings: { 
      screen: Settings 
    }
  },
  {
    initialRouteName: 'pangyou',
  }
  
)

// Create Friends Stack
const FriendsStack = createStackNavigator({

    friends: { 
      screen: Friends
    }
  },
  {
    initialRouteName: 'friends',
  }
)
  
// Create Journals Stack
const JournalsStack = createStackNavigator({

    journals: { 
      screen: Journals
    }
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
    }
  },
  {
    initialRouteName: 'profile'
  }
  // TODO add edit profile screen redirection
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
      activeTintColor: theme.COLOR_SECONDARY,
      inactiveTintColor: theme.COLOR_PRIMARY_DARK,
    },
    animationEnabled: true,
    swipeEnabled: false,
  }
);

export default TabNavigator;