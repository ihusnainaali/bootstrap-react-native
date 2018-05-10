import React, { Component } from 'react';
import { Image, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { withNavigation } from 'react-navigation';

import Amplify, { Auth } from 'aws-amplify'
import config from '../../../aws-exports'
Amplify.configure(config)

import styles from './verification.style';
import theme from '../../styles/theme.style';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import TextField from '../../components/textfield/textfield.component';
import Button from '../../components/button/button.component';

class Verification extends Component {

	state = {
		username: this.props.navigation.state.params.username,
		verificationCode: '',
		error: ''
	}

	onChangeText = (key) => {
		return value => this.setState({
			[key]: value
		})
	}

	setError(error) {
		this.setState({ error });
	}

	clearError() {
		this.setState({ error: '' });
	}

	confirmSignUp() { // 1
		const { username, verificationCode } = this.state
		this.clearError();

		Auth.confirmSignUp(username, verificationCode)
			.then(res => {
				console.log(res);
				this.props.navigation.navigate('Login');
			})
			.catch(err => {
				this.setError(err.message);
			})
	}

	render() {
		return (
			<KeyboardAvoidingView behavior="padding" style={styles.verificationWrapper}>
				<View style={styles.verificationMiddleGrid}>
				 <MaterialIcons style={styles.icon} name="beenhere" size={20}/>
					<TextField
						placeholder="Verification Code"
						placeholderTextColor={theme.COLOR_PRIMARY_DARK}
						returnKeyType="go"
						autoCapitalize="none"
						autoCorrect={false}
						onChangeText={this.onChangeText("verificationCode").bind(this)}
						style={styles.verificationInput}
					/>
					<Text>{this.state.error}</Text>
				</View>
				<View style={styles.verificationBottomGrid}>
					<Button
						onPress={this.confirmSignUp.bind(this)}
						name="Verify"/>
				</View>
			</KeyboardAvoidingView>
		);
	}
}

export default withNavigation(Verification);
