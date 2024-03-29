import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    callContainer: {
        flex: 1,
        position: "absolute",
        bottom: 0,
        top: 0,
        left: 0,
        right: 0
    },
    button: {
        marginTop: 100
    },
    smallScreenVideo: {
        flex: 1,
        width: 75,
        height: 120,
        position: "absolute",
        right: 30,
        top: 100,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'black',
    },
    fullScreenVideo: {
        flex: 1,
        resizeMode: 'cover',
        // backgroundColor: "yellow"
    },
    optionsContainer: {
        position: "absolute",
        left: 0,
        bottom: 0,
        right: 0,
        height: 100,
        // flexDirection: "row",
        alignItems: "center"
    },
    connect: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',
    }
});