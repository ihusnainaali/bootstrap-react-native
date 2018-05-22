import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native';
import { withNavigation } from 'react-navigation';
import TextField from '../../components/textfield/textfield.component';
import Button from '../../components/button/button.component';
import { Container, Header, Text, Content, Icon, List, ListItem } from 'native-base';

import styles from './profile.style'
import theme from '../../styles/theme.style'

// import Amplify, { Auth } from 'aws-amplify';
// import config from '../../../aws-exports';
// Amplify.configure(config);

class EditProfile extends Component {
  state = {
    name: '',
    description: '',
    status: '',
    location: '',
    age: '',
    gender: '',
    school: '',
    major: '',
    language: '',
    error: null
  }

  onChangeText = (key) => {
    return (value) => this.setState({
      [key]: value
    })
  }

  setError(error) {
    this.setState({ error });
  }

  clearError(){
		this.setState({error: ''});
	}

  // validatePassword(password) {
  //   var strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  //   return strongPasswordRegex.test(String(password));
  // }

  editProfile() {
    const { name, description, status, location, age, gender, school, major, language } = this.state;
    this.clearError();

    // if (!this.validateEmail(email)) {
    //   this.setError('Please use the school email to register.');
    //   return;
    // }
    // if (!this.confirmPassword(password, passwordConfirmation)) {
    //   this.setError('Passwords does not match');
    //   return;
    // }
    // if (!this.validatePassword(password)) {
    //   this.setError('Password is too weak.');
    //   return;
    // }

    Auth.editProfile({
      name: name,
      status: status,
      location: location,
      age: age,
      gender: gender,
      school: school,
      major: major,
      language: language
    })
      .then(res => {
        this.props.navigation.navigate('Profile');
      })
      .catch(err => {
        console.log(err);
        this.setError(err.message);
      })
  }

