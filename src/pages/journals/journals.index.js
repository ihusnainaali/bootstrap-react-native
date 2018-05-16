import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { withNavigation , navigation } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Container, Header , Left, Right, Title, Content, Button , Icon, Body} from 'native-base';

import styles from './journals.style';
import theme from '../../styles/theme.style';

// TODO Add Backend Data Implementation to Populate Data

class Journals extends React.Component {
  
  // Declare Settings Icon
  static navigationOptions = ({ navigation }) => {

    // TODO Move Journals to Header
    return {
      // title: 'Journals',
      // headerRight: (
      //   <HeaderButtons IconComponent={MaterialIcons} iconSize={23} color={theme.COLOR_PRIMARY_DARK}>
      //   <HeaderButtons.Item 
      //     title='EditJournals'
      //     iconName='book'
      //     onPress={() => { /*TODO Add Edit Journal Functionality*/ }}/>
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
            <Title style={{fontFamily: theme.FONT_LIGHT}}>Journal List</Title>
          </Body>
          <Right>
            <Button transparent>
            // TODO Add Edit Journal List Functionality
              <Icon 
                name='library-add'
                type="MaterialIcons"
                style={ {color: theme.COLOR_SECONDARY} } />
            </Button>
          </Right>
        </Header>

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Journals!</Text>
        </View>
      </Container>

    );
  }

}

export default withNavigation(Journals);