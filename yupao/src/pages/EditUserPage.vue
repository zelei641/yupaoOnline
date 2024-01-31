<template>

  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="editUser.currentValue"
          :name="editUser.editKey"
          :label="editUser.editName"
          :placeholder="`请输入${editUser.editName}`"
          :rules="[{ required: true, message: '请填写信息' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>


</template>

<script setup lang="ts">

import 'vant/lib/index.css'
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/my-Axios";
import {showFailToast, showSuccessToast} from "vant";
import {getCurrentUser} from "../services/user";

const route = useRoute();
const router = useRouter();


const editUser = ref({
  editKey : route.query.editKey,
  currentValue : route.query.currentValue,
  editName : route.query.editName,
})

onMounted(() => {
  if (route.query.editName === '性别')
  {
    showFailToast('请注意 1代表男 0代表女 其他的值无效')
  }
})

const onSubmit = async () => {
  const current = await getCurrentUser();

  //如果当前没有用户登录
  if (!current)
  {
    showFailToast('用户未登录');
    return ;
  }

  //给后端发送请求
  const res = await myAxios.post('/user/update',{
    //动态的传值 editUser.value.editKey=“username” 那就是“username”:editUser.value.currentValue
    'id':current.id,
    [editUser.value.editKey as string]:editUser.value.currentValue,
  })
  if (res.code == 0 && res.data > 0)
  {
    showSuccessToast('修改成功');
    router.back();
  }
  else
  {
    showFailToast('请求失败');
  }

}


</script>

<style scoped>

</style>