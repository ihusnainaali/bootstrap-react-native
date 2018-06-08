import { StyleSheet } from 'react-native'
import theme from '../../styles/theme.style';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    sendButton: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',
    },
    icon: {
        color: theme.COLOR_SECONDARY_DARK,
        fontSize: theme.HEADER_ICON_SIZE
    },
});