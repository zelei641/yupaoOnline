<template>

  <template v-if="user">
    <van-cell title="昵称" is-link to="/user/edit" :value="user.username " @click="toEdit('username','昵称',user.username)"/>
    <van-cell title="用户账号" is-link to="/user/edit" :value="user.userAccount" @click="toEdit('userAccount','账号',user.userAccount)"/>
    <van-cell title="头像" is-link to="/user/edit" @click="toEdit('avatarUrl','头像',user.avatarUrl)">
      <img style="height: 18px;" :src="user.avatarUrl"/>
    </van-cell>
    <van-cell title="电话" is-link to="/user/edit"  :value="user.phone" @click="toEdit('phone','电话',user.phone)" />
    <van-cell title="邮箱" is-link to="/user/edit"  :value="user.email" @click="toEdit('email','邮箱',user.email)"/>

    <van-cell title="性别" is-link to="/user/edit" @click="toEdit('gender','性别',user.gender)">
      <span v-if="user?.gender===1">男</span>
      <span v-else-if="user?.gender===0">女</span>
      <span v-else-if="user?.gender===2">保密</span>
    </van-cell>

    <van-cell title="用户标签" arrow-direction="down" :value="user.tags" />
    <van-cell title="邀请码" arrow-direction="down" :value="user.pCode" />
    <van-cell title="注册时间" arrow-direction="down" :value="user.createTime.toString()" />
  </template>

  <div style="margin: 16px;">
    <van-button round block plain hairline type="primary" @click="userLogin">切换用户</van-button>
  </div>

  <div style="margin: 16px;">
    <van-button round block type="warning" @click="userChangeTag">更换标签</van-button>
  </div>

</template>

<script setup lang="ts">

import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/my-Axios";
import {showFailToast, showSuccessToast} from "vant";
import {getCurrentUser} from "../services/user";


const user = ref();
const router = useRouter();

//获取当前用户登录的信息
onMounted(async () => {
  user.value = await getCurrentUser();
})


const toEdit = (editKey: string,editName: string,currentValue: string) => {

  router.push({
    path:'/user/edit',
    query:{
      editKey,
      editName,
      currentValue,
    },
  })
}

const userLogin = () => {
  router.push('/user/login')
}

const userChangeTag = () => {
  router.push('/user/change/tags')
}

</script>

<style scoped>

</style>