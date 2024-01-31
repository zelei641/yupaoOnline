<template>

  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="userAccount"
          name="userAccount"
          label="账号"
          placeholder="请输入账号"
          :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
          v-model="userPassword"
          type="password"
          name="userPassword"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
          v-model="checkPassword"
          type="password"
          name="checkPassword"
          label="确认密码"
          placeholder="请输入确认密码"
          :rules="[{ required: true, message: '请确认密码' }]"
      />
      <van-field
          v-model="pCode"
          type="password"
          name="pCode"
          label="邀请码"
          placeholder="请输入邀请码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>

  <div style="margin: 16px;">
    <van-button round block plain hairline type="primary" @click="userLogin">登录</van-button>
  </div>

  <div style="margin: 16px;">
    <van-button round block plain hairline type="success" @click="getPcode">获取邀请码</van-button>
  </div>


</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import { ref } from 'vue';
import myAxios from "../plugins/my-Axios";
import {showFailToast, showSuccessToast, showToast} from "vant";

const router = useRouter();
const route = useRoute();
const userAccount = ref('');
const userPassword = ref('');
const checkPassword = ref('');
const pCode = ref('');

const onSubmit = async () => {
  const res = await myAxios.post('/user/register',
      {
        userAccount:userAccount.value,
        userPassword:userPassword.value,
        checkPassword:checkPassword.value,
        pCode:pCode.value
      })
  console.log(res, '用户注册');
  if (res.code === 0 && res.data)
  {
    showSuccessToast('注册成功')
    //跳转到之前的页面
    const redirectUrl = route.query?.redirect as String ?? '/';
    window.location.href = redirectUrl;
  }
  else
  {
    showFailToast('注册失败')
  }
}

const userLogin = () => {
  router.replace('/user/login')
}

const getPcode = () => {
  showToast("请关注Yit Code Master公众号获取邀请码");
}

</script>

<style scoped>

</style>