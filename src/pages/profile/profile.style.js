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
    indexProfileTopGrid: {
  		flex: 1,
  		marginTop: 30,
  		alignItems: 'center'
  	},
    editProfileTopGrid: {
  		flex: 1,
  		marginTop: 30,
  		alignItems: 'center',
      backgroundColor: '#90CAF9'
  	},
    indexProfileCard: {
        width: Dimensions.get('window').width,
        height: 320,
        padding: 10,
        alignItems: 'center',
        backgroundColor: '#81C784'
        // backgroundColor: theme.COLOR_PRIMARY_LIGHT
    },
    editProfileCard: {
        width: Dimensions.get('window').width,
        height: 320,
        padding: 10,
        alignItems: 'center',
        backgroundColor: '#90CAF9'
        // backgroundColor: theme.COLOR_PRIMARY_LIGHT
    },
    indexDescriptionCard: {
        width: Dimensions.get('window').width,
        borderColor: theme.COLOR_PRIMARY_DARK,
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },
    editDescriptionCard: {
        width: Dimensions.get('window').width,
        borderColor: theme.COLOR_PRIMARY_DARK,
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },
    indexLayoutItem: {
      width: Dimensions.get('window').width,
      borderColor: theme.COLOR_PRIMARY_DARK,
      alignItems: 'center',
      marginTop: 7
    },
    editLayoutItem: {
      width: Dimensions.get('window').width,
      borderColor: 'transparent',
      alignItems: 'center',
      marginTop: 7
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
    input: {
      fontSize: 18,
      borderRadius: 0,
      borderTopColor: 'transparent',
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
      borderBottomColor: '#90CAF9'
    },
  	indexProfileBottomGrid: {
      width: Dimensions.get('window').width,
      borderColor: theme.COLOR_PRIMARY,
      paddingTop: 30,
      paddingBottom: 30,
  		alignItems: 'center',
      backgroundColor: '#81C784'
  	},
    editProfileBottomGrid: {
      width: Dimensions.get('window').width,
      borderColor: theme.COLOR_PRIMARY,
      paddingTop: 30,
      paddingBottom: 30,
  		alignItems: 'center',
      backgroundColor: '#90CAF9'
  	},
  	icon: {
  		padding: 10,
  	},
  	profileHeaderText: {
  		fontSize: 35,
  		fontFamily: theme.FONT_BOLD,
  		textAlign: 'center',
  		color: '#FFFFFF'
  	},
    ScrollView: {
      flexWrap: 'wrap',
      flexDirection: 'row'
    },
    modal: {
      paddingTop: 20,
      flex: 1
    },
    shareButton: {
      position: 'absolute',
      width: Dimensions.get('window').width,
      padding: 10,
      bottom: 0,
      left: 0
    },
    icon: {
      color: theme.COLOR_SECONDARY_DARK,
      fontSize: theme.HEADER_ICON_SIZE
    }
})
