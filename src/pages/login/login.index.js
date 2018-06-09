import React, { Component } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, AsyncStorage} from 'react-native';
import { withNavigation } from 'react-navigation';

import { connect } from 'react-redux';
import { onLogin } from '../../redux/actions/auth.actions'

import TextField from '../../components/textfield/textfield.component';
import ButtonComponent from '../../components/button/button.component';
import { Container, Button, Header , Left, Right, Title, Content, Icon, Body} from 'native-base';

import styles from './login.style';
import theme from '../../styles/theme.style';

import { GetProfile } from '../profile/graphql_query';
import { API, graphqlOperation } from 'aws-amplify';

import Amplify, { Auth } from 'aws-amplify';
import config from '../../../aws-exports';
Amplify.configure(config);

class Login extends Component {

    state = {
        username: '',
        password: '',
        error: '',
        profileValid: '',
        profile: {},
        user: {}
    }

    onChangeText = (key) => {
        return (value) => this.setState({
            [key]: value
        });
    }

    setError(error) {
        this.setState({ error });
    }

    clearError() {
        this.setState({ error: '' });
    }

    signIn() {
        const { username, password } = this.state;
        const profileStatus = 0;
        this.clearError();

        const profile = API.graphql(graphqlOperation(GetProfile, {userId: this.state.username}))
          .then(profile => {
            if (!profile.data.getPangyouMobilehub1098576098UserProfile) {
                this.props.navigation.navigate('AddProfile');
            } else {
              Auth.signIn(username, password)
                  .then(user => {
                      this.props.onLogin(username, password);
                      this.props.navigation.navigate('Home');
                  })
                  .catch(err => {
                      if (err.code === "UserNotConfirmedException") {
                          this.props.navigation.navigate('Verification', { username });
                      }
                      else {
                          this.setError(err.message);
                      }
                  });
            }
          });
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
                   <Title style={{fontFamily: theme.FONT_LIGHT}}>Login</Title>
                  </Body>
                  <Right/>
              </Header>

            <KeyboardAvoidingView behavior="padding" style={styles.loginWrapper}>
                <View style={styles.loginTopGrid}>
                </View>
                <View style={styles.loginMiddleGrid}>
                  <View style={{flexDirection: 'row'}}>
                    <Icon
                      name='md-person'
                      style={styles.icon}
                    />
                    <TextField
                        placeholder="Username or Email"
                        placeholderTextColor={theme.COLOR_PRIMARY_DARK}
                        returnKeyType="next"
                        onSubmitEditing={() => this.passwordInput.focus()}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={this.onChangeText("username").bind(this)}
                    />
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Icon
                      style={styles.icon}
                      name='md-lock'
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
                    <Text>{this.state.error}</Text>
                </View>
                <View style={styles.loginBottomGrid}>
                    <ButtonComponent
                        onPress={this.signIn.bind(this)}
                        name='Submit'
                        screen='Home'/>
                    <ButtonComponent
                        name='Forgot?'
                        screen='ForgetPassword' />
                </View>
            </KeyboardAvoidingView>
            </Container>

        );
    }
}

export default connect(undefined, { onLogin })(withNavigation(Login));
