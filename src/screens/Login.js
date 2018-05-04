import React, { Component } from 'react';
import { Image, View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { withNavigation } from 'react-navigation';
import { COLOR_PRIMARY} from '../styles/common'

import Amplify, { Auth } from 'aws-amplify'
import config from '../../aws-exports'
Amplify.configure(config)


class Login extends Component {
	state = {
		username: '',
		password: '',
		error: '',
		user: {}
	}

	setAuthCode(authCode) { // 2
		this.setState({ authCode });
	}

	setUsername(username) {
		this.setState({ username });
	}

	setPassword(password) {
		this.setState({ password });
	}

  onChangeText = (key, value) => {
    this.setState({
      [key]: value
    })
	}

	setError(error){
		this.setState({error});
	}

	clearError(){
		this.setState({error: ''});
	}

	signIn() {
		const {username, password} = this.state
		this.clearError();

		Auth.signIn(username, password)
			.then(user => {
				console.log(user);
				this.props.navigation.navigate('Home');
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
						placeholderTextColor="#000000"
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
						placeholderTextColor="#000000"
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
						<Text style={styles.submitButtonText}>SUBMIT</Text>
					</TouchableOpacity>
				</View>
  		</KeyboardAvoidingView>
    );
	}
}

const styles = StyleSheet.create({
	loginWrapper: {
		backgroundColor: COLOR_PRIMARY,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
  loginTopGrid: {
    flex: 1,
		marginTop: 75,
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
		backgroundColor: '#FFFFFF',
		borderWidth:1,
		borderColor: '#000000',
		marginBottom: 30,
		color: '#000000',
		fontWeight: 'bold',
		paddingHorizontal: 10,
		paddingVertical: 10,
		width: 275
	},
	submitButtonContainer: {
		backgroundColor: '#FFFFFF',
		borderWidth:1,
		borderColor: '#000000',
		marginBottom: 20,
		paddingVertical: 10,
		width: 275
	},
	submitButtonText: {
		fontSize: 28,
    fontWeight: '900',
		textAlign: 'center',
		color: '#000000'
	}
});

export default withNavigation(Login);
