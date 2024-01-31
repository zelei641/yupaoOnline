<template>

  <user-card-list :user-list="userList" />

  <van-empty v-if="loading == true" description="数据请求中"/>

  <van-empty v-if="loading == false && (!userList || userList.length < 1)" description="数据为空"/>


</template>

<script setup lang="ts">
import 'vant/lib/index.css'
import qs from 'qs' //处理请求参数的库
import {onMounted, ref} from 'vue';
import {useRoute} from "vue-router";
import myAxios from "../plugins/my-Axios.ts";
import {showFailToast, showSuccessToast} from "vant";
import UserCardList from "../components/UserCardList.vue";
import {UserType} from "../models/user";


const route = useRoute()

const userList = ref([]);

//取出从搜索页面传递过来的参数（需要搜索的标签）
const {tags} = route.query;
const loading = ref(true);


//初始化的Dom元素加载好了之后执行这个方法
onMounted(async () =>{
  // Optionally the request above could also be done as
  const userListData = await  myAxios.get('/user/search/tags', {
    params: {
      tagNameList:tags
    },
    paramsSerializer: params => {
      return qs.stringify(params, { indices: false })
    }
  })
    .then(function (response) {
      //相应正确
      console.log('/user/search/tags success', response);
      showSuccessToast('请求成功')
      return response?.data;
    })
    .catch(function (error) {
      console.error('/user/search/tags error', error);
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
  loading.value = false;

})




// const mockUser = {
//     id:12345,
//     username:"zelei",
//     userAccount:"456",
//     avatarUrl:"https://cdn.acwing.com/media/user/profile/photo/312017_lg_403c613551.jpg",
//     profile:"一名精神小伙,目前还有头发，谢谢大家，啊八啊吧啊吧啊吧八八八",
//     gender: 0,
//     phone:"12345678910",
//     email:"2962006502@qq.com",
//     userRole:1,
//     createTime:new Date(),
//     tags:["java","emo", "打工中","java","emo", "打工中","java","emo", "打工中","java","emo", "打工中"],
//     pCode:"1234",
//   }


console.log(userList)


</script>

<style scoped>

</style>