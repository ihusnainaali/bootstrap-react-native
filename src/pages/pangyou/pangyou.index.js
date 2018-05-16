import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { withNavigation , navigation } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HeaderButtons from 'react-navigation-header-buttons';
import { Container, Header , Left, Right, Title, Content, Button , Icon, Body} from 'native-base';

import { route } from '../../routes/routes.constants';

import styles from './pangyou.style';
import theme from '../../styles/theme.style';

class Pangyou extends React.Component {

  navigateToMatchmaking = () => {
    this.props.navigation.navigate(route.MATCHMAKING)
  }

  navigateToSettings = () => {
    this.props.navigation.navigate(route.SETTINGS)
  }

  // Declare Settings Icon
  static navigationOptions = ({ navigation }) => {

    // TODO Move Settings Gear to Header
    return {
      // title: 'Pangyou',
      // headerRight: (
      //   <HeaderButtons IconComponent={MaterialIcons} iconSize={23} color={theme.COLOR_PRIMARY_DARK}>
      //   <HeaderButtons.Item 
      //     title= 'SettingsRedirect' 
      //     iconName='settings'
      //     onPress={() => { this.navigateToSettings() }}/>
      //   </HeaderButtons>
      // ),
      header: null
    };
  };
  
  render() {

    return (
      
      <Container>

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