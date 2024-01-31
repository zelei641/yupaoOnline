<template>

    <van-nav-bar  v-if="title !== '聊天' && title !=='聊天室'"
        :title="title"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
    >
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>

  <div id="content">
    <router-view></router-view>
  </div>


  <van-tabbar route v-if="title !== '聊天' && title !== '聊天室'">
    <van-tabbar-item icon="home-o" name="index" replace to="/">主页</van-tabbar-item>
    <van-tabbar-item icon="search" name="team" replace to="/team">队伍页</van-tabbar-item>
    <van-tabbar-item icon="friends-o" name="user" replace to="/user">个人</van-tabbar-item>
  </van-tabbar>


</template>

<script setup lang="ts">
import {onBeforeUpdate, ref} from "vue";
import {showToast} from "vant";
import Index from "../pages/IndexPage.vue";
import Team from "../pages/TeamPage.vue";
import index from "../pages/IndexPage.vue";
import {onBeforeRouteLeave, useRoute, useRouter} from "vue-router";
import routes from "../config/route.js";

//引入router对象
const router = useRouter();
const route = useRoute();

//title
const title = ref('伙伴匹配');

const DEFAULT_TITLE = '伙伴匹配'

router.beforeEach((to, from) => {
  const topath = to.path;
  const route = routes.find((route) => {
    return topath === route.path
  })
  title.value =  route?.title ?? DEFAULT_TITLE;
})

//做路由的跳转 编程式导航
const onClickLeft = () => {
  router.back()
};
const onClickRight = () => {
  router.push('/search')
};

</script>

<style>

#content{
  padding-bottom: 50px;
}

</style>