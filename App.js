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
import Splash from './Splash';
import Login from './src/components/login/Login';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  constructor(props){
		super(props);
		this.state = {
			timePassed: false,
		};
	}

	componentDidMount() {
		setTimeout( () => {
			this.setTimePassed();
		},2000);
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
	  		<Login />
	    );
		}
	}
}
