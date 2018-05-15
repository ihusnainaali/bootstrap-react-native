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
		flex: 2,
		alignItems: 'center'
	},
	forgetPasswordBottomGrid: {
		flex: 3,
		alignItems: 'center'
	},
	icon: {
		padding: 10,
		fontSize: 24,
		color: theme.COLOR_PRIMARY_DARK
	},
	forgotHeaderText: {
		fontSize: 35,
		fontFamily: theme.FONT_BOLD,
		textAlign: 'center',
		color: theme.TEXT_COLOR
	}

})
