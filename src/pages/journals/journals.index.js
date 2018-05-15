import React from 'react';
import { KeyboardAvoidingView, View, Text, FlatList, ActivityIndicator } from 'react-native';

import { withNavigation } from 'react-navigation';

import styles from './journals.style';
import theme from '../../styles/theme.style';

class Journals extends React.Component {

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Journals!</Text>
      </View>
    );
  }
}

export default withNavigation(Journals);