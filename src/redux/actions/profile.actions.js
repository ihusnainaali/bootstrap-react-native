export const editProfile = (userId, userName, userDescription, userStatus, userCountry, userDob, userGender, userSchool, userMajor, userLanguage, userLearnLanguage, userImageUrl) => {
    return {
        type: 'PROFILE_ADD',
        userId,
        userName,
        userDescription,
        userStatus,
        userCountry,
        userDob,
        userGender,
        userSchool,
        userMajor,
        userLanguage,
        userLearnLanguage,
        userImageUrl
    }
}
