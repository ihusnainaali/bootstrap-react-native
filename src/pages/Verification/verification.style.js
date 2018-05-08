import {
	StyleSheet
} from 'react-native';
import theme from '../../styles/theme.style';

export default StyleSheet.create({ 

	verificationWrapper: {
        backgroundColor: '#FFFFFF',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    verificationTopGrid: {
        flex: 1,
        marginTop: 100,
        alignItems: 'center'
    },
    verificationMiddleGrid: {
        flex: 1,
        marginTop: 20,
        alignItems: 'center'
    },
    verificationBottomGrid: {
        flex: 1,
        marginTop: 125,
        marginBottom: 100,
        alignItems: 'center'
    },
    verificationTitle: {
        color: 'black',
        fontSize: 35,
        fontWeight: 'bold',
        marginBottom: 30
    },
    verificationLogo: {
        width: 168,
        height: 168
    },
    verificationInput: {
        height: 50,
        backgroundColor: '#4C989F',
        marginBottom: 30,
        color: '#FFFFFF',
        fontWeight: 'bold',
        paddingHorizontal: 10,
        width: 275
    },
    submitButtonContainer: {
        backgroundColor: '#4C989F',
        borderWidth: 8,
        borderRadius: 40,
        borderColor: '#000000',
        marginBottom: 20,
        paddingVertical: 10,
        width: 250
    },
    submitButtonText: {
        fontSize: 28,
        fontWeight: '900',
        textAlign: 'center',
        color: '#FFFFFF'
    }

})