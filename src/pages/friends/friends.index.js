import React from 'react';
import { Text, View, Image, TouchableOpacity, AsyncStorage } from 'react-native';
import { withNavigation, navigation } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Thumbnail, Item, List, ListItem, Input, Container, Header, Left, Right, Title, Content, Button, Icon, Body } from 'native-base';
import ChatClientHelper from '../../utils/twilio'

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
        name: 'Chris Jackson',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'New York, New York\n'
    },
]

class Friends extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            chatClientHelper: null,
            friendsChannel: {}
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

    componentWillMount() {
        chatClientHelper = ChatClientHelper.getInstance();
        // chatClientHelper.login('Yuhong');
        this.setState({ chatClientHelper });

        //TODO get friends info and channel info from friends table.
        // and store it into state.friendsChannel.
    }

    // get the channel name for specific friend
    fetchChannelName(friend) {
        return "Test1";
    }

    fetchChannelSID(friend) {
        return this.state.friendsChannel[friend];
    }

    chatWithFriend(friend, avatar) {
        // this.props.navigation.navigate('video');
        // return;
        client = this.state.chatClientHelper.client;
        user = 'Yuhong';
        // client.createChannel({
        //     uniqueName: 'test9'
        // })
        // .then(channel => {
        //     console.log(channel);
        //     // TODO add channel.sid to friends table.
        //     channel.add('yuhong').catch(err => console.log(err));
        //     channel.add('test1').catch(err => console.log(err));
        // })
        // .catch(err => console.log(err));
        // return;

        //TODO: change to getChannelBySid(this.fetchChannelSid(friend));
        client && client.getChannelByUniqueName(this.fetchChannelName(friend))
            .then(channel => {
                if (channel.state.status !== 'joined') {
                    channel.join()
                        .then(channel => channel.getMessages()
                            .then(messages => this.props.navigation.navigate(route.CHAT, { friend, messages, avatar, channel, user }))
                        )
                }
                channel.getMessages()
                    .then(messages => this.props.navigation.navigate(route.CHAT, { friend, messages, avatar, channel, user }));

            })
            .catch(console.log);
    }

    render() {
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

                    <List dataArray={list}

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