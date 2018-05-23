import Amplify, { API, graphqlOperation } from 'aws-amplify'
import { AppSyncConfig } from './appsync'
import { aws_config } from '../../../aws-exports'

const CONDITIONAL_ERROR = "DynamoDB:ConditionalCheckFailedException"
const USERS_BY_LANGUAGE_KEY = "queryPangyouMobilehub1098576098UserProfilesByNativeLanguage"

Amplify.configure(aws_config);
Amplify.configure(AppSyncConfig);

const GetUsersByLanguage = `query QueryUsersByLanguage($nativeLanguage: String!, $first: Int, $after: String) {
    queryPangyouMobilehub1098576098UserProfilesByNativeLanguage(
        nativeLanguage: $nativeLanguage,
        first: $first,
        after: $after
    ){
        items{
            userId
            country
            nativeLanguage
        }
        nextToken
    }
}`

const Test1 = `query Test1 {

    queryPangyouMobilehub1098576098UserProfilesByNativeLanguage(
        nativeLanguage:"Chinese"
      ){
        items{
          userId
          country
          nativeLanguage
        }
        nextToken
      }
}`

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
    GetUsersByLanguage(nativeLanguage, first, after){
        return API.graphql(graphqlOperation(GetUsersByLanguage, {nativeLanguage, first, after}));
    }
}