import React, { Component } from 'react';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './src/redux/reducers/index.reducer';

import AppNavigator from './src/navigators/app.navigator';

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