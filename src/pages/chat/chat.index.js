import React from 'react';
import { GiftedChat, Send, Actions } from 'react-native-gifted-chat';
import { withNavigation } from 'react-navigation';
import { AsyncStorage, Text, TouchableOpacity, View } from 'react-native';
import { Button, Icon, Title } from 'native-base';

import { styles } from './chat.style';
import theme from '../../styles/theme.style';

import uuidv4 from 'uuid/v4';
import operations from '../matchmaking/graphql';
import { route } from '../../routes/routes.constants';

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            friendId: props.navigation.getParam('friendId'),
            friendName: props.navigation.getParam('friendName'),
            user: props.navigation.getParam('user'),
            history: props.navigation.getParam('messages'),
            channel: props.navigation.getParam('channel'),
            avatar: props.navigation.getParam('avatar'),
            messages: [],
            text: "",
        }
        console.log(this.props);
        this.onSend.bind(this);
        this.parseMessage.bind(this);
        this.setMessages.bind(this);
        this.renderCustomActions.bind(this);
        this.navigateToProfile.bind(this);
    }

    // TODO change hardcode profile to nav const.
    static navigationOptions = ({ navigation }) => ({
        headerRight:
            <Button transparent
                onPress={() => navigation.navigate(route.PROFILEFRIEND, { userId: navigation.getParam('friendId') })}>
                <Icon
                    name='person'
                    type="MaterialIcons"
                    style={styles.icon} />
            </Button>
        ,
        headerTitle: <Title style={{ fontFamily: theme.FONT_LIGHT }}>{navigation.getParam('friendName')}</Title>,
        headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
        headerStyle: {
            backgroundColor: 'white',
        },
    });

    navigateToProfile() {
        this.props.navigation.navigate(route.PROFILEFRIEND, { userId: this.state.friend });
    }

    componentDidMount() {
        messages = [];
        this.state.history.items.forEach(item => {
            this.setMessages(this.parseMessage(item));
        });

        // TODO : Add load earlier button by calling prevPage function.
        // if (this.state.history.hasPrevPage) {
        //     try {
        //         this.state.history.prevPage()
        //             .then(console.log);
        //     } catch (error) {
        //         console.log(error);
        //     }
        // }

        this.state.channel.getUnconsumedMessagesCount()
            .then(count => console.log("unconsumed messages count: ", count));

        this.state.channel.on('messageAdded', (message) => {
            if (message.state.author != this.state.user) {
                this.setMessages(this.parseMessage(message));
            }
        });
    }

    componentWillUnmount() {
        // unsubscribe to messageAdded event when unmounted.
        this.state.channel._events.messageAdded.pop();
    }

    parseMessage(message) {
        this.state.channel.advanceLastConsumedMessageIndex(message.state.index)
            .catch(err => console.log(err));
        var user = {};
        if (message.state.author !== this.state.user) {
            user._id = 1;
        }
        user.user = message.state.author;
        user.avatar = this.state.avatar;
        return ([{
            _id: message.state.sid,
            text: message.state.body,
            createdAt: message.state.timestamp,
            user: user
        }]);
    }

    setMessages(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }))
    }

    onSend(messages = []) {
        console.log(messages);
        this.setMessages(messages);
        this.state.channel.sendMessage(messages[0].text);
    }

    renderCustomActions(props) {
        const options = {
            'Video Chat': (props) => {
                status = 'calling';
                roomName = uuidv4();
                userId = props.userId;
                friendId = props.friendId;
                // notify the friend to join the call.
                console.log(friendId, userId);
                operations.UpdateVideoChannel(friendId, userId, roomName);
                props.navigation.navigate(route.VIDEO, { userId, friendId, status, roomName });
            },
            'Cancel': () => { },
        };
        return (
            <Actions
                {...props}
                options={options}
            />
        );
    }

    render() {
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={messages => this.onSend(messages)}
                onInputTextChanged={text => this.setState({ text })}
                onPressAvatar={() => this.navigateToProfile()}
                user={{
                    _id: 1,
                    name: this.state.user,
                }}
                renderActions={this.renderCustomActions}
                navigation={this.props.navigation}
                friendId={ this.state.friendId }
                userId={ this.state.user }
            />
        )
    }
}

export default withNavigation(Chat);
