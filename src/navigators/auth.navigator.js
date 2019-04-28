/*
*   Auth Navigation
*/
import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';

import { connect } from 'react-redux';

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
    Welcome: { 
        screen: Welcome,
        navigationOptions:() => ({
            header: null
        })
    },
    Login: { 
        screen: Login,
        navigationOptions:() => ({
            title: "Login"
        })
    },
    Register: { 
        screen: Register,
        navigationOptions:() => ({
            title: "Register"
        }) 
    },
    Verification: { 
        screen: Verification,
        navigationOptions:() => ({
            title: "Verification"
        }) 
    },
    ForgetPassword: { 
        screen: ForgetPassword,
        navigationOptions:() => ({
            title: "Forgot Password"
        }) }
    },
    { initialRouteName: 'Welcome', }
);

export default AuthNavigator;
