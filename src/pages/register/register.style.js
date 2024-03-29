import {
	StyleSheet
} from 'react-native';

import theme from '../../styles/theme.style';

export default StyleSheet.create({

	wrapper: {
		backgroundColor: theme.COLOR_PRIMARY,
	},
	registerWrapper: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	registerMiddleGrid: {
		flex: 1,
		marginTop: 50,
		paddingBottom: 1,
		alignItems: 'center'
	},
	registerBottomGrid: {
		flex: 3,
		alignItems: 'center'
	},
	icon: {
		padding: 10,
		fontSize: 24,
		color: theme.COLOR_SECONDARY_DARK
	},
	registerHeaderText: {
		fontSize: 35,
		fontFamily: theme.FONT_BOLD,
		textAlign: 'center',
		color: theme.TEXT_COLOR
	},

})
