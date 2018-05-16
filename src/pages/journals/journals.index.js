import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { withNavigation , navigation } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HeaderButtons from 'react-navigation-header-buttons';
import { Icon } from 'native-base';

import styles from './journals.style';
import theme from '../../styles/theme.style';

// TODO Add Backend Data Implementation to Populate Data

class Journals extends React.Component {
  
  // Declare Settings Icon
  static navigationOptions = ({ navigation }) => {

    // TODO Move Settings Gear to Header
    return {
      title: 'Journals',
      headerRight: (
        <HeaderButtons IconComponent={MaterialIcons} iconSize={23} color={theme.COLOR_PRIMARY_DARK}>
        <HeaderButtons.Item 
          title='EditJournals'
          iconName='book'
          onPress={() => { /*TODO Add Edit Journal Functionality*/ }}/>
        </HeaderButtons>
      ),
    };

  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Journals!</Text>
      </View>
    );
  }
}

export default withNavigation(Journals);