import React , { Component } from 'react';
import {StyleSheet} from 'react-native';

import theme from '../../styles/theme.style';

export default StyleSheet.create({

    container: {
        flex: 1,
        paddingTop: 22
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    icon: {
        color: theme.COLOR_PRIMARY_DARK,
        fontSize: theme.HEADER_ICON_SIZE
    }

})