import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  AsyncStorage,
  Dimensions
} from 'react-native';
import { Container, Header, Left, Right, Title, Body, Button, Text, Content, Icon, List, ListItem } from 'native-base';
import { withNavigation, navigation } from 'react-navigation';

import { GetProfile, SubscribeToProfile } from './graphql_query';
import { API, graphqlOperation } from 'aws-amplify';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { route } from '../../routes/routes.constants';
import theme from '../../styles/theme.style';
import styles from './profile.style';

class Profile extends Component {

  navigateToSettings = () => {
    this.props.navigation.navigate(route.PROFILEEDIT)
  }

  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };

  state = {
    profile: {
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
    },
    storeUsername: '',
    error: null
  }

  async componentDidMount() {
      // Get username from Store
      try {
          this.storeUsername = await AsyncStorage.getItem('username');
      } catch (err) {
          console.log('This is the Store Username Error: ', err)
      }
      // Get Profile from GraphQL
      try {

          const profile = await API.graphql(graphqlOperation(GetProfile, {userId: this.storeUsername}))
          this.setState({
            profile: profile.data.getPangyouMobilehub1098576098UserProfile
          })

          if (profile.data.getPangyouMobilehub1098576098UserProfile == null) {
            this.props.navigation.navigate('editprofile');
          }

      } catch (err) {
          console.log('This is the Error: ', err)
      }
      // Subscribe Profile from GraphQL
      API.graphql(graphqlOperation(SubscribeToProfile, {userId: this.storeUsername})).subscribe({
          next: (eventData) => {
              this.setState({
                profile: eventData.value.data.onUpdatePangyouMobilehub1098576098UserProfile
              })
          }

      })

  }


  render() {

    const LangTrunc = this.state.profile.userLanguage;
    const shortLang = LangTrunc.slice(0, 2);
    const LangLearnTrunc = this.state.profile.userLearnLanguage;
    const shortLangLearn = LangLearnTrunc.slice(0, 2);

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
              <View style={{flexDirection: 'row', marginTop: 20}}>
                  <View style={{flexDirection: 'row', justifyContent: 'center', width: Dimensions.get('window').width}}>
                      <View style={{justifyContent: 'center'}}>
                          <Text style={styles.topText}>{this.state.profile.userName}</Text>
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
              <View style={{flexDirection: 'row', marginTop: 8, marginBottom: 20}}>
                  <View style={{flexDirection: 'row', justifyContent: 'center', width: Dimensions.get('window').width}}>
                      <View style={{justifyContent: 'center'}}>
                          <View style={{flexDirection: 'column'}}>
                              <Text style={{fontSize: 18, color: 'black'}}>{this.state.profile.userGender}</Text>
                              <View style={{flexDirection: 'row'}}>
                                  <Text style={{fontSize: 13, color: 'blue'}}>{shortLang}</Text>
                                  <Text style={{fontSize: 13, color: 'black'}}>/</Text>
                                  <Text style={{fontSize: 13, color: 'blue'}}>{shortLangLearn}</Text>
                              </View>
                              <Text style={{fontSize: 13, color: 'green'}}>{this.state.profile.userStatus}</Text>
                          </View>
                      </View>
                  </View>
              </View>
              <View style={{marginTop: 20, marginBottom: 25}}>
                  <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                      <View style={{width: 140}}><Text style={{fontSize: 16, color: 'grey', textAlign: 'center'}}>Spoken Language</Text></View>
                      <View style={{width: 140}}><Text style={{fontSize: 16, color: 'grey', textAlign: 'center'}}>Desired Language</Text></View>
                  </View>
                  <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                      <View style={{width: 140}}><Text style={{fontSize: 24, color: 'black', fontWeight: 'bold', textAlign: 'center'}}>{this.state.profile.userLanguage}</Text></View>
                      <View style={{width: 140}}><Text style={{fontSize: 24, color: 'black', fontWeight: 'bold', textAlign: 'center'}}>{this.state.profile.userLearnLanguage}</Text></View>
                  </View>
              </View>
            </View>

            <View style={{height: 8}}></View>

            <View style={styles.indexProfileCard}>
              <View style={{marginTop: 15, marginBottom: 15}}>
                  <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                      <View style={{width: 250}}><Text style={{fontSize: 18, color: 'grey', fontWeight: 'bold', textAlign: 'center'}}>Record a voice message:</Text></View>
                      <View style={{width: 80}}><Icon type="Ionicons" name='ios-mic' ios='ios-mic' md='md-mic' style={{fontSize: 30, color: 'red', textAlign: 'center'}} /></View>
                  </View>
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
                            Location: {this.state.profile.userCountry}
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
                          <Text style={{fontSize: 18, color: 'black', textAlign: 'center'}}>
                            Date of Birth: {this.state.profile.userDob}
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
                          <Icon type="Ionicons" name='ios-school' ios='ios-school' md='md-school' style={{fontSize: 30, color: 'grey', textAlign: 'center'}} />
                          <Text style={{fontSize: 18, color: 'black', textAlign: 'center'}}>
                            School: {this.state.profile.userSchool}
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
                            Major: {this.state.profile.userMajor}
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