  render() {
    return (
      <ScrollView>
        <KeyboardAvoidingView behavior='padding' style={styles.profileWrapper}>
          <Container>
            <Content>
              <View style={styles.profileTopGrid}>
              </View>
              <View style={styles.profileBottomGrid}>
                <View style={{flexDirection: 'row'}}>
                  <Icon
                    type='Ionicons'
                    name='ios-contact'
                    ios='ios-contact'
                    md='md-contact'
                    style={{fontSize: 30, color: 'black', textAlign:'center', marginTop: 10, width: 40}} />
                  <TextField
                    placeholder='Name'
                    placeholderTextColor={theme.COLOR_PRIMARY_DARK}
                    returnKeyType='next'
                    keyboardType='email-address'
                    autoCapitalize='none'
                    autoCorrect={false}
                    onChangeText={this.onChangeText('name').bind(this)}
                  />
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Icon
                    type='Ionicons'
                    name='ios-clipboard'
                    ios='ios-clipboard'
                    md='md-clipboard'
                    style={{fontSize: 30, color: 'black', textAlign:'center', marginTop: 10, width: 40}} />
                  <TextField
                    placeholder='Description'
                    placeholderTextColor={theme.COLOR_PRIMARY_DARK}
                    returnKeyType='next'
                    keyboardType='email-address'
                    autoCapitalize='none'
                    autoCorrect={false}
                    onChangeText={this.onChangeText('description').bind(this)}
                  />
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Icon
                    type='Ionicons'
                    name='ios-heart'
                    ios='ios-heart'
                    md='md-heart'
                    style={{fontSize: 30, color: 'black', textAlign:'center', marginTop: 10, width: 40}} />
                  <TextField
                    placeholder='Status'
                    placeholderTextColor={theme.COLOR_PRIMARY_DARK}
                    returnKeyType='next'
                    keyboardType='email-address'
                    autoCapitalize='none'
                    autoCorrect={false}
                    onChangeText={this.onChangeText('status').bind(this)}
                  />
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Icon
                    type='Ionicons'
                    name='ios-pin'
                    ios='ios-pin'
                    md='md-pin'
                    style={{fontSize: 30, color: 'black', textAlign:'center', marginTop: 10, width: 40}} />
                  <TextField
                    placeholder='Location'
                    placeholderTextColor={theme.COLOR_PRIMARY_DARK}
                    returnKeyType='go'
                    secureTextEntry
                    autoCapitalize='none'
                    autoCorrect={false}
                    onChangeText={this.onChangeText('location').bind(this)}
                  />
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Icon
                    type='Ionicons'
                    name='ios-calendar'
                    ios='ios-calendar'
                    md='md-calendar'
                    style={{fontSize: 30, color: 'black', textAlign:'center', marginTop: 10, width: 40}} />
                  <TextField
                    placeholder='Age'
                    placeholderTextColor={theme.COLOR_PRIMARY_DARK}
                    returnKeyType='go'
                    secureTextEntry
                    autoCapitalize='none'
                    autoCorrect={false}
                    onChangeText={this.onChangeText('age').bind(this)}
                  />
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Icon
                    type='Ionicons'
                    name='ios-contacts'
                    ios='ios-contacts'
                    md='md-contacts'
                    style={{fontSize: 30, color: 'black', textAlign:'center', marginTop: 10, width: 40}} />
                  <TextField
                    placeholder='Gender'
                    placeholderTextColor={theme.COLOR_PRIMARY_DARK}
                    returnKeyType='go'
                    secureTextEntry
                    autoCapitalize='none'
                    autoCorrect={false}
                    onChangeText={this.onChangeText('gender').bind(this)}
                  />
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Icon
                    type='Ionicons'
                    name='ios-school'
                    ios='ios-school'
                    md='md-school'
                    style={{fontSize: 30, color: 'black', textAlign:'center', marginTop: 10, width: 40}} />
                  <TextField
                    placeholder='School'
                    placeholderTextColor={theme.COLOR_PRIMARY_DARK}
                    returnKeyType='go'
                    secureTextEntry
                    autoCapitalize='none'
                    autoCorrect={false}
                    onChangeText={this.onChangeText('school').bind(this)}
                  />
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Icon
                    type='Ionicons'
                    name='ios-book'
                    ios='ios-book'
                    md='md-book'
                    style={{fontSize: 30, color: 'black', textAlign:'center', marginTop: 10, width: 40}} />
                  <TextField
                    placeholder='Major'
                    placeholderTextColor={theme.COLOR_PRIMARY_DARK}
                    returnKeyType='go'
                    secureTextEntry
                    autoCapitalize='none'
                    autoCorrect={false}
                    onChangeText={this.onChangeText('major').bind(this)}
                  />
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Icon
                    type='Ionicons'
                    name='ios-globe'
                    ios='ios-globe'
                    md='md-globe'
                    style={{fontSize: 30, color: 'black', textAlign:'center', marginTop: 10, width: 40}} />
                  <TextField
                    placeholder='Language'
                    placeholderTextColor={theme.COLOR_PRIMARY_DARK}
                    returnKeyType='go'
                    secureTextEntry
                    autoCapitalize='none'
                    autoCorrect={false}
                    onChangeText={this.onChangeText('language').bind(this)}
                  />
                </View>
                <Text>{this.state.error}</Text>
              </View>
              <View style={styles.profileBottomGrid}>
                <Button
                  onPress={this.props.navigation.navigate('Profile')}
                  name='Submit'
                  screen='profile'/>
              </View>
            </Content>
          </Container>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

export default withNavigation(EditProfile);

// import React from 'react';
// import { Text, View, Image, TouchableOpacity } from 'react-native';
// import { withNavigation, navigation } from 'react-navigation';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import { DeckSwiper, Card, CardItem, Thumbnail, Container, Header, Left, Right, Title, Content, Button, Icon, Body } from 'native-base';
// import Loader from '../../components/loader/loader.component'
//
// import styles from './matchmaking.style';
// import theme from '../../styles/theme.style';
//
// import operations from './graphql'
//
// class Matchmaking extends React.Component {
//
//     constructor(props) {
//         super(props);
//         this.state = {
//             dataReady: false,
//             cards: [
//             ],
//             counter: 0
//         };
//         this.swipedLeft = this.swipedLeft.bind(this);
//         this.swipedRight = this.swipedRight.bind(this);
//         this.fetchData = this.fetchData.bind(this);
//         this.rendHeader = this.rendHeader.bind(this);
//         this.rendLoading = this.rendLoading.bind(this);
//         this.rendDeckSwiper = this.rendDeckSwiper.bind(this);
//     }
//
//     componentDidMount() {
//         this.fetchData("Chinese")
//     }
//
//     fetchData(language = "Chinese") {
//         operations.GetUsersByLanguage(language, 20, null)
//             .then(resp => {
//                 const data = resp.data[operations.USERS_BY_LANGUAGE_KEY];
//                 this.setState({
//                     cards: this.state.cards.concat(data.items),
//                     nextToken: data.nextToken
//                 });
//                 console.log("data fetched.")
//                 this.setState({ dataReady: true });
//             })
//             .catch((err) => { console.log(err); this.props.navigation.goBack(); });
//     }
//
//     //TODO yes/no button will not triger onSwipe subscription. Need to fix it.
//     //TODO refetch data.
//     swipedLeft(index) {
//         console.log(index);
//         console.log("swipe left");
//         // console.log(this.state.cards.length - this.state.cards.indexOf(index));
//         // if (this.state.cards.length - this.state.cards.indexOf(index) <= 5) {
//         //     this.fetchData("Chinese");
//         // }
//     }
//     swipedRight(index) {
//         console.log(index);
//         console.log("swipe right");
//         // console.log(this.state.cards.length - this.state.cards.indexOf(index));
//         // if (this.state.cards.length - this.state.cards.indexOf(index) <= 5) {
//         //     this.fetchData("Chinese");
//         // }
//     }
//
//
//     // Declare Navigation Options Here :|
//     static navigationOptions = ({ navigation }) => {
//
//         return {
//             header: null
//         }
//
//     };
//
//     rendHeader() {
//         return (
//             <Header>
//                 <Left>
//                     <Button transparent
//                         onPress={() => { this.props.navigation.goBack() }}>
//                         <Icon
//                             name='arrow-back'
//                             style={styles.icon} />
//                     </Button>
//                 </Left>
//                 <Body>
//                     <Title style={{ fontFamily: theme.FONT_LIGHT }}>Matchmaking</Title>
//                 </Body>
//                 <Right />
//             </Header>
//         );
//     }
//
//     rendDeckSwiper() {
//         return (
//             <DeckSwiper
//                 ref={(c) => this._deckSwiper = c}
//                 onSwipeLeft={(index) => this.swipedLeft(index)}
//                 onSwipeRight={(index) => this.swipedRight(index)}
//                 dataSource={this.state.cards}
//                 looping={true}
//                 renderItem={item =>
//                     <Card style={{ elevation: 3 }}>
//                         <CardItem>
//                             <Left>
//                                 <Thumbnail source={item.image} />
//                                 <Body>
//                                     <Text>{item.userId}</Text>
//                                     <Text>{item.nativeLanguage}</Text>
//                                     <Text>{item.country}</Text>
//                                     <Text note>NativeBase</Text>
//                                 </Body>
//                             </Left>
//                         </CardItem>
//                         <CardItem cardBody>
//                             <Image style={{ height: 400, flex: 1 }} source={item.image} />
//                         </CardItem>
//                     </Card>
//                 }
//             />
//         );
//     }
//
//     rendLoading() {
//         return (
//             <Container>
//                 {this.rendHeader()}
//                 <Loader />
//             </Container>
//         );
//     }
//
//     render() {
//         console.log("render");
//         console.log(this.state.cards);
//
//         if (!this.state.dataReady) {
//             return this.rendLoading();
//         }
//
//         return (
//             <Container>
//                 {this.rendHeader()}
//                 {this.rendDeckSwiper()}
//                 <View style={{ flexDirection: "row", flex: 1, position: "absolute", bottom: 0, left: 0, right: 0, justifyContent: 'space-between', padding: 15 }}>
//                     <Button iconLeft onPress={() => { this._deckSwiper._root.swipeLeft(); this.swipedLeft() }}>
//                         <Icon name="arrow-back" />
//                         <Text>Yes</Text>
//                     </Button>
//                     <Button iconRight onPress={() => { this._deckSwiper._root.swipeRight(); this.swipedRight() }}>
//                         <Text>No</Text>
//                         <Icon name="arrow-forward" />
//                     </Button>
//                 </View>
//             </Container>
//         );
//     }
// }
//
// export default withNavigation(Matchmaking);
