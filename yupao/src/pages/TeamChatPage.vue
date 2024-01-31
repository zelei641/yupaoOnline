<template>

  <van-sticky>
    <van-nav-bar
        :title="stats.teamName"
        left-arrow
        @click-left="onClickLeft"
    >
    </van-nav-bar>
  </van-sticky>

  <div class="chat-container">
    <div class="content" ref="chatRoom" v-html="context"></div>
    <van-cell-group inset style="position: fixed;bottom: 0;width: 100%">
      <van-field
          v-model="message"
          center
          clearable
          placeholder="聊点什么吧...."
      >
        <template #button>
          <van-button size="small" type="primary" @click="doMessage(message)" style="margin-right: 16px">发送</van-button>
        </template>
      </van-field>
    </van-cell-group>
  </div>


</template>
<script setup>
import {onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {showSuccessToast} from "vant";
import {getCurrentUser} from "../services/user";

const chatRoom = ref(null)
const route = useRoute()
const router = useRouter()
const message = ref('')
const data = ref('')
const context = ref('')
const user = ref();

const onClickLeft = () => {
  router.push("/")
};

const DEFAULT_TITLE = "聊天"
const title = ref(DEFAULT_TITLE)
const stats = ref({
  teamName:'11',
  teamId:0,
})
let lockReconnect = false;  //避免ws重复连接
let ws = null;          // 判断当前浏览器是否支持WebSocket
let wsUrl = "ws://localhost:8081/api/team/Chat";
createWebSocket(wsUrl);   //连接ws

/**
 * 加载初始数据
 * @param url
 */
onMounted( () => {
  let {teamName, teamId} = route.query
  stats.value.teamId = Number.parseInt(teamId)
  stats.value.teamName = teamName
  console.log(teamId)
  getCurrentPageUser()
})

/**
 * 获取当前用户信息
 * @param url
 */
const getCurrentPageUser = async () => {
  user.value = await getCurrentUser();
}


function createWebSocket(url) {
  try{
    if('WebSocket' in window){
      ws = new WebSocket(url);
    }
    initEventHandle();
  }catch(e){
    reconnect(url);
    console.log(e);
  }
}

function initEventHandle() {
  ws.onclose = function () {
    reconnect(wsUrl);
    console.log("llws连接关闭!"+new Date().toLocaleString());
  };
  ws.onerror = function () {
    reconnect(wsUrl);
    console.log("llws连接错误!");
  };
  ws.onopen = function () {
    heartCheck.reset().start();      //心跳检测重置
    console.log("llws连接成功!"+new Date().toLocaleString());
  };
  ws.onmessage = function (event) {    //如果获取到消息，心跳检测重置
    heartCheck.reset().start();      //拿到任何消息都说明当前连接是正常的
    console.log("llws收到消息啦:" +event.data);
    data.value = JSON.parse(event.data);
    console.log("data:" +data.value.userId);
    console.log(user.value.id)
    if (data.value.code === 0 && data.value.fromTeamId === stats.value.teamId && data.value.userId !== user.value.id)
    {
      let html = `
     <div class="message other">
        <img :alt=${stats.value.teamName} class="avatar"  src=${data.value.avatarUrl}>
      <div class="info">
        <p class="text" >${data.value.message}</p>
      </div>
     </div>

`
      context.value += html
      console.log(chatRoom.value.lastElementChild)
      if (chatRoom.value.lastElementChild)
      {
        chatRoom.value.lastElementChild.scrollIntoView()
      }

    }

  };
}
// 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
window.onbeforeunload = function() {
  ws.close();
}

function reconnect(url) {
  if(lockReconnect) return;
  lockReconnect = true;
  setTimeout(function () {     //没连接上会一直重连，设置延迟避免请求过多
    createWebSocket(url);
    lockReconnect = false;
  }, 2000);
}

//心跳检测
let heartCheck = {
  timeout: 120000,        //1分钟发一次心跳
  timeoutObj: null,
  serverTimeoutObj: null,
  reset: function(){
    clearTimeout(this.timeoutObj);
    clearTimeout(this.serverTimeoutObj);
    return this;
  },
  start: function(){
    let self = this;
    this.timeoutObj = setTimeout(function(){
      //这里发送一个心跳，后端收到后，返回一个心跳消息，
      //onmessage拿到返回的心跳就说明连接正常
      //ws.send("ping");
      //console.log("ping!")
      self.serverTimeoutObj = setTimeout(function(){//如果超过一定时间还没重置，说明后端主动断开了
        ws.close();     //如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
      }, self.timeout)
    }, this.timeout)
  }
}

/*
发送消息
 */
const doMessage = (messageSend) => {

  if (messageSend === '')
  {
    showSuccessToast('不能发送空消息')
    return;
  }

  let html = `
     <div class="message self">
      <div class="myInfo info">
         <img :alt=${user.value.username} class="avatar"  src=${user.value.avatarUrl}>
      </div>
       <p class="text">${messageSend}</p>
    </div>
`
  console.log(chatRoom.value.lastElementChild)
  context.value += html
  if (chatRoom.value.lastElementChild)
  {
    chatRoom.value.lastElementChild.scrollIntoView()
  }

  const messageRe ={
    teamId:stats.value.teamId,
    message:messageSend,
    avatarUrl:user.value.avatarUrl,
    userId:user.value.id,
  }
  if (messageSend === '')
  {
    showSuccessToast('不能发送空消息')
  }
  else {
    const messageReS = JSON.stringify(messageRe)
    ws.send(messageReS);
  }
}

</script>


<style>
.chat-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-y: auto;
}

.message {
  display: flex;
  align-items: center;
  margin: 10px 10px;
}

.content {
  padding-top: 22px;
  padding-bottom: 80px;
  display: flex;
  flex-direction: column
}

.self {
  align-self: flex-end;
}

.avatar {
  align-self: flex-start;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-right: 10px;
  margin-left: 10px;
}

.username {
  align-self: flex-start;
  text-align: center;
  max-width: 200px;
  font-size: 12px;
  color: #999;
  padding-bottom: 4px;
  white-space: nowrap;
  overflow: visible;
  background-color: #fff;
}

.info {
  display: flex;
  flex-direction: column;
  order: 2;
}

.myInfo {
  align-self: flex-start;
}

.text {
  padding: 10px;
  border-radius: 10px;
  background-color: #eee;
  word-wrap: break-word;
  word-break: break-all;
}

.other .text {
  align-self: flex-start;
}

.self .text {
  background-color: #0084ff;
  color: #fff;
}
</style>

