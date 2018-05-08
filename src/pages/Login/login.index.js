import React, { Component } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { withNavigation } from 'react-navigation';
import TextField from '../../components/TextField/TextField.component';
import Button from '../../components/Button/Button.component';

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
    });
	}

	setError(error){
		this.setState({error});
	}

	clearError(){
		this.setState({error: ''});
	}

	signIn() {
		const {username, password} = this.state;
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
			});
	}

	render() {
    return (
			<KeyboardAvoidingView behavior="padding" style={styles.loginWrapper}>
        <View style={styles.loginTopGrid}>
					<Text style={styles.loginTitle}>Login</Text>
        </View>
				<View style={styles.loginMiddleGrid}>
					<TextField
						placeholder="Username or Email"
						placeholderTextColor={theme.COLOR_PRIMARY_DARK}
						returnKeyType="next"
						onSubmitEditing={() => this.passwordInput.focus()}
						keyboardType="email-address"
						autoCapitalize="none"
						autoCorrect={false}
						style={styles.loginInput}
						onChangeText={(value) => this.onChangeText("username", value)}
						/>
					<TextField
						placeholder="Password"
						placeholderTextColor={theme.COLOR_PRIMARY_DARK}
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
				<Button
					onPress={this.signIn.bind(this)}
					name='Submit'
					screen='Home'/>
         		<Button
            		name='Forgot Password?'
            		screen='ForgetPassword'/>
			</View>
			</KeyboardAvoidingView>
    );
	}
}

export default withNavigation(Login);
