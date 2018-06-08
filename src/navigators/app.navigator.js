/*
*   Application Navigator
*/
import React, { Component } from 'react';
import { createSwitchNavigator } from 'react-navigation';

import Splash from '../pages/splash/splash.index';
import AuthNavigator from './auth.navigator';
import TabNavigator from './tab.navigator';
import AddProfile from '../pages/profile/profile.add'

const AppNavigator = createSwitchNavigator(
    {
        Splash: Splash,
        AddProfile: AddProfile,
        Auth: AuthNavigator,
        Home: TabNavigator,
    }
);

export default AppNavigator;
