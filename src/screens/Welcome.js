import React, { Component } from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { withNavigation } from 'react-navigation';
import { COLOR_PRIMARY} from '../styles/common';

import Button from '../components/Button/index'

class Welcome extends Component {
	render() {
    return (
  		<View style={styles.welcomeWrapper}>
				<StatusBar barStyle="light-content" />
        <View style={styles.welcomeTopGrid}>
					<Text style={styles.welcomeTitle}>Pangyou</Text>
					<Image
						style={styles.welcomeLogo}
						source={require('../assets/pangyou_welcome.png')}/>
        </View>
				<View style={styles.welcomeBottomGrid}>
					<Button name='Login' screen='Login'/>
					<Button name='Register' screen='Register'/>
				</View>
  		</View>
			
    );
	}
}

const styles = StyleSheet.create({
	welcomeWrapper: {
		backgroundColor: COLOR_PRIMARY,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
  welcomeTopGrid: {
    flex: 1,
		marginTop: 50,
		alignItems: 'center'
  },
	welcomeBottomGrid: {
    flex: 1,
		marginTop: 125,
		marginBottom: 100,
		alignItems: 'center'
  },
  welcomeTitle: {
		color: '#000000',
		fontSize: 35,
		fontWeight: 'bold',
		textShadowColor: '#000000',
		marginBottom: 30
  },
	welcomeLogo: {
    width: 168,
    height: 168
  },
	loginButtonContainer: {
		backgroundColor: '#ffffff',
		marginBottom: 20,
		paddingVertical: 10,
		borderRadius: 10,
		width: 250
	},
	loginButtonText: {
		fontSize: 28,
    fontWeight: '900',
		textAlign: 'center',
		color: '#000000'
	},
	registerButtonContainer: {
		backgroundColor: '#ffffff',
		marginBottom: 20,
		paddingVertical: 10,
		borderRadius: 10,
		width: 250
	},
	registerButtonText: {
		fontSize: 28,
    fontWeight: '900',
		textAlign: 'center',
		color: '#000000'
	}
});

export default withNavigation(Welcome);
