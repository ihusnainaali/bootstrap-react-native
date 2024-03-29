import React from 'react';
import { Text, View, FlatList, SectionList, AsyncStorage } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Item, List, ListItem, Input, Container, Header, Left, Right, Title, Content, Button, Icon, Body } from 'native-base';
import ChatClientHelper from '../../utils/twilio';
import operations from '../matchmaking/graphql';
import FastImage from 'react-native-fast-image';
import { connect } from 'react-redux';

import styles from './friends.style';
import theme from '../../styles/theme.style';

import { route } from '../../routes/routes.constants';

class Friends extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            chatClientHelper: null,
            friendsChannel: this.props.friendsChannel,
            friends: this.props.friends,
            search: "",
            user: this.props.username,
        };
        this.flag = true;
        this.updateFriends.bind(this);
    }

    // Declare Edit Friend Icon
    static navigationOptions = ({ navigation }) => {

        // TODO Move Edit Friend to Header
        return {
            header: null
        };
    };

    async componentWillMount() {
        chatClientHelper = ChatClientHelper.getInstance();
        this.setState({ chatClientHelper });

        const user = this.state.user;

        // get all channel sids and store them in state.
        const friendsChannel = {};
        const friendIds = [];
        const listFriendsResp = await operations.ListFriends(user);
        listFriendsResp.data[operations.LIST_FRIENDS_KEY].items.forEach(friend => {
            channelSid = friend.channelSid;
            friendId = friend.friendId;
            if (channelSid && channelSid !== "") {
                friendsChannel[friendId] = channelSid;
                friendIds.push(friendId);
            }
        });

        if (friendIds.length > 0) {
            // get friends info.
            friends = [];
            const batchGetUserProfilesResp = await operations.BatchGetUserProfiles(friendIds);
            batchGetUserProfilesResp.data[operations.BATCH_GET_PROFILES_KEY].forEach(friendProfile => {
                friends.push({
                    userId: friendProfile.userId,
                    userName: friendProfile.userName,
                    userImageUrl: friendProfile.userImageUrl,
                    subtitle: friendProfile.userStatus
                });
            });
            this.setState({ user, friendsChannel, friends });
            // store friends list to local storage.
            AsyncStorage.setItem("friendList", JSON.stringify({ friendsChannel: friendsChannel, friends: friends }));
        }

        // subscribe to new friends
        operations.SubFriends(user).subscribe({
            next: async (eventData) => {
                friend = eventData.value.data[operations.SUB_FRIENDS_KEY];
                this.updateFriends(friend);
            }
        })

        this._sub = this.props.navigation.addListener(
            'didFocus',
            () => {
                console.log("didFocus");
                this.forceUpdate();
            }
        );
    }

    componentWillUnmount() {
        this._sub.remove();
    }

    async updateFriends(friend) {
        channelSid = friend.channelSid;
        friendId = friend.friendId;
        if (friend.channelSid) {
            const getUserProfileResp = await operations.GetUserProfile(friendId);
            const friendProfile = getUserProfileResp.data[operations.GET_PROFILE_KEY];
            this.setState(previousState => {
                friends = previousState.friends;
                friendsChannel = previousState.friendsChannel;
                friendProfile && friends.push({
                    userId: friendProfile.userId,
                    userName: friendProfile.userName,
                    userImageUrl: friendProfile.userImageUrl,
                    subtitle: friendProfile.userStatus
                })
                friendsChannel[friendId] = channelSid;
                return ({ friends, friendsChannel });
            });
        }
    }

    fetchChannelSID(friendId) {
        console.log(friendId, this.state.friendsChannel[friendId]);
        return this.state.friendsChannel[friendId];
    }

    chatWithFriend(friend) {
        client = this.state.chatClientHelper.client;
        user = this.state.user;
        friendId = friend.userId;
        friendName = friend.userName;
        friendAvatar = friend.userImageUrl;
        client && client.getChannelBySid(this.fetchChannelSID(friendId))
            .then(channel => {
                if (channel.state.status !== 'joined') {
                    channel.join()
                        .then(channel => {
                            channel.getMessages()
                                .then(messages => this.props.navigation.navigate(route.CHAT, { user, friendId, friendName, messages, friendAvatar, channel, user }))
                        })
                }
                channel.getMessages()
                    .then(messages => this.props.navigation.navigate(route.CHAT, { user, friendId, friendName, messages, friendAvatar, channel, user }));
            })
            .catch(console.log);
    }

    // For List View
    formatData(data) {
        if (!data) {
            return [];
        }
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        var formatedData = [];

        // Alphabetical 
        for (let sectionId = 0; sectionId < alphabet.length; sectionId++) {
            const currentChar = alphabet[sectionId];
            const users = data.filter((user) => user.userName && user.userName.charAt(0).toUpperCase() === currentChar);
            if (users.length > 0) {
                formatedData.push({ data: users, key: currentChar });
            }
        }

        // #
        const regex = /^[a-zA-z]+$/;
        const users = data.filter((user) => user.userName && !regex.test(user.userName.charAt(0)));
        if (users.length > 0) {
            formatedData.push({ data: users, key: '#' });
        }

        return formatedData;
    }

    filterFriends(friends, searchStr) {
        if (!friends) {
            return [];
        }
        return friends.filter(item => item.userName && item.userName.toUpperCase().includes(searchStr.toUpperCase()));
    }

    renderItem({ item }) {
        return (
            <ListItem avatar onPress={() => { this.chatWithFriend(item); }}>
                <Left>
                    <FastImage style={styles.photo} source={{ uri: item.userImageUrl }} />
                </Left>
                <Body>
                    <Text style={styles.text_name}>{item.userName}</Text>
                    <Text style={styles.text_subtitle} note>{item.subtitle}</Text>
                </Body>
                <Right>
                </Right>
            </ListItem>
        );
    }

    renderSectionHeader({ section }) {
        return (
            <View style={styles.sectionHeader}>
                <Text style={styles.text}>{section.key}</Text>
            </View>
        );
    }

    render() {
        const friends = this.state.friends;
        const search = this.state.search;
        const data = search ? this.filterFriends(friends, search) : this.formatData(friends);

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

                <Item regular style={{ paddingLeft: 10 }}>
                    <Icon name="ios-search"
                        style={styles.icon} />
                    <Input
                        placeholder="Search"
                        onChangeText={search => this.setState({ search })} />
                </Item>

                <Content>
                    <List>
                        {this.state.search ?
                            <FlatList
                                data={data}
                                keyExtractor={item => item.userId}
                                renderItem={this.renderItem.bind(this)}
                            />
                            :
                            <SectionList
                                keyExtractor={item => item.userId}
                                renderItem={this.renderItem.bind(this)}
                                renderSectionHeader={this.renderSectionHeader}
                                sections={data}
                            />
                        }
                    </List>
                </Content>
            </Container>

        );
    }

}

const mapStateToProps = (state) => {
    return ({
        username: state.auth.username,
        friends: state.friends.friends,
        friendsChannel: state.friends.friendsChannel
    });
}

export default connect(mapStateToProps)(withNavigation(Friends));