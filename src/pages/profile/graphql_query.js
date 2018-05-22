import Amplify, { API, graphqlOperation } from 'aws-amplify'
import { AppSyncConfig } from './appsync'
import { aws_config } from '../../../aws-exports'

const CONDITIONAL_ERROR = "DynamoDB:ConditionalCheckFailedException"
const USERS_BY_LANGUAGE_KEY = "queryPangyouMobilehub1098576098UserProfilesByUserLanguage"

Amplify.configure(aws_config);
Amplify.configure(AppSyncConfig);

// const GetUsersByLanguage = `query QueryUsersByUserLanguage($userLanguage: String!, $first: Int, $after: String) {
//     queryPangyouMobilehub1098576098UserProfilesByUserLanguage(
//         userLanguage: userLanguage,
//         first: $first,
//         after: $after
//     ){
//         items{
//             userId
//             userCountry
//             userLanguage
//         }
//         nextToken
//     }
// }`
//
// const Test1 = `query Test1 {
//
//     queryPangyouMobilehub1098576098UserProfilesByNativeLanguage(
//         nativeLanguage:"Chinese"
//       ){
//         items{
//           userId
//           userCountry
//           userLanguage
//         }
//         nextToken
//       }
// }`
//
// const Test = `query Q {
//
//     queryPangyouMobilehub1098576098UserProfilesByUserIdNativeLanguage(userId:"test1", first:10, after:""){
//         items{
//           userId
//           userCountry
//           userLanguage
//         }
//         nextToken
//       }
// }`

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


export default {
    USERS_BY_LANGUAGE_KEY,
    GetUsersByLanguage(nativeLanguage, first, after){
        return API.graphql(graphqlOperation(GetUsersByLanguage, {nativeLanguage, first, after}));
    }
}
