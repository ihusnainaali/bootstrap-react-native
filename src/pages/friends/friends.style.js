import React , { Component } from 'react';
import {StyleSheet} from 'react-native';

import theme from '../../styles/theme.style';

export default StyleSheet.create({

    container: {
        backgroundColor: theme.COLOR_PRIMARY,
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    icon: {
        color: theme.COLOR_SECONDARY_DARK,
        fontSize: theme.HEADER_ICON_SIZE
    },
    text_name: {
        fontFamily: theme.FONT_MEDIUM
    },
    text_subtitle: {
        fontFamily: theme.FONT_LIGHT
    }
})