import React from 'react';
import { KeyboardAvoidingView, View, Text, FlatList, ActivityIndicator } from 'react-native';

import { withNavigation } from 'react-navigation';

import styles from './friends.style';
import theme from '../../styles/theme.style';

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