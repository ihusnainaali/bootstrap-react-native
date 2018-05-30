import React, { Component } from 'react';
import { AppRegistry, Text, TextInput, View, Button, TouchableOpacity, Dimensions } from 'react-native';
import { withNavigation, navigation } from 'react-navigation';

import { TwilioVideoLocalView, TwilioVideoParticipantView, TwilioVideo } from 'react-native-twilio-video-webrtc';
import Loader from '../../components/loader/loader.component';

import { styles } from './video.style';

class Video extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isAudioEnabled: true,
            isVideoEnabled: true,
            status: 'disconnected',
            participant: null,
            videoTrack: true,
            host: 'http://localhost:3000',
            roomName: 'test',
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTSzQ5Mzk1ZWQxMTdjNjU4ZmQ5ZjRjYmYxYmFmM2JiMmE3LTE1Mjc2NDkyNzciLCJncmFudHMiOnsiaWRlbnRpdHkiOiJIb2x5U2FtYW50aGFaaW1tZXJtYW4iLCJ2aWRlbyI6e319LCJpYXQiOjE1Mjc2NDkyNzcsImV4cCI6MTUyNzY1Mjg3NywiaXNzIjoiU0s0OTM5NWVkMTE3YzY1OGZkOWY0Y2JmMWJhZjNiYjJhNyIsInN1YiI6IkFDYjNkYmExY2NhZGYzMjk3M2VhYmQ5OTBjMGZhMTdmMzEifQ.j2blfm8iLV66dPc853VhA2wbiCNMPXb9B5GSYWACB2M'
        };
    }

    // Declare Navigation Options Here :|
    static navigationOptions = ({ navigation }) => {

        return {
            header: null
        }

    };

    getToken(identity) {
        return fetch(`${this.state.host}/token?identity=${identity}`)
            .then(response => {
                return response.text();
            });
    }

    _onConnectButtonPress = () => {
        this.getToken('Yuhong')
            .then(resp => {
                token = JSON.parse(resp).token;
                this.refs.twilioVideo.connect({ roomName: this.state.roomName, accessToken: token })
            })
        this.setState({ status: 'connecting' })
    }

    _onEndButtonPress = () => {
        this.refs.twilioVideo.disconnect()
    }

    _onMuteButtonPress = () => {
        this.refs.twilioVideo.setLocalAudioEnabled(!this.state.isAudioEnabled)
            .then(isEnabled => this.setState({ isAudioEnabled: isEnabled }))
    }

    _onFlipButtonPress = () => {
        this.refs.twilioVideo.flipCamera()
    }

    _onRoomDidConnect = () => {
        this.setState({ status: 'connected' })
    }

    _onRoomDidDisconnect = ({ roomName, error }) => {
        console.log("ERROR: ", error)

        this.setState({ status: 'disconnected' })
        this.props.navigation.goBack();
    }

    _onRoomDidFailToConnect = (error) => {
        console.log("ERROR: ", error)

        this.setState({ status: 'disconnected' })
    }

    _onParticipantAddedVideoTrack = ({ participant, track }) => {
        console.log("onParticipantAddedVideoTrack: ", participant, track)

        this.setState({
            participant: participant.identity,
            videoTrack: track.trackId
        });
    }

    _onParticipantRemovedVideoTrack = ({ participant, track }) => {
        console.log("onParticipantRemovedVideoTrack: ", participant, track)

        this.setState({ participant: null, videoTrack: null });
        this.props.navigation.goBack();
    }

    render() {
        trackId = this.state.videoTrack;
        identity = this.state.participant;
        return (
            <View style={styles.container}>
                {
                    (this.state.status === 'disconnected') &&
                    <TouchableOpacity
                        style={styles.connect}
                        onPress={this._onConnectButtonPress}>
                        <Text>connect</Text>
                    </TouchableOpacity>
                }

                {
                    (this.state.status === 'connected' || this.state.status === 'connecting') &&
                    <View style={styles.callContainer}>
                        {
                            this.state.status === 'connected' &&
                            <View style={styles.videoContainer}>
                                {
                                    trackId &&
                                    <TwilioVideoParticipantView
                                        style={styles.fullScreenVideo}
                                        key={trackId}
                                        trackIdentifier={{
                                            participantIdentity: identity,
                                            videoTrackId: trackId
                                        }}
                                    />
                                }
                            </View>
                        }
                        <View
                            style={styles.optionsContainer}>
                            <TouchableOpacity
                                style={styles.optionButton}
                                onPress={this._onEndButtonPress}>
                                <Text style={{ fontSize: 12 }}>End</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.optionButton}
                                onPress={this._onMuteButtonPress}>
                                <Text style={{ fontSize: 12 }}>{this.state.isAudioEnabled ? "Mute" : "Unmute"}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.optionButton}
                                onPress={this._onFlipButtonPress}>
                                <Text style={{ fontSize: 12 }}>Flip</Text>
                            </TouchableOpacity>
                        </View>
                        <TwilioVideoLocalView
                            enabled={true}
                            style={styles.smallScreenVideo}
                        />
                    </View>
                }

                <TwilioVideo
                    ref="twilioVideo"
                    onRoomDidConnect={this._onRoomDidConnect}
                    onRoomDidDisconnect={this._onRoomDidDisconnect}
                    onRoomDidFailToConnect={this._onRoomDidFailToConnect}
                    onParticipantAddedVideoTrack={this._onParticipantAddedVideoTrack}
                    onParticipantRemovedVideoTrack={this.onParticipantRemovedVideoTrack}
                />
            </View>
        );
    }
}

export default withNavigation(Video);