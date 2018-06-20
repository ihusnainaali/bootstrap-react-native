import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, AsyncStorage } from 'react-native';

import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import rootReducer from './src/redux/reducers/index.reducer';

import AppNavigator from './src/navigators/app.navigator';

import Splash from './src/pages/splash/splash.index';

const store = createStore(rootReducer)

class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <AppNavigator />
            </Provider>
        );
    }
}

export default App;