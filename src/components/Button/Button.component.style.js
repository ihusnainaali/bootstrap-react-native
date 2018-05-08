import { StyleSheet } from 'react-native';
import { COLOR_PRIMARY_LIGHT, BORDER_RADIUS, TEXT_COLOR } from '../../styles/common';

export default StyleSheet.create({
  container: {
    backgroundColor: COLOR_PRIMARY_LIGHT,
		marginBottom: 20,
		paddingVertical: 10,
		borderRadius: BORDER_RADIUS,
		width: 275
  },
  text: {
    fontSize: 28,
    fontWeight: '900',
	textAlign: 'center',
	color: TEXT_COLOR
  }
});
