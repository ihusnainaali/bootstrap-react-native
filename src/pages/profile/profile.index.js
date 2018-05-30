import React, {Component} from 'react';
import { View, Image, ScrollView, FlatList, StyleSheet, SectionList } from 'react-native';
import { Container, Header, Text, Content, Icon, List, ListItem } from 'native-base';
import { withNavigation } from 'react-navigation';
import Button from '../../components/button/button.component';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import styles from './profile.style';

import { GetProfile, ListProfile } from './graphql_query';
import { API, graphqlOperation } from 'aws-amplify';

import uuidV4 from 'uuid/v4'

// import Amplify, { Auth } from 'aws-amplify';
// import config from '../../../aws-exports';
// Amplify.configure(config);

class Profile extends Component {

  state = {
    profile: {}
  }

  async componentDidMount() {
    try {
      // const profile = await API.graphql(graphqlOperation(ListProfile))
      const profile = await API.graphql(graphqlOperation(GetProfile, {userId: "test3"}))
      console.log('My Profile: ', profile)
    } catch (err) {
      console.log('This is the Error: ', err)
    }
  }

  createUserProfile() {
    // console.log(this.props.profile);
      // return this.props.profile.map((user) => {
      //   return (
      //     <View style={{flexDirection: 'row'}}>
      //       <Icon type="Ionicons" name='ios-clipboard' ios='ios-clipboard' md='md-clipboard' style={{fontSize: 30, color: black, textAlign:'center', width: 40}} />
      //       <Text key={user.userId}>{user.userName}</Text>
      //     </View>
      //   );
      // });
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
              // {this.createUserProfile()}
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

function mapStateToProps(state) {
    return {
        profile: state.profile
    }
}

export default connect(mapStateToProps)(withNavigation(Profile));
