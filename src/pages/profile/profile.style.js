import {
  Dimensions,
	StyleSheet
} from 'react-native';
import theme from '../../styles/theme.style';

export default StyleSheet.create({

    profileWrapper: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: theme.COLOR_PRIMARY
    },
    header: {
        width: Dimensions.get('window').width,
        fontFamily: theme.FONT_BOLD,
    },
    profileTopGrid: {
  		flex: 1,
  		marginTop: 30,
  		alignItems: 'center'
  	},
    profileCard: {
        width: Dimensions.get('window').width,
        height: 320,
        padding: 10,
        alignItems: 'center',
        backgroundColor: 'grey'
        // backgroundColor: theme.COLOR_PRIMARY_LIGHT
    },
    descriptionCard: {
        width: Dimensions.get('window').width,
        borderColor: theme.COLOR_PRIMARY_DARK
        // backgroundColor: theme.COLOR_PRIMARY_LIGHT
    },
    username: {
    		fontSize: 20,
    		fontFamily: theme.FONT_BOLD,
    		textAlign: 'center',
    		color: theme.TEXT_COLOR
    },
    text: {
    		fontSize: 16,
    		fontFamily: theme.FONT_LIGHT,
    		textAlign: 'center',
    		color: theme.TEXT_COLOR
    },
  	profileBottomGrid: {
      width: Dimensions.get('window').width,
      borderColor: theme.COLOR_PRIMARY,
      marginTop: 30,
  		alignItems: 'center'
  	},
  	icon: {
  		padding: 10,
  	},
  	profileHeaderText: {
  		fontSize: 35,
  		fontFamily: theme.FONT_BOLD,
  		textAlign: 'center',
  		color: theme.TEXT_COLOR
  	},
})
