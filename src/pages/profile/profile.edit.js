import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native';
import { withNavigation } from 'react-navigation';
import TextField from '../../components/textfield/textfield.component';
import Button from '../../components/button/button.component';
import { Icon } from 'react-native-elements'

import styles from './profile.style'
import theme from '../../styles/theme.style'

// import Amplify, { Auth } from 'aws-amplify';
// import config from '../../../aws-exports';
// Amplify.configure(config);

class EditProfile extends Component {
  state = {
    name: '',
    status: '',
    location: '',
    age: '',
    gender: '',
    school: '',
    major: '',
    language: '',
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

  // validatePassword(password) {
  //   var strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  //   return strongPasswordRegex.test(String(password));
  // }

  editProfile() {
    const { name, status, location, age, gender, school, major, language } = this.state;
    this.clearError();

    // if (!this.validateEmail(email)) {
    //   this.setError('Please use the school email to register.');
    //   return;
    // }
    // if (!this.confirmPassword(password, passwordConfirmation)) {
    //   this.setError('Passwords does not match');
    //   return;
    // }
    // if (!this.validatePassword(password)) {
    //   this.setError('Password is too weak.');
    //   return;
    // }

    Auth.editProfile({
      name: name,
      status: status,
      location: location,
      age: age,
      gender: gender,
      school: school,
      major: major,
      language: language
    })
      .then(res => {
        // this.props.navigation.navigate('Profile');
      })
      .catch(err => {
        console.log(err);
        this.setError(err.message);
      })
  }

  render() {
    return (
      <ScrollView>
        <KeyboardAvoidingView behavior="padding" style={styles.profileWrapper}>
          <View style={styles.profileMiddleGrid}>
            <View style={{flexDirection: 'row'}}>
              <Icon
                iconStyle={styles.icon, {textAlign:'center', width: 40}}
                name='md-person'
                type='ionicon'
                color='#000000'
                size={30}
              />
              <TextField
                placeholder="Name"
                placeholderTextColor={theme.COLOR_PRIMARY_DARK}
                returnKeyType="next"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={this.onChangeText("name").bind(this)}
              />
            </View>
            <View style={{flexDirection: 'row'}}>
              <Icon
                iconStyle={styles.icon, {textAlign:'center', width: 40}}
                name='sms-failed'
                type='ionicon'
                color='#000000'
                size={30}
              />
              <TextField
                placeholder="Status"
                placeholderTextColor={theme.COLOR_PRIMARY_DARK}
                returnKeyType="next"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={this.onChangeText("status").bind(this)}
              />
            </View>
            <View style={{flexDirection: 'row'}}>
              <Icon
                iconStyle={styles.icon, {textAlign:'center', width: 40}}
                name='location-on'
                type='ionicon'
                color='#000000'
                size={30}
              />
              <TextField
                placeholder="Location"
                placeholderTextColor={theme.COLOR_PRIMARY_DARK}
                returnKeyType="go"
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={this.onChangeText("location").bind(this)}
              />
            </View>
            <View style={{flexDirection: 'row'}}>
              <Icon
                iconStyle={styles.icon, {textAlign:'center', width: 40}}
                name='cake'
                type='ionicon'
                color='#000000'
                size={30}
              />
              <TextField
                placeholder="Age"
                placeholderTextColor={theme.COLOR_PRIMARY_DARK}
                returnKeyType="go"
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={this.onChangeText("age").bind(this)}
              />
            </View>
            <View style={{flexDirection: 'row'}}>
              <Icon
                iconStyle={styles.icon, {textAlign:'center', width: 40}}
                name='wc'
                type='ionicon'
                color='#000000'
                size={30}
              />
              <TextField
                placeholder="Gender"
                placeholderTextColor={theme.COLOR_PRIMARY_DARK}
                returnKeyType="go"
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={this.onChangeText("gender").bind(this)}
              />
            </View>
            <View style={{flexDirection: 'row'}}>
              <Icon
                iconStyle={styles.icon, {textAlign:'center', width: 40}}
                name='school'
                type='ionicon'
                color='#000000'
                size={30}
              />
              <TextField
                placeholder="School"
                placeholderTextColor={theme.COLOR_PRIMARY_DARK}
                returnKeyType="go"
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={this.onChangeText("school").bind(this)}
              />
            </View>
            <View style={{flexDirection: 'row'}}>
              <Icon
                iconStyle={styles.icon, {textAlign:'center', width: 40}}
                name=''
                type='ionicon'
                color='#000000'
                size={30}
              />
              <TextField
                placeholder="Major"
                placeholderTextColor={theme.COLOR_PRIMARY_DARK}
                returnKeyType="go"
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={this.onChangeText("major").bind(this)}
              />
            </View>
            <View style={{flexDirection: 'row'}}>
              <Icon
                iconStyle={styles.icon, {textAlign:'center', width: 40}}
                name='language-on'
                type='ionicon'
                color='#000000'
                size={30}
              />
              <TextField
                placeholder="Language"
                placeholderTextColor={theme.COLOR_PRIMARY_DARK}
                returnKeyType="go"
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={this.onChangeText("language").bind(this)}
              />
            </View>
            <Text>{this.state.error}</Text>
          </View>
          <View style={styles.profileBottomGrid}>
            <Button
              onPress={this.props.navigation.navigate('Profile')}
              name='Submit'
              screen=''/>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

export default withNavigation(EditProfile);
