import React, { Component } from 'react';
import { Image, View, Text, AsyncStorage } from 'react-native';
import ChatClientHelper from '../../utils/twilio';
import operations from '../matchmaking/graphql';

import styles from './splash.style'

export default class Splash extends Component {
    constructor() {
        super();
        this._bootstrapAsync();
    }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        const username = await AsyncStorage.getItem('username');
        if (username) {
            ChatClientHelper.getInstance().login(username);
            operations.SubVideoChannel(username).subscribe({
                next: (eventData) => {
                    data = eventData.value.data[operations.SUB_VIDEO_CHANNEL_KEY];
                    if (data.username !== "") {
                        this.props.navigation.navigate('video', {status: 'incoming', friend: data.username, roomName: data.channelName});
                    }
                }
            })
        }
        // This will switch to the Home screen or Welcome screen and this loading
        // screen will be unmounted and thrown away.
        setTimeout(() => {
            this.props.navigation.navigate(username ? 'Home' : 'Welcome');
        }, 2000);
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

