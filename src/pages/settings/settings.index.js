import React, { Component } from 'react';
import { View } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Container, Header , Left, Right, Title, Content, Button , Icon, Body} from 'native-base';
import { connect } from 'react-redux';
import { onLogout } from '../../redux/actions/auth.actions'

import Amplify, { Auth } from 'aws-amplify';
import config from '../../../aws-exports';
Amplify.configure(config);

import styles from "./settings.style";
import theme from '../../styles/theme.style';

import ButtonComponent from '../../components/button/button.component';

class Settings extends Component {

		static navigationOptions = ({ navigation }) => {

			return {
				header: null
			};
	
		}; 

		onPress() {
			Auth.signOut()
				.then(() => {
					this.props.onLogout();
					this.props.navigation.navigate('Welcome');
				})
				.catch(err => {
					console.log("err: ", err);
				});
		}

		render() {
				return (
			<Container style={styles.wrapper}>

				<Header>

					<Left>
					<Button transparent
						onPress={() => {this.props.navigation.goBack()}}>
						<Icon name='arrow-back' style={styles.icon} />
					</Button>
					</Left>
					<Body>
						<Title style={{fontFamily: theme.FONT_LIGHT}}>Settings</Title>
					</Body>
					<Right/>

				</Header>
				
				<Content>
					<View style={styles.middleGrid}>
						<ButtonComponent
							name="Logout"
							onPress={this.onPress.bind(this)} />
					</View>
				</Content>
	

			</Container>
				);
		}
}

export default connect(undefined, { onLogout })(withNavigation(Settings));
