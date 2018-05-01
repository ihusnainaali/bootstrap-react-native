import React, { Component } from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';

export default class Splash extends Component {
	render() {
    return (
  		<View style={styles.wrapper}>
        <View style={styles.titleWrapper}>
          <Image
            style={styles.titleLogo}
            source={require('./src/assets/pangyou_logo.png')}/>
        </View>
  			<View>
          <Text style={styles.subtitle}>Powered by Develoop</Text>
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
  subtitle: {
    color: 'white',
    fontWeight: 'normal',
    paddingBottom: 15
  }
});
