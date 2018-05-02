/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

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

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Home',
  };

  render() {
    return (
      <Welcome />
    );
  }
}

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

const RootStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Login: {
      screen: LoginScreen,
    },
    Register: {
      screen: RegisterScreen,
    },
  },
  {
    initialRouteName: 'Home',
  }
);

export default class App extends Component {
  render() {
    return <RootStack />;
  }
}


// type Props = {};
// export default class App extends Component<Props> {
//   constructor(props){
// 		super(props);
// 		this.state = {
// 			timePassed: false,
// 		};
// 	}
//
// 	componentDidMount() {
// 		setTimeout( () => {
// 			this.setTimePassed();
// 		},2500);
// 	}
//
// 	setTimePassed() {
// 		this.setState({timePassed: true});
// 	}
//
// 	render() {
// 		if (!this.state.timePassed) {
// 	    return (
// 	  		<Splash />
// 	    );
// 		} else {
//       return (
// 	  		<Welcome />
// 	    );
// 		}
// 	}
// }
