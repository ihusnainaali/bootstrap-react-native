import React, { Component } from 'react';
import { Image, View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { withNavigation } from 'react-navigation';

import Amplify, { Auth } from 'aws-amplify'
import config from '../../../aws-exports'
Amplify.configure(config)

class Login extends Component {
	state = {
		username: '',
		password: '',
		error: '',
		user: {}
	}

  onChangeText = (key, value) => {
    this.setState({
      [key]: value
    })
	}

	setError(error){
		this.setState({error});
	}
	
	signIn() { // 1
		const {username, password} = this.state
		Auth.signIn(username, password)
			.then(user => {
				console.log(user);
			})
			.catch(err => {
				if (err.code === "UserNotConfirmedException") {
					this.props.navigation.navigate('Verification', {username});
				}
				else {
					this.setError(err.message);
				}
			})
	}

	render() {
    return (
			<KeyboardAvoidingView behavior="padding" style={styles.loginWrapper}>
        <View style={styles.loginTopGrid}>
					<Text style={styles.loginTitle}>Login</Text>
        </View>
				<View style={styles.loginMiddleGrid}>
					<TextInput
						placeholder="Username or Email"
						placeholderTextColor="#d1d1d1"
						returnKeyType="next"
						onSubmitEditing={() => this.passwordInput.focus()}
						keyboardType="email-address"
						autoCapitalize="none"
						autoCorrect={false}
						style={styles.loginInput}
						onChangeText={(value) => this.onChangeText("username", value)}
						/>
					<TextInput
						placeholder="Password"
						placeholderTextColor="#d1d1d1"
						returnKeyType="go"
						secureTextEntry
						autoCapitalize="none"
						autoCorrect={false}
						style={styles.loginInput}
						ref={(input) => this.passwordInput = input}
						onChangeText={(value) => this.onChangeText("password", value)}
						/>
						<Text>{this.state.error}</Text>
				</View>
				<View style={styles.loginBottomGrid}>
					<TouchableOpacity
						style={styles.submitButtonContainer}
						onPress={this.signIn.bind(this)}>
						<Text style={styles.submitButtonText}>LOGIN</Text>
					</TouchableOpacity>
				</View>
  		</KeyboardAvoidingView>
    );
	}
}

const styles = StyleSheet.create({
	loginWrapper: {
		backgroundColor: '#FFFFFF',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
  loginTopGrid: {
    flex: 1,
		marginTop: 100,
		alignItems: 'center'
  },
	loginMiddleGrid: {
    flex: 1,
		marginTop: 20,
		alignItems: 'center'
  },
	loginBottomGrid: {
    flex: 1,
		marginTop: 125,
		marginBottom: 100,
		alignItems: 'center'
  },
  loginTitle: {
    color: 'black',
		fontSize: 35,
    fontWeight: 'bold',
		marginBottom: 30
  },
	loginLogo: {
    width: 168,
    height: 168
  },
	loginInput: {
		height: 50,
		backgroundColor: '#4C989F',
		marginBottom: 30,
		color: '#FFFFFF',
		fontWeight: 'bold',
		paddingHorizontal: 10,
		width: 275
	},
	submitButtonContainer: {
		backgroundColor: '#4C989F',
		borderWidth:8,
		borderRadius: 40,
		borderColor: '#000000',
		marginBottom: 20,
		paddingVertical: 10,
		width: 250
	},
	submitButtonText: {
		fontSize: 28,
    fontWeight: '900',
		textAlign: 'center',
		color: '#FFFFFF'
	}
});

export default withNavigation(Login);
