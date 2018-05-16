import {
	StyleSheet
} from 'react-native';

import theme from '../../styles/theme.style';

export default StyleSheet.create({

	settingsWrapper: {
		backgroundColor: theme.COLOR_PRIMARY,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	icon: {
			color: theme.COLOR_SECONDARY_DARK,
			fontSize: theme.HEADER_ICON_SIZE
	}


})