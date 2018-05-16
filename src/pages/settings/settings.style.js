import {
	StyleSheet
} from 'react-native';

import theme from '../../styles/theme.style';

export default StyleSheet.create({

	wrapper: {
		backgroundColor: theme.COLOR_PRIMARY,
	},
	middleGrid: {
		flex: 1,
		marginTop: 250,
		justifyContent: 'center',
		alignItems: 'center',
	},
	icon: {
			color: theme.COLOR_SECONDARY_DARK,
			fontSize: theme.HEADER_ICON_SIZE
	}


})