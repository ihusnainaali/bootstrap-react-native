export default (state = {}, action) => {
  switch(action.type) {
    case 'LOGIN':
      return {
        ...state,
        username: action.username,
        password: action.password
      }
    default:
      return state
  }
};
