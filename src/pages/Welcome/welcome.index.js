import React, { Component } from 'react';
import { Image, View, Text, StyleSheet, StatusBar } from 'react-native';
import { withNavigation } from 'react-navigation';
import styles from './welcome.style';

import Button from '../../components/Button/Button.component';

class Welcome extends Component {
	render() {
    return (
		<View style={styles.welcomeWrapper}>
			<StatusBar barStyle="light-content" />
        <View style={styles.welcomeTopGrid}>
			<Image
				style={styles.welcomeLogo}
				source={require('../../assets/pangyou_welcome.png')}/>
        </View>
			<View style={styles.welcomeBottomGrid}>
				<Button name='Login' screen='Login'/>
				<Button name='Register' screen='Register'/>
			</View>
		</View>
    );
	}
}

export default withNavigation(Welcome);
