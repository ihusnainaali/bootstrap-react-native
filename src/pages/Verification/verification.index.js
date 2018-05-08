import React, { Component } from 'react';
import { Image, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { withNavigation } from 'react-navigation';

import Amplify, { Auth } from 'aws-amplify'
import config from '../../../aws-exports'
Amplify.configure(config)

class Verification extends Component {
    state = {
        username: this.props.navigation.state.params.username,
        verificationCode: '',
        error: ''
    }

    onChangeText = (key, value) => {
        this.setState({
            [key]: value
        })
    }

    setError(error) {
        this.setState({error});
    }

    clearError(){
		this.setState({error: ''});
    }
    
    confirmSignUp() { // 1
        const {username, verificationCode} = this.state
        this.clearError();

        Auth.confirmSignUp(username, verificationCode)
            .then(res => {
                console.log(res);
                this.props.navigation.navigate('Login');
            })
            .catch(err => {
                this.setError(err.message);
            })
    }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.verificationWrapper}>
                <View style={styles.verificationTopGrid}>
                    <Text style={styles.verificationTitle}>Verification</Text>
                </View>
                <View style={styles.verificationMiddleGrid}>
                    <TextInput
                        placeholder="Verification Code"
                        placeholderTextColor="#d1d1d1"
                        returnKeyType="go"
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={(value) => this.onChangeText("verificationCode", value)}
                        style={styles.verificationInput}
                    />
                    <Text>{this.state.error}</Text>
                </View>
                <View style={styles.verificationBottomGrid}>
                    <TouchableOpacity
                        style={styles.submitButtonContainer}
                        onPress={this.confirmSignUp.bind(this)}>
                        <Text style={styles.submitButtonText}>Verify</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

export default withNavigation(Verification);
