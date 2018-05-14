import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';

import styles from './pangyou.style';

class Pangyou extends React.Component {


  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.avatarGrid}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('matchmaking')}>
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