<template>

  <van-card
      v-for="user in props.userList"
      :desc="user.profile"
      :title="`${user.username} (${user.pCode})`"
      :thumb="user.avatarUrl"
  >
    <template #tags>
      <van-tag plain type="primary" v-for="tag in user.tags" style="margin-right: 8px; margin-top: 8px">
        {{ tag }}
      </van-tag>
    </template>

    <template #footer>
      <van-button size="small" @click="toInfo(user)">用户详情</van-button>
      <van-button size="small" plain type="primary" @click="toChat(user)">联系我</van-button>
    </template>


  </van-card>


</template>

<script setup lang="ts">

import {UserType} from "../models/user";
import {useRouter} from "vue-router";


const router = useRouter()

/**
 * 获取上一层传来的数据
 */
interface UserCardListProps{
  loading:boolean;
  userList:UserType[];
}

const props =withDefaults(defineProps<UserCardListProps>(),{
  loading:true,
  userList:[] as UserType[],
})

const toChat = (user) => {
  router.push({
    path: "/myChat",
    query: {
      id: user.id,
      username: user.username,
      avatarUrl:user.avatarUrl,
    }
  })
}

const toInfo = (user) => {
  router.push({
    path: "/user/info",
    query: {
      id: user.id,
      username: user.username,
      avatarUrl:user.avatarUrl,
      userTag:user.tags,
      gender:user.gender,
      email:user.email
    }
  })
}

</script>

<style scoped>

</style>