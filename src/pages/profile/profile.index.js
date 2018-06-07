import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  AsyncStorage
} from 'react-native';
import { Container, Header, Left, Right, Title, Body, Button, Text, Content, Icon, List, ListItem } from 'native-base';
import { withNavigation, navigation } from 'react-navigation';

import { connect } from 'react-redux';

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
    profile: {},
    newData: 0,
    storeUsername: '',
    error: null
  }

  updateScreen = () => {
    this.setState({ newData: Math.random() });
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
              if ({ this.state.profile.userImageUrl }) {
                <Image
                  style={{width: 300, borderRadius: 150, height: 300}}
                  source={{uri: this.state.profile.userImageUrl}}
                />
              } else {
                  <Icon type="Ionicons" name='ios-contact' ios="ios-contact" md="md-contact" style={{fontSize: 300, color: 'white', textAlign:'center'}} />
              }
            </View>
            <View style={styles.indexDescriptionCard}>
                <View style={{flexDirection: 'row'}}>
                    <ListItem style={styles.indexLayoutItem}>
                        <Icon type="Ionicons" name='ios-contact' ios='ios-contact' md='md-contact' style={{fontSize: 30, color: 'grey', textAlign:'center', width: 60}} />
                        <Text style={{fontSize: 18, color: 'black', textAlign:'left'}}>{this.state.profile.userName}</Text>
                    </ListItem>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <ListItem style={styles.indexLayoutItem}>
                        <Icon type="Ionicons" name='ios-clipboard' ios='ios-clipboard' md='md-clipboard' style={{fontSize: 30, color: 'grey', textAlign:'center', width: 60}} />
                        <Text style={{fontSize: 18, color: 'black', textAlign:'left'}}>{this.state.profile.userDescription}</Text>
                    </ListItem>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <ListItem style={styles.indexLayoutItem}>
                        <Icon type="Ionicons" name='ios-heart' ios='ios-heart' md='md-heart' style={{fontSize: 30, color: 'grey', textAlign:'center', width: 60}} />
                        <Text style={{fontSize: 18, color: 'black', textAlign:'left'}}>{this.state.profile.userStatus}</Text>
                    </ListItem>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <ListItem style={styles.indexLayoutItem}>
                        <Icon type="Ionicons" name='ios-pin' ios='ios-pin' md='md-pin' style={{fontSize: 30, color: 'grey', textAlign:'center', width: 60}} />
                        <Text style={{fontSize: 18, color: 'black', textAlign:'left'}}>{this.state.profile.userCountry}</Text>
                    </ListItem>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <ListItem style={styles.indexLayoutItem}>
                        <Icon type="Ionicons" name='ios-calendar' ios='ios-calendar' md='md-calendar' style={{fontSize: 30, color: 'grey', textAlign:'center', width: 60}} />
                        <Text style={{fontSize: 18, color: 'black', textAlign:'left'}}>{this.state.profile.userDob}</Text>
                    </ListItem>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <ListItem style={styles.indexLayoutItem}>
                        <Icon type="Ionicons" name='ios-contacts' ios='ios-contacts' md='md-contacts' style={{fontSize: 30, color: 'grey', textAlign:'center', width: 60}} />
                        <Text style={{fontSize: 18, color: 'black', textAlign:'left'}}>{this.state.profile.userGender}</Text>
                    </ListItem>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <ListItem style={styles.indexLayoutItem}>
                        <Icon type="Ionicons" name='ios-school' ios='ios-school' md='md-school' style={{fontSize: 30, color: 'grey', textAlign:'center', width: 60}} />
                        <Text style={{fontSize: 18, color: 'black', textAlign:'left'}}>{this.state.profile.userSchool}</Text>
                    </ListItem>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <ListItem style={styles.indexLayoutItem}>
                        <Icon type="Ionicons" name='ios-book' ios='ios-book' md='md-book' style={{fontSize: 30, color: 'grey', textAlign:'center', width: 60}} />
                        <Text style={{fontSize: 18, color: 'black', textAlign:'left'}}>{this.state.profile.userMajor}</Text>
                    </ListItem>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <ListItem style={styles.indexLayoutItem}>
                        <Icon type="Ionicons" name='ios-globe' ios='ios-globe' md='md-globe' style={{fontSize: 30, color: 'grey', textAlign:'center', width: 60}} />
                        <Text style={{fontSize: 18, color: 'black', textAlign:'left'}}>{this.state.profile.userLanguage}</Text>
                    </ListItem>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <ListItem style={styles.indexLayoutItem}>
                        <Icon type="Ionicons" name='ios-globe' ios='ios-globe' md='md-globe' style={{fontSize: 30, color: 'grey', textAlign:'center', width: 60}} />
                        <Text style={{fontSize: 18, color: 'black', textAlign:'left'}}>{this.state.profile.userLearnLanguage}</Text>
                    </ListItem>
                </View>
                <View style={styles.indexProfileBottomGrid}>
                  <Text>&nbsp;</Text>
                </View>
            </View>
          </Content>
        </Container>
      </ScrollView>
    );
  }
}

// export default withNavigation(Profile);

function mapStateToProps(store) {
    return {
        username: store.auth.username
    }
}

export default connect(mapStateToProps)(withNavigation(Profile));
