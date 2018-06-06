export const CreateProfile = `
	mutation createUserProfile($userId: String!, $userName: String!, $userDescription: String!, $userStatus: String!, $userCountry: String!, $userDob: String!, $userGender: String!, $userSchool: String!, $userMajor: String!, $userLanguage: String!, $userLearnLanguage: String!, $userImageUrl: String) {
		createPangyouMobilehub1098576098UserProfile(input: {
			userId: $userId,
			userName: $userName,
			userDescription: $userDescription,
			userStatus: $userStatus,
			userCountry: $userCountry,
			userDob: $userDob,
			userGender: $userGender,
			userSchool: $userSchool,
			userMajor: $userMajor,
			userLanguage: $userLanguage,
			userLearnLanguage: $userLearnLanguage,
			userImageUrl: $userImageUrl
		})  {
			userId
			userName
			userDescription
			userStatus
			userCountry
			userDob
			userGender
			userSchool
			userMajor
			userLanguage
			userLearnLanguage
			userImageUrl
		}
	}
`

export const GetProfile = `query getUserProfile($userId: String!) {
  getPangyouMobilehub1098576098UserProfile(userId: $userId) {
			userId
			userName
			userDescription
			userStatus
			userCountry
			userDob
			userGender
			userSchool
			userMajor
			userLanguage
			userLearnLanguage
			userImageUrl
  }
}`;

export const ListProfile = `query listUserProfiles {
  listPangyouMobilehub1098576098UserProfiles {
    items {
			userId
			userName
			userDescription
			userStatus
			userCountry
			userDob
			userGender
			userSchool
			userMajor
			userLanguage
			userLearnLanguage
			userImageUrl
    }
  }
}`;

export const UpdateProfile = `
	mutation updateUserProfile($userId: String!, $userName: String!, $userDescription: String!, $userStatus: String!, $userCountry: String!, $userDob: String!, $userGender: String!, $userSchool: String!, $userMajor: String!, $userLanguage: String!, $userLearnLanguage: String!, $userImageUrl: String!) {
	  updatePangyouMobilehub1098576098UserProfile(input: {
			userId: $userId,
			userName: $userName,
			userDescription: $userDescription,
			userStatus: $userStatus,
			userCountry: $userCountry,
			userDob: $userDob,
			userGender: $userGender,
			userSchool: $userSchool,
			userMajor: $userMajor,
			userLanguage: $userLanguage,
			userLearnLanguage: $userLearnLanguage,
			userImageUrl: $userImageUrl
		})  {
			userId
			userName
			userDescription
			userStatus
			userCountry
			userDob
			userGender
			userSchool
			userMajor
			userLanguage
			userLearnLanguage
			userImageUrl
		}
	}
`

export const SubscribeToProfile = `
subscription onCreateUserProfile($userId: String!) {
		onUpdatePangyouMobilehub1098576098UserProfile(userId: $userId) {
			items {
				userId
				userName
				userDescription
				userStatus
				userCountry
				userDob
				userGender
				userSchool
				userMajor
				userLanguage
				userLearnLanguage
				userImageUrl
	    }
		}
	}
`
