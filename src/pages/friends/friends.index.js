import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { withNavigation , navigation } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Container, Header , Left, Right, Title, Content, Button , Icon, Body} from 'native-base';

import styles from './friends.style';
import theme from '../../styles/theme.style';

// TODO Add Backend Data Implementation to Populate Data

class Friends extends React.Component {

    // Declare Edit Friend Icon
    static navigationOptions = ({ navigation }) => {

      // TODO Move Edit Friend to Header
      return {
        header: null
      };
    };

  render() {

    return (

      <Container>

        <Header>
          <Left/>
          <Body>
            <Title style={{fontFamily: theme.FONT_LIGHT}}>Friend List</Title>
          </Body>
          <Right>
            <Button transparent>
            // TODO Add Edit Friend Functionality
              <Icon 
                name='person-add'
                type="MaterialIcons"
                style={ {color: theme.COLOR_SECONDARY } } />
            </Button>
          </Right>
        </Header>

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Friends!</Text>
        </View>

      </Container>

    );
  }

}

export default withNavigation(Friends);