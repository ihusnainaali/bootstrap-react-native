import React from 'react';
import { Text } from 'react-native';
import { withNavigation } from 'react-navigation';
import { List, ListItem, Item, Input, Container, Header , Left, Right, Title, Content, Button , Icon, Body} from 'native-base';

import styles from './journals.style';
import theme from '../../styles/theme.style';

class Journals extends React.Component {
  
  // Declare Settings Icon
  static navigationOptions = ({ navigation }) => {

    return {
      header: null
    };

  };

  render() {

    return (

      <Container style={{backgroundColor: theme.COLOR_PRIMARY}}>

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
        
       <List dataArray={list}

          renderRow={(item) =>
            <ListItem avatar onPress={()=>{}}>
            <Left>
              <Icon name="book" style={styles.icon} />
            </Left>
            <Body>
              <Text style={styles.text_name}>{item.name}</Text>
              <Text note style={styles.text_subtitle}>{item.date}</Text>
            </Body>
            <Right>
              <Icon name="arrow-forward" style={styles.icon} />
            </Right>
          </ListItem>
          }>

        </List>

      </Container>

    );
  }

}

export default withNavigation(Journals);