import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    TextInput,
    View,
    Button,
    TouchableOpacity,
    Dimensions
} from 'react-native';

import {
    TwilioVideoLocalView,
    TwilioVideoParticipantView,
    TwilioVideo
} from 'react-native-twilio-video-webrtc'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    callContainer: {
        flex: 1,
        position: "absolute",
        bottom: 0,
        top: 0,
        left: 0,
        right: 0
    },
    welcome: {
        fontSize: 30,
        textAlign: 'center',
        paddingTop: 40
    },
    input: {
        height: 50,
        borderWidth: 1,
        marginRight: 70,
        marginLeft: 70,
        marginTop: 50,
        textAlign: 'center',
        backgroundColor: 'white'
    },
    button: {
        marginTop: 100
    },
    localVideo: {
        flex: 1,
        width: 150,
        height: 250,
        position: "absolute",
        right: 10,
        bottom: 10
    },
    remoteGrid: {
        flex: 1,
        flexDirection: "row",
        flexWrap: 'wrap'
    },
    remoteVideo: {
        flex: 1,
        resizeMode: 'stretch',
    },
    optionsContainer: {
        position: "absolute",
        left: 0,
        bottom: 0,
        right: 0,
        height: 100,
        backgroundColor: 'blue',
        flexDirection: "row",
        alignItems: "center"
    },
    optionButton: {
        width: 60,
        height: 60,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 100 / 2,
        backgroundColor: 'grey',
        justifyContent: 'center',
        alignItems: "center"
    }
});

export default class Example extends Component {
    state = {
        isAudioEnabled: true,
        isVideoEnabled: true,
        status: 'disconnected',
        participant: null,
        videoTrack: null,
        roomName: '',
        token: 
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTSzQ5Mzk1ZWQxMTdjNjU4ZmQ5ZjRjYmYxYmFmM2JiMmE3LTE1Mjc2ODE0MzkiLCJncmFudHMiOnsiaWRlbnRpdHkiOiJ5dWhvbmciLCJ2aWRlbyI6e319LCJpYXQiOjE1Mjc2ODE0MzksImV4cCI6MTUyNzY4NTAzOSwiaXNzIjoiU0s0OTM5NWVkMTE3YzY1OGZkOWY0Y2JmMWJhZjNiYjJhNyIsInN1YiI6IkFDYjNkYmExY2NhZGYzMjk3M2VhYmQ5OTBjMGZhMTdmMzEifQ.zAV9leyH3RjIeRlz7A03E35SY6KmJaSKIZm935j8lwY'    
    }

    _onConnectButtonPress = () => {
        this.refs.twilioVideo.connect({ roomName: this.state.roomName, accessToken: this.state.token })
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
    }

    _onRoomDidFailToConnect = (error) => {
        console.log("ERROR: ", error)

        this.setState({ status: 'disconnected' })
    }

    _onParticipantAddedVideoTrack = ({ participant, track }) => {
        console.log("onParticipantAddedVideoTrack: ", participant, track)

        this.setState({
            videoTrack: track.trackId,
            participant: participant.identity
        });
    }

    _onParticipantRemovedVideoTrack = ({ participant, track }) => {
        console.log("onParticipantRemovedVideoTrack: ", participant, track)

        this.setState({ videoTrack: null, participant: null });
    }

    render() {
        trackId = this.state.videoTrack;
        participant = this.state.participant;
        return (
            <View style={styles.container}>
                {
                    this.state.status === 'disconnected' &&
                    <View>
                        <Text style={styles.welcome}>
                            React Native Twilio Video
            </Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize='none'
                            value={this.state.roomName}
                            onChangeText={(text) => this.setState({ roomName: text })}>
                        </TextInput>
                        <TextInput
                            style={styles.input}
                            autoCapitalize='none'
                            value={this.state.token}
                            onChangeText={(text) => this.setState({ token: text })}>
                        </TextInput>
                        <Button
                            title="Connect"
                            style={styles.button}
                            onPress={this._onConnectButtonPress}>
                        </Button>
                    </View>
                }
                
                {
                    (this.state.status === 'connected' || this.state.status === 'connecting') &&
                    <View style={styles.callContainer}>
                        {
                            this.state.status === 'connected' &&
                            <View style={styles.remoteGrid}>
                                {
                                    trackId &&
                                    <TwilioVideoParticipantView
                                        style={styles.remoteVideo}
                                        key={trackId}
                                        trackIdentifier={{
                                            participantIdentity: participant,
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
                            <TwilioVideoLocalView
                                enabled={true}
                                style={styles.localVideo}
                            />
                        </View>
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