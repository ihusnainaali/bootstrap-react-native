import React, { Component } from 'react';
import { Image, View, Text, StatusBar } from 'react-native';
import { withNavigation } from 'react-navigation';
import styles from './welcome.style';

import Button from '../../components/button/button.component';
import { Container, Content} from 'native-base';

class Welcome extends Component {

	render() {
    return (
		
		<Container style={styles.wrapper}>
			
		<Content>
			<StatusBar barStyle="light-content" />
        	<View style={styles.welcomeTopGrid}>
			<Image
				style={styles.welcomeLogo}
				source={require('../../assets/pangyou_welcome.png')}/>
        	</View>
			<View style={styles.welcomeBottomGrid}>
				<Button name='Login' screen='Login'/>
				<Button name='Register' screen='Register'/>
			</View>
			<Text style={styles.subtitle}>Pangyou International © 2018</Text>
		</Content>
			
		</Container>




    );
	}
	
}

export default withNavigation(Welcome);
