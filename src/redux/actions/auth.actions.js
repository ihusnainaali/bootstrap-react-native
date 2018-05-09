export const onLogin = (username, password) => {
    return {
        type: 'LOGIN',
        username,
        password
    }
}

export const onLogout = () => {
    return {
        type: 'LOGOUT'
    }
}