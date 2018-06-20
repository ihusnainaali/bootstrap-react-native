import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import theme from '../../styles/theme.style';

export default StyleSheet.create({

    container: {
        backgroundColor: '#FFFFFF',
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
    },
    photo: {
        height: 40,
        width: 40,
        borderRadius: 20,
    },
    sectionHeader: {
        flex: 1,
        padding: 8,
        justifyContent: 'center',
        backgroundColor: '#EAEAEA',
    },
    text: {
        fontSize: 13,
    },
})