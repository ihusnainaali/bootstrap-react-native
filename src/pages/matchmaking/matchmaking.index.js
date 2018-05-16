import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { withNavigation , navigation } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { DeckSwiper, Card, CardItem, Thumbnail, Container, Header , Left, Right, Title, Content, Button , Icon, Body} from 'native-base';

import styles from './matchmaking.style';
import theme from '../../styles/theme.style';

// Load the Possible Matches in this table
const cards = [
  {
    text: 'Card One',
    name: 'One',
  },
  {
    text: 'Card Two',
    name: 'One',
  },
  {
    text: 'Card Three',
    name: 'One',
  },
  {
    text: 'Card Four',
    name: 'One',
  },
  {
    text: 'Card Five',
    name: 'One',
  },
  {
    text: 'Card Six',
    name: 'One',
  },
];

class Matchmaking extends React.Component { 

  // Declare Navigation Options Here :|
  static navigationOptions = ({ navigation }) => {
    
    return { 
      header: null
    }

  };

  render() {
    return (
      <Container>
        
        <Header>
          <Left>
            <Button transparent
              onPress={() => {this.props.navigation.goBack()}}>
              <Icon 
                name='arrow-back'
                style={styles.icon} />
            </Button>
          </Left>
          <Body>
            <Title style={{fontFamily: theme.FONT_LIGHT}}>Matchmaking</Title>
          </Body>
          <Right/>
        </Header>

        <View>
          <DeckSwiper
            dataSource={cards}
            renderItem={item =>
              <Card style={{ elevation: 3 }}>
                <CardItem>
                  <Left>
                    <Thumbnail source={item.image} />
                    <Body>
                      <Text>{item.text}</Text>
                      <Text note>NativeBase</Text>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem cardBody>
                  <Image style={{ height: 400, flex: 1 }} source={item.image} />
                </CardItem>
              </Card>
            }
          />
        </View>
        <View style={{ flexDirection: "row", flex: 1, position: "absolute", bottom: 0, left: 0, right: 0, justifyContent: 'space-between', padding: 15 }}>
          <Button iconLeft onPress={() => this._deckSwiper._root.swipeLeft()}>
            <Icon name="arrow-back" />
            <Text>Yes</Text>
          </Button>
          <Button iconRight onPress={() => this._deckSwiper._root.swipeRight()}>
            <Icon name="arrow-forward" />
            <Text>No</Text>
          </Button>
        </View>
      </Container>
    );
  }
}

export default withNavigation(Matchmaking);