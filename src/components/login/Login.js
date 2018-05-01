import React, { Component } from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';

export default class Login extends Component {
	render() {
    return (
  		<View style={styles.wrapper}>
        <View style={styles.titleWrapper}>
					<Text style={styles.title}>Login</Text>
        </View>
  		</View>
    );
	}
}

const styles = StyleSheet.create({
	wrapper: {
		backgroundColor: '#4C989F',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
  titleWrapper: {
    flex: 1,
		justifyContent: 'center',
  },
  titleLogo: {
    width: 200,
    height: 450
  },
  title: {
    color: 'white',
		fontSize: 35,
    fontWeight: 'bold'
  },
  subtitle: {
    color: 'white',
    fontWeight: 'normal',
    paddingBottom: 15
  }
});
