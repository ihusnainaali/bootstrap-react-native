import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import rootReducer from './src/redux/reducers/index.reducer';

import { StackNavigator } from 'react-navigation';
import Splash from './src/pages/splash/splash.index';
import Welcome from './src/pages/welcome/welcome.index';
import Login from './src/pages/login/login.index';
import Register from './src/pages/register/register.index';
import Home from './src/pages/home/home.index';
import Verification from './src/pages/verification/verification.index';
import ForgetPassword from './src/pages/forgetpassword/forgetpassword.index';


const store = createStore(rootReducer)

class WelcomeScreen extends Component {

  render() {
    return (
      <Welcome />
    );
  }
}

// Log-in Screen
class LoginScreen extends Component {
  static navigationOptions = {
    title: 'Login',
  };

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

// Registration Screen
class RegisterScreen extends Component {
  static navigationOptions = {
    title: 'Register',
  };

  render() {
    return (
      <Register />
    );
  }
}

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Home',
  };

  render() {
    return (
      <Home />
    );
  }
}

class VerificationScreen extends Component {
  static navigationOptions = {
    title: 'Verification',
  };

  render() {
    return (
      <Verification />
    );
  }
}

class ForgetPasswordScreen extends Component {
  static navigationOptions = {
    title: 'ForgetPassword',
  };

  render() {
    return (
      <ForgetPassword />
    );
  }
}

const RootStack = StackNavigator(
  {
    Welcome: {
      screen: WelcomeScreen,
    },
    Login: {
      screen: ConnectLoginScreen,
    },
    Register: {
      screen: RegisterScreen,
    },
    Home: {
      screen: HomeScreen,
    },
    Verification: {
      screen: VerificationScreen,
    },
    ForgetPassword: {
      screen: ForgetPasswordScreen,
    },
  },
  {
    initialRouteName: 'Welcome',
  }
);

type Props = {};
export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      timePassed: false,
    };
  }

  componentDidMount() {
    setTimeout( () => {
      this.setTimePassed();
    },2500);
  }

  setTimePassed() {
    this.setState({timePassed: true});
  }

  render() {
    if (!this.state.timePassed) {
	    return (
	  		<Splash />
	    );
		} else {
      return (
        <Provider store={store}>
	  		   <RootStack />
        </Provider>
	    );
		}
  }
}
