import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native';
import { withNavigation } from 'react-navigation';
import TextField from '../../components/textfield/textfield.component';
import Button from '../../components/button/button.component';
import { Icon } from 'react-native-elements'

import styles from './register.style'
import theme from '../../styles/theme.style'

import Amplify, { Auth } from 'aws-amplify';
import config from '../../../aws-exports';
Amplify.configure(config);

class Register extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    error: null
  }

  onChangeText = (key) => {
    return (value) => this.setState({
      [key]: value
    })
  }

  setError(error) {
    this.setState({ error });
  }

  clearError(){
		this.setState({error: ''});
	}

  validateEmail(email) {
    var EmailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var eduEndingRegex = /^.*\.edu$|^.*\.edu\.[a-zA-Z]{2,}/
    var emailString = String(email).toLowerCase()
    return EmailRegex.test(emailString) && eduEndingRegex.test(emailString);
  }

  confirmPassword(p1, p2) {
    return p1 == p2;
  }

  validatePassword(password) {
    var strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    return strongPasswordRegex.test(String(password));
  }

  signUp() {
    const { username, email, password, passwordConfirmation } = this.state;
    this.clearError();

    if (!this.validateEmail(email)) {
      this.setError('Please use the school email to register.');
      return;
    }
    if (!this.confirmPassword(password, passwordConfirmation)) {
      this.setError('Passwords does not match');
      return;
    }
    if (!this.validatePassword(password)) {
      this.setError('Password is too weak.');
      return;
    }

    Auth.signUp({
      username: username,
      password: password,
      attributes: {
        phone_number: '+11111111111',
        email: email
      }
    })
      .then(res => {
        this.props.navigation.navigate('Verification', { username });
      })
      .catch(err => {
        console.log(err);
        this.setError(err.message);
      })
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.registerWrapper}>
      <View style={styles.registerTopGrid}>
      </View>
      <View style={styles.registerMiddleGrid}>
        <View style={{flexDirection: 'row'}}>
          <Icon
            iconStyle={styles.icon, {textAlign:'center', width: 40}}
            name='md-person'
            type='ionicon'
            color='#000000'
            size={30}
          />
          <TextField
            placeholder="Username"
            placeholderTextColor={theme.COLOR_PRIMARY_DARK}
            returnKeyType="next"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={this.onChangeText("username").bind(this)}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Icon
            iconStyle={styles.icon, {textAlign:'center', width: 40}}
            name='md-mail'
            type='ionicon'
            color='#000000'
            size={30}
          />
          <TextField
            placeholder="Email"
            placeholderTextColor={theme.COLOR_PRIMARY_DARK}
            returnKeyType="next"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={this.onChangeText("email").bind(this)}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Icon
            iconStyle={styles.icon, {textAlign:'center', width: 40}}
            name='md-lock'
            type='ionicon'
            color='#000000'
            size={30}
          />
          <TextField
            placeholder="Password"
            placeholderTextColor={theme.COLOR_PRIMARY_DARK}
            returnKeyType="go"
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={this.onChangeText("password").bind(this)}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Icon
            iconStyle={styles.icon, {textAlign:'center', width: 40}}
            name='md-lock'
            type='ionicon'
            color='#000000'
            size={30}
          />
          <TextField
            placeholder="Confirm Password"
            placeholderTextColor={theme.COLOR_PRIMARY_DARK}
            returnKeyType="go"
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={this.onChangeText("passwordConfirmation").bind(this)}
          />
        </View>
        <Text>{this.state.error}</Text>
      </View>
      <View style={styles.registerBottomGrid}>
        <Button
          onPress={this.signUp.bind(this)}
          name='Register'
          screen='Login'/>
      </View>
      </KeyboardAvoidingView>
    );
  }
}

export default withNavigation(Register);
