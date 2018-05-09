import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { TabNavigator, TabBarBottom, withNavigation } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Amplify, { Auth } from 'aws-amplify';
import config from '../../../aws-exports';
Amplify.configure(config);

import styles from "./settings.style";
import ButtonComponent from '../../components/Button/Button.component';

import { connect } from 'react-redux';
import { onLogout } from '../../redux/actions/auth.actions'

class Settings extends Component {
    onPress() {
        Auth.signOut()
            .then(() => {
                this.props.onLogout();
                this.props.navigation.navigate('Login');
            })
            .catch(err => {
                console.log("err: ", err);
            });
    }

    render() {
        return (
            <View style={styles.settingsWrapper}>
                <ButtonComponent
                    name="Logout"
                    onPress={this.onPress.bind(this)} />
            </View>
        );
    }
}

export default connect(undefined, { onLogout })(withNavigation(Settings));