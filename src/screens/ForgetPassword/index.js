import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { withNavigation } from 'react-navigation';
import { COLOR_PRIMARY, COLOR_PRIMARY_DARK } from '../../styles/common';
import buttonStyle from '../../components/Button/Button.component.style';
import inputStyle from '../../components/Textfield/Textfield.component.style';

import Amplify, { Auth } from 'aws-amplify'
import config from '../../../aws-exports'
import { Button } from 'react-native-elements';
Amplify.configure(config)

class ForgetPassword extends Component {
  state = {
    username: '',
    authCode: '',
    newPassword: '',
    confirmPassword: '',
    error: '',
    authCodeSent: false,
  }

  onChangeText = (key, value) => {
    this.setState({
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
                <Text style={styles.forgetPasswordTitle}>Forget Password</Text>
              </View>
              <View style={styles.forgetPasswordMiddleGrid}>
                <TextInput
                  placeholder="User Name"
                  placeholderTextColor="#d1d1d1"
                  returnKeyType="go"
                  autoCapitalize="none"
                  autoCorrect={false}
                  onChangeText={(value) => this.onChangeText("username", value)}
                  style={inputStyle.textField}
                />
              </View>
              <View style={styles.forgetPasswordBottomGrid}>
                <TouchableOpacity
                  style={buttonStyle.container}
                  onPress={this.forgetPassword.bind(this)}>
                  <Text style={buttonStyle.text}>Submit</Text>
                </TouchableOpacity>
              </View>
              <Text>{this.state.error}</Text>
            </View>
            :
            <View>
            <View style={styles.forgetPasswordMiddleGrid}>
            <View style={styles.forgetPasswordTopGrid}>
                <Text style={styles.forgetPasswordTitle}>Forget Password</Text>
              </View>
              <TextInput
                placeholder="Authentication Code"
                placeholderTextColor="#d1d1d1"
                returnKeyType="go"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={(value) => this.onChangeText("authCode", value)}
                style={inputStyle.textField}
              />
              <TextInput
                placeholder="New Password"
                placeholderTextColor="#d1d1d1"
                returnKeyType="go"
                autoCapitalize="none"
                secureTextEntry
                autoCorrect={false}
                onChangeText={(value) => this.onChangeText("newPassword", value)}
                style={inputStyle.textField}
              />
              <TextInput
                placeholder="Confirm Password"
                placeholderTextColor="#d1d1d1"
                returnKeyType="go"
                autoCapitalize="none"
                secureTextEntry
                autoCorrect={false}
                onChangeText={(value) => this.onChangeText("confirmPassword", value)}
                style={inputStyle.textField}
              />
            </View>
            <View style={styles.forgetPasswordBottomGrid}>
              <TouchableOpacity 
                style={buttonStyle.container}
                onPress={this.forgetPasswordSubmit.bind(this)}>
                <Text style={buttonStyle.text}>Submit</Text>
              </TouchableOpacity>
            </View>
            <Text>{this.state.error}</Text>
          </View>
        }
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  forgetPasswordWrapper: {
    backgroundColor: COLOR_PRIMARY,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  forgetPasswordTopGrid: {
    flex: 1,
    marginTop: 50,
    alignItems: 'center'
  },
  forgetPasswordMiddleGrid: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center'
  },
  forgetPasswordBottomGrid: {
    flex: 1,
    marginTop: 125,
    marginBottom: 100,
    alignItems: 'center'
  },
  forgetPasswordTitle: {
    color: 'black',
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 30
  },
  forgetPasswordLogo: {
    width: 168,
    height: 168
  }
});

export default withNavigation(ForgetPassword);
