<template>

  <div id="teamCardList">

    <van-card
        v-for="team in props.teamList"
        :desc="team.description"
        :title="`${team.name}`"
        thumb="https://cdn.acwing.com/media/user/profile/photo/71167_lg_4c4d93255b.jpg"
    >
      <template #tags>
        <van-tag plain type="primary" style="margin-right: 8px; margin-top: 8px">
          {{ teamStatusEnum[team.status] }}
        </van-tag>
      </template>

      <template #bottom>
        <div>
          {{ `队伍人数: ${team.hasJoinNum} / ${team.maxNum}`}}
        </div>
        <div v-if="team.expireTime">
          {{ '过期时间:' + team.expireTime}}
        </div>
        <div>
          {{ '创建时间:' + team.createTime}}
        </div>
      </template>

      <template #footer>

        <van-button plain v-if="team.hasJoin"
                    type="success" size="small" @click="teamChat(team)">聊天室</van-button>

        <van-button  plain type="primary" size="small" v-if="team.userId !== currentUser?.id && !team.hasJoin"
                     @click="preJoinTeam(team)">加入队伍</van-button>
        <van-button v-if="team.userId === currentUser?.id" plain
                    size="small" @click="doUpdateTeam(team.id)">更新队伍</van-button>



        <van-button plain v-if="team.userId !== currentUser?.id &&  team.hasJoin"
                    size="small" @click="doQuitTeam(team.id)">退出队伍</van-button>


        <van-button v-if="team.userId === currentUser?.id" plain type="danger"
                    size="small" @click="doDeleteTeam(team.id)">解散队伍</van-button>
      </template>

    </van-card>

    <van-dialog v-model:show="showPasswordDialog" title="请输入密码" show-cancel-button
                @confirm="doJoinTeam" @cancel="doJoinCancel">
      <van-field v-model="password" placeholder="请输入密码" />
    </van-dialog>


  </div>

</template>

<script setup lang="ts">

import {showFailToast, showSuccessToast} from "vant";
import {teamStatusEnum} from "../constants/team";
import {TeamType} from "../models/team";
import myAxios from "../plugins/my-Axios";

import {onMounted, ref} from "vue";
import {getCurrentUser} from "../services/user";
import {useRouter} from "vue-router";

const router = useRouter()
const currentUser = ref({});
const showPasswordDialog = ref(false);
const password = ref('');
const joinTeamId = ref();
const preJoinTeam = (team:TeamType) => {
  joinTeamId.value = team.id
  if(team.status === 0) {
    doJoinTeam()
  } else {
    showPasswordDialog.value = true;
  }
}

interface TeamCardListProps{
  teamList: TeamType[];
}
const props = withDefaults(defineProps<TeamCardListProps>(),{
  //@ts-ignore
  teamList: [] as TeamType[],
});

const doJoinCancel = () =>{
  password.value = "";
  joinTeamId.value = 0;
}

onMounted(async () => {
  currentUser.value = await getCurrentUser()
})

/**
 * 加入队伍
 * @param id
 */
const doJoinTeam = async () => {

  if (!joinTeamId.value)
  {
    return;
  }

  const res = await myAxios.post('/team/join',{
    teamId:joinTeamId.value,
    password:password.value,
  })
  if (res?.code == 0)
  {
    showSuccessToast('加入成功')
    doJoinCancel()
  }
  else {
    showFailToast('加入失败' + (res.descript ? `,${res.descript}` : ''))
  }
}

/**
 * 跳转至更新队伍页
 * @param id
 */
const doUpdateTeam = (id:Number) => {
  router.push({
    path:"/team/update",
    query:{
      id,
    }
  })
}

const doQuitTeam = async (id:number) => {

  const res = await myAxios.post('/team/quit',{
    teamId:id
  })
  if (res?.code == 0)
  {
    showSuccessToast('操作成功')
  }
  else {
    showFailToast('操作失败' + (res.descript ? `,${res.descript}` : ''))
  }

}

const doDeleteTeam = async(id:number) => {

  const res = await myAxios.post('/team/delete',{
    id,
  })
  if (res?.code == 0)
  {
    showSuccessToast('操作成功')
  }
  else {
    showFailToast('操作失败' + (res.descript ? `,${res.descript}` : ''))
  }

}

const teamChat = (team) => {
  router.push({
    path:'/team/chat',
    query:{
      teamName:team.name,
      teamId:team.id,
    }
  })

}


</script>

<style scoped>
#teamCardList:deep(.van-image__img){
  height: 125px;
  object-fit: unset;
}
</style>
