<template>

  <van-cell center title="心动模式">
    <template #right-icon>
      <van-switch v-model="isMatchMode" />
    </template>
  </van-cell>

  <user-card-list :user-list="userList" :loading="loading"/>

  <van-empty v-if="loading == true" description="数据请求中"/>

  <van-empty v-if="loading == false && (!userList || userList.length < 1)" description="数据为空"/>

</template>

<script setup lang="ts">

import qs from 'qs' //处理请求参数的库
import {onMounted, ref, watchEffect} from 'vue';
import {useRoute} from "vue-router";
import myAxios from "../plugins/my-Axios.ts";
import {showFailToast, showSuccessToast} from "vant";
import UserCardList from "../components/UserCardList.vue";
import {UserType} from "../models/user";


const route = useRoute()
const isMatchMode = ref<boolean>(false)
const userList = ref([])
const loading = ref(true);


/**
 * 加载数据
 */
const loadData = async () => {
  let userListData = []
  loading.value = true
  if (isMatchMode.value)
  {
    //心动模式
    const num = 10;
    userListData = await  myAxios.get('/user/match', {
      params: {
        num
      }})
        .then(function (response) {
          //相应正确
          console.log('/user/recommend success', response);
          showSuccessToast('请求成功')
          return response?.data;
        })
        .catch(function (error) {
          console.error('/user/recommend error', error);
          showFailToast('请求失败')
        });

    if (userList)
    {
      //把json数据转换成数组
      userListData.forEach((user:UserType) => {
        if (user.tags)
        {
          user.tags = JSON.parse(user.tags);
        }
      })
      userList.value = userListData;
    }
  }
  else {
    //普通模式
     userListData = await  myAxios.get('/user/recommend', {
      params: {
        pageSize: 8,
        pageNum: 1,
      },
      paramsSerializer: params => {
        return qs.stringify(params, { indices: false })
      }
    })
        .then(function (response) {
          //相应正确
          showSuccessToast('请求成功')
          return response?.data?.records;
        })
        .catch(function (error) {
          showFailToast('请求失败')
        });

    console.log(userListData)
    if (userList)
    {
      //把json数据转换成数组
      userListData.forEach((user:UserType) => {
        if (user.tags)
        {
          user.tags = JSON.parse(user.tags);
        }
      })
      userList.value = userListData;
    }
  }
  loading.value=false

}

/**
 * 改变模式后 重新加载数据
 */
watchEffect(() => {
  userList.value =[];
  loadData();
})



</script>

<style scoped>

</style>