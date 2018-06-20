import React, { Component } from 'react';
import { Image, View, Text, AsyncStorage } from 'react-native';
import ChatClientHelper from '../../utils/twilio';
import operations from '../matchmaking/graphql';
import { GetProfile } from '../profile/graphql_query';
import { API, graphqlOperation } from 'aws-amplify';

//redux
import { connect } from 'react-redux';
import { onAddFriend } from '../../redux/actions/friends.actions';

import styles from './splash.style'

class Splash extends Component {
    constructor() {
        super();
        this._bootstrapAsync();
    }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        const friendListStr = await AsyncStorage.getItem('friendList');
        if (friendListStr) {
            try {
                const friendList = JSON.parse(friendListStr);
                this.props.onAddFriend(friendList.friends, friendList.friendsChannel);
            } catch (error) {
                console.log(error);
            }
        }
        const username = await AsyncStorage.getItem('username');
        if (username) {
            ChatClientHelper.getInstance().login(username);
            operations.SubVideoChannel(username).subscribe({
                next: (eventData) => {
                    data = eventData.value.data[operations.SUB_VIDEO_CHANNEL_KEY];
                    if (data.userId !== "") {
                        this.props.navigation.navigate('video', { status: 'incoming', userId: data.userId, friendId: data.friendId, roomName: data.channelName });
                    }
                }
            })
            // Check to see if user has a profile
            const profileValid = API.graphql(graphqlOperation(GetProfile, { userId: username }))
                .then(profile => {
                    if (!profile.data.getPangyouMobilehub1098576098UserProfile) {
                        operations.CreateVideoChannel(username).catch(err => console.log(err));
                        setTimeout(() => {
                            this.props.navigation.navigate('AddProfile', { username: username });
                        }, 2000);
                    } else {
                        // This will switch to the Home screen or Welcome screen and this loading
                        // screen will be unmounted and thrown away.
                        setTimeout(() => {
                            this.props.navigation.navigate(username ? 'Home' : 'Welcome');
                        }, 2000);
                    }
                });
        } else {
            setTimeout(() => {
                this.props.navigation.navigate('Welcome');
            }, 2000);
        }
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

export default connect(undefined, { onAddFriend })(Splash);