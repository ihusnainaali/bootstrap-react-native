import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HeaderButtons from 'react-navigation-header-buttons'

import { route } from '../../routes/routes.constants';

import styles from './pangyou.style';
import theme from '../../styles/theme.style';

class Pangyou extends React.Component {

  navigateToMatchmaking = () => {
    this.props.navigation.navigate(route.MATCHMAKING)
  }

  navigateToSettings = () => {
    this.props.navigation.navigate(route.SETTINGS)
  }

  // Declare Settings Icon
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    return {
      headerRight: (
        <HeaderButtons IconComponent={MaterialIcons} iconSize={23} color={theme.COLOR_PRIMARY_DARK}>
        <HeaderButtons.Item 
          title= 'SettingsRedirect' 
          iconName='settings'
          onPress={() => { this.navigateToSettings() }}/>
        </HeaderButtons>
      )
    };
  };
  
  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.avatarGrid}>
          <TouchableOpacity 
            onPress={() => { this.navigateToSettings() }}>
		        <Image
			        style={styles.avatar}
			          source={require('../../assets/pangyou_welcome.png')}/>
          </TouchableOpacity>
        </View>
      </View>
      );
    }
}

export default withNavigation(Pangyou);