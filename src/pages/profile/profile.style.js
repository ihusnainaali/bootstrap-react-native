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
        width: Dimensions.get('window').width,
        fontFamily: theme.FONT_BOLD,
    },
    profileCard: {
        width: Dimensions.get('window').width,
        marginTop: 20,
        height: 200,
        padding: 10,
        alignItems: 'center',
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        backgroundColor: 'lightgrey'
        // backgroundColor: theme.COLOR_PRIMARY_LIGHT
    },
    descriptionCard: {
        width: Dimensions.get('window').width,
        borderColor: theme.COLOR_PRIMARY_DARK,
        alignItems: 'center'
        // backgroundColor: theme.COLOR_PRIMARY_LIGHT
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
    },
  	profileBottomGrid: {
      marginTop: 20,
  		alignItems: 'center'
  	},
  	icon: {
  		padding: 10,
  	},
  	profileHeaderText: {
  		fontSize: 35,
  		fontFamily: theme.FONT_BOLD,
  		textAlign: 'center',
  		color: theme.TEXT_COLOR
  	},
})
