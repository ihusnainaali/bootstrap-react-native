import React, { Component } from 'react';
import { Image, View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { withNavigation } from 'react-navigation';

class Login extends Component {
	render() {
    return (
			<KeyboardAvoidingView behavior="padding" style={styles.loginWrapper}>
        <View style={styles.loginTopGrid}>
					<Text style={styles.loginTitle}>Login</Text>
        </View>
				<View style={styles.loginMiddleGrid}>
					<TextInput
						placeholder="Username or Email"
						placeholderTextColor="#d1d1d1"
						returnKeyType="next"
						onSubmitEditing={() => this.passwordInput.focus()}
						keyboardType="email-address"
						autoCapitalize="none"
						autoCorrect={false}
						style={styles.loginInput}
						/>
					<TextInput
						placeholder="Password"
						placeholderTextColor="#d1d1d1"
						returnKeyType="go"
						secureTextEntry
						autoCapitalize="none"
						autoCorrect={false}
						style={styles.loginInput}
						ref={(input) => this.passwordInput = input}
						/>
				</View>
				<View style={styles.loginBottomGrid}>
					<TouchableOpacity
						style={styles.submitButtonContainer}
						onPress={() => this.props.navigation.navigate('Submit')}>
						<Text style={styles.submitButtonText}>LOGIN</Text>
					</TouchableOpacity>
				</View>
  		</KeyboardAvoidingView>
    );
	}
}

const styles = StyleSheet.create({
	loginWrapper: {
		backgroundColor: '#FFFFFF',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
  loginTopGrid: {
    flex: 1,
		marginTop: 100,
		alignItems: 'center'
  },
	loginMiddleGrid: {
    flex: 1,
		marginTop: 20,
		alignItems: 'center'
  },
	loginBottomGrid: {
    flex: 1,
		marginTop: 125,
		marginBottom: 100,
		alignItems: 'center'
  },
  loginTitle: {
    color: 'black',
		fontSize: 35,
    fontWeight: 'bold',
		marginBottom: 30
  },
	loginLogo: {
    width: 168,
    height: 168
  },
	loginInput: {
		height: 50,
		backgroundColor: '#4C989F',
		marginBottom: 30,
		color: '#FFFFFF',
		fontWeight: 'bold',
		paddingHorizontal: 10,
		width: 275
	},
	submitButtonContainer: {
		backgroundColor: '#4C989F',
		borderWidth:8,
		borderRadius: 40,
		borderColor: '#000000',
		marginBottom: 20,
		paddingVertical: 10,
		width: 250
	},
	submitButtonText: {
		fontSize: 28,
    fontWeight: '900',
		textAlign: 'center',
		color: '#FFFFFF'
	}
});

export default withNavigation(Login);
