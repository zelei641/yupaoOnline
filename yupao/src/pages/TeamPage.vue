<template>

    <div id="teamPage">

      <van-search v-model="searchText" placeholder="搜索队伍"  @search="onSearch"/>

      <van-tabs v-model:active="active" @change="onTabChange">
        <van-tab title="公开" name="public"></van-tab>
        <van-tab title="加密" name="private"></van-tab>
      </van-tabs>

      <div style="margin-bottom: 16px"></div>

      <team-card-list :team-list="teamList"/>
      <div style="height: 100px"></div>
      <van-button type="primary" class="add-button" icon="plus" @click="toAddTeam"></van-button>
      <van-empty v-if="teamList?.length<1" description="数据为空"/>
    </div>

</template>

<script setup>

import {useRouter} from "vue-router";
import TeamCardList from "../components/TeamCardList.vue";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/my-Axios";
import {showFailToast, showSuccessToast} from "vant";


const active = ref('public')
//用户页面跳转
const router = useRouter()
const searchText = ref("");

/**
 * 切换查询状态
 * @param name
 */
const onTabChange = (name) => {
  //查公开
  if (name === 'public')
  {
    console.log(name)
    listTeam(searchText.value,0);
  } else {
    //查加密
    listTeam(searchText.value,2);
  }
}

//跳转到创建队伍页
const toAddTeam = () => {
  router.push({
    path:"/team/add"
  })
}

const teamList = ref([]);

/**
 * 搜索队伍
 * @param val
 * @param status
 * @returns {Promise<void>}
 */
const listTeam = async (val = '', status) => {
  const res = await myAxios.get("/team/list",{
    params:{
      searchText:val,
      pageNum:1,
      status,
    }
  });
  if (res?.code === 0)
  {
    teamList.value = res.data;
  }
  else
  {
    showFailToast('加载队伍失败请刷新重试');
  }
}


//页面加载时触发一次
onMounted(async () => {
  listTeam(searchText.value,0);
})


const onSearch = async (val) => {
  listTeam(val)
}

</script>

<style scoped>

</style>