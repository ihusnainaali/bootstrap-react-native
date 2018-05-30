import { Client as TwilioChatClient } from "twilio-chat";
import { AccessManager as TwilioAccessManager } from "twilio-common";
import { AsyncStorage } from "react-native";

export default class ChatClientHelper {
    static instance = null;
    host = null;
    client = null;
    accessManager = null;

    constructor(tokenAndConfigurationProviderHost = "http://localhost:3002") {
        this.host = tokenAndConfigurationProviderHost;
        this.client = null;
        this.accessManager = null;
        console.log("new instance has been created.");
    }

    static getInstance() {
        if (this.instance === null) {
            this.instance = new ChatClientHelper();
        }
        return this.instance;
    }

    createClient(token) {
        TwilioChatClient.create(token)
            .then((chatClient) => {
                chatClientHelperInstance.client = chatClient;
                chatClientHelperInstance.accessManager = new TwilioAccessManager(token);
                chatClientHelperInstance.accessManager.on('tokenUpdated', am => chatClientHelperInstance.client.updateToken(am.token));
                chatClientHelperInstance.accessManager.on('tokenExpired', () =>
                chatClientHelperInstance.getToken(identity)
                        .then(newData => that.accessManager.updateToken(newData)));
                        chatClientHelperInstance.subscribeToAllAccessManagerEvents();
                chatClientHelperInstance.subscribeToAllChatClientEvents();
            })
            .catch(err => {
                console.log('login', 'can\'t create client', err);
            });
    }

    login(identity) {
        this.getToken(identity)
            .then(token => {
                console.log('ChatClientHelper', 'got chat token', token);
                chatClientHelperInstance.createClient(token);
            })
            .catch((err) => {
                console.log('login', 'can\'t get token', err);
            });
    };

    getToken(identity) {
        return fetch(`${this.host}/token?identity=${identity}`)
            .then(response => {
                return response.text();
            });
    }

    subscribeToAllAccessManagerEvents() {
        this.accessManager.on('tokenUpdated', obj => console.log('ChatClientHelper.accessManager', 'tokenUpdated', obj));
        this.accessManager.on('tokenExpired', obj => console.log('ChatClientHelper.accessManager', 'tokenExpired', obj));
    }

    subscribeToAllChatClientEvents() {
        this.client.on('userSubscribed', obj => console.log('ChatClientHelper.client', 'userSubscribed', obj));
        this.client.on('userUpdated', obj => console.log('ChatClientHelper.client', 'userUpdated', obj));
        this.client.on('userUnsubscribed', obj => console.log('ChatClientHelper.client', 'userUnsubscribed', obj));
        this.client.on('channelAdded', obj => console.log('ChatClientHelper.client', 'channelAdded', obj));
        this.client.on('channelRemoved', obj => console.log('ChatClientHelper.client', 'channelRemoved', obj));
        this.client.on('channelInvited', obj => console.log('ChatClientHelper.client', 'channelInvited', obj));
        this.client.on('channelJoined', obj => console.log('ChatClientHelper.client', 'channelJoined', obj));
        this.client.on('channelLeft', obj => console.log('ChatClientHelper.client', 'channelLeft', obj));
        this.client.on('channelUpdated', obj => console.log('ChatClientHelper.client', 'channelUpdated', obj));
        this.client.on('memberJoined', obj => console.log('ChatClientHelper.client', 'memberJoined', obj));
        this.client.on('memberLeft', obj => console.log('ChatClientHelper.client', 'memberLeft', obj));
        this.client.on('memberUpdated', obj => console.log('ChatClientHelper.client', 'memberUpdated', obj));
        this.client.on('messageAdded', obj => console.log('ChatClientHelper.client', 'messageAdded', obj));
        this.client.on('messageUpdated', obj => console.log('ChatClientHelper.client', 'messageUpdated', obj));
        this.client.on('messageRemoved', obj => console.log('ChatClientHelper.client', 'messageRemoved', obj));
        this.client.on('typingStarted', obj => console.log('ChatClientHelper.client', 'typingStarted', obj));
        this.client.on('typingEnded', obj => console.log('ChatClientHelper.client', 'typingEnded', obj));
        this.client.on('connectionStateChanged', obj => console.log('ChatClientHelper.client', 'connectionStateChanged', obj));
        this.client.on('pushNotification', obj => console.log('ChatClientHelper.client', 'onPushNotification', obj));
    };
};

const chatClientHelperInstance = ChatClientHelper.getInstance();