
import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { withNavigation , navigation } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Thumbnail, Item, List, ListItem, Input, Container, Header , Left, Right, Title, Content, Button , Icon, Body} from 'native-base';

import styles from './friends.style';
import theme from '../../styles/theme.style';

let items = ['Simon Mignolet','Nathaniel Clyne','Dejan Lovren','Mama Sakho','Emre Can'];

// TODO Add Backend Retrieval
const list = [
  {
    name: 'Amy Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Beijing, China\n'
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'New York, New York\n'
  },
]

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

      <Container style={styles.container}>

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
                style={ styles.icon } />
            </Button>
          </Right>
        </Header>
        
        // TODO Add Search Functionality
        <Item regular style={{paddingLeft:10}}>
          <Icon name="ios-search" 
            style={styles.icon}/>
          <Input placeholder="Search" />
        </Item>
        
        <Content> 

        <List dataArray={list}

          renderRow={(item) =>
            <ListItem avatar onPress={()=>{}}>
            <Left>
              <Thumbnail source={{ uri: item.avatar_url }} />
            </Left>
            <Body>
              <Text style={styles.text_name}>{item.name}</Text>
              <Text style={styles.text_subtitle} note>{item.subtitle}</Text>
            </Body>
            <Right>
            </Right>
          </ListItem>
          }>

        </List>

        </Content>


      </Container>

    );
  }

}

export default withNavigation(Friends);
