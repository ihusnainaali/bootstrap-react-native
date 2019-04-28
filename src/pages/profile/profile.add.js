import React, { Component } from 'react';
import {
    View,
    ScrollView,
    KeyboardAvoidingView,
    AsyncStorage
} from 'react-native';
import { withNavigation } from 'react-navigation';
import TextField from '../../components/textfield/textfield.component';
import Button from '../../components/button/button.component';
import { Container, Header, Left, Right, Title, Text, Body, Content, Icon, ListItem, Picker } from 'native-base';

import { CreateProfile } from './graphql_query';
import { API, graphqlOperation } from 'aws-amplify';

import ImagePicker from 'react-native-image-picker';
import { RNS3 } from 'react-native-aws3';

import styles from './profile.style';
import theme from '../../styles/theme.style';

import DatePicker from 'react-native-datepicker';


type Props = {};
class AddProfile extends Component<Props> {

    constructor(props) {
        super(props);

        this.state = {
            date: '',
            loginUsername: this.props.navigation.getParam("username"),
            addProfile: {},
            asyncUsername: '',
            userName: '',
            userDescription: '',
            userStatus: '',
            userCountry: '',
            userDob: '',
            userGender: '',
            userSchool: '',
            userMajor: '',
            userLanguage: '',
            userLearnLanguage: '',
            userImageUrl: '',
            error: null
        }
    }

    static navigationOptions = ({ navigation }) => {
        return {
            header: null
        };
    };

    onChangeText = (key) => {
        return (value) => this.setState({
            [key]: value
        })
    }

    setError(error) {
        this.setState({ error });
    }

    clearError() {
        this.setState({ error: '' });
    }

    async addProfile() {

        try {
            addProfile = {
                userId: this.state.loginUsername,
                userName: this.state.userName,
                userDescription: this.state.userDescription,
                userStatus: this.state.userStatus,
                userCountry: this.state.userCountry,
                userDob: this.state.userDob,
                userGender: this.state.userGender,
                userSchool: this.state.userSchool,
                userMajor: this.state.userMajor,
                userLanguage: this.state.userLanguage,
                userLearnLanguage: this.state.userLearnLanguage,
                userImageUrl: this.state.userImageUrl
            }
            this.setState({
                addProfile: { ...this.state.profile, addProfile }
            })
            await API.graphql(graphqlOperation(CreateProfile, addProfile));
            AsyncStorage.setItem("username",  username);
            this.props.navigation.navigate('Home');
        } catch (err) {
            this.setError(err.message);
            console.log("Update Error: ", err);
            if (this.state.userName == "") {
                alert('Please enter a User Name!');
            } else if (this.state.userDescription == "") {
                alert('Please enter a Description!');
            } else if (this.state.userStatus == "") {
                alert('Please enter a Status!');
            } else if (this.state.userCountry == "") {
                alert('Please enter a Country!');
            } else if (this.state.userDob == "") {
                alert('Please enter your Date of Birth!');
            } else if (this.state.userGender == "") {
                alert('Please enter your Gender!');
            } else if (this.state.userSchool == "") {
                alert('Please enter the School you graduated from!');
            } else if (this.state.userMajor == "") {
                alert('Please enter your School Major!');
            } else if (this.state.userLanguage == "") {
                alert('Please enter your First spoken Language!');
            } else if (this.state.userLearnLanguage == "") {
                alert('Please enter the desired Language you would like to learn!');
            } else if (this.state.userImageUrl == "") {
                alert('Please choose a Profile Photo by tapping the user icon located at the top of this page!');
            }
        }
    }

