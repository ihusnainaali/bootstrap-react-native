import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { withNavigation } from 'react-navigation';

import styles from './forgetpassword.style';
import theme from '../../styles/theme.style';
import { Icon } from 'react-native-elements'

import Amplify, { Auth } from 'aws-amplify'
import config from '../../../aws-exports';
Amplify.configure(config);

import TextField from '../../components/textfield/textfield.component';
import Button from '../../components/button/button.component';

class ForgetPassword extends Component {

  state = {
	username: '',
	authCode: '',
	newPassword: '',
	confirmPassword: '',
	error: '',
	authCodeSent: false,
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

  confirmPassword(p1, p2) {
	return p1 == p2;
  }

  validatePassword(password) {
	var strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
	return strongPasswordRegex.test(String(password));
  }


  forgetPassword() {
	const { username } = this.state;
	this.clearError();

	Auth.forgotPassword(username)
	  .then(res => {
		this.setState({ authCodeSent: true });
	  })
	  .catch(err => {
		this.setError(err.message);
	  })
  }

  forgetPasswordSubmit() {
	const { username, authCode, newPassword, confirmPassword } = this.state;
	this.clearError();

	if (!this.confirmPassword(newPassword, confirmPassword)) {
	  this.setError("Passwords does not match");
	  return;
	}

	if (!this.validatePassword(newPassword)) {
	  this.setError("Password is too weak");
	  return;
	}

	Auth.forgotPasswordSubmit(username, authCode, newPassword)
	  .then(res => {
		this.props.navigation.navigate('Login');
	  })
	  .catch(err => {
		this.setError(err.message);
		console.log(err);
	  })
  }

  render() {
	return (
	  <KeyboardAvoidingView behavior="padding" style={styles.forgetPasswordWrapper}>
		{
		  !this.state.authCodeSent ?
			<View>
        <View style={styles.forgetPasswordTopGrid}>
        </View>
			  <View style={styles.forgetPasswordMiddleGrid}>
        <View style={{flexDirection: 'row'}}>
          <Icon
            iconStyle={styles.icon, {textAlign:'center', width: 40}}
            name='md-person'
            type='ionicon'
            color='#000000'
            size={30}
          />
  				<TextField
  				  placeholder="User Name"
  				  placeholderTextColor={theme.COLOR_PRIMARY_DARK}
  				  returnKeyType="go"
  				  autoCapitalize="none"
  				  autoCorrect={false}
  				  onChangeText={this.onChangeText("username").bind(this)}
  				/>
        </View>
				<Text>{this.state.error}</Text>
			  </View>
			  <View style={styles.forgetPasswordBottomGrid}>
				<Button
				  onPress={this.forgetPassword.bind(this)}
				  name="Submit" />
			  </View>
			</View>
			:
			<View>
			  <View style={styles.forgetPasswordMiddleGrid}>
				<MaterialIcons style={styles.icon} name="beenhere" size={20}/>
				<TextField
				  placeholder="Authentication Code"
				  placeholderTextColor="#d1d1d1"
				  returnKeyType="go"
				  autoCapitalize="none"
				  autoCorrect={false}
				  onChangeText={this.onChangeText("authCode").bind(this)}
				/>
				<MaterialIcons style={styles.icon} name="vpn-key" size={20}/>
				<TextField
				  placeholder="New Password"
				  placeholderTextColor="#d1d1d1"
				  returnKeyType="go"
				  autoCapitalize="none"
				  secureTextEntry
				  autoCorrect={false}
				  onChangeText={this.onChangeText("newPassword").bind(this)}
				/>
				<TextField
				  placeholder="Confirm Password"
				  placeholderTextColor="#d1d1d1"
				  returnKeyType="go"
				  autoCapitalize="none"
				  secureTextEntry
				  autoCorrect={false}
				  onChangeText={this.onChangeText("confirmPassword").bind(this)}
				/>
				<Text>{this.state.error}</Text>
			  </View>
			  <View style={styles.forgetPasswordBottomGrid}>
				<Button
				  onPress={this.forgetPasswordSubmit.bind(this)}
				  name="Submit" />
			  </View>
			</View>
		}
	  </KeyboardAvoidingView>
	);
  }
}

export default withNavigation(ForgetPassword);
