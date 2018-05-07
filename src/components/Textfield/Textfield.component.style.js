import { StyleSheet } from 'react-native';
import { COLOR_PRIMARY_DARK, COLOR_PRIMARY_LIGHT, BORDER_RADIUS} from '../../styles/common';

export default StyleSheet.create({
  textField: {
    height: 50,
		backgroundColor: COLOR_PRIMARY_LIGHT,
		marginBottom: 10,
		color: COLOR_PRIMARY_DARK,
		fontWeight: 'bold',
		paddingHorizontal: 10,
		paddingVertical: 10,
		borderRadius: BORDER_RADIUS,
		width: 275
  }
});
