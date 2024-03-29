// TODO ADD
// Routing Index
import ForgetPassword from '../pages/forgetpassword/forgetpassword.index';
import Friends from '../pages/friends/friends.index';
import Journals from '../pages/journals/journals.index';
import Login from '../pages/login/login.index';
import Matchmaking from '../pages/matchmaking/matchmaking.index';
import Pangyou from '../pages/pangyou/pangyou.index';
import Profile from '../pages/profile/profile.index';
import AddProfile from '../pages/profile/profile.add';
import EditProfile from '../pages/profile/profile.edit';
import FriendProfile from '../pages/profile/profile.friend';
import Register from '../pages/register/register.index';
import Settings from '../pages/settings/settings.index';
import Splash from '../pages/splash/splash.index';
import Verification from '../pages/verification/verification.index';
import Welcome from '../pages/welcome/welcome.index';
import Chat from '../pages/chat/chat.index';
import Video from '../pages/video/video.index';

import { routeNames } from './routes.constants';

const {

    FORGET_PASSWORD,
    FRIENDS,
    JOURNALS,
    LOGIN,
    MATCHMAKING,
    PANGYOU,
    PROFILE,
    PROFILEADD,
    PROFILEEDIT,
    PROFILEFRIEND,
    REGISTER,
    SETTINGS,
    SPLASH,
    VERIFICATION,
    WELCOME,
    CHAT

} = routeNames

const routes = [
    {
        name: FORGET_PASSWORD,
        component: ForgetPassword
    },
    {
        name: FRIENDS,
        component: Friends
    },
    {
        name: JOURNALS,
        component: Journals
    },
    {
        name: LOGIN,
        component: Login
    },
    {
        name: MATCHMAKING,
        component: Matchmaking
    },
    {
        name: PANGYOU,
        component: Pangyou
    },
    {
        name: PROFILE,
        component: Profile
    },
    {
        name: PROFILEADD,
        component: AddProfile
    },
    {
        name: PROFILEEDIT,
        component: EditProfile
    },
    {
        name: REGISTER,
        component: Register
    },
    {
        name: SETTINGS,
        component: Settings
    },
    {
        name: SPLASH,
        component: Splash
    },
    {
        name: VERIFICATION,
        component: Verification
    },
    {
        name: WELCOME,
        component: Welcome
    },
    {
        name: CHAT,
        component: Chat
    },
    {
        name: VIDEO,
        component: Video
    },
    {
        name: PROFILEFRIEND,
        component: FriendProfile
    },

]

export default routes;
