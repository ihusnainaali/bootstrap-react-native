import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Splash from './Splash';
import Welcome from './src/components/welcome/Welcome';
import Login from './src/components/login/Login';
import Register from './src/components/register/Register';
import Home from './src/components/home/Home';

// Initial Loading Screen
class WelcomeScreen extends Component {
  static navigationOptions = {
    title: 'Welcome',
  };

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

// The Home Screen after Authenticated Log-in
class HomeScreen extends Component {
  // static navigationOptions = {
  //   title: 'Home',
  // };

  render() {
    return (
      <Home />
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
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#80d6ff',
      },
      headerTintColor: '#376569',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
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
