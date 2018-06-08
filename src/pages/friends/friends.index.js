
import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { withNavigation , navigation } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Thumbnail, Item, List, ListItem, Input, Container, Header , Left, Right, Title, Content, Button , Icon, Body} from 'native-base';

import { ListProfile } from './graphql_query';
import { API, graphqlOperation } from 'aws-amplify';

import styles from './friends.style';
import theme from '../../styles/theme.style';


class Friends extends React.Component {

  state = {
    friends: [],
    error: null
  }

  static navigationOptions = ({ navigation }) => {

    return {
      header: null
    };
  };

  async componentDidMount() {
      try {
          const friends = await API.graphql(graphqlOperation(ListProfile))
          this.setState({
            friends: friends.data.listPangyouMobilehub1098576098UserProfiles.items
          })
          console.log(this.state.friends)
      } catch (err) {
          console.log('This is the Error: ', err)
      }
  }

  goToViewProfile = (friend) => {
      this.props.navigation.navigate('Profile', {friend});
  }

  render() {

    const friendsList = this.state.friends.map((friend, i) => {
      return (
        <ListItem style={styles.indexLayoutItem} key={i} button onPress={() => {this.goToViewProfile(friend.userId)}}>
          <Icon type="Ionicons" name='ios-contact' ios='ios-contact' md='md-contact' style={{fontSize: 90, color: 'grey', textAlign:'center', width: 100}} />
          <Text style={{fontSize: 18, color: 'black', textAlign:'left'}}>{friend.userName}</Text>
        </ListItem>
      )
    })

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
            {friendsList}
        </Content>

      </Container>

    );
  };

}

export default withNavigation(Friends);
