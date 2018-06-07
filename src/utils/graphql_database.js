export const CreateProfile = `
mutation createPangyouMobilehub1098576098UserProfile($userId: String!, $userName: String, $userDescription: String!, $userStatus: String!, $userCountry: String!, $userDob: String!, $userGender: String!, $userSchool: String!, $userMajor: String!, $userLanguage: String!, $userImageUrl: String!) {
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
			userLearnLanguage: userLearnLanguage,
			userImageUrl: $userImageUrl
		}) {
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

export const LitsProfile = `
query getPangyouMobilehub1098576098UserProfile {
		getPangyouMobilehub1098576098UserProfile {
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

export const SubscribeToProfile = `
subscription onCreatePangyouMobilehub1098576098UserProfile {
		onCreatePangyouMobilehub1098576098UserProfile {
			items {
				userId
				userName
				userDescription
				userStatus
				userCountry
			}
		}
	}
`
