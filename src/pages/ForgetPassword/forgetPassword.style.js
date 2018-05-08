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
		marginTop: 125,
		marginBottom: 100,
		alignItems: 'center'
	},
	icon: {
		padding: 10
	}

})