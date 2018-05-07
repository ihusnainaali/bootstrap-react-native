import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Splash from './src/screens/Splash';
import Welcome from './src/screens/Welcome';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Home from './src/screens/Home';
import Verification from './src/screens/Verification';

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
    return (
      <Login />
    );
  }
}

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

const RootStack = StackNavigator(
  {
    Welcome: {
      screen: WelcomeScreen,
    },
    Login: {
      screen: LoginScreen,
    },
    Register: {
      screen: RegisterScreen,
    },
    Home: {
      screen: HomeScreen,
    },
    // TODO Add Remaining Screens
    Verification: {
      screen: VerificationScreen,
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
	  		<RootStack />
	    );
		}
  }
}
