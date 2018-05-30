import Amplify, { API, graphqlOperation } from 'aws-amplify'
import { AppSyncConfig } from './graphql_data'
import { aws_config } from '../../../aws-exports'

// const CONDITIONAL_ERROR = "DynamoDB:ConditionalCheckFailedException"
// const USERS_BY_LANGUAGE_KEY = "queryPangyouMobilehub1098576098UserProfilesByUserLanguage"

Amplify.configure(aws_config);
Amplify.configure(AppSyncConfig);

// const GetUsersByLanguage = `query QueryUsersByLanguage($userLanguage: String!, $first: Int, $after: String) {
//     queryPangyouMobilehub1098576098UserProfilesByUserLanguage(
//         userLanguage: $userLanguage,
//         first: $first,
//         after: $after
//     ){
//         items{
//             userId
//             userName
//             userLanguage
//             userSchool
//         }
//         nextToken
//     }
// }`
//
// const Test1 = `query Q {
//     getPangyouMobilehub1098576098UserProfile(userId:"test1"){
//       userId
//     }
//   }
// `

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

// const Test = `query Q {
//
//     queryPangyouMobilehub1098576098UserProfilesByUserIdNativeLanguage(userId:"test1", first:10, after:""){
//         items{
//           userId
//           country
//           nativeLanguage
//         }
//         nextToken
//       }
// }`

// export default {
//     GetProfile(userId, userName, userDescription, userStatus, userCountry, userDob, userGender, userSchool, userMajor, userLanguage, userLearnLanguage, userImageUrl){
//         return API.graphql(graphqlOperation(GetProfile, {userId, userName, userDescription, userStatus, userCountry, userDob, userGender, userSchool, userMajor, userLanguage, userLearnLanguage, userImageUrl}));
//     }
// }
