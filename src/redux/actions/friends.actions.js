export const onAddFriend = (friends, friendsChannel) => {
    return {
        type: "ADD",
        friends,
        friendsChannel
    }
}