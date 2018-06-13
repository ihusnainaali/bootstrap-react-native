import React from 'react';
import { Text, View, Image, TouchableOpacity, AsyncStorage, Dimensions } from 'react-native';
import { withNavigation, navigation } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { DeckSwiper, Card, CardItem, Thumbnail, Container, Header, Left, Right, Title, Content, Button, Icon, Body } from 'native-base';
import Loader from '../../components/loader/loader.component'
import uuidv4 from 'uuid/v4';
import { Player, Recorder, MediaStates } from 'react-native-audio-toolkit';

import styles from './matchmaking.style';
import theme from '../../styles/theme.style';

import Moment from 'moment';

import operations from './graphql'
import ChatClientHelper from '../../utils/twilio';

class Matchmaking extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataReady: false,
            userGender: '',
            cards: [
            ],
            curIndex: 0,
            user: this.props.navigation.getParam('user')
        };
        this.swipedLeft = this.swipedLeft.bind(this);
        this.swipedRight = this.swipedRight.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.renderHeader = this.renderHeader.bind(this);
        this.renderLoading = this.renderLoading.bind(this);
        this.renderDeckSwiper = this.renderDeckSwiper.bind(this);
    }

    async componentDidMount() {
        // operations.CreateFriend("RN1", "RN2", "oops").then(resp => console.log(resp)).catch(err => console.log(err));
        // operations.UpdateFriend("RN1", "RN2", "CHid").then(resp => console.log(resp)).catch(err => console.log(err));
        const user = await AsyncStorage.getItem("username");
        const fetchData = this.fetchData;
        this.setState({ user });
        operations.GetUserProfile(user)
            .then(resp => {
                console.log(resp);
                userLearnLanguage = resp.data[operations.GET_PROFILE_KEY].userLearnLanguage;
                userLearnLanguage = "English";
                fetchData(userLearnLanguage);
            })
    }

    fetchData(language = "Chinese") {
        operations.GetUsersByLanguage(language, 20, null)
            .then(resp => {
                const data = resp.data[operations.USERS_BY_LANGUAGE_KEY];
                this.setState({
                    cards: this.state.cards.concat(data.items),
                    nextToken: data.nextToken
                });
                this.setState({ dataReady: true });
                console.log('This is the RESP: ', resp)
            })
            .catch((err) => { console.log(err); this.props.navigation.goBack(); });
    }

    //TODO refetch data.
    swipedLeft(index) {
        this.setState(prevState => ({ curIndex: prevState.curIndex + 1 }));
    }

    swipedRight(index) {
        card = this.state.cards[this.state.curIndex];
        this.setState(prevState => ({ curIndex: prevState.curIndex + 1 }));
        friendId = card.userId;
        userId = this.state.user;
        console.log(userId, friendId);
        operations.CreateFriend(userId, friendId)
            .then(resp => {
                data = resp.data[operations.CREATE_FRIENDS_KEY];
                operations.GetFriend(friendId, userId)
                    .then(resp => {
                        data = resp.data[operations.GET_FRIENDS_KEY];
                        if (data) {
                            chatClientHelper = ChatClientHelper.getInstance();
                            chatClientHelper.client.createChannel({
                                uniqueName: uuidv4()
                            })
                                .then(channel => {
                                    //Update the channel sid to friends table.
                                    operations.UpdateFriend(userId, friendId, channel.sid).catch(err => console.log(err));
                                    operations.UpdateFriend(friendId, userId, channel.sid).catch(err => console.log(err));
                                    //Add both users to this channel
                                    channel.add(userId).catch(err => console.log(err));
                                    channel.add(friendId).catch(err => console.log(err));
                                })
                                .catch(err => console.log(err));
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
            .catch(err => console.log(err));
    }


    // Declare Navigation Options Here :|
    static navigationOptions = ({ navigation }) => {

        return {
            header: null
        }

    };

    renderHeader() {
        return (
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
        );
    }

    renderEmpty() {
        return (
            <Container>
                <View style={styles.empty}>
                    <Text>Please try again later!</Text>
                </View>
            </Container>
        )
    }

    renderDeckSwiper() {
        const maleGender = <Icon type="Ionicons" name='ios-man' ios='ios-man' md='md-man' style={{ fontSize: 20, color: 'grey', textAlign: 'center' }} />;
        const femaleGender = <Icon type="Ionicons" name='ios-woman' ios='ios-woman' md='md-woman' style={{ fontSize: 20, color: 'grey', textAlign: 'center' }} />;

        return (
            <Container>
                <View>
                    <DeckSwiper
                        ref={(c) => this._deckSwiper = c}
                        onSwipeLeft={(index) => this.swipedLeft(index)}
                        onSwipeRight={(index) => this.swipedRight(index)}
                        dataSource={this.state.cards}
                        looping={false}
                        renderItem={item =>

                            <Card style={{ elevation: 3, width: 340, height: 500, alignSelf: 'center' }}>
                                <CardItem>
                                    <Left>
                                        <Icon name="heart" style={{ color: '#ED4A6A' }} /><Text style={styles.topText}> {item.userName}</Text>
                                    </Left>
                                </CardItem>
                                <CardItem cardBody style={{ justifyContent: 'center' }}>
                                    <Image style={{ width: 240, borderRadius: 120, height: 240, justifyContent: 'center' }} source={{ uri: item.userImageUrl }} />
                                </CardItem>
                                <CardItem style={{ justifyContent: 'flex-start', marginBottom: -5 }}>
                                    {(item.userGender == 'Male') ? maleGender : femaleGender}
                                    <Text style={{ fontSize: 14, color: 'black', textAlign: 'center' }}>{item.userGender}</Text>
                                </CardItem>
                                <CardItem style={{ justifyContent: 'flex-start', marginBottom: -5 }}>
                                    <Icon type="Ionicons" name='ios-calendar' ios='ios-calendar' md='md-calendar' style={{ fontSize: 20, color: 'grey', textAlign: 'center' }} />
                                    <Text style={{ fontSize: 14, color: 'black', textAlign: 'center' }}>
                                        {Moment(item.userDob).format("MMM D, YYYY")}
                                    </Text>
                                </CardItem>
                                <CardItem style={{ justifyContent: 'flex-start', marginBottom: -5 }}>
                                    <Icon type="Ionicons" name='ios-school' ios='ios-school' md='md-school' style={{ fontSize: 20, color: 'grey', textAlign: 'center' }} />
                                    <Text style={{ fontSize: 14, color: 'black', textAlign: 'center' }}>{item.userSchool}</Text>
                                </CardItem>
                                <CardItem style={{ justifyContent: 'flex-start', marginBottom: -5 }}>
                                    <Icon type="Ionicons" name='ios-globe' ios='ios-globe' md='md-globe' style={{ fontSize: 20, color: 'grey', textAlign: 'center' }} />
                                    <Text style={{ fontSize: 14, color: 'black', textAlign: 'center' }}>Spoken Language: {item.userLanguage}</Text>
                                </CardItem>
                                <CardItem style={{ justifyContent: 'flex-start', marginBottom: -5 }}>
                                    <Icon type="Ionicons" name='ios-globe' ios='ios-globe' md='md-globe' style={{ fontSize: 20, color: 'grey', textAlign: 'center' }} />
                                    <Text style={{ fontSize: 14, color: 'black', textAlign: 'center' }}>Desired Language: {item.userLearnLanguage}</Text>
                                </CardItem>
                            </Card>
                        }
                    />
                </View>
            </Container>

        );
    }

    renderLoading() {
        return (
            <Container>
                {this.renderHeader()}
                <Loader />
            </Container>
        );
    }

    render() {
        console.log("render");
        console.log(this.state.cards);
        console.log(this.state.curIndex);

        if (!this.state.dataReady) {
            return this.renderLoading();
        }

        const empty = this.state.curIndex >= this.state.cards.length;

        return (
            <Container>
                {this.renderHeader()}
                {this.renderDeckSwiper()}
                {empty ?
                    <View style={styles.empty}>
                        <Text>Please try again later!</Text>
                    </View>
                    :
                    <View style={{ flexDirection: "row", flex: 1, position: "absolute", bottom: 0, left: 0, right: 0, justifyContent: 'space-between', padding: 15 }}>
                        <Button iconLeft onPress={() => { this._deckSwiper._root.swipeLeft(); this.swipedLeft() }}>
                            <Icon name="arrow-back" /><Text style={{ color: 'white', marginLeft: 10, width: 30 }}>No</Text>
                        </Button>
                        <Button iconRight onPress={() => { this._deckSwiper._root.swipeRight(); this.swipedRight() }}>
                            <Text style={{ color: 'white', marginLeft: 10, width: 30 }}>Yes</Text><Icon name="arrow-forward" />
                        </Button>
                    </View>
                }
            </Container>
        );
    }
}

export default withNavigation(Matchmaking);
