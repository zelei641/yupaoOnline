<template>

  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="addTeamData.name"
          name="userAccount"
          label="队伍名"
          placeholder="请输入队伍名"
          :rules="[{ required: true, message: '请输入用户名' }]"
      />
      <van-field
          v-model="addTeamData.description"
          rows="4"
          autosize
          label="队伍描述"
          type="textarea"
          placeholder="请输入队伍描述"
      />

      <van-field
          label="时间选择"
          :placeholder="addTeamData.expireTime ?? '请输入过期时间'"
          @click="showPicker = true"
      />
      <van-date-picker v-if="showPicker === true"

                       v-model="addTeamData.expireTime"
                       title="请选择过期时间"
                       @confirm="showPicker = false"
                       @cancel="showPicker = false"
                       :min-date = minDate
      />


      <van-field name="radio" label="队伍状态">
        <template #input>
          <van-radio-group v-model="addTeamData.status" direction="horizontal">
            <van-radio name="0">公开</van-radio>
            <van-radio name="1">私有</van-radio>
            <van-radio name="2">加密</van-radio>
          </van-radio-group>
        </template>
      </van-field>


      <van-field
          v-if="Number(addTeamData.status) === 2"
          v-model="addTeamData.password"
          type="password"
          name="password"
          label="密码"
          placeholder="请输入队伍密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />

    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>

</template>

<script setup>

import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/my-Axios";
import {showFailToast, showSuccessToast} from "vant";

const router = useRouter()
const route = useRoute()

//展式日期选择器
const showPicker = ref(false)


const minDate = new Date();
//需要用户填写的表单数据
const addTeamData = ref({})

const id =  route.query.id;


//获取之前的用户信息
onMounted(async () => {
  if (id <= 0)
  {
    showSuccessToast('加载信息失败')
  }

  const res = await myAxios.get("/team/get",{
    params:{
        id:id
    }
  });
  if (res?.code === 0)
  {
    addTeamData.value = res.data;
    addTeamData.value.expireTime = []
    console.log(typeof addTeamData.value.expireTime)
    showSuccessToast('请求成功')
  }
  else
  {
    showFailToast('加载队伍失败请刷新重试');
  }
})

const onSubmit = async () => {
  const postData = {
    ...addTeamData.value,
    expireTime:new Date(addTeamData.value.expireTime),
    status: Number(addTeamData.value.status)
  }
  //TODO:前端参数校验
  const res = await myAxios.post("/team/update",postData)
  if (res?.code === 0)
  {
    showSuccessToast('更新成功')
    router.push({
      path:'/team',
      replace:true, //点击提交之后 在后退也回不到这个页面了
    });
  } else {
    showFailToast("更新失败")
  }
}

</script>

<style scoped>

</style>