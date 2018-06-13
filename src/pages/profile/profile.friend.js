import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  AsyncStorage,
  Dimensions,
  TouchableOpacity,
  Switch,
  Slider
} from 'react-native';
import { Container, Header, Left, Right, Title, Body, Button, Text, Content, Icon, List, ListItem } from 'native-base';
import { withNavigation, navigation } from 'react-navigation';
import { Player, Recorder, MediaStates } from 'react-native-audio-toolkit';

import { GetProfile, SubscribeToProfile } from './graphql_query';
import { API, graphqlOperation } from 'aws-amplify';
import { RNS3 } from 'react-native-aws3';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { route } from '../../routes/routes.constants';
import theme from '../../styles/theme.style';
import styles from './profile.style';

import Moment from 'moment';


class Profile extends Component {

  constructor() {
      super();

      this.state = {
          profile: {},
          userName: '',
          userDescription: '',
          userStatus: '',
          userCountry: '',
          userDob: '',
          userGender: '',
          userSchool: '',
          userMajor: '',
          userLanguage: '',
          userLearnLanguage: '',
          userImageUrl: '',
          playPauseButton: 'Preparing...',
          recordButton: 'Preparing...',
          stopButtonDisabled: true,
          playButtonDisabled: true,
          recordButtonDisabled: true,
          loopButtonStatus: false,
          progress: 0,
          storeUsername: '',
          error: null
      };
  }

