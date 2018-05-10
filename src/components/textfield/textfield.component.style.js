import {
	StyleSheet
} from 'react-native';
import theme from '../../styles/theme.style'

export default StyleSheet.create({
	textField: {
		height: 50,
		backgroundColor: theme.COLOR_PRIMARY_LIGHT,
		marginBottom: 10,
		color: theme.TEXT_COLOR,
		fontWeight: 'bold',
		paddingHorizontal: 10,
		paddingVertical: 10,
		borderRadius: theme.BORDER_RADIUS,
		borderColor: theme.COLOR_PRIMARY_DARK,
		borderWidth: 1,
		width: 275
	}
});