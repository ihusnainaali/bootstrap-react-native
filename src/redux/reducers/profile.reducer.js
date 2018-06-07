export default (state = {}, action) => {
  switch(action.type) {
    case 'PROFILE_ADD':
      return {
        ...state,
        userId: action.userId,
        userName: action.userName,
        userDescription: action.userDescription,
        userStatus: action.userStatus,
        userCountry: action.userCountry,
        userDob: action.userDob,
        userGender: action.userGender,
        userSchool: action.userSchool,
        userMajor: action.userMajor,
        userLanguage: action.userLanguage,
        userLearnLanguage: action.userLearnLanguage,
        userImageUrl: action.userImageUrl
      }
    default:
      return state
  }
};
