import React, { Component } from 'react';
import { Image, View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { withNavigation } from 'react-navigation';

import Amplify, { Auth } from 'aws-amplify'
import config from '../../aws-exports'
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

const styles = StyleSheet.create({
    verificationWrapper: {
        backgroundColor: '#FFFFFF',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    verificationTopGrid: {
        flex: 1,
        marginTop: 100,
        alignItems: 'center'
    },
    verificationMiddleGrid: {
        flex: 1,
        marginTop: 20,
        alignItems: 'center'
    },
    verificationBottomGrid: {
        flex: 1,
        marginTop: 125,
        marginBottom: 100,
        alignItems: 'center'
    },
    verificationTitle: {
        color: 'black',
        fontSize: 35,
        fontWeight: 'bold',
        marginBottom: 30
    },
    verificationLogo: {
        width: 168,
        height: 168
    },
    verificationInput: {
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
        borderWidth: 8,
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

export default withNavigation(Verification);
