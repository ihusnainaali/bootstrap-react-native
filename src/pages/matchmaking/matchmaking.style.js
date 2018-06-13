import {
  Dimensions,
	StyleSheet
} from 'react-native';
import theme from '../../styles/theme.style';

export default StyleSheet.create({

		icon: {
        color: theme.COLOR_PRIMARY_DARK,
        fontSize: theme.HEADER_ICON_SIZE
    },
    empty: {
        flex: 1, 
        alignSelf: 'center',
        justifyContent: 'center',
    },
		indexProfileCard: {
        width: Dimensions.get('window').width,
        backgroundColor: '#FFFFFF'
        // backgroundColor: theme.COLOR_PRIMARY_LIGHT
    },
		topText: {
        fontFamily: theme.FONT_BOLD,
        fontSize: 28,
        fontWeight: 'bold',
        color: 'black'
    }

})
