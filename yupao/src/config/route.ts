//定义一些路由
import IndexPage from "../pages/IndexPage.vue";
import TeamPage from "../pages/TeamPage.vue";
import EditUserPage from "../pages/EditUserPage.vue";
import SearchPage from "../pages/SearchPage.vue";
import UserPage from "../pages/UserPage.vue";
import SearchResultPage from "../pages/SearchResultPage.vue";
import UserLoginPage from "../pages/UserLoginPage.vue";
import TeamAddPage from "../pages/TeamAddPage.vue";
import TeamUpdatePage from "../pages/TeamUpdatePage.vue";
import UserUpdatePage from "../pages/UserUpdatePage.vue";
import UserTeamJoinPage from "../pages/UserTeamJoinPage.vue";
import UserTeamCreatePage from "../pages/UserTeamCreatePage.vue";
import UserRegisterPage from "../pages/UserRegisterPage.vue";
import UserChangeTags from "../pages/UserChangeTags.vue";
import ChatPage from "../pages/ChatPage.vue";
import MyChatPage from "../pages/MyChatPage.vue";
import Test from "../pages/Test.vue";
import UserPageInfo from "../pages/UserPageInfo.vue";
import TeamChatPage from "../pages/TeamChatPage.vue";

const routes = [
    { path: '/', component: IndexPage },
    { path: '/team', title:"找队伍", component: TeamPage },
    { path: '/user',  title:"用户信息", component: UserPage },
    { path: '/search', title:"找伙伴", component: SearchPage },
    { path: '/user/list',title:"用户列表", component: SearchResultPage },
    { path: '/user/edit', title:"编辑信息", component: EditUserPage },
    {path: '/user/login', title:"用户登录", component: UserLoginPage},
    {path: '/team/add', title:"创建队伍", component: TeamAddPage},
    {path: '/team/update', title:"更新队伍", component: TeamUpdatePage},
    {path: '/user/update', title:"当前信息", component: UserUpdatePage},
    {path: '/user/team/join', title:"我加入的队伍", component: UserTeamJoinPage},
    {path: '/user/team/create', title:"我创建的队伍", component: UserTeamCreatePage},
    {path: '/user/register', title:"用户注册", component: UserRegisterPage},
    {path: '/user/change/tags', title:"更改标签", component: UserChangeTags},
    {path: '/chat',component: ChatPage, meta: {layout: 'chat'}},
    {path: '/myChat',title:'聊天', component: MyChatPage, meta: {layout: 'chat'}},
    {path: '/user/info',title:'用户详情', component: UserPageInfo},
    {path: '/team/chat',title:'聊天室', component: TeamChatPage},
    {path: '/test', component: Test},
]

export default routes