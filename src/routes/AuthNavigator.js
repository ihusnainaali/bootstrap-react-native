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

import Splash from '../pages/Splash/splash.index';
import Welcome from '../pages/Welcome/welcome.index';
import Login from '../pages/Login/login.index';
import Register from '../pages/Register/register.index';
import Verification from '../pages/Verification/verification.index';
import ForgetPassword from '../pages/ForgetPassword/forgetPassword.index';

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
    Login: { screen: Login },
    Register: { screen: Register },
    Verification: { screen: Verification },
    ForgetPassword: { screen: ForgetPassword }
    },
    { initialRouteName: 'Welcome', }
);

export default AuthNavigator;