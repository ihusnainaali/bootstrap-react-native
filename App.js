import React, { Component } from 'react';
import { Platform, StyleSheet,Text,View} from 'react-native';

import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import rootReducer from './src/redux/reducers/index.reducer';

import AuthNavigator from './src/routes/AuthNavigator';

import Splash from './src/pages/Splash/splash.index';
import Login from './src/pages/Login/login.index';

const store = createStore(rootReducer)

store.subscribe(()=>console.log(store.getState()))

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            timePassed: false,
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setTimePassed();
        }, 2500);
    }

    setTimePassed() {
        this.setState({ timePassed: true });
    }

    render() {
      if (!this.state.timePassed) {
        return (
          <Splash />
        );
      } else {
          return (
            <Provider store={store}>
              <AuthNavigator />
            </Provider>
            );
        }
    }
}
