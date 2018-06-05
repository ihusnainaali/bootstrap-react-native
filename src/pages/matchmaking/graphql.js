import Amplify, { API, graphqlOperation } from 'aws-amplify'
import { AppSyncConfig } from './appsync'
import { aws_config } from '../../../aws-exports'

const CONDITIONAL_ERROR = "DynamoDB:ConditionalCheckFailedException"
const USERS_BY_LANGUAGE_KEY = "queryPangyouMobilehub1098576098UserProfilesByUserLanguage"

Amplify.configure(aws_config);
Amplify.configure(AppSyncConfig);

const GetUsersByLanguage = `query QueryUsersByLanguage($userLanguage: String!, $first: Int, $after: String) {
    queryPangyouMobilehub1098576098UserProfilesByUserLanguage(
        userLanguage: $userLanguage,
        first: $first,
        after: $after
    ){
        items{
            userId
            userName
            userLanguage
            userSchool
        }
        nextToken
    }
}`

const CreateFriend = `mutation CreateFriend($userId: String!, $friendId: String!, $uuid: String){
    createPangyouMobilehub1098576098Friends(input:{
        userId: $userId
        friendId: $friendId
        uuid: $uuid
      }){
        userId
      }   
}`

const GetFriend = `query GetFriend($userId: String!, $friendId: String!){
    createPangyouMobilehub1098576098Friends(input:{
        userId: $userId
        friendId: $friendId
        uuid: $uuid
      }){
        userId
      }   
}`

const GetProfile = `query getUserProfile($userId: String!) {
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

const Test = `query Q {

    queryPangyouMobilehub1098576098UserProfilesByUserIdNativeLanguage(userId:"test1", first:10, after:""){
        items{
          userId
          country
          nativeLanguage
        }
        nextToken
      }
}`

export default {
    USERS_BY_LANGUAGE_KEY,
    GetUsersByLanguage(userLanguage, first, after){
        return API.graphql(graphqlOperation(GetUsersByLanguage, {userLanguage, first, after}));
    },
    Test(){
        return API.graphql(graphqlOperation(GetProfile, {userId: 'test3'}));
    }
}