import Amplify, { API, graphqlOperation } from 'aws-amplify';
import { AppSyncConfig } from './appsync';
import { aws_config } from '../../../aws-exports';

const CONDITIONAL_ERROR = "DynamoDB:ConditionalCheckFailedException";
const USERS_BY_LANGUAGE_KEY = "queryPangyouMobilehub1098576098UserProfilesByUserLanguage";
const GET_FRIENDS_KEY = "getPangyouMobilehub1098576098Friends";
const UPDATE_FRIENDS_KEY = "updatePangyouMobilehub1098576098Friends";
const CREATE_FRIENDS_KEY = "createPangyouMobilehub1098576098Friends";
const SUB_VIDEO_CHANNEL_KEY = "onUpdatePangyouMobilehub1098576098UserVideoChannel";


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

const CreateFriend = `mutation CreateFriend($userId: String!, $friendId: String!, $channelSid: String){
    createPangyouMobilehub1098576098Friends(input:{
        userId: $userId
        friendId: $friendId
        channelSid: $channelSid
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

const UpdateFriend = `mutation UpdateFriend($userId: String!, $friendId: String!, $channelSid: String) {
    updatePangyouMobilehub1098576098Friends(input:{
        userId: $userId
        friendId: $friendId
        channelSid: $channelSid
    }){
        userId
        friendId
        channelSid
    }
}`

const SubVideoChannel = `subscription SubVideoChannel($userId: String!) {
    onUpdatePangyouMobilehub1098576098UserVideoChannel(userId: $userId){
      userId
      friendId
      channelName
    }
}`

const UpdateVideoChannel = `mutation UpdateVideoChannel($userId: String!, $friendId: String, $channelName: String) {
    updatePangyouMobilehub1098576098UserVideoChannel(input:{
        userId: $userId
        friendId: $friendId
        channelName: $channelName
    }){
        userId
        friendId
        channelName
    }
}`

//TODO create a video channel when user login in for the first time.
const CreateVideoChannel = `mutation CreateVideoChannel($userId: String!) {
    createPangyouMobilehub1098576098UserVideoChannel(input:{
        userId: $userId
    }){
        userId
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
    GET_FRIENDS_KEY,
    SUB_VIDEO_CHANNEL_KEY,
    UPDATE_FRIENDS_KEY,
    CREATE_FRIENDS_KEY,
    GetUsersByLanguage(userLanguage, first, after){
        return API.graphql(graphqlOperation(GetUsersByLanguage, {userLanguage, first, after}));
    },
    SubVideoChannel(userId){
        return API.graphql(graphqlOperation(SubVideoChannel, {userId}));
    },
    CreateVideoChannel(userId){
        return API.graphql(graphqlOperation(CreateVideoChannel, {userId}));
    },
    UpdateVideoChannel(userId, friendId, channelName){
        return API.graphql(graphqlOperation(UpdateVideoChannel, {userId, friendId, channelName}));
    },
    CreateFriend(userId, friendId, channelSid=''){
        return API.graphql(graphqlOperation(CreateFriend, {userId, friendId, channelSid}));
    },
    UpdateFriend(userId, friendId, channelSid){
        return API.graphql(graphqlOperation(UpdateFriend, {userId, friendId, channelSid}));
    },
    Test(){
        return API.graphql(graphqlOperation(GetProfile, {userId: 'test3'}));
    }
}