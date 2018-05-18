import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { withNavigation, navigation } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { DeckSwiper, Card, CardItem, Thumbnail, Container, Header, Left, Right, Title, Content, Button, Icon, Body } from 'native-base';

import styles from './matchmaking.style';
import theme from '../../styles/theme.style';

import operations from './graphql'

class Matchmaking extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataReady: false,
            cards: [
                // {userId:"placeholder"}
            ],
            counter:0
        };
        this.swipedLeft = this.swipedLeft.bind(this);
        this.swipedRight = this.swipedRight.bind(this);
        this.fetchData = this.fetchData.bind(this);
    }

    componentDidMount() {
        this.fetchData("Chinese")
    }

    componentWillUnmount() {
        console.log("will unmount");
    }

    fetchData(language = "Chinese") {
        operations.GetUsersByLanguage(language, 20, null)
            .then(resp => {
                const data = resp.data[operations.USERS_BY_LANGUAGE_KEY];
                this.setState({
                    cards: this.state.cards.concat(data.items),
                    nextToken: data.nextToken
                });
                console.log("data fetched.")
                this.setState({ dataReady: true });
            })
            .catch(console.log);
    }

    //TODO yes/no button will not triger onSwipe subscription. Need to fix it.
    //TODO refetch data.
    swipedLeft(index) {
        console.log(index);
        console.log("swipe left");
        // console.log(this.state.cards.length - this.state.cards.indexOf(index));
        // if (this.state.cards.length - this.state.cards.indexOf(index) <= 5) {
        //     this.fetchData("Chinese");
        // }
    }
    swipedRight(index) {
        console.log(index);
        console.log("swipe right");
        // console.log(this.state.cards.length - this.state.cards.indexOf(index));
        // if (this.state.cards.length - this.state.cards.indexOf(index) <= 5) {
        //     this.fetchData("Chinese");
        // }
    }


    // Declare Navigation Options Here :|
    static navigationOptions = ({ navigation }) => {

        return {
            header: null
        }

    };

    rendLoading() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent
                            onPress={() => { this.props.navigation.goBack() }}>
                            <Icon
                                name='arrow-back'
                                style={styles.icon} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ fontFamily: theme.FONT_LIGHT }}>Matchmaking</Title>
                    </Body>
                    <Right />
                </Header>
                <Text> Loading... </Text>
            </Container>
        );
    }

    render() {
        console.log("render");
        console.log(this.state.cards);
        const cards = this.state.cards;
        const self = this;

        if (!this.state.dataReady) {
            return this.rendLoading();
        }

        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent
                            onPress={() => { this.props.navigation.goBack() }}>
                            <Icon
                                name='arrow-back'
                                style={styles.icon} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ fontFamily: theme.FONT_LIGHT }}>Matchmaking</Title>
                    </Body>
                    <Right />
                </Header>
                <View>
                    <DeckSwiper
                        ref={(c) => this._deckSwiper = c}
                        onSwipeLeft={(index) => self.swipedLeft(index)}
                        onSwipeRight={(index) => self.swipedRight(index)}
                        dataSource={cards}
                        looping={true}
                        renderItem={item =>
                            <Card style={{ elevation: 3 }}>
                                <CardItem>
                                    <Left>
                                        <Thumbnail source={item.image} />
                                        <Body>
                                            <Text>{item.userId}</Text>
                                            <Text>{item.nativeLanguage}</Text>
                                            <Text>{item.country}</Text>
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
                    <Button iconLeft onPress={() => {this._deckSwiper._root.swipeLeft(); console.log(this._deckSwiper); this.swipedLeft()}}>
                        <Icon name="arrow-back" />
                        <Text>Yes</Text>
                    </Button>
                    <Button iconRight onPress={() => {this._deckSwiper._root.swipeRight(); this.swipedRight()}}>
                        <Text>No</Text>
                        <Icon name="arrow-forward" />
                    </Button>
                </View>
            </Container>
        );
    }
}

export default withNavigation(Matchmaking);