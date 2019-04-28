import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Container, Header, Left, Right, Title, Button, Icon, Body } from 'native-base';

import { route } from '../../routes/routes.constants';

import styles from './pangyou.style';
import theme from '../../styles/theme.style';

class Pangyou extends React.Component {

    navigateToMatchmaking = () => {
        this.props.navigation.navigate(route.MATCHMAKING)
    }

    navigateToSettings = () => {
        this.props.navigation.navigate(route.SETTINGS);
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
                    <Left />
                    <Body>
                        <Title style={{ fontFamily: theme.FONT_LIGHT }}>Pangyou</Title>
                    </Body>
                    <Right>
                        <Button
                            transparent
                            onPress={() => { this.navigateToSettings() }}>
                            <Icon
                                name='settings'
                                type="MaterialIcons"
                                style={styles.icon} />
                        </Button>
                    </Right>
                </Header>

                <View style={styles.avatarGrid}>
                    <TouchableOpacity
                        onPress={() => { this.navigateToMatchmaking() }}>
                        <Image
                            style={styles.avatar}
                            source={require('../../assets/pangyou_welcome.png')} />
                    </TouchableOpacity>
                </View>

            </Container>

        );
    }
}

export default withNavigation(home);
