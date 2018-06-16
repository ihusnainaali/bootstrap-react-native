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
	titleWrapper: {
		flex: 1,
		justifyContent: 'center',
	},
	titleLogo: {
		width: 300,
		height: 532
	},
	subtitle: {
		color: theme.TEXT_COLOR,
		fontFamily: theme.FONT_REGULAR,
		paddingBottom: 15
	}

})
