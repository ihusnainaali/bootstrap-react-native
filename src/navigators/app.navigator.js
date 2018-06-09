/*
*   Application Navigator
*/
import React, { Component } from 'react';
import { createSwitchNavigator } from 'react-navigation';

import Splash from '../pages/splash/splash.index';
import AddProfile from '../pages/profile/profile.add';
import AuthNavigator from './auth.navigator';
import TabNavigator from './tab.navigator';

const AppNavigator = createSwitchNavigator(
    {
        Splash: Splash,
        AddProfile: AddProfile,
        Auth: AuthNavigator,
        Home: TabNavigator,
    }
);

export default AppNavigator;
