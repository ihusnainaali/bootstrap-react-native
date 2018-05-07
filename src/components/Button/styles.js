import { StyleSheet } from 'react-native';
import { COLOR_PRIMARY_LIGHT, BORDER_RADIUS, TEXT_COLOR } from '../../styles/common';

export default StyleSheet.create({
  container: {
    borderRadius: BORDER_RADIUS,
    backgroundColor: COLOR_PRIMARY_LIGHT,
		marginBottom: 20,
		paddingVertical: 10,
		borderRadius: 10,
		width: 250
  },
  text: {
    fontSize: 28,
    fontWeight: '900',
	textAlign: 'center',
	color: TEXT_COLOR
  }
});