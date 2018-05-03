import React from 'react';
import { Text, View } from 'react-native';
import { TabNavigator,TabBarBottom,withNavigation } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

class Friends extends React.Component {
    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Friends!</Text>
        </View>
      );
    }
  }

export default withNavigation(Friends);
