/* 
*   Application Navigator
*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { createSwitchNavigator, StackNavigator } from 'react-navigation';

import TabNavigator from './tabnavigator';
import AuthNavigator from './authnavigator';
import Splash from '../pages/splash/splash.index';

const AppNavigator = createSwitchNavigator(
    {
        Splash: Splash,
        Auth: AuthNavigator,
        Home: TabNavigator,
    }
);

export default AppNavigator;