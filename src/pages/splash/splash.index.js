import React, { Component } from 'react';
import { Image, View, Text, StyleSheet, AsyncStorage } from 'react-native';

import styles from './splash.style'

export default class Splash extends Component {
    constructor() {
        super();
        this._bootstrapAsync();
    }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        const username = await AsyncStorage.getItem('username');

        // This will switch to the Home screen or Welcome screen and this loading
        // screen will be unmounted and thrown away.
        this.props.navigation.navigate(username ? 'Home' : 'Welcome');
    };

    render() {
        return (
            <View style={styles.wrapper}>
                <View style={styles.titleWrapper}>
                    <Image
                        style={styles.titleLogo}
                        source={require('../../assets/pangyou_logo.png')} />
                </View>
                <View>
                    <Text style={styles.subtitle}>Powered by Develoop</Text>
                </View>
            </View>
        );
    }
}

