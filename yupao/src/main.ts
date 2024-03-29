import { createApp } from 'vue';
import App from "./App.vue";
import { Button,NavBar} from 'vant';
import * as VueRouter from 'vue-router'
import routes from "./config/route";
import '../global.css'



const app = createApp(App);
app.use(Button);
app.use(NavBar);


// 创建路由实例并传递 `routes` 配置
const router = VueRouter.createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: VueRouter.createWebHistory(),
    routes: routes,
})

app.use(router)
app.mount('#app');

