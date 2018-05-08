import {
	StyleSheet
} from 'react-native';
import theme from '../../styles/theme.style';

export default StyleSheet.create({

	loginWrapper: {
		backgroundColor: theme.COLOR_PRIMARY,
		flex: 1,
	},
	loginMiddleGrid: {
		flex: 1,
		marginTop: 120,
		marginBottom: 10,
		alignItems: 'center'
	},
	loginBottomGrid: {
		flex: 1,
		alignItems: 'center'
	},
	loginLogo: {
		width: 168,
		height: 168
	},
	icon: {
		padding: 10,
	},

})