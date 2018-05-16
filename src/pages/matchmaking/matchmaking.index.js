import React from 'react';
import { Image } from 'react-native';

import { withNavigation } from 'react-navigation';
import { Container, Button, Header, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Icon } from 'native-base';

import styles from './matchmaking.style';

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
      title: 'Matchmaking',
    };
    
  };

  render() {
    return (
      <Container>
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