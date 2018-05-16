import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { withNavigation , navigation } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HeaderButtons from 'react-navigation-header-buttons';

import styles from './friends.style';
import theme from '../../styles/theme.style';

// TODO Add Backend Data Implementation to Populate Data

class Friends extends React.Component {

    // Declare Edit Friend Icon
    static navigationOptions = ({ navigation }) => {

      // TODO Move Edit Friend to Header
      return {
        title: 'Friends',
        headerRight: (
          <HeaderButtons IconComponent={MaterialIcons} iconSize={23} color={theme.COLOR_PRIMARY_DARK}>
          <HeaderButtons.Item 
            title='EditFriends'
            iconName='person-add'
            onPress={() => { /*TODO Add Edit Friend Functionality*/ }}/>
          </HeaderButtons>
        ),
      };
    };

  render() {

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Friends!</Text>
      </View>
    );
  }

}

export default withNavigation(Friends);