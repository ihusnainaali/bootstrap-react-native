import { StyleSheet } from 'react-native';
import theme from '../../styles/theme.style'

export default StyleSheet.create({
  container: {
    backgroundColor: theme.COLOR_PRIMARY_LIGHT,
		marginBottom: 20,
		paddingVertical: 10,
		borderRadius: theme.BORDER_RADIUS,
		width: 275
  },
  text: {
    fontSize: 28,
    fontWeight: '900',
	textAlign: 'center',
	color: theme.TEXT_COLOR
  }
});
