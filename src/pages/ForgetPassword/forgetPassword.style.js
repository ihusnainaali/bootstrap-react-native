import {
	StyleSheet
} from 'react-native';
import theme from '../../styles/theme.style';

export default StyleSheet.create({

	forgetPasswordWrapper: {
		backgroundColor: theme.COLOR_PRIMARY,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	forgetPasswordTopGrid: {
		flex: 1,
		marginTop: 50,
		alignItems: 'center'
	},
	forgetPasswordMiddleGrid: {
		flex: 1,
		marginTop: 20,
		alignItems: 'center'
	},
	forgetPasswordBottomGrid: {
		flex: 1,
		marginTop: 125,
		marginBottom: 100,
		alignItems: 'center'
	},
	forgetPasswordTitle: {
		color: 'black',
		fontSize: 35,
		fontWeight: 'bold',
		marginBottom: 30
	},
	forgetPasswordLogo: {
		width: 168,
		height: 168
	}

})