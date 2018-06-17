import React, { Component } from 'react';
import { AppRegistry, Text, TextInput, View, Button, TouchableOpacity, Dimensions } from 'react-native';
import { withNavigation, navigation } from 'react-navigation';

import { TwilioVideoLocalView, TwilioVideoParticipantView, TwilioVideo } from 'react-native-twilio-video-webrtc';
import Loader from '../../components/loader/loader.component';
import { CallButton } from './callbutton';

import { styles } from './video.style';

class Video extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isAudioEnabled: true,
            isVideoEnabled: true,
            participant: null,
            videoTrack: null,
            host: 'http://54.164.94.85:9527',
            status: props.navigation.getParam('status') || 'disconnected',
            userId: props.navigation.getParam('userId'),
            friendId: props.navigation.getParam('friendId'),
            roomName: props.navigation.getParam('roomName') || 'test',
            token: ''
        };
        console.log(this.state);
    }

    componentDidMount() {
        if (this.state.status === 'calling') {
            this._onConnectButtonPress();
        }
    }

    // Declare Navigation Options Here :|
    static navigationOptions = ({ navigation }) => {

        return {
            header: null
        }

    };

    getToken(identity) {
        return fetch(`${this.state.host}/video?identity=${identity}`)
            .then(response => {
                return response.text();
            });
    };

    navigateBack() {
        this.props.navigation.goBack();
    }

    _onConnectButtonPress = () => {
        console.log(this.state);
        this.getToken(this.state.userId)
            .then(token => {
                console.log("token: ", token);
                this.refs.twilioVideo.connect({ roomName: this.state.roomName, accessToken: token })
            })
            .catch(err => {
                console.log(err);
            })
        this.setState({ status: 'connecting' })
    }

    _onEndButtonPress = () => {
        this.refs.twilioVideo.disconnect()
        this.navigateBack();
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

        // this.setState({ status: 'disconnected' })
    }

    _onRoomDidFailToConnect = (error) => {
        console.log("ERROR: ", error)

        this.setState({ status: 'disconnected' })
        this.navigateBack();
    }

    _onParticipantAddedVideoTrack = ({ participant, track }) => {
        console.log("onParticipantAddedVideoTrack: ", participant, track)
        this.setState({
            participant: participant.identity,
            videoTrack: track.trackId
        });
        console.log(this.state);
    }

    _onParticipantRemovedVideoTrack = ({ participant, track }) => {
        console.log("onParticipantRemovedVideoTrack: ", participant, track)

        this.setState({ participant: null, videoTrack: null });
        this.props.navigation.goBack();
    }

    _onRoomParticipantDidDisconnect = (props) => {
        console.log("onRoomParticipantDidDisconnect: ", props);

        this.setState({ participant: null, videoTrack: null });
        this.props.navigation.goBack();
    }

    render() {
        callControls = (
            <View style={styles.optionsContainer}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', backgroundColor: 'transparent' }}>
                    {this.state.isAudioEnabled ? (
                        <CallButton icon_name='mic-off' color='#0C90E7' buttonPressed={this._onMuteButtonPress} />
                    ) : (
                            <CallButton icon_name='mic' color='#0C90E7' buttonPressed={this._onMuteButtonPress} />
                        )}
                    <CallButton icon_name='switch-camera' color='#0C90E7' buttonPressed={this._onFlipButtonPress} />
                    <CallButton icon_name='call-end' color='#FF3B30' buttonPressed={this._onEndButtonPress} />
                </View>
            </View>
        );
        trackId = this.state.videoTrack;
        identity = this.state.participant;
        return (
            <View style={styles.container}>
                {
                    (this.state.status === 'incoming') &&
                    <View style={styles.connect}>
                        <Text>Incoming Call</Text>
                    </View>
                }
                {
                    (this.state.status === 'incoming') &&
                    <View style={styles.optionsContainer}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', backgroundColor: 'transparent' }}>
                            <CallButton icon_name='call-end' backgroundColor='#FF3B30' color='#FFFFFF' buttonPressed={this._onEndButtonPress} />
                            <CallButton icon_name='call' backgroundColor='#0BD926' color='#FFFFFF' buttonPressed={this._onConnectButtonPress} />
                        </View>
                    </View>
                }

                {
                    (this.state.status === 'disconnected') &&
                    <View
                        style={styles.connect}>
                        <Text>Failed to Connect</Text>
                    </View>
                }

                {
                    (this.state.status === 'connected' || this.state.status === 'connecting') &&
                    <View style={styles.callContainer}>
                        {
                            this.state.status === 'connected' && trackId &&
                            <TwilioVideoParticipantView
                                style={styles.fullScreenVideo}
                                key={trackId}
                                trackIdentifier={{
                                    participantIdentity: identity,
                                    videoTrackId: trackId
                                }}
                            />
                        }
                        {callControls}
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
                    onRoomParticipantDidDisconnect={this._onRoomParticipantDidDisconnect}
                    onParticipantAddedVideoTrack={this._onParticipantAddedVideoTrack}
                    onParticipantRemovedVideoTrack={this._onParticipantRemovedVideoTrack}
                />
            </View>
        );
    }
}

export default withNavigation(Video);