import React, { Component } from 'react';
import { Image, View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { withNavigation } from 'react-navigation';

import Amplify, { Auth } from 'aws-amplify'
import config from '../../../aws-exports'
Amplify.configure(config)

class Register extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    error: null
  }

  onChangeText = (key, value) => {
    this.setState({
      [key]: value
    })
  }

  setError(error) {
    this.setState({ error });
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
    const {username, email, password, passwordConfirmation} = this.state;
    this.state.error = '';
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
      <View style={styles.wrapper}>
        <TextInput
          placeholder="User Name"
          autoCapitalize="none"
          onChangeText={(value) => this.onChangeText("username", value)}
          style={styles.input}
        />
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          onChangeText={(value) => this.onChangeText("email", value)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          autoCapitalize="none"
          secureTextEntry
          onChangeText={(value) => this.onChangeText("password", value)}
          style={styles.input}
        />
        <TextInput
          placeholder="Confirm Password"
          autoCapitalize="none"
          secureTextEntry
          onChangeText={(value) => this.onChangeText("passwordConfirmation", value)}
          style={styles.input}
        />
        <Button title='Sign Up' onPress={this.signUp.bind(this)} />
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>Registration</Text>
          <Text>{this.state.error}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#4C989F',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  titleLogo: {
    width: 200,
    height: 450
  },
  title: {
    color: 'white',
    fontSize: 35,
    fontWeight: 'bold'
  },
  subtitle: {
    color: 'white',
    fontWeight: 'normal',
    paddingBottom: 15
  },
  input: {
    width: 300,
    paddingBottom: 10,
    alignItems: 'flex-start',
    backgroundColor: 'white'
  }
});

export default withNavigation(Register);
