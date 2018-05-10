import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    Dimensions
} from 'react-native';
import {
    withNavigation
} from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import theme from '../../styles/theme.style';

export default StyleSheet.create({
    profileWrapper: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: theme.COLOR_PRIMARY
    },
    header: {
        flex: 1,
        width: Dimensions.get('window').width,
        fontFamily: theme.FONT_BOLD,
    },
    profileCard: {
        width: Dimensions.get('window').width,
        marginTop: 50,
        height: 200,
        padding: 10,
        alignItems: 'center',
        backgroundColor: theme.COLOR_PRIMARY_LIGHT
    },
    descriptionCard: {
        flex: 1,
        width: Dimensions.get('window').width,
        marginTop: 5,
        borderColor: theme.COLOR_PRIMARY_DARK,
        alignItems: 'center',
        backgroundColor: theme.COLOR_PRIMARY_LIGHT
    },
    username: {
		fontSize: 20,
		fontFamily: theme.FONT_BOLD,
		textAlign: 'center',
		color: theme.TEXT_COLOR
    },
    text: {
		fontSize: 16,
		fontFamily: theme.FONT_LIGHT,
		textAlign: 'center',
		color: theme.TEXT_COLOR
	}
})