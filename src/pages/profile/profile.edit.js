import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native';
import { withNavigation } from 'react-navigation';
import TextField from '../../components/textfield/textfield.component';
import Button from '../../components/button/button.component';
import { Container, Header, Text, Content, Icon, List, ListItem } from 'native-base';

import { GetProfile, ListProfile } from './graphql_query';
import { API, graphqlOperation } from 'aws-amplify';

import styles from './profile.style'
import theme from '../../styles/theme.style'


class EditProfile extends Component {

  state = {
    profile: {},
    error: null
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
      try {
          const profile = await API.graphql(graphqlOperation(GetProfile, {userId: "12345678"}))
          // console.log('My Profile: ', profile)
          this.setState({
            profile: profile.data.getPangyouMobilehub1098576098UserProfile
          })
          // console.log('This is the Render Container: ', this.state.profile.userId)
      } catch (err) {
          console.log('This is the Error: ', err)
      }
  }

  updateProfile() {
      const { userId, userName, userDescription, userStatus, userCountry, userDob, userGender, userSchool, userMajor, userLanguage, userLearnLanguage, userImageUrl } = this.state;
      this.clearError();

      try {
          console.log(this.state);
          // this.props.editProfile(this.state);
          this.props.navigation.navigate('profile');
      } catch (err) {
          console.log('These are the Errors: ', err);
          this.setError(err.message);
      }
  }

  render() {
    return (
      <ScrollView>
        <KeyboardAvoidingView behavior='padding' style={styles.profileWrapper}>
          <Container>
            <Content>
              <View style={styles.editProfileCard}>
                  <Text style={styles.profileHeaderText}>Edit Your Profile</Text>
              </View>
              <View style={styles.editDescriptionCard}>
                  <View style={{flexDirection: 'row'}}>
                      <ListItem style={styles.layoutItem}>
                          <Icon
                            type='Ionicons'
                            name='ios-contact'
                            ios='ios-contact'
                            md='md-contact'
                            style={{fontSize: 30, color: 'black', textAlign:'center', width: 60}} />
                          <TextField
                            placeholder='Name'
                            placeholderTextColor={theme.COLOR_PRIMARY_DARK}
                            returnKeyType='next'
                            keyboardType='email-address'
                            autoCapitalize='none'
                            autoCorrect={false}
                            onChangeText={this.onChangeText('userName').bind(this)}
                            value={this.state.profile.userName}
                          />
                      </ListItem>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <ListItem style={styles.layoutItem}>
                        <Icon
                          type='Ionicons'
                          name='ios-clipboard'
                          ios='ios-clipboard'
                          md='md-clipboard'
                          style={{fontSize: 30, color: 'black', textAlign:'center', width: 60}} />
                        <TextField
                          placeholder='Description'
                          placeholderTextColor={theme.COLOR_PRIMARY_DARK}
                          returnKeyType='next'
                          keyboardType='email-address'
                          autoCapitalize='none'
                          autoCorrect={false}
                          onChangeText={this.onChangeText('userDescription').bind(this)}
                          value={this.state.profile.userDescription}
                        />
                    </ListItem>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <ListItem style={styles.layoutItem}>
                        <Icon
                          type='Ionicons'
                          name='ios-heart'
                          ios='ios-heart'
                          md='md-heart'
                          style={{fontSize: 30, color: 'black', textAlign:'center', width: 60}} />
                        <TextField
                          placeholder='Status'
                          placeholderTextColor={theme.COLOR_PRIMARY_DARK}
                          returnKeyType='next'
                          keyboardType='email-address'
                          autoCapitalize='none'
                          autoCorrect={false}
                          onChangeText={this.onChangeText('userStatus').bind(this)}
                          value={this.state.profile.userStatus}
                        />
                    </ListItem>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <ListItem style={styles.layoutItem}>
                        <Icon
                          type='Ionicons'
                          name='ios-pin'
                          ios='ios-pin'
                          md='md-pin'
                          style={{fontSize: 30, color: 'black', textAlign:'center', width: 60}} />
                        <TextField
                          placeholder='Location'
                          placeholderTextColor={theme.COLOR_PRIMARY_DARK}
                          returnKeyType='next'
                          autoCapitalize='none'
                          autoCorrect={false}
                          onChangeText={this.onChangeText('userCountry').bind(this)}
                          value={this.state.profile.userCountry}
                        />
                    </ListItem>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <ListItem style={styles.layoutItem}>
                        <Icon
                          type='Ionicons'
                          name='ios-calendar'
                          ios='ios-calendar'
                          md='md-calendar'
                          style={{fontSize: 30, color: 'black', textAlign:'center', width: 60}} />
                        <TextField
                          placeholder='Date of Birth'
                          placeholderTextColor={theme.COLOR_PRIMARY_DARK}
                          returnKeyType='next'
                          autoCapitalize='none'
                          autoCorrect={false}
                          onChangeText={this.onChangeText('userDob').bind(this)}
                          value={this.state.profile.userDob}
                        />
                    </ListItem>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <ListItem style={styles.layoutItem}>
                        <Icon
                          type='Ionicons'
                          name='ios-contacts'
                          ios='ios-contacts'
                          md='md-contacts'
                          style={{fontSize: 30, color: 'black', textAlign:'center', width: 60}} />
                        <TextField
                          placeholder='Gender'
                          placeholderTextColor={theme.COLOR_PRIMARY_DARK}
                          returnKeyType='next'
                          autoCapitalize='none'
                          autoCorrect={false}
                          onChangeText={this.onChangeText('userGender').bind(this)}
                          value={this.state.profile.userGender}
                        />
                    </ListItem>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <ListItem style={styles.layoutItem}>
                        <Icon
                          type='Ionicons'
                          name='ios-school'
                          ios='ios-school'
                          md='md-school'
                          style={{fontSize: 30, color: 'black', textAlign:'center', width: 60}} />
                        <TextField
                          placeholder='School'
                          placeholderTextColor={theme.COLOR_PRIMARY_DARK}
                          returnKeyType='next'
                          autoCapitalize='none'
                          autoCorrect={false}
                          onChangeText={this.onChangeText('userSchool').bind(this)}
                          value={this.state.profile.userSchool}
                        />
                    </ListItem>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <ListItem style={styles.layoutItem}>
                        <Icon
                          type='Ionicons'
                          name='ios-book'
                          ios='ios-book'
                          md='md-book'
                          style={{fontSize: 30, color: 'black', textAlign:'center', width: 60}} />
                        <TextField
                          placeholder='Major'
                          placeholderTextColor={theme.COLOR_PRIMARY_DARK}
                          returnKeyType='next'
                          autoCapitalize='none'
                          autoCorrect={false}
                          onChangeText={this.onChangeText('userMajor').bind(this)}
                          value={this.state.profile.userMajor}
                        />
                    </ListItem>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <ListItem style={styles.layoutItem}>
                        <Icon
                          type='Ionicons'
                          name='ios-globe'
                          ios='ios-globe'
                          md='md-globe'
                          style={{fontSize: 30, color: 'black', textAlign:'center', width: 60}} />
                        <TextField
                          placeholder='Language'
                          placeholderTextColor={theme.COLOR_PRIMARY_DARK}
                          returnKeyType='next'
                          autoCapitalize='none'
                          autoCorrect={false}
                          onChangeText={this.onChangeText('userLanguage').bind(this)}
                          value={this.state.profile.userLanguage}
                        />
                    </ListItem>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <ListItem style={styles.layoutItem}>
                        <Icon
                          type='Ionicons'
                          name='ios-globe'
                          ios='ios-globe'
                          md='md-globe'
                          style={{fontSize: 30, color: 'black', textAlign:'center', width: 60}} />
                        <TextField
                          placeholder='Language Interested in Learning'
                          placeholderTextColor={theme.COLOR_PRIMARY_DARK}
                          returnKeyType='next'
                          autoCapitalize='none'
                          autoCorrect={false}
                          onChangeText={this.onChangeText('userLearnLanguage').bind(this)}
                          value={this.state.profile.userLearnLanguage}
                        />
                    </ListItem>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <ListItem style={styles.layoutItem}>
                        <Icon
                          type='Ionicons'
                          name='ios-globe'
                          ios='ios-globe'
                          md='md-globe'
                          style={{fontSize: 30, color: 'black', textAlign:'center', width: 60}} />
                        <TextField
                          placeholder='Profile Image'
                          placeholderTextColor={theme.COLOR_PRIMARY_DARK}
                          returnKeyType='go'
                          autoCapitalize='none'
                          autoCorrect={false}
                          onChangeText={this.onChangeText('userImageUrl').bind(this)}
                          value={this.state.profile.userImageUrl}
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
// export default connect(undefined, { editProfile })(withNavigation(EditProfile));
