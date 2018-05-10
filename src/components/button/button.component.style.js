import {
	StyleSheet
} from 'react-native';
import theme from '../../styles/theme.style'

export default StyleSheet.create({
	container: {
		backgroundColor: theme.COLOR_PRIMARY_LIGHT,
		marginBottom: 20,
		paddingVertical: 10,
		borderRadius: theme.BORDER_RADIUS,
		borderColor: theme.COLOR_PRIMARY_DARK,
		borderWidth: 1,
		width: 200
	},
	text: {
		fontSize: 20,
		fontFamily: theme.FONT_BOLD,
		textAlign: 'center',
		color: theme.TEXT_COLOR
	}
});