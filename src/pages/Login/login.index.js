import React, { Component } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Icon } from 'react-native';
import { withNavigation } from 'react-navigation';
import TextField from '../../components/TextField/TextField.component';
import Button from '../../components/Button/Button.component';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import styles from './login.style';
import theme from '../../styles/theme.style';

import Amplify, { Auth } from 'aws-amplify';
import config from '../../../aws-exports';
Amplify.configure(config);

class Login extends Component {
	state = {
		username: '',
		password: '',
		error: '',
		user: {}
	}

  onChangeText = (key) => {
	return (value) => this.setState({
	  [key]: value
	});
	}

  setError(error) {
	this.setState({ error });
	}

  clearError() {
	this.setState({ error: '' });
	}

	signIn() {
	const { username, password } = this.state;
		this.clearError();

		Auth.signIn(username, password)
			.then(user => {
				console.log(user);
				this.props.navigation.navigate('Home');
			})
			.catch(err => {
				if (err.code === "UserNotConfirmedException") {
		  this.props.navigation.navigate('Verification', { username });
				}
				else {
					this.setError(err.message);
				}
			});
	}

	render() {
	return (
		<KeyboardAvoidingView behavior="padding" style={styles.loginWrapper}>
			<View style={styles.loginMiddleGrid}>
				<MaterialIcons style={styles.icon} name="account-circle" size={20}/>
				<TextField
					placeholder="Username or Email"
					placeholderTextColor={theme.COLOR_PRIMARY_DARK}
					returnKeyType="next"
					onSubmitEditing={() => this.passwordInput.focus()}
					keyboardType="email-address"
					autoCapitalize="none"
					autoCorrect={false}
					onChangeText={this.onChangeText("username").bind(this)}
				/>
				<MaterialIcons style={styles.icon} name="vpn-key" size={20}/>
				<TextField
					placeholder="Password"
					placeholderTextColor={theme.COLOR_PRIMARY_DARK}
					returnKeyType="go"
					secureTextEntry
					autoCapitalize="none"
					autoCorrect={false}
	   				onChangeText={this.onChangeText("password").bind(this)}
						/>
				<Text>{this.state.error}</Text>
			</View>
			<View style={styles.loginBottomGrid}>
				<Button
					onPress={this.signIn.bind(this)}
					name='Submit'
					screen='Home' />
		 		<Button
					name='Forgot?'
					screen='ForgetPassword' />
			</View>
			</KeyboardAvoidingView>
	);
	}
}

export default withNavigation(Login);
