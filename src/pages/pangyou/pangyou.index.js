import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';

import { route } from '../../routes/routes.constants';

import styles from './pangyou.style';

class Pangyou extends React.Component {

  navigateToMatchmaking = () => {
    this.props.navigation.navigate(route.SETTINGS)
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.avatarGrid}>
          <TouchableOpacity 
            onPress={() => { this.navigateToMatchmaking() }}>
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