import React, { Component } from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';

import styles from './splash.style'

export default class Splash extends Component {
	render() {
    return (
  		<View style={styles.wrapper}>
        <View style={styles.titleWrapper}>
          <Image
            style={styles.titleLogo}
            source={require('../../assets/pangyou_logo.png')}/>
        </View>
  			<View>
          	<Text style={styles.subtitle}>Powered by Develoop</Text>
        </View>
  		</View>
    );
	}
}

