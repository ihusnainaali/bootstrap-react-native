import React, { Component } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView } from 'react-native';
import { withNavigation } from 'react-navigation';
import TextField from '../../components/textfield/textfield.component';
import ButtonComponent from '../../components/button/button.component';
import { Container, Button, Header , Left, Right, Title, Content, Icon, Body} from 'native-base';

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


	static navigationOptions = ({ navigation }) => {

    return {
        header: null
    };

  }; 

  render() {
    return (

    <Container style={styles.wrapper}>

      <Header>
        <Left>
          <Button transparent
            onPress={() => {this.props.navigation.goBack()}}>
            <Icon name='arrow-back' style={styles.icon} />
          </Button>
        </Left>
        <Body>
            <Title style={{fontFamily: theme.FONT_LIGHT}}>Register</Title>
        </Body>
        <Right/>
      </Header>

      <Content>
      <KeyboardAvoidingView behavior="padding" style={styles.registerWrapper}>
      <View style={styles.registerTopGrid}>
      </View>
      <View style={styles.registerMiddleGrid}>
        <View style={{flexDirection: 'row'}}>
          <Icon
            name='md-person'
            style={styles.icon}
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
            name='md-mail'
            style={styles.icon}
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
            name='md-lock'
            style={styles.icon}
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
            name='md-lock'
            style={styles.icon}
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
        <ButtonComponent
          onPress={this.signUp.bind(this)}
          name='Register'
          screen='Login'/>
      </View>
      </KeyboardAvoidingView>
      </Content>

    </Container>

      
    );
  }
}

export default withNavigation(Register);
