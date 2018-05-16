import {
	StyleSheet
} from 'react-native';

import theme from '../../styles/theme.style';

export default StyleSheet.create({

	wrapper: {
		backgroundColor: theme.COLOR_PRIMARY,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	welcomeTopGrid: {
		flex: 1,
		marginTop: 120,
		alignItems: 'center'
	},
	welcomeBottomGrid: {
		flex: 1,
		marginTop: 125,
		marginBottom: 100,
		alignItems: 'center'
	},
	welcomeLogo: {
		width: 168,
		height: 168
	},
	subtitle: {
		color: theme.TEXT_COLOR,
		fontFamily: theme.FONT_REGULAR,
		paddingBottom: 20
	}

})