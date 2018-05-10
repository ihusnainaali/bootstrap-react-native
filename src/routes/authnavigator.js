/*
*   Auth Navigation
*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Platform, StyleSheet,Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import rootReducer from '../redux/reducers/index.reducer';

import Splash from '../pages/splash/splash.index';
import Home from '../pages/home/home.index';
import Welcome from '../pages/welcome/welcome.index';
import Login from '../pages/login/login.index';
import Register from '../pages/register/register.index';
import Verification from '../pages/verification/verification.index';
import ForgetPassword from '../pages/forgetpassword/forgetpassword.index';

// Log-in Screen
class LoginScreen extends Component {

    render() {
        if (this.props.username) {
            return (
                <Home />
            );
        } else {
            return (
                <Login />
            );
        }
    }
}

// Connect Login Screen to State
const ConnectLoginScreen = connect(state => ({
    username: state.auth.username
}))(LoginScreen)

const AuthNavigator = StackNavigator({
    Welcome: { screen: Welcome },
    Home: { screen: Home },
    Login: { screen: Login },
    Register: { screen: Register },
    Verification: { screen: Verification },
    ForgetPassword: { screen: ForgetPassword }
    },
    { initialRouteName: 'Welcome', }
);

export default AuthNavigator;
