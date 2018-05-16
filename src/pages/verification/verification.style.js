import {
	StyleSheet
} from 'react-native';

import theme from '../../styles/theme.style';

export default StyleSheet.create({

	wrapper: {
		backgroundColor: theme.COLOR_PRIMARY,
	},
	verificationMiddleGrid: {
		flex: 1,
		marginTop: 125,
		justifyContent: 'center',
		alignItems: 'center'
	},
	verificationBottomGrid: {
		flex: 1,
		marginTop: 125,
		marginBottom: 100,
		alignItems: 'center'
	},
	icon: {
		padding: 10
	}
	
})