import React, { Component } from 'react';
import { Platform, StyleSheet,Text,View} from 'react-native';

import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import rootReducer from './src/redux/reducers/index.reducer';

// import AuthNavigator from './src/routes/authnavigator';
import AppNavigator from './src/routes/appnavigator';

import Splash from './src/pages/splash/splash.index';
import Login from './src/pages/login/login.index';

const store = createStore(rootReducer)

store.subscribe(()=>console.log(store.getState()))

class App extends Component {

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
              <AppNavigator />
            </Provider>
            );
        }
    }
}

export default App;