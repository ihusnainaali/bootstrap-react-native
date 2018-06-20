export default (state = {}, action) => {
    switch(action.type) {
      case 'ADD':
        return {
          ...state,
          friends: action.friends,
          friendsChannel: action.friendsChannel
        }
      default:
        return state
    }
  };