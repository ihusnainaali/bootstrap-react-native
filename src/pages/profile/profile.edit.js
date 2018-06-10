import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  TouchableOpacity,
  Modal,
  StyleSheet,
  CameraRoll,
  Image,
  Dimensions,
  ScrollView,
  RefreshControl,
  FlatList,
  SectionList,
  KeyboardAvoidingView,
  AsyncStorage
} from 'react-native';
import { withNavigation } from 'react-navigation';
import TextField from '../../components/textfield/textfield.component';
import Button from '../../components/button/button.component';
import { Container, Header, Left, Right, Title, Text, Body, Content, Icon, List, ListItem, Picker } from 'native-base';

import { GetProfile, UpdateProfile } from './graphql_query';
import { API, graphqlOperation } from 'aws-amplify';

import ImagePicker from 'react-native-image-picker';
import { RNS3 } from 'react-native-aws3';

import styles from './profile.style';
import theme from '../../styles/theme.style';

import DatePicker from 'react-native-datepicker';


type Props = {};
class EditProfile extends Component<Props> {

  constructor(props){
      super(props);

      this.state = {
        date:'',
        editProfile: {},
        refreshData: '',
        storeUsername: '',
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
        error: null
      }
  }

  onChangeText = (key) => {
    return (value) => this.setState({
      [key]: value
    })
  }

  setError(error) {
    this.setState({ error });
  }

