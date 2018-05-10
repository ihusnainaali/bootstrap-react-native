import React from 'react';
import { Text, View } from 'react-native';
import { TabNavigator, TabBarBottom, withNavigation } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// TODO Routing Handled Here
import Pangyou from '../pages/pangyou/pangyou.index';
import Friends from '../pages/friends/friends.index';
import Journals from '../pages/journals/journals.index';
import Profile from '../pages/profile/profile.index';
import Settings from '../pages/settings/settings.index';

export default TabNavigator(
  {
		Pangyou: { screen: Pangyou },
		Friends: { screen: Friends },
		Journals: {screen: Journals },
		Profile: { screen: Profile },
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
        activeTintColor: '#80d6ff',
        inactiveTintColor: 'gray',
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: false,
  }
);
