/* 
*   Application Navigator
*/
import React, { Component } from 'react';
import { createSwitchNavigator } from 'react-navigation';

import TabNavigator from './tab.navigator';
import AuthNavigator from './auth.navigator';
import Splash from '../pages/splash/splash.index';

const AppNavigator = createSwitchNavigator(
    {
        Splash: Splash,
        Auth: AuthNavigator,
        Home: TabNavigator,
    }
);

export default AppNavigator;