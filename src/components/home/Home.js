import React, { Component } from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';

class Home extends Component {
	render() {
    return (
  		<View style={styles.homeWrapper}>
        <View style={styles.homeTopGrid}>
					<Text style={styles.homeTitle}>Welcome</Text>
        </View>
				<View style={styles.homeBottomGrid}>
					<TouchableOpacity
						style={styles.navButtonContainer}
						onPress={() => this.props.navigation.navigate('Friends')}>
						<Text style={styles.navButtonText}>Friends</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.menuButtonContainer}
						onPress={() => this.props.navigation.navigate('Journals')}>
						<Text style={styles.registerButtonText}>Journals</Text>
					</TouchableOpacity>
                    <TouchableOpacity
						style={styles.menuButtonContainer}
						onPress={() => this.props.navigation.navigate('Journals')}>
						<Text style={styles.registerButtonText}>Profile</Text>
					</TouchableOpacity>
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
	homeBottomGrid: {
    flex: 1,
		marginTop: 125,
		marginBottom: 100,
		alignItems: 'center'
  },
  homeTitle: {
    color: 'white',
		fontSize: 35,
    fontWeight: 'bold',
		marginBottom: 30
  },
	homeLogo: {
    width: 168,
    height: 168
  },
	menuButtonContainer: {
		backgroundColor: '#f6d7c3',
		borderWidth:8,
		borderRadius: 40,
		borderColor: '#000000',
		marginBottom: 20,
		paddingVertical: 10,
		width: 250
	},
	menuButtonText: {
		fontSize: 28,
    fontWeight: '900',
		textAlign: 'center',
		color: '#000000'
	},
});

export default withNavigation(Home);