  navigateToSettings = () => {
    this.props.navigation.navigate(route.PROFILEEDIT)
  }

  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };

  async componentDidMount() {
      // Get Profile from GraphQL
      try {
          const profile = await API.graphql(graphqlOperation(GetProfile, {userId: this.props.navigation.getParam('userId')}))
          this.setState({userStatus: profile.data.getPangyouMobilehub1098576098UserProfile.userStatus})
          this.setState({
            profile: profile.data.getPangyouMobilehub1098576098UserProfile
          })
      } catch (err) {
          console.log('This is the Error: ', err)
      }
      // Subscribe Profile from GraphQL
      API.graphql(graphqlOperation(SubscribeToProfile, {userId: this.storeUsername})).subscribe({
          next: (eventData) => {
              this.setState({userStatus: eventData.value.data.onUpdatePangyouMobilehub1098576098UserProfile.userStatus})
              this.setState({
                profile: eventData.value.data.onUpdatePangyouMobilehub1098576098UserProfile
              })
          }

      })

  }

  componentWillMount() {
      this.player = null;
      this.recorder = null;
      this.lastSeek = 0;

      this._reloadPlayer();
      this._reloadRecorder();

      this._progressInterval = setInterval(() => {
        if (this.player && this._shouldUpdateProgressBar()) {// && !this._dragging) {
          this.setState({progress: Math.max(0, this.player.currentTime) / this.player.duration});
        }
      }, 100);

  }

  componentWillUnmount() {
      //console.log('unmount');
      // TODO
      clearInterval(this._progressInterval);
  }

  _shouldUpdateProgressBar() {
    // Debounce progress bar update by 200 ms
    return Date.now() - this.lastSeek > 200;
  }

  _updateState(err) {
    this.setState({
      playPauseButton:      this.player    && this.player.isPlaying     ? 'Pause' : 'Play',
      recordButton:         this.recorder  && this.recorder.isRecording ? 'Stop' : 'Record',

      stopButtonDisabled:   !this.player   || !this.player.canStop,
      playButtonDisabled:   !this.player   || !this.player.canPlay || this.recorder.isRecording,
      recordButtonDisabled: !this.recorder || (this.player         && !this.player.isStopped),
    });
  }

  _playPause() {
    this.player.playPause((err, playing) => {
      if (err) {
        this.setState({
          error: err.message
        });
      }
      this._updateState();
    });
  }

  _stop() {
    this.player.stop(() => {
      this._updateState();
    });
  }

  _seek(percentage) {
    if (!this.player) {
      return;
    }

    this.lastSeek = Date.now();

    let position = percentage * this.player.duration;

    this.player.seek(position, () => {
      this._updateState();
    });
  }

  _reloadPlayer() {
    if (this.player) {
      this.player.destroy();
    }

    this.player = new Player('user_personalized_message.mp4', {
      autoDestroy: false
    }).prepare((err) => {
      if (err) {
        console.log('error at _reloadPlayer():');
        console.log(err);
      } else {
        this.player.looping = this.state.loopButtonStatus;
      }


      this._updateState();
    });

    this._updateState();

    this.player.on('ended', () => {
      this._updateState();
    });
    this.player.on('pause', () => {
      this._updateState();
    });
  }

  _reloadRecorder() {
    if (this.recorder) {
      this.recorder.destroy();
    }

    this.recorder = new Recorder('user_personalized_message.mp4', {
      bitrate: 256000,
      channels: 2,
      sampleRate: 44100,
      quality: 'max'
      //format: 'ac3', // autodetected
      //encoder: 'aac', // autodetected
    })

    this._updateState();
  }

  _toggleRecord() {
    if (this.player) {
      this.player.destroy();
    }

    this.recorder.toggleRecord((err, stopped) => {
      if (err) {
        this.setState({
          error: err.message
        });
      }
      if (stopped) {
        this._reloadPlayer();
        this._reloadRecorder();
      }

      this._updateState();
    });
  }

  _toggleLooping(value) {
    this.setState({
      loopButtonStatus: value
    });
    if (this.player) {
      this.player.looping = value;
    }
  }

  setStatus() {
    return null
  }


  render() {
    let currentStatus;
    if (this.state.userStatus === 'Online') {
        currentStatus = true
    } else {
        currentStatus = false
    }

    const manIcon = <Text><Icon type="Ionicons" name='ios-man' ios='ios-man' md='md-man' style={{fontSize: 38, color: 'grey', textAlign: 'center'}} /></Text>;
    const womanIcon = <Text><Icon type="Ionicons" name='ios-woman' ios='ios-woman' md='md-woman' style={{fontSize: 38, color: 'grey', textAlign: 'center'}} /></Text>;
    let genderIcon;
    if (this.state.profile.userGender === 'Male') {
        genderIcon = manIcon
    } else {
        genderIcon = womanIcon
    }

    const statusColorOnline = <Text style={{fontSize: 16, color: 'green'}}>{this.state.profile.userStatus}</Text>
    const statusColorOffline = <Text style={{fontSize: 16, color: 'lightgrey'}}>{this.state.profile.userStatus}</Text>
    let statusColor;
    if (this.state.profile.userStatus == 'Online') {
        statusColor = statusColorOnline
    } else {
        statusColor = statusColorOffline
    }

    const dobReFormatted = Moment(this.state.profile.userDob).format("MMM D, YYYY")
    const dobFormatted = <Text style={{fontSize: 18, color: 'black', textAlign: 'center'}}>{dobReFormatted}</Text>

    const recordingOff = <TouchableOpacity activeOpacity = { .5 } disabled={this.state.recordButtonDisabled} onPress={() => this._toggleRecord()}><Icon type="Ionicons" name='ios-mic' ios='ios-mic' md='md-mic' style={{fontSize: 40, color: 'pink', textAlign: 'center'}} /></TouchableOpacity>
    const recordingOn = <TouchableOpacity disabled={this.state.recordButtonDisabled} onPress={() => this._toggleRecord()}><Icon type="Ionicons" name='ios-mic' ios='ios-mic' md='md-mic' style={{fontSize: 40, color: 'red', textAlign: 'center'}} /></TouchableOpacity>
    let recordAudio;
    if (this.recorder.isRecording != true) {
        recordAudio = recordingOff
    } else if (this.recorder.isRecording == true) {
        recordAudio = recordingOn
    }

    const playButtonOff = <TouchableOpacity disabled={this.state.playButtonDisabled} onPress={() => this._playPause()}><Icon type="Ionicons" name='ios-play' ios='ios-play' md='md-play' style={{fontSize: 35, color: '#157dfb', textAlign: 'center'}} /></TouchableOpacity>
    const playButtonOn = <Icon type="Ionicons" name='ios-play' ios='ios-play' md='md-play' style={{fontSize: 35, color: 'lightgrey', textAlign: 'center'}} />
    let playAndPause;
    if (this.player.isPlaying != true) {
        playAndPause = playButtonOff
    } else if (this.player.isPlaying == true) {
        playAndPause = playButtonOn
    }

    return (
      <ScrollView>
        <Container>
          <Header>
          <Left/>
          <Body>
            <Title style={{fontFamily: theme.FONT_LIGHT}}>Profile</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => {this.navigateToSettings()}}>
              <Icon
                name='create'
                type="MaterialIcons"
                style={ styles.icon } />
            </Button>
          </Right>
          </Header>
          <Content>
            <View style={styles.indexProfileCard}>
              <View style={{flexDirection: 'row', marginTop: 8, marginLeft: -20}}>
                  <View style={{flexDirection: 'row', justifyContent: 'flex-end', width: Dimensions.get('window').width}}>
                      <View style={{justifyContent: 'center'}}>
                          <View style={{flexDirection: 'column'}}>
                              <Switch
                                onValueChange = {this.setStatus}
                                value = {currentStatus}/>
                              {statusColor}
                          </View>
                      </View>
                  </View>
              </View>
              <View style={{flexDirection: 'row', marginTop: 20}}>
                  <View style={{flexDirection: 'row', justifyContent: 'center', width: Dimensions.get('window').width}}>
                      <View style={{justifyContent: 'center'}}>
                          <Text style={styles.topText}>{genderIcon} {this.state.profile.userName}</Text>
                      </View>
                  </View>
              </View>
              <View style={{flexDirection: 'row', marginTop: 15}}>
                  <View style={{flexDirection: 'row', justifyContent: 'center', width: Dimensions.get('window').width}}>
                      <View style={{justifyContent: 'center'}}>
                          <Image
                            style={{width: 140, borderRadius: 70, height: 140}}
                            source={{uri: this.state.profile.userImageUrl}}
                          />
                      </View>
                  </View>
              </View>
              <View style={{marginTop: 20, marginBottom: 25}}>
                  <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                      <View style={{width: 140}}><Text style={{fontSize: 16, color: 'grey', textAlign: 'center'}}>Spoken Language:</Text></View>
                      <View style={{width: 140}}><Text style={{fontSize: 16, color: 'grey', textAlign: 'center'}}>Desired Language:</Text></View>
                  </View>
                  <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                      <View style={{width: 140}}><Text style={{fontSize: 18, color: 'black', fontWeight: 'bold', textAlign: 'center'}}>{this.state.profile.userLanguage}</Text></View>
                      <View style={{width: 140}}><Text style={{fontSize: 18, color: 'black', fontWeight: 'bold', textAlign: 'center'}}>{this.state.profile.userLearnLanguage}</Text></View>
                  </View>
              </View>
            </View>

            <View style={{height: 8}}></View>

            <View style={styles.indexProfileCard}>
              <View style={{marginTop: 10, marginBottom: 10}}>
                  <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                      <View style={{width: 250}}><Text style={{fontSize: 18, color: 'black', fontWeight: 'bold', textAlign: 'center'}}>Record a voice message:</Text></View>
                          <View style={{marginRight: 25}}>
                              {recordAudio}
                          </View>
                      </View>
                  </View>
                  <View style={{flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 10}}>
                      <View style={{width: 250}}>
                          <View style={{ marginLeft: 20}}>
                              <Text style={{fontSize: 14, color: 'grey', textAlign: 'left'}}>My Personal Message:</Text>
                          </View>
                          <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                              <View style={{marginLeft: 10, marginBottom: 30, width: 260}}>
                                  <View style={styles.slider}>
                                    <Slider step={0.0001} disabled={this.state.playButtonDisabled} onValueChange={(percentage) => this._seek(percentage)} value={this.state.progress}/>
                                  </View>
                              </View>
                              <View style={{marginLeft: 20, width: 20}}>
                                  {playAndPause}
                              </View>
                              <View style={{marginLeft: 20, width: 20}}>
                                <TouchableOpacity activeOpacity = { .5 } disabled={this.state.stopButtonDisabled} onPress={() => this._stop()}>
                                  <Icon type="Ionicons" name='ios-square' ios='ios-square' md='md-square' style={{fontSize: 25, color: '#0882fb', textAlign: 'center'}} />
                                </TouchableOpacity>
                              </View>
                          </View>
                      </View>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: 20, marginBottom: 20}}>
                  <Text style={styles.errorMessage}>{this.state.error}</Text>
              </View>
            </View>

            <View style={{height: 8}}></View>

            <View style={styles.indexProfileCard}>
              <View style={{flexDirection: 'row', marginTop: 30, marginBottom: 30}}>
                  <View style={{justifyContent: 'flex-start', marginLeft: 20, marginRight: 15}}>
                      <View style={{justifyContent: 'center'}}>
                          <Text style={{fontSize: 16, color: 'black'}}>
                            {this.state.profile.userDescription}
                          </Text>
                      </View>
                  </View>
              </View>
            </View>

            <View style={{height: 8}}></View>

            <View style={styles.indexProfileCard}>
              <View style={{flexDirection: 'row', marginTop: 20, marginBottom: 20}}>
                  <View style={{flexDirection: 'row', justifyContent: 'center', width: Dimensions.get('window').width}}>
                      <View style={{justifyContent: 'center'}}>
                          <Icon type="Ionicons" name='ios-pin' ios='ios-pin' md='md-pin' style={{fontSize: 30, color: 'grey', textAlign: 'center'}} />
                          <Text style={{fontSize: 18, color: 'black', textAlign: 'center'}}>
                            {this.state.profile.userCountry}
                          </Text>
                      </View>
                  </View>
              </View>
            </View>

            <View style={{height: 1}}></View>

            <View style={styles.indexProfileCard}>
              <View style={{flexDirection: 'row', marginTop: 20, marginBottom: 20}}>
                  <View style={{flexDirection: 'row', justifyContent: 'center', width: Dimensions.get('window').width}}>
                      <View style={{justifyContent: 'center'}}>
                          <Icon type="Ionicons" name='ios-calendar' ios='ios-calendar' md='md-calendar' style={{fontSize: 30, color: 'grey', textAlign: 'center'}} />
                          {dobFormatted}
                      </View>
                  </View>
              </View>
            </View>

            <View style={{height: 1}}></View>

            <View style={styles.indexProfileCard}>
              <View style={{flexDirection: 'row', marginTop: 20, marginBottom: 20}}>
                  <View style={{flexDirection: 'row', justifyContent: 'center', width: Dimensions.get('window').width}}>
                      <View style={{justifyContent: 'center'}}>
                          <Icon type="Ionicons" name='ios-school' ios='ios-school' md='md-school' style={{fontSize: 30, color: 'grey', textAlign: 'center'}} />
                          <Text style={{fontSize: 18, color: 'black', textAlign: 'center'}}>
                            {this.state.profile.userSchool}
                          </Text>
                      </View>
                  </View>
              </View>
            </View>

            <View style={{height: 1}}></View>

            <View style={styles.indexProfileCard}>
              <View style={{flexDirection: 'row', marginTop: 20, marginBottom: 20}}>
                  <View style={{flexDirection: 'row', justifyContent: 'center', width: Dimensions.get('window').width}}>
                      <View style={{justifyContent: 'center'}}>
                          <Icon type="Ionicons" name='ios-book' ios='ios-book' md='md-book' style={{fontSize: 30, color: 'grey', textAlign: 'center'}} />
                          <Text style={{fontSize: 18, color: 'black', textAlign: 'center'}}>
                            {this.state.profile.userMajor}
                          </Text>
                      </View>
                  </View>
              </View>
            </View>

            <View>
                <View style={styles.indexProfileCard}>
                    <View style={{height: 40}}></View>
                </View>
            </View>
          </Content>
        </Container>
      </ScrollView>
    );
  }
}

export default withNavigation(Profile);