    getImage() {
        let options = {
            title: 'Select Your Photo',
            mediaType: 'photo',
        }

        ImagePicker.showImagePicker(options, (response) => {
            if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.didCancel) {
                alert('You Have Cancelled the File Upload!');
            } else {
                const file = {
                    uri: response.uri,
                    name: response.fileName,
                    type: 'image/png'
                }
                const config = {
                    keyPrefix: "uploads/",
                    bucket: "pangyou-userfiles-mobilehub-1098576098",
                    region: "us-east-1",
                    accessKey: "AKIAI6ZHQBOJGPBSYPMQ",
                    secretKey: "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",
                    successActionStatus: 201
                }
                RNS3.put(file, config).then(response => {
                    if (response.status !== 201) {
                        throw new Error("Failed to upload image to S3");
                    } else {
                        this.setState({ userImageUrl: response.body.postResponse.location });
                        alert('Your Profile Picture was Uploaded Successfully!');
                    }
                });
            }
        });
    }

    render() {

        return (

            <ScrollView>
                <KeyboardAvoidingView behavior='padding' style={styles.profileWrapper}>
                    <Container>
                        <Header>
                            <Left />
                            <Body>
                                <Title style={{ fontFamily: theme.FONT_LIGHT }}>Add Profile</Title>
                            </Body>
                            <Right />
                        </Header>
                        <Content>
                            <View style={styles.editProfileCard}>
                                <Icon onPress={this.getImage.bind(this)} type="Ionicons" name='ios-contact' ios="ios-contact" md="md-contact" style={{ fontSize: 140, color: 'grey', textAlign: 'center' }} />
                            </View>
                            <View style={styles.editDescriptionCard}>
                                <View style={{ flexDirection: 'row' }}>
                                    <ListItem style={styles.editLayoutItem}>
                                        <Icon
                                            type='Ionicons'
                                            name='ios-contact'
                                            ios='ios-contact'
                                            md='md-contact'
                                            style={{ fontSize: 30, color: 'grey', textAlign: 'center', width: 60 }} />
                                        <TextField
                                            placeholder='Name'
                                            placeholderTextColor={theme.COLOR_PRIMARY_DARK}
                                            returnKeyType='next'
                                            keyboardType='email-address'
                                            autoCapitalize='none'
                                            autoCorrect={false}
                                            onChangeText={(userName) => this.setState({ userName })}
                                            name='userName'
                                            value=''
                                            style={styles.input}
                                        />
                                    </ListItem>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <ListItem style={styles.editLayoutItem}>
                                        <Icon
                                            type='Ionicons'
                                            name='ios-clipboard'
                                            ios='ios-clipboard'
                                            md='md-clipboard'
                                            style={{ fontSize: 30, color: 'grey', textAlign: 'center', width: 60 }} />
                                        <TextField
                                            placeholder='Description'
                                            placeholderTextColor={theme.COLOR_PRIMARY_DARK}
                                            returnKeyType='next'
                                            keyboardType='email-address'
                                            autoCapitalize='none'
                                            autoCorrect={false}
                                            onChangeText={(userDescription) => this.setState({ userDescription })}
                                            value=''
                                            style={styles.input}
                                        />
                                    </ListItem>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <ListItem style={styles.editLayoutItem}>
                                        <Icon
                                            type='Ionicons'
                                            name='ios-heart'
                                            ios='ios-heart'
                                            md='md-heart'
                                            style={{ fontSize: 30, color: 'grey', textAlign: 'center', width: 60 }} />
                                        <Picker
                                            mode="dropdown"
                                            iosIcon={<Icon name="ios-arrow-down-outline" />}
                                            placeholder="Select your Status"
                                            placeholderStyle={{ color: theme.COLOR_PRIMARY_DARK }}
                                            placeholderIconColor={theme.COLOR_PRIMARY_DARK}
                                            headerStyle={{ backgroundColor: theme.COLOR_PRIMARY_DARK }}
                                            headerBackButtonTextStyle={{ color: "#fff" }}
                                            headerTitleStyle={{ color: "#fff" }}
                                            textStyle={{ fontFamily: theme.FONT_REGULAR, fontSize: 18, fontWeight: 'bold' }}
                                            style={{ fontFamily: theme.FONT_REGULAR, width: 200 }}
                                            selectedValue={this.state.userStatus}
                                            onValueChange={(value) => { this.setState({ userStatus: value }) }}
                                        >
                                            <Picker.Item label="Online" value="Online" />
                                            <Picker.Item label="Offline" value="Offline" />
                                        </Picker>
                                    </ListItem>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <ListItem style={styles.editLayoutItem}>
                                        <Icon
                                            type='Ionicons'
                                            name='ios-pin'
                                            ios='ios-pin'
                                            md='md-pin'
                                            style={{ fontSize: 30, color: 'grey', textAlign: 'center', width: 60 }} />
                                        <TextField
                                            placeholder='Location'
                                            placeholderTextColor={theme.COLOR_PRIMARY_DARK}
                                            returnKeyType='next'
                                            autoCapitalize='none'
                                            autoCorrect={false}
                                            onChangeText={(userCountry) => this.setState({ userCountry })}
                                            value=''
                                            style={styles.input}
                                        />
                                    </ListItem>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <ListItem style={styles.editLayoutItem}>
                                        <DatePicker
                                            style={{ marginLeft: 15, width: 320 }}
                                            date={this.state.userDob}
                                            mode="date"
                                            placeholder="select date"
                                            format="YYYY-MM-DD"
                                            minDate="1930-01-01"
                                            maxDate="2020-01-01"
                                            confirmBtnText="Confirm"
                                            cancelBtnText="Cancel"
                                            customStyles={{
                                                dateIcon: {
                                                    position: 'absolute',
                                                    left: 0,
                                                    top: 4,
                                                    marginLeft: 0
                                                },
                                                dateInput: {
                                                    marginLeft: 45
                                                }
                                            }}
                                            onDateChange={(value) => { this.setState({ userDob: value }) }}
                                        />
                                    </ListItem>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <ListItem style={styles.editLayoutItem}>
                                        <Icon
                                            type='Ionicons'
                                            name='ios-contacts'
                                            ios='ios-contacts'
                                            md='md-contacts'
                                            style={{ fontSize: 30, color: 'grey', textAlign: 'center', width: 55 }} />
                                        <Picker
                                            mode="dropdown"
                                            iosIcon={<Icon name="ios-arrow-down-outline" />}
                                            placeholder="Select your Gender"
                                            placeholderStyle={{ color: theme.COLOR_PRIMARY_DARK }}
                                            placeholderIconColor={theme.COLOR_PRIMARY_DARK}
                                            headerStyle={{ backgroundColor: theme.COLOR_PRIMARY_DARK }}
                                            headerBackButtonTextStyle={{ color: "#fff" }}
                                            headerTitleStyle={{ color: "#fff" }}
                                            textStyle={{ fontFamily: theme.FONT_REGULAR, fontSize: 18, fontWeight: 'bold' }}
                                            style={{ width: 200 }}
                                            selectedValue={this.state.userGender}
                                            onValueChange={(value) => { this.setState({ userGender: value }) }}
                                        >
                                            <Picker.Item label="Male" value="Male" />
                                            <Picker.Item label="Female" value="Female" />
                                        </Picker>
                                    </ListItem>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <ListItem style={styles.editLayoutItem}>
                                        <Icon
                                            type='Ionicons'
                                            name='ios-school'
                                            ios='ios-school'
                                            md='md-school'
                                            style={{ fontSize: 30, color: 'grey', textAlign: 'center', width: 60 }} />
                                        <TextField
                                            placeholder='School'
                                            placeholderTextColor={theme.COLOR_PRIMARY_DARK}
                                            returnKeyType='next'
                                            autoCapitalize='none'
                                            autoCorrect={false}
                                            onChangeText={(userSchool) => this.setState({ userSchool })}
                                            value=''
                                            style={styles.input}
                                        />
                                    </ListItem>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <ListItem style={styles.editLayoutItem}>
                                        <Icon
                                            type='Ionicons'
                                            name='ios-book'
                                            ios='ios-book'
                                            md='md-book'
                                            style={{ fontSize: 30, color: 'grey', textAlign: 'center', width: 60 }} />
                                        <TextField
                                            placeholder='Major'
                                            placeholderTextColor={theme.COLOR_PRIMARY_DARK}
                                            returnKeyType='next'
                                            autoCapitalize='none'
                                            autoCorrect={false}
                                            onChangeText={(userMajor) => this.setState({ userMajor })}
                                            value=''
                                            style={styles.input}
                                        />
                                    </ListItem>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <ListItem style={styles.editLayoutItem}>
                                        <Icon
                                            type='Ionicons'
                                            name='ios-globe'
                                            ios='ios-globe'
                                            md='md-globe'
                                            style={{ fontSize: 30, color: 'grey', textAlign: 'center', width: 60 }} />
                                        <Picker
                                            mode="dropdown"
                                            iosIcon={<Icon name="ios-arrow-down-outline" />}
                                            placeholder="Select your Spoke Language:"
                                            placeholderStyle={{ color: theme.COLOR_PRIMARY_DARK }}
                                            placeholderIconColor={theme.COLOR_PRIMARY_DARK}
                                            headerStyle={{ backgroundColor: theme.COLOR_PRIMARY_DARK }}
                                            headerBackButtonTextStyle={{ color: "#fff" }}
                                            headerTitleStyle={{ color: "#fff" }}
                                            textStyle={{ fontFamily: theme.FONT_REGULAR, fontSize: 18, fontWeight: 'bold' }}
                                            style={{ width: 200 }}
                                            selectedValue={this.state.userLanguage}
                                            onValueChange={(value) => { this.setState({ userLanguage: value }) }}
                                        >
                                            <Picker.Item label="English" value="English" />
                                            <Picker.Item label="Chinese" value="Chinese" />
                                        </Picker>
                                    </ListItem>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <ListItem style={styles.editLayoutItem}>
                                        <Icon
                                            type='Ionicons'
                                            name='ios-globe'
                                            ios='ios-globe'
                                            md='md-globe'
                                            style={{ fontSize: 30, color: 'grey', textAlign: 'center', width: 60 }} />
                                        <Picker
                                            mode="dropdown"
                                            iosIcon={<Icon name="ios-arrow-down-outline" />}
                                            placeholder="Select the Language you are Interested in Learning:"
                                            placeholderStyle={{ color: theme.COLOR_PRIMARY_DARK }}
                                            placeholderIconColor={theme.COLOR_PRIMARY_DARK}
                                            headerStyle={{ backgroundColor: theme.COLOR_PRIMARY_DARK }}
                                            headerBackButtonTextStyle={{ color: "#fff" }}
                                            headerTitleStyle={{ color: "#fff" }}
                                            textStyle={{ fontFamily: theme.FONT_REGULAR, fontSize: 18, fontWeight: 'bold' }}
                                            style={{ width: 200 }}
                                            selectedValue={this.state.userLearnLanguage}
                                            onValueChange={(value) => { this.setState({ userLearnLanguage: value }) }}
                                        >
                                            <Picker.Item label="English" value="English" />
                                            <Picker.Item label="Chinese" value="Chinese" />
                                        </Picker>
                                    </ListItem>
                                </View>
                                <Text>{this.state.error}</Text>
                            </View>
                            <View style={styles.editProfileBottomGrid}>
                                <Button
                                    onPress={this.addProfile.bind(this)}
                                    name='Submit'
                                    screen='profile' />
                            </View>
                        </Content>
                    </Container>
                </KeyboardAvoidingView>
            </ScrollView>
        );
    }
}

export default withNavigation(AddProfile);
