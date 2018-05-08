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
	forgetPasswordMiddleGrid: {
		flex: 1,
		marginTop: 125,
		alignItems: 'center'
	},
	forgetPasswordBottomGrid: {
		flex: 1,
		marginTop: 155,
		marginBottom: 50,
		alignItems: 'center'
	},
	forgetPasswordTitle: {
		color: theme.TEXT_COLOR,
		fontSize: 35,
		fontWeight: 'bold',
		marginBottom: 30
	},
	forgetPasswordLogo: {
		width: 168,
		height: 168
	},
	icon: {
		padding: 10
	}

})