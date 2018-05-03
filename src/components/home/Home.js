import React from 'react';
import { Text, View } from 'react-native';
import { TabNavigator,TabBarBottom } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!</Text>
      </View>
    );
  }
}

class FriendsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Friends!</Text>
      </View>
    );
  }
}

class JournalsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Journals!</Text>
      </View>
    );
  }
}

class ProfileScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Profile!</Text>
      </View>
    );
  }
}


class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
      </View>
    );
  }
}

export default TabNavigator(
  {
		Home: { screen: HomeScreen },
		Friends: { screen: FriendsScreen },
		Journals: {screen: JournalsScreen},
		Profile: {screen: ProfileScreen},
    Settings: { screen: SettingsScreen },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `face`;
				} else if (routeName === 'Friends') {
					iconName = `people${focused ? '' : '-outline'}`;
				} else if (routeName === 'Journals') {
          iconName = `library-books`;
				} else if (routeName === 'Profile') {
					iconName = `person${focused ? '' : '-outline'}`;
				} else if (routeName === 'Settings') {
          iconName = `settings`;
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