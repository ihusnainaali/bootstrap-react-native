import React , { Component } from 'react';
import { StyleSheet, Image, View,ListView, Text, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';

import { ListItem } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import styles from './friends.style';
  
class Friends extends React.Component {

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Friends!</Text>
      </View>
      );
    }
  }

export default withNavigation(Friends);