import React from 'react';
import { Text, View, Image, TouchableOpacity, AsyncStorage } from 'react-native';
import { withNavigation , navigation } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Container, Header , Left, Right, Title, Content, Button , Icon, Body} from 'native-base';

import { route } from '../../routes/routes.constants';

import styles from './pangyou.style';
import theme from '../../styles/theme.style';

// import { GetProfile } from '../profile/graphql_query';
// import { API, graphqlOperation } from 'aws-amplify';

class Pangyou extends React.Component {

  // state = {
  //   storeUsername: ''
  // }

  // async componentDidMount() {
  //   console.log('In the componentDidMount');
  //     // Get username from Store
  //     try {
  //       this.storeUsername = await AsyncStorage.getItem('username');
  //       console.log('Store User: ', this.storeUsername)
  //     } catch (err) {
  //       console.log('This is the Store Username Error: ', err)
  //     }
  //     // Get Profile from GraphQL
  //     try {
  //         const profile = await API.graphql(graphqlOperation(GetProfile, {userId: this.storeUsername}))
  //         console.log(profile.data.getPangyouMobilehub1098576098UserProfile)
  //         if (profile.data.getPangyouMobilehub1098576098UserProfile == null) {
  //           alert('You have not setup your profile yet!  Please complete your profile so others can find you.')
  //           this.props.navigation.navigate('AddProfile');
  //         }
  //
  //     } catch (err) {
  //         console.log('This is the Error: ', err)
  //     }
  // }

  navigateToMatchmaking = () => {
    this.props.navigation.navigate(route.MATCHMAKING)
  }

  navigateToSettings = () => {
    this.props.navigation.navigate(route.SETTINGS)
  }

  static navigationOptions = ({ navigation }) => {

    return {
      header: null
    };
  };

  render() {

    return (

      <Container style={styles.wrapper}>

      <Header>
      <Left/>
      <Body>
        <Title style={{fontFamily: theme.FONT_LIGHT}}>Pangyou</Title>
      </Body>
      <Right>
        <Button
          transparent
          onPress={() => {this.navigateToSettings()}}>
          <Icon
            name='settings'
            type="MaterialIcons"
            style={ styles.icon } />
        </Button>
      </Right>
      </Header>

        <View style={styles.avatarGrid}>
          <TouchableOpacity
            onPress={() => { this.navigateToMatchmaking() }}>
		        <Image
			        style={styles.avatar}
			          source={require('../../assets/pangyou_welcome.png')}/>
          </TouchableOpacity>
        </View>

      </Container>
      );
    }
}

export default withNavigation(Pangyou);
