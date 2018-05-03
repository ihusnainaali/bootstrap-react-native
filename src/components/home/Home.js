import React, { Component } from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TabNavigator, withNavigation } from 'react-navigation';
import { Icon } from 'react-native-elements';


class Home extends Component {
	render() {
    return (
  		<View style={styles.homeWrapper}>

        <View style={styles.homeTopGrid}>
					<Text style={styles.homeTitle}>Welcome</Text>
        </View>
        
  		</View>
    );
	}
}

const styles = StyleSheet.create({
	homeWrapper: {
		backgroundColor: '#4C989F',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
  homeTopGrid: {
    flex: 1,
		marginTop: 100,
		alignItems: 'center'
  },
	menuBottomGrid: {
		flex: 1,
		flexDirection: 'row'
  },
  homeTitle: {
    color: 'white',
		fontSize: 25,
    fontWeight: 'bold',
		marginBottom: 30
  },
	homeLogo: {
    width: 168,
    height: 148
  },
	homeButton: {
		backgroundColor: '#f6d7c3',
		borderWidth:1,
		borderRadius: 40,
		borderColor: '#000000',
		width: 125,
		paddingVertical: 50,
		paddingHorizontal: 10,
		marginBottom: 10
	},
	menuButtonText: {
		fontSize: 18,
    fontWeight: '900',
		textAlign: 'center',
		color: '#000000'
	},
});

export default withNavigation(Home);