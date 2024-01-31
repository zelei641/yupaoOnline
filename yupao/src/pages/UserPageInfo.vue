<template>

  <van-row justify="center">
    <van-image
        round
        fit="cover"
        width="10rem"
        height="10rem"
        :src="stats.avatarUrl"
    />
  </van-row>

  <van-cell-group inset>
    <van-cell title="昵称" arrow-direction="down" :value="stats.username" />

    <van-cell title="用户标签" arrow-direction="down">

    <van-tag plain type="primary" v-for="tag in stats.userTags" style="margin-right: 8px; margin-top: 8px">
      {{ tag }}
    </van-tag>

    </van-cell>

    <van-cell title="性别" arrow-direction="down" :value="stats.username" >
      <span v-if="stats?.gender==='1'">男</span>
      <span v-else-if="stats?.gender==='0'">女</span>
      <span v-else-if="stats?.gender==='2'">保密</span>
    </van-cell>

    <van-cell title="邮箱" arrow-direction="down" :value="stats.email" />
  </van-cell-group>


  <div style="margin: 16px;">
    <van-button round block type="warning" @click="toChat">联系我</van-button>
  </div>


</template>

<script setup>

import {onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";

const route = useRoute()
const router = useRouter()
const stats = ref({
  username:'11',
  id:'',
  avatarUrl:'',
  userTags: {},
  gender:'2',
  email:'',

})
onMounted( () => {
  let {id, username, avatarUrl,userTag, gender, email} = route.query
  stats.value.id = id
  stats.value.username = username
  stats.value.avatarUrl = avatarUrl
  stats.value.userTags = userTag
  stats.value.gender = gender
  stats.value.email = email
})

const toChat = () => {
  router.push({
    path: "/myChat",
    query: {
      id: stats.value.id,
      username: stats.value.username,
      avatarUrl:stats.value.avatarUrl,
    }
  })
}

</script>

<style scoped>

</style>