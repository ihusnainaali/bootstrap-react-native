import React from 'react';
import { View,Image, ScrollView, FlatList, StyleSheet, SectionList } from 'react-native';
import { Container, Header, Text, Content, Icon, List, ListItem } from 'native-base';
import { withNavigation } from 'react-navigation';
import Button from '../../components/button/button.component';

import styles from './profile.style';

import { CreateProfile, ListProfile, SubscribeToProfile } from '../../utils/graphql_database';
import { API, graphqlOperation } from 'aws-amplify';



// declare a sample user here for testing
const user = [
  {
    key: 'name',
    title: 'Example Person',
    iosicon: 'ios-contact',
    androidicon: 'md-contact',
    color: 'black'
  },
  {
    key: 'description',
    title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    iosicon: 'ios-clipboard',
    androidicon: 'md-clipboard',
    color: '#eeeeee'
  },
  {
    key: 'status',
    title: 'I want Soup Dumplings',
    iosicon: 'ios-heart',
    androidicon: 'md-heart',
    color: 'black'
  },
  {
    key: 'location',
    title: 'Beijing, China',
    iosicon: 'ios-pin',
    androidicon: 'md-person',
    color: 'black'
  },
  {
    key: 'age',
    title: 'January 1, 1900',
    iosicon: 'ios-calendar',
    androidicon: 'md-calendar',
    color: 'black'
  },
  {
    key: 'gender',
    title: 'Male',
    iosicon: 'ios-contacts',
    androidicon: 'md-contacts',
    color: 'black'
  },
  {
    key: 'school',
    title: 'Peking University',
    iosicon: 'ios-school',
    androidicon: 'md-school',
    color: 'black'
  },
  {
    key: 'major',
    title: 'Underwater Basket Weaving',
    iosicon: 'ios-book',
    androidicon: 'md-book',
    color: 'black'
  },
  {
    key: 'language',
    title: 'English',
    iosicon: 'ios-globe',
    androidicon: 'md-globe',
    color: 'black'
  }
]

class Profile extends React.Component {

  state = {
    profile: []
  }

  async componentDidMount() {
    try {
      const profile = await API.graphql(graphqlOperation(ListProfile))
      console.log('My Profile: ', profile)
    } catch (err) {
      console.log('This is the Error: ', err)
    }
  }

  render() {
    return (
      <ScrollView>
        <Container>
          <Content>
            <View style={styles.profileCard}>
              <Icon type="Ionicons" name='ios-contact' ios="ios-contact" md="md-contact" style={{fontSize: 300, color: 'lightgrey', textAlign:'center'}} />
            </View>
            <View style={styles.descriptionCard}>
              <List dataArray={user}
                renderRow={(person) =>
                  <ListItem>
                    <Icon type="Ionicons" name={person.iosicon} ios={person.iosicon} md={person.androidicon} style={{fontSize: 30, color: `${person.color}`, textAlign:'center', width: 40}} />
                    <Text>{person.title}</Text>
                  </ListItem>
                }>
              </List>
            </View>
            <View style={styles.profileBottomGrid}>
                <Button
                    onPress={this.props.navigation.navigate('EditProfile')}
                    name='Edit Profile'
                    screen='editprofile'/>
            </View>
          </Content>
        </Container>
      </ScrollView>
    );
  }
}

export default withNavigation(Profile);
