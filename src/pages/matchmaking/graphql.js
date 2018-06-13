import Amplify, { API, graphqlOperation } from 'aws-amplify';
import { AppSyncConfig } from './appsync';
import { aws_config } from '../../../aws-exports';

const CONDITIONAL_ERROR = "DynamoDB:ConditionalCheckFailedException";
const USERS_BY_LANGUAGE_KEY = "queryPangyouMobilehub1098576098UserProfilesByUserLanguage";
const GET_FRIENDS_KEY = "getPangyouMobilehub1098576098Friends";
const UPDATE_FRIENDS_KEY = "updatePangyouMobilehub1098576098Friends";
const CREATE_FRIENDS_KEY = "createPangyouMobilehub1098576098Friends";
const LIST_FRIENDS_KEY = "queryPangyouMobilehub1098576098FriendsByUserId";
const SUB_VIDEO_CHANNEL_KEY = "onUpdatePangyouMobilehub1098576098UserVideoChannel";
const SUB_FRIENDS_KEY = "onUpdatePangyouMobilehub1098576098Friends";
const BATCH_GET_PROFILES_KEY = "batchGetPangyouMobilehub1098576098UserProfile";
const GET_PROFILE_KEY = "getPangyouMobilehub1098576098UserProfile";

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
            userGender
            userDob
            userSchool
            userLanguage
            userLearnLanguage
            userImageUrl
        }
        nextToken
    }
}`

const CreateFriend = `mutation CreateFriend($userId: String!, $friendId: String!){
    createPangyouMobilehub1098576098Friends(input:{
        userId: $userId
        friendId: $friendId
    }){
        userId
    }
}`

const GetFriend = `query GetFriend($userId: String!, $friendId: String!) {
	getPangyouMobilehub1098576098Friends(userId: $userId, friendId: $friendId){
        userId
        friendId
        channelSid
    }
}`

const ListFriends = `query ListFriends($userId: String!) {
    queryPangyouMobilehub1098576098FriendsByUserId(userId: $userId){
        items{
            userId
            friendId
            channelSid
        }
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

const SubFriends = `subscription SubFriends($userId: String!) {
    onUpdatePangyouMobilehub1098576098Friends(userId: $userId){
        userId
        friendId
        channelSid
    }
}`

const BatchGetUserProfiles = `query BatchGetUserProfiles($userIds: [String]) {
	batchGetPangyouMobilehub1098576098UserProfile(userIds: $userIds){
        userId
        userImageUrl
        userStatus
    }
}`

const GetUserProfile = `query GetUserProfile($userId: String!)  {
    getPangyouMobilehub1098576098UserProfile(userId: $userId){
        userId
        userImageUrl
        userStatus
    }
}`

export default {
    USERS_BY_LANGUAGE_KEY,
    GET_FRIENDS_KEY,
    SUB_VIDEO_CHANNEL_KEY,
    UPDATE_FRIENDS_KEY,
    CREATE_FRIENDS_KEY,
    LIST_FRIENDS_KEY,
    SUB_FRIENDS_KEY,
    BATCH_GET_PROFILES_KEY,
    GET_PROFILE_KEY,
    GetUsersByLanguage(userLanguage, first, after) {
        return API.graphql(graphqlOperation(GetUsersByLanguage, { userLanguage, first, after }));
    },
    GetFriend(userId, friendId) {
        return API.graphql(graphqlOperation(GetFriend, { userId, friendId }));
    },
    ListFriends(userId) {
        return API.graphql(graphqlOperation(ListFriends, { userId }));
    },
    SubVideoChannel(userId) {
        return API.graphql(graphqlOperation(SubVideoChannel, { userId }));
    },
    CreateVideoChannel(userId) {
        return API.graphql(graphqlOperation(CreateVideoChannel, { userId }));
    },
    UpdateVideoChannel(userId, friendId, channelName) {
        return API.graphql(graphqlOperation(UpdateVideoChannel, { userId, friendId, channelName }));
    },
    CreateFriend(userId, friendId, channelSid = '') {
        return API.graphql(graphqlOperation(CreateFriend, { userId, friendId, channelSid }));
    },
    UpdateFriend(userId, friendId, channelSid) {
        return API.graphql(graphqlOperation(UpdateFriend, { userId, friendId, channelSid }));
    },
    SubFriends(userId) {
        return API.graphql(graphqlOperation(SubFriends, { userId }));
    },
    BatchGetUserProfiles(userIds) {
        return API.graphql(graphqlOperation(BatchGetUserProfiles, { userIds }));
    },
    GetUserProfile(userId) {
        return API.graphql(graphqlOperation(GetUserProfile, { userId }));
    }
}
