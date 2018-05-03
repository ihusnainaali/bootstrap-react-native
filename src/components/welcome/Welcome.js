import React, { Component } from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { withNavigation } from 'react-navigation';

class Welcome extends Component {
	render() {
    return (
  		<View style={styles.welcomeWrapper}>
				<StatusBar barStyle="light-content" />
        <View style={styles.welcomeTopGrid}>
					<Text style={styles.welcomeTitle}>Pangyou</Text>
					<Image
						style={styles.welcomeLogo}
						source={require('../../assets/pangyou_welcome.png')}/>
        </View>
				<View style={styles.welcomeBottomGrid}>
					<TouchableOpacity
						style={styles.loginButtonContainer}
						onPress={() => this.props.navigation.navigate('Login')}>
						<Text style={styles.loginButtonText}>LOGIN</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.registerButtonContainer}
						onPress={() => this.props.navigation.navigate('Register')}>
						<Text style={styles.registerButtonText}t>REGISTER</Text>
					</TouchableOpacity>
				</View>
  		</View>
    );
	}
}

const styles = StyleSheet.create({
	welcomeWrapper: {
		backgroundColor: '#80d6ff',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
  welcomeTopGrid: {
    flex: 1,
		marginTop: 100,
		alignItems: 'center'
  },
	welcomeBottomGrid: {
    flex: 1,
		marginTop: 125,
		marginBottom: 100,
		alignItems: 'center'
  },
  welcomeTitle: {
    color: 'white',
		fontSize: 35,
    fontWeight: 'bold',
		marginBottom: 30
  },
	welcomeLogo: {
    width: 168,
    height: 168
  },
	loginButtonContainer: {
		backgroundColor: '#f6d7c3',
		borderWidth:8,
		borderRadius: 40,
		borderColor: '#000000',
		marginBottom: 20,
		paddingVertical: 10,
		width: 250
	},
	loginButtonText: {
		fontSize: 28,
    fontWeight: '900',
		textAlign: 'center',
		color: '#000000'
	},
	registerButtonContainer: {
		backgroundColor: '#f6d7c3',
		borderWidth:8,
		borderRadius: 40,
		borderColor: '#000000',
		marginBottom: 20,
		paddingVertical: 10,
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
