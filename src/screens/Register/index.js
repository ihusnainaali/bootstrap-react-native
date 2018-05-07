import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native';
import { withNavigation } from 'react-navigation';
import { COLOR_PRIMARY, COLOR_PRIMARY_DARK } from '../../styles/common';
import TextField from '../../components/Textfield/Textfield.component';
import Button from '../../components/Button/Button.component';

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

  setAuthCode(authCode) { // 2
    this.setState({ authCode });
  }

  setUsername(username) {
    this.setState({ username });
  }

  setEmail(email) {
    this.setState({ email });
  }

  setPassword(password) {
    this.setState({ password });
  }

  setPasswordConfirmation(passwordConfirmation) {
    this.setState({ passwordConfirmation });
  }

  onChangeText = (key, value) => {
    this.setState({
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
        this.setError(JSON.stringify(err));
      })
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.registerWrapper}>
        <View style={styles.registerTopGrid}>
          <Text style={styles.registerTitle}>Register</Text>
        </View>
        <View style={styles.registerMiddleGrid}>
          <TextField
            placeholder="Username"
            placeholderTextColor={COLOR_PRIMARY_DARK}
            returnKeyType="next"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.registerInput}
            onChangeText={(value) => this.onChangeText("username", value)}
          />
          <TextField
            placeholder="Email"
            placeholderTextColor={COLOR_PRIMARY_DARK}
            returnKeyType="next"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.registerInput}
            onChangeText={(value) => this.onChangeText("email", value)}
          />
          <TextField
            placeholder="Password"
            placeholderTextColor={COLOR_PRIMARY_DARK}
            returnKeyType="go"
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.registerInput}
            onChangeText={(value) => this.onChangeText("password", value)}
          />
          <TextField
            placeholder="Confirm Password"
            placeholderTextColor={COLOR_PRIMARY_DARK}
            returnKeyType="go"
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.registerInput}
            onChangeText={(value) => this.onChangeText("passwordConfirmation", value)}
          />
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

const styles = StyleSheet.create({
  registerWrapper: {
    backgroundColor: COLOR_PRIMARY,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  registerTopGrid: {
    flex: 1,
    marginTop: 50,
    alignItems: 'center'
  },
  registerMiddleGrid: {
    flex: 1,
    marginBottom: 70,
    alignItems: 'center'
  },
  registerBottomGrid: {
    flex: 1,
    marginTop: 125,
    marginBottom: 50,
    alignItems: 'center'
  },
  registerTitle: {
    flex: 1,
    color: 'black',
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 20
  },
  registerLogo: {
    width: 168,
    height: 168
  }
});

export default withNavigation(Register);
