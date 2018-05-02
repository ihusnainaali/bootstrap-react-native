import React, { Component } from 'react';
import { Image, View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { withNavigation } from 'react-navigation';

import Amplify, { Auth } from 'aws-amplify'
import config from '../../../aws-exports'
Amplify.configure(config)

class Register extends Component {
  state = { // 1
    authCode: '',
    email: '',
    password: ''
  }
  setAuthCode(authCode) { // 2
    this.setState({ authCode });
  }
  setEmail(email) {
    this.setState({ email });
  }
  setPassword(password) {
    this.setState({ password });
  }
  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
  signUp() {
    // Auth.signUp({ // 3
    //   username: 'myCoolUsername',
    //   password: 'MyCoolP@ssword2!',
    //   attributes: {
    //     phone_number: '+15555555555',
    //     email: 'yourcoolemail@gmail.com'
    //   }
    // })
    //   .then(res => {
    //     console.log('successful signup: ', res)
    //   })
    //   .catch(err => {
    //     console.log('error signing up: ', err)
    //   })
  }
  confirmUser() { // 4
    const { authCode } = this.state
    Auth.confirmSignUp('myCoolUsername', authCode)
      .then(res => {
        console.log('successful confirmation: ', res)
      })
      .catch(err => {
        console.log('error confirming user: ', err)
      })
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <TextInput
          placeholder='Email'
          onChangeText={value => this.setEmail(value)}
          style={styles.input}
        />
        <TextInput
          placeholder='Password'
          onChangeText={value => this.onChangeText(value)}
          style={styles.input}
        />
        <TextInput
          placeholder='Confirm Password'
          onChangeText={value => this.onChangeText(value)}
          style={styles.input}
        />
        <Button title='Sign Up' onPress={this.signUp.bind(this)} />
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>Registration</Text>
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
