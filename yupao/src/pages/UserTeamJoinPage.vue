<template>

  <div id="teamPage">
    <van-search v-model="searchText" placeholder="搜索队伍"  @search="onSearch"/>
    <team-card-list :team-list="teamList"/>
    <van-empty v-if="teamList?.length<1" description="您没有加入任何队伍"/>
  </div>


</template>

<script setup>

import {useRouter} from "vue-router";
import TeamCardList from "../components/TeamCardList.vue";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/my-Axios";
import {showFailToast, showSuccessToast} from "vant";
//用户页面跳转
const router = useRouter()

const searchText = ref("");

//跳转到加入队伍页
const doJoinTeam = () => {
  router.push({
    path:"/team/add"
  })
}

const teamList = ref([]);

/**
 * 搜索队伍
 * @param val
 * @returns {Promise<void>}
 */
const listTeam = async (val = '') => {
  const res = await myAxios.get("/team/list/my/join",{});
  if (res?.code === 0)
  {
    teamList.value = res.data;
    console.log(1)
    console.log(teamList.value)
    showSuccessToast('请求成功')
  }
  else
  {
    console.log(1)
    console.log(res)
    showFailToast('加载队伍失败请刷新重试');
  }
}

//页面加载时触发一次
onMounted(async () => {
  listTeam();
})


const onSearch = async (val) => {
  listTeam(val)
}

</script>

<style scoped>

</style>