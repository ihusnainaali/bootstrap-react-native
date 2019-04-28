import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Home from '../pages/Home/Home.index';
import Friends from '../pages/friends/friends.index';
import Journals from '../pages/journals/journals.index';
import Profile from '../pages/profile/profile.index';
import AddProfile from '../pages/profile/profile.add';
import EditProfile from '../pages/profile/profile.edit';
import FriendProfile from '../pages/profile/profile.friend';
import Settings from '../pages/settings/settings.index';
import Matchmaking from '../pages/matchmaking/matchmaking.index';
import Chat from '../pages/chat/chat.index';
import Video from '../pages/video/video.index';
import theme from '../styles/theme.style';

const HomeStack = createStackNavigator({
    Home: {
      screen: Home,
    },
  },
  {
    initialRouteName: 'Home',
  }

)
// Create Friends Stack
const FriendsStack = createStackNavigator({
    friends: {
      screen: Friends,
    },
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
    }
  },
  {
    initialRouteName: 'profile'
  }
  // TODO add edit profile screen redirection
)
const Tabs = createBottomTabNavigator({

        Home: HomeStack,
        Friends: FriendsStack,
        Journals: JournalsStack,
        Profile: ProfileStack

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
Tabs.navigationOptions = {
    header: null,
};
const TabNavigator = createStackNavigator({
    Tabs,
    chat: {
        screen: Chat,
    },
    matchmaking: {
        screen: Matchmaking,
    },
    settings: {
        screen: Settings,
    },
    video: {
        screen: Video,
    },
    profileadd: {
        screen: AddProfile,
    },
    profileedit: {
        screen: EditProfile,
    },
    profilefriend: {
        screen: FriendProfile,
    }
})
export default TabNavigator;
