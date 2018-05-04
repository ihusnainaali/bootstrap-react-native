import { StyleSheet } from 'react-native';
import { COLOR_PRIMARY_LIGHT, BORDER_RADIUS, TEXT_COLOR } from '../../styles/common';

export default StyleSheet.create({
  container: {
    borderRadius: BORDER_RADIUS,
  },
  button: {
    backgroundColor: COLOR_PRIMARY_LIGHT,
    borderRadius: BORDER_RADIUS,
  },
  text: {
    fontSize: 28,
    fontWeight: '900',
	textAlign: 'center',
	color: TEXT_COLOR
  }
});