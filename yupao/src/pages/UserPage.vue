<template>

  <template v-if="user">
    <van-cell title="当前用户" :value="user?.username" />
    <van-cell title="修改信息" is-link to="/user/update" />
    <van-cell title="我创建的队伍" is-link to="/user/team/create" />
    <van-cell title="我加入的队伍" is-link to="/user/team/join" />

  </template>
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


</script>

<style scoped>

</style>