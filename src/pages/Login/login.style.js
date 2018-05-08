import {
	StyleSheet
} from 'react-native';
import theme from '../../styles/theme.style';

export default StyleSheet.create({

	loginWrapper: {
		backgroundColor: theme.COLOR_PRIMARY,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	loginTopGrid: {
		flex: 1,
		marginTop: 50,
		alignItems: 'center'
	},
	loginMiddleGrid: {
		flex: 1,
		marginTop: 20,
		alignItems: 'center'
	},
	loginBottomGrid: {
		flex: 1,
		marginTop: 125,
		marginBottom: 100,
		alignItems: 'center'
	},
	loginTitle: {
		color: 'black',
		fontSize: 35,
		fontWeight: 'bold',
		marginBottom: 30
	},
	loginLogo: {
		width: 168,
		height: 168
	}

})