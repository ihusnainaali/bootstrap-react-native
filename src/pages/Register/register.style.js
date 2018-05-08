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
		marginTop: 50,
		alignItems: 'center'
	},
	registerMiddleGrid: {
		flex: 1,
		marginBottom: 70,
		alignItems: 'center'
	},
	registerBottomGrid: {
		flex: 1,
		marginTop: 125,
		marginBottom: 50,
		alignItems: 'center'
	},
	registerTitle: {
		flex: 1,
		color: theme.TEXT_COLOR,
		fontSize: 35,
		fontWeight: 'bold',
		marginBottom: 20
	},
	registerLogo: {
		width: 168,
		height: 168
	}

})