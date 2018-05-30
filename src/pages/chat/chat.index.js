import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { withNavigation } from 'react-navigation';
import { AsyncStorage, Text, TouchableOpacity } from 'react-native';

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            friend: props.navigation.getParam('friend'),
            user: props.navigation.getParam('user'),
            history: props.navigation.getParam('messages'),
            channel: props.navigation.getParam('channel'),
            avatar: props.navigation.getParam('avatar'),
            messages: [],
        }
        console.log(this.state);
        this.onSend.bind(this);
        this.parseMessage.bind(this);
        this.setMessages.bind(this);
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
            console.log("got message: ", message);
            if (message.state.author != this.state.user) {
                this.setMessages(this.parseMessage(message));
            }
        });
    }

    componentWillUnmount() {
        console.log("component will unmount.");
        // unsubscribe to messageAdded event when unmounted.
        this.state.channel._events.messageAdded.pop();
    }

    parseMessage(message) {
        this.state.channel.advanceLastConsumedMessageIndex(message.state.index)
            .catch(err => console.log(err));
        return ([{
            _id: message.state.sid,
            text: message.state.body,
            createdAt: message.state.timestamp,
            user: {
                _id: message.state.author === this.state.user ? 1 : 2,
                name: message.state.author,
                avatar: this.state.avatar,
            }
        }]);
    }

    setMessages(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }))
    }

    onSend(messages = []) {
        this.setMessages(messages);
        this.state.channel.sendMessage(messages[0].text);
    }

    render() {
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={messages => this.onSend(messages)}
                user={{
                    _id: 1,
                    name: "Jeff",
                }}
            />
        )
    }
}

export default withNavigation(Chat);