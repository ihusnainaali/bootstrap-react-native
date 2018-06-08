import React from 'react';
import { Text, View, Image, TouchableOpacity, AsyncStorage } from 'react-native';
import { withNavigation, navigation } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Thumbnail, Item, List, ListItem, Input, Container, Header, Left, Right, Title, Content, Button, Icon, Body } from 'native-base';
import ChatClientHelper from '../../utils/twilio';
import operations from '../matchmaking/graphql';

import styles from './friends.style';
import theme from '../../styles/theme.style';

import { route } from '../../routes/routes.constants';
import Example from './example';

let items = ['Simon Mignolet', 'Nathaniel Clyne', 'Dejan Lovren', 'Mama Sakho', 'Emre Can'];

// TODO Add Backend Retrieval
const list = [
    {
        name: 'Amy Farha',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        subtitle: 'Beijing, China\n'
    },
    {
        name: 'test4',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'New York, New York\n'
    },
]

class Friends extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            chatClientHelper: null,
            friendsChannel: {},
            friends: [],
            user: null,
        };
        this.flag = true;
    }

    // Declare Edit Friend Icon
    static navigationOptions = ({ navigation }) => {

        // TODO Move Edit Friend to Header
        return {
            header: null
        };
    };

    async componentDidMount() {
        chatClientHelper = ChatClientHelper.getInstance();
        this.setState({ chatClientHelper });

        const user = await AsyncStorage.getItem('username');

        // get all channel sids and store them in state.
        friendsChannel = {};
        friendIds = [];
        const listFriendsResp = await operations.ListFriends(user);
        listFriendsResp.data[operations.LIST_FRIENDS_KEY].items.forEach(friend => {
            channelSid = friend.channelSid;
            friendId = friend.friendId;
            if (channelSid && channelSid !== "") {
                friendsChannel[friendId] = channelSid;
                friendIds.push(friendId);
            }
        });

        // get friends info.
        friends = [];
        const batchGetUserProfilesResp = await operations.BatchGetUserProfiles(friendIds);
        batchGetUserProfilesResp.data[operations.BATCH_GET_PROFILES_KEY].forEach(friendProfile => {
            friends.push({
                name: friendProfile.userId,
                avatar_url: friendProfile.userImageUrl,
                subtitle: friendProfile.userStatus
            });
        });
        this.setState({ user, friendsChannel, friends });
        
        // subscribe to new friends
        operations.SubFriends(user).subscribe({
            next: async (eventData) => {
                friend = eventData.value.data[operations.SUB_FRIENDS_KEY];
                channelSid = friend.channelSid;
                friendId = friend.friendId;
                if (friend.channelSid) {
                    const getUserProfileResp = await operations.GetUserProfile(friendId);
                    const friendProfile = getUserProfileResp.data[operations.GET_PROFILE_KEY];
                    this.setState(previousState => {
                        friends = previousState.friends;
                        friendsChannel = previousState.friendsChannel;
                        friends.push({
                            name: friendProfile.userId,
                            avatar_url: friendProfile.userImageUrl,
                            subtitle: friendProfile.userStatus
                        })
                        friendsChannel[friendId] = channelSid;
                        return ({friends, friendsChannel});
                    });
                }
            }
        })

        this._sub = this.props.navigation.addListener(
            'didFocus',
            () => {
                console.log("didFocus");
                this.setState({friends: this.state.friends});
            }
        );
    }

    componentWillUnmount() {
        this._sub.remove();
    }

    // get the channel name for specific friend
    fetchChannelName(friend) {
        // const resp = await operations.GetFriend(this.state.user, friend);
        // return resp.data[operations.GET_FRIENDS_KEY];
        return "Test1"
    }

    fetchChannelSID(friend) {
        console.log(friend, this.state.friendsChannel[friend]);
        return this.state.friendsChannel[friend];
    }

    chatWithFriend(friend, avatar) {
        client = this.state.chatClientHelper.client;
        user = this.state.user;
        client && client.getChannelBySid(this.fetchChannelSID(friend))
            .then(channel => {
                if (channel.state.status !== 'joined') {
                    channel.join()
                        .then(channel => {
                            channel.getMessages()
                                .then(messages => this.props.navigation.navigate(route.CHAT, { user, friend, messages, avatar, channel, user }))
                        })
                }
                channel.getMessages()
                    .then(messages => this.props.navigation.navigate(route.CHAT, { user, friend, messages, avatar, channel, user }));

            })
            .catch(console.log);
    }

    render() {
        console.log("render: ", this.state);
        console.log("friends: ", this.state.friends);
        return (
            <Container style={styles.container}>
                <Header>
                    <Left />
                    <Body>
                        <Title style={{ fontFamily: theme.FONT_LIGHT }}>Friend List</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            // TODO Add Edit Friend Functionality
                            <Icon
                                name='person-add'
                                type="MaterialIcons"
                                style={styles.icon} />
                        </Button>
                    </Right>
                </Header>

                // TODO Add Search Functionality
                <Item regular style={{ paddingLeft: 10 }}>
                    <Icon name="ios-search"
                        style={styles.icon} />
                    <Input placeholder="Search" />
                </Item>

                <Content>
                    <List dataArray={this.state.friends}
                        renderRow={(item) =>
                            <ListItem avatar onPress={() => { this.chatWithFriend(item.name, item.avatar_url); }}>
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