import {
	StyleSheet
} from 'react-native';
import theme from '../../styles/theme.style';

export default StyleSheet.create({

	wrapper: {
		backgroundColor: theme.COLOR_PRIMARY,
	},
	loginWrapper: {
		flex: 1,
		alignItems: 'center'
	},
	loginTopGrid: {
		flex: 1,
		marginTop: 100,
		alignItems: 'center'
	},
	loginMiddleGrid: {
		flex: 2,
		alignItems: 'center'
	},
	loginBottomGrid: {
		flex: 3,
		marginTop: 50,
		alignItems: 'center'
	},
	icon: {
		padding: 10,
		fontSize: 24,
		color: theme.COLOR_SECONDARY_DARK
	},
	loginHeaderText: {
		fontSize: 35,
		fontFamily: theme.FONT_BOLD,
		textAlign: 'center',
		color: theme.TEXT_COLOR
	},
})