  clearError(){
		this.setState({error: ''});
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
          const editProfile = await API.graphql(graphqlOperation(GetProfile, {userId: this.storeUsername}))
          this.setState({
            editProfile: editProfile.data.getPangyouMobilehub1098576098UserProfile
          })
      } catch (err) {
          console.log('This is the Error: ', err)
      }
  }

  async updateProfile() {

      const userNameProp = (this.state.userName == "") ? this.state.editProfile.userName : this.state.userName;
      const userDescriptionProp = (this.state.userDescription == "") ? this.state.editProfile.userDescription : this.state.userDescription;
      const userStatusProp = (this.state.userStatus == "") ? this.state.editProfile.userStatus : this.state.userStatus;
      const userCountryProp = (this.state.userCountry == "") ? this.state.editProfile.userCountry : this.state.userCountry;
      const userDobProp = (this.state.userDob == "") ? this.state.editProfile.userDob : this.state.userDob;
      const userGenderProp = (this.state.userGender == "") ? this.state.editProfile.userGender : this.state.userGender;
      const userSchoolProp = (this.state.userSchool == "") ? this.state.editProfile.userSchool : this.state.userSchool;
      const userMajorProp = (this.state.userMajor == "") ? this.state.editProfile.userMajor : this.state.userMajor;
      const userLanguageProp = (this.state.userLanguage == "") ? this.state.editProfile.userLanguage : this.state.userLanguage;
      const userLearnLanguageProp = (this.state.userLearnLanguage == "") ? this.state.editProfile.userLearnLanguage : this.state.userLearnLanguage;
      const userImageUrlProp = (this.state.userImageUrl == "") ? this.state.editProfile.userImageUrl : this.state.userImageUrl;

    	try {
      		editProfile = {
              userId: this.storeUsername,
    			    userName: userNameProp,
              userDescription: userDescriptionProp,
              userStatus: userStatusProp,
              userCountry: userCountryProp,
              userDob: userDobProp,
              userGender: userGenderProp,
              userSchool: userSchoolProp,
              userMajor: userMajorProp,
              userLanguage: userLanguageProp,
              userLearnLanguage: userLearnLanguageProp,
              userImageUrl: userImageUrlProp
    		  }
          this.setState({
              editProfile: {...this.state.profile, editProfile}
          })
    		  await API.graphql(graphqlOperation(UpdateProfile, editProfile));
          this.props.navigation.navigate('profile');
        } catch (err) {
            this.setError(err.message);
            console.log("Update Error: ", err);
            if (this.state.userName == "") {
                alert('Please enter a User Name!');
            } else if (this.state.userDescription == "") {
                alert('Please enter a Description!');
            } else if (this.state.userStatus == "") {
                alert('Please enter a Status!');
            } else if (this.state.userCountry == "") {
                alert('Please enter a Country!');
            } else if (this.state.userDob == "") {
                alert('Please enter your Date of Birth!');
            } else if (this.state.userGender == "") {
                alert('Please enter your Gender!');
            } else if (this.state.userSchool == "") {
                alert('Please enter the School you graduated from!');
            } else if (this.state.userMajor == "") {
                alert('Please enter your School Major!');
            } else if (this.state.userLanguage == "") {
                alert('Please enter your First spoken Language!');
            } else if (this.state.userLearnLanguage == "") {
                alert('Please enter the desired Language you would like to learn!');
            } else if (this.state.userImageUrl == "") {
                alert('Please choose a Profile Photo by tapping the user icon located at the top of this page!');
            }
        }

  }

    getImage() {
      let options = {
        title: 'Select Your Photo',
        mediaType: 'photo',
    };

    ImagePicker.showImagePicker(options, (response) => {
        if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        } else if (response.didCancel) {
            alert('You Have Cancelled the File Upload!');
        } else {
            const file = {
                uri: response.uri,
                name: response.fileName,
                type: 'image/png'
            }
            const config = {
              keyPrefix: "uploads/",
              bucket: "pangyou-userfiles-mobilehub-1098576098",
              region: "us-east-1",
              accessKey: "AKIAI6ZHQBOJGPBSYPMQ",
              secretKey: "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",
              successActionStatus: 201
            }
            RNS3.put(file, config).then(response => {
              if (response.status !== 201) {
                throw new Error("Failed to upload image to S3");
              } else {
                this.setState({userImageUrl : response.body.postResponse.location});
                alert('Your Profile Picture was Uploaded Successfully!');
              }
            });
        }
    });
  }

  render() {

    const userPhoto = <View style={styles.editProfileCard}><TouchableOpacity activeOpacity = { .5 } onPress={ this.getImage.bind(this) }><Image style={{width: 140, borderRadius: 70, height: 140}} source={{uri: this.state.editProfile.userImageUrl}} /></TouchableOpacity></View>

    const userIcon = <View style={styles.editProfileCard}><Icon onPress={this.getImage.bind(this)} type="Ionicons" name='ios-contact' ios="ios-contact" md="md-contact" style={{fontSize: 200, color: 'white', textAlign:'center'}} /></View>

    let userProfilePhoto;
    if (!this.state.editProfile.userImageUrl) {
        userProfilePhoto = userPhoto
    } else {
        userProfilePhoto = userIcon
    }

    return (

      <ScrollView>
        <KeyboardAvoidingView behavior='padding' style={styles.profileWrapper}>
          <Container>
            <Content>
              {userProfilePhoto}
              <View style={styles.editDescriptionCard}>
                  <View style={{flexDirection: 'row'}}>
                      <ListItem style={styles.editLayoutItem}>
                          <Icon
                            type='Ionicons'
                            name='ios-contact'
                            ios='ios-contact'
                            md='md-contact'
                            style={{fontSize: 30, color: 'grey', textAlign:'center', width: 60}} />
                          <TextField
                            placeholder='Name'
                            placeholderTextColor={theme.COLOR_PRIMARY_DARK}
                            returnKeyType='next'
                            keyboardType='email-address'
                            autoCapitalize='none'
                            autoCorrect={false}
                            onChangeText={this.onChangeText('userName').bind(this)}
                            name='userName'
                            value={this.state.editProfile.userName}
                            style={styles.input}
                          />
                      </ListItem>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <ListItem style={styles.editLayoutItem}>
                        <Icon
                          type='Ionicons'
                          name='ios-clipboard'
                          ios='ios-clipboard'
                          md='md-clipboard'
                          style={{fontSize: 30, color: 'grey', textAlign:'center', width: 60}} />
                        <TextField
                          placeholder='Description'
                          placeholderTextColor={theme.COLOR_PRIMARY_DARK}
                          returnKeyType='next'
                          keyboardType='email-address'
                          autoCapitalize='none'
                          autoCorrect={false}
                          onChangeText={this.onChangeText('userDescription').bind(this)}
                          value={this.state.editProfile.userDescription}
                          style={styles.input}
                        />
                    </ListItem>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <ListItem style={styles.editLayoutItem}>
                        <Icon
                          type='Ionicons'
                          name='ios-heart'
                          ios='ios-heart'
                          md='md-heart'
                          style={{fontSize: 30, color: 'grey', textAlign:'center', width: 60}} />
                        <Picker
                          mode="dropdown"
                          iosIcon={<Icon name="ios-arrow-down-outline" />}
                          placeholder="Select your Status"
                          placeholderStyle={{ color: theme.COLOR_PRIMARY_DARK }}
                          placeholderIconColor={theme.COLOR_PRIMARY_DARK}
                          headerStyle={{ backgroundColor: theme.COLOR_PRIMARY_DARK }}
                          headerBackButtonTextStyle={{ color: "#fff" }}
                          headerTitleStyle={{ color: "#fff" }}
                          textStyle={{fontSize: 18, fontWeight: 'bold'}}
                          style={{ width: 200 }}
                          selectedValue={this.state.editProfile.userStatus}
                          onValueChange={ (value) => {this.setState({userStatus: value}) }}
                        >
                          <Picker.Item label="Online" value="Online" />
                          <Picker.Item label="Offline" value="Offline" />
                        </Picker>
                    </ListItem>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <ListItem style={styles.editLayoutItem}>
                        <Icon
                          type='Ionicons'
                          name='ios-pin'
                          ios='ios-pin'
                          md='md-pin'
                          style={{fontSize: 30, color: 'grey', textAlign:'center', width: 60}} />
                        <TextField
                          placeholder='Location'
                          placeholderTextColor={theme.COLOR_PRIMARY_DARK}
                          returnKeyType='next'
                          autoCapitalize='none'
                          autoCorrect={false}
                          onChangeText={this.onChangeText('userCountry').bind(this)}
                          value={this.state.editProfile.userCountry}
                          style={styles.input}
                        />
                    </ListItem>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <ListItem style={styles.editLayoutItem}>
                          <DatePicker
                            style={{marginLeft: 15, width: 320}}
                            date={this.state.editProfile.userDob}
                            mode="date"
                            placeholder="select date"
                            format="YYYY-MM-DD"
                            minDate="1930-01-01"
                            maxDate="2020-01-01"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                              dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                              },
                              dateInput: {
                                marginLeft: 45
                              }
                            }}
                            onDateChange={(date) => {this.setState({date: date})}}
                            onValueChange={ (value) => {this.setState({userDob: value}) }}
                          />
                    </ListItem>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <ListItem style={styles.editLayoutItem}>
                        <Icon
                          type='Ionicons'
                          name='ios-contacts'
                          ios='ios-contacts'
                          md='md-contacts'
                          style={{fontSize: 30, color: 'grey', textAlign:'center', width: 60}} />
                        <Picker
                          mode="dropdown"
                          iosIcon={<Icon name="ios-arrow-down-outline" />}
                          placeholder="Select your Gender"
                          placeholderStyle={{ color: theme.COLOR_PRIMARY_DARK }}
                          placeholderIconColor={theme.COLOR_PRIMARY_DARK}
                          headerStyle={{ backgroundColor: theme.COLOR_PRIMARY_DARK }}
                          headerBackButtonTextStyle={{ color: "#fff" }}
                          headerTitleStyle={{ color: "#fff" }}
                          textStyle={{fontSize: 18, fontWeight: 'bold'}}
                          style={{ width: 200 }}
                          selectedValue={this.state.userGender}
                          onValueChange={ (value) => {this.setState({userGender: value}) }}
                        >
                          <Picker.Item label="Male" value="Male" />
                          <Picker.Item label="Female" value="Female" />
                        </Picker>
                    </ListItem>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <ListItem style={styles.editLayoutItem}>
                        <Icon
                          type='Ionicons'
                          name='ios-school'
                          ios='ios-school'
                          md='md-school'
                          style={{fontSize: 30, color: 'grey', textAlign:'center', width: 60}} />
                        <TextField
                          placeholder='School'
                          placeholderTextColor={theme.COLOR_PRIMARY_DARK}
                          returnKeyType='next'
                          autoCapitalize='none'
                          autoCorrect={false}
                          onChangeText={this.onChangeText('userSchool').bind(this)}
                          value={this.state.editProfile.userSchool}
                          style={styles.input}
                        />
                    </ListItem>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <ListItem style={styles.editLayoutItem}>
                        <Icon
                          type='Ionicons'
                          name='ios-book'
                          ios='ios-book'
                          md='md-book'
                          style={{fontSize: 30, color: 'grey', textAlign:'center', width: 60}} />
                        <TextField
                          placeholder='Major'
                          placeholderTextColor={theme.COLOR_PRIMARY_DARK}
                          returnKeyType='next'
                          autoCapitalize='none'
                          autoCorrect={false}
                          onChangeText={this.onChangeText('userMajor').bind(this)}
                          value={this.state.editProfile.userMajor}
                          style={styles.input}
                        />
                    </ListItem>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <ListItem style={styles.editLayoutItem}>
                        <Icon
                          type='Ionicons'
                          name='ios-globe'
                          ios='ios-globe'
                          md='md-globe'
                          style={{fontSize: 30, color: 'grey', textAlign:'center', width: 60}} />
                        <TextField
                          placeholder='Language'
                          placeholderTextColor={theme.COLOR_PRIMARY_DARK}
                          returnKeyType='next'
                          autoCapitalize='none'
                          autoCorrect={false}
                          onChangeText={this.onChangeText('userLanguage').bind(this)}
                          value={this.state.editProfile.userLanguage}
                          style={styles.input}
                        />
                    </ListItem>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <ListItem style={styles.editLayoutItem}>
                        <Icon
                          type='Ionicons'
                          name='ios-globe'
                          ios='ios-globe'
                          md='md-globe'
                          style={{fontSize: 30, color: 'grey', textAlign:'center', width: 60}} />
                        <TextField
                          placeholder='Language Interested in Learning'
                          placeholderTextColor={theme.COLOR_PRIMARY_DARK}
                          returnKeyType='next'
                          autoCapitalize='none'
                          autoCorrect={false}
                          onChangeText={this.onChangeText('userLearnLanguage').bind(this)}
                          value={this.state.editProfile.userLearnLanguage}
                          style={styles.input}
                        />
                    </ListItem>
                </View>
                <Text>{this.state.error}</Text>
              </View>
              <View style={styles.editProfileBottomGrid}>
                <Button
                  onPress={this.updateProfile.bind(this)}
                  name='Submit'
                  screen='profile'/>
              </View>
            </Content>
          </Container>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

export default withNavigation(EditProfile);
