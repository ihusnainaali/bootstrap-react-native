import React, { Component } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, AsyncStorage } from 'react-native';
import { withNavigation } from 'react-navigation';

import { connect } from 'react-redux';
import { onLogin } from '../../redux/actions/auth.actions'

import TextField from '../../components/textfield/textfield.component';
import ButtonComponent from '../../components/button/button.component';
import { Container, Button, Header, Left, Right, Title, Content, Icon, Body } from 'native-base';

import styles from './login.style';
import theme from '../../styles/theme.style';

import { GetProfile } from '../profile/graphql_query';
import { API, graphqlOperation } from 'aws-amplify';

import ChatClientHelper from '../../utils/twilio';
import operations from '../matchmaking/graphql';

import Amplify, { Auth } from 'aws-amplify';
import config from '../../../aws-exports';
Amplify.configure(config);

class Login extends Component {

    state = {
        username: '',
        password: '',
        error: '',
        user: {}
    }

    onChangeText = (key) => {
        return (value) => this.setState({
            [key]: value
        });
    }

    setError(error) {
        this.setState({ error });
    }

    clearError() {
        this.setState({ error: '' });
    }

    signIn() {
        this.clearError();
        const { username, password } = this.state;

        Auth.signIn(username, password)
            .then(user => {
                // Assign username and password to Redux Store
                this.props.onLogin(username, password);
                //create chat clientHelper, and subscribe to video calls.
                ChatClientHelper.getInstance().login(username);
                operations.SubVideoChannel(username).subscribe({
                    next: (eventData) => {
                        data = eventData.value.data[operations.SUB_VIDEO_CHANNEL_KEY];
                        if (data.userId !== "") {
                            this.props.navigation.navigate('video', { status: 'incoming', userId: data.userId, friendId: data.friendId, roomName: data.channelName });
                        }
                    }
                });
                // Check to see if user has a profile
                const profileValid = API.graphql(graphqlOperation(GetProfile, { userId: this.state.username }))
                    .then(profile => {
                        if (!profile.data.getPangyouMobilehub1098576098UserProfile) {
                            operations.CreateVideoChannel(username).catch(err => console.log(err));
                            this.props.navigation.navigate('AddProfile', { username: username });
                        } else {
                            this.props.navigation.navigate('Home');
                        }
                    });
            })
            .catch(err => {
                if (err.code === "UserNotConfirmedException") {
                    this.props.navigation.navigate('Verification', { username });
                }
                else {
                    this.setError(err.message);
                }
            });
    }


    static navigationOptions = ({ navigation }) => {

        return {
            header: null
        };

    };

    render() {
        return (

            <Container style={styles.wrapper}>

                <Header>
                    <Left>
                        <Button transparent
                            onPress={() => { this.props.navigation.goBack() }}>
                            <Icon name='arrow-back' style={styles.icon} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ fontFamily: theme.FONT_LIGHT }}>Login</Title>
                    </Body>
                    <Right />
                </Header>

                <KeyboardAvoidingView behavior="padding" style={styles.loginWrapper}>
                    <View style={styles.loginTopGrid}>
                    </View>
                    <View style={styles.loginMiddleGrid}>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon
                                name='md-person'
                                style={styles.icon}
                            />
                            <TextField
                                placeholder="Username or Email"
                                placeholderTextColor={theme.COLOR_PRIMARY_DARK}
                                returnKeyType="next"
                                onSubmitEditing={() => this.passwordInput.focus()}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                                onChangeText={this.onChangeText("username").bind(this)}
                            />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon
                                style={styles.icon}
                                name='md-lock'
                            />
                            <TextField
                                placeholder="Password"
                                placeholderTextColor={theme.COLOR_PRIMARY_DARK}
                                returnKeyType="go"
                                secureTextEntry
                                autoCapitalize="none"
                                autoCorrect={false}
                                onChangeText={this.onChangeText("password").bind(this)}
                            />
                        </View>
                        <Text>{this.state.error}</Text>
                    </View>
                    <View style={styles.loginBottomGrid}>
                        <ButtonComponent
                            onPress={this.signIn.bind(this)}
                            name='Submit'
                            screen='Home' />
                        <ButtonComponent
                            name='Forgot?'
                            screen='ForgetPassword' />
                    </View>
                </KeyboardAvoidingView>
            </Container>

        );
    }
}

export default connect(undefined, { onLogin })(withNavigation(Login));
