import React from 'react';
import { Text, View } from 'react-native';
import { TabNavigator, TabBarBottom, withNavigation } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// TODO Routing Handled Here
import Pangyou from '../Pangyou/pangyou.index';
import Friends from '../Friends/friends.index';
import Journals from '../Journals/journals.index';
import Profile from '../Profile/profile.index';
import Settings from '../Settings/settings.index';

class PangyouScreen extends React.Component {
  static navigationOptions = {
    title: 'Pangyou',
  };

  render() {
    return (
      <Pangyou />
    );
  }
}

class FriendsScreen extends React.Component {

  static navigationOptions = {
    title: 'Friends',
  };

  render() {
    return (
      <Friends />
    );
  }
}

class JournalsScreen extends React.Component {

  static navigationOptions = {
    title: 'Journals',
  };

  render() {
    return (
      <Journals />
    );
  }
}

class ProfileScreen extends React.Component {

  static navigationOptions = {
    title: 'Profile',
  };

  render() {
    return (
      <Profile />
    );
  }
}

class SettingsScreen extends React.Component {

  static navigationOptions = {
    title: 'Settings',
  };

  render() {
    return (
      <Settings />
    );
  }

}

export default TabNavigator(
  {
		Pangyou: { screen: PangyouScreen },
		Friends: { screen: FriendsScreen },
		Journals: {screen: JournalsScreen},
		Profile: {screen: ProfileScreen},
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
        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
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
