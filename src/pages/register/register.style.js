import {
	StyleSheet
} from 'react-native';

import theme from '../../styles/theme.style';

export default StyleSheet.create({

	registerWrapper: {
		backgroundColor: theme.COLOR_PRIMARY,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	registerTopGrid: {
		flex: 1,
		marginTop: 30,
		alignItems: 'center'
	},
	registerMiddleGrid: {
		flex: 3,
		alignItems: 'center'
	},
	registerBottomGrid: {
		flex: 2,
		alignItems: 'center'
	},
	icon: {
		padding: 10,
		fontSize: 24,
		color: theme.COLOR_PRIMARY_DARK
	},
	registerHeaderText: {
		fontSize: 35,
		fontFamily: theme.FONT_BOLD,
		textAlign: 'center',
		color: theme.TEXT_COLOR
	},

})
