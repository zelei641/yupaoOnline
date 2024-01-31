<template>

    <form action="/">
      <van-search
          v-model="searchText"
          show-action
          placeholder="请输入搜索标签"
          @search="onSearch"
          @cancel="onCancel"
      />
    </form>


  <van-divider content-position="left">已选标签</van-divider>
  <div v-if="activeIds.length === 0"> 请选择标签 </div>

  <van-row gutter="16" style="padding: 0 16px;">
    <van-col v-for="tag in activeIds">
      <van-tag  closeable size="samll" type="primary" @close="doClose(tag)">
        {{ tag }}
      </van-tag>
    </van-col>
  </van-row>

  <van-divider content-position="left">选择标签</van-divider>

  <van-tree-select
      v-model:active-id="activeIds"
      v-model:main-active-index="activeIndex"
      :items="tagList"
  />

  <div style="padding: 20px">
    <van-button block type="primary" @click="doSreachResult"> 搜索 </van-button>
  </div>

</template>

<script setup>

import { ref } from 'vue';
import { showToast } from 'vant';
import {useRouter} from "vue-router";

const router = useRouter()
const value = ref('');
const searchText = ref('');


const originTagList = [//标签列表
  {
    text: '性别',
    children: [
      { text: '男', id: '男' },
      { text: '女', id: '女' },
    ],
  },
  {
    text: '年级',
    children: [
      { text: '大一', id: '大一' },
      { text: '大二', id: '大二' },
      { text: '大三', id: '大三' },
      { text: '大四', id: '大四' },
      { text: '研一', id: '研一' },
      { text: '研二', id: '研二' },
      { text: '研三', id: '研三' },
    ],
  },
  {
    text: '兴趣方向',
    children: [
      { text: '科幻', id: '科幻' },
      { text: '励志', id: '励志' },
      { text: '文学', id: '文学' },
      { text: '言情', id: '言情' },
      { text: '玄幻', id: '玄幻' },
      { text: '社科教育', id: '社科教育' },
      { text: '悬疑', id: '悬疑' },
    ],
  },
]


//将tagList定义成响应式对象 不然的话更改tagList式不会立即改变页面的
let tagList = ref(originTagList);

/**
 * 移除标签
 */
const doClose = (tag) => {
  activeIds.value = activeIds.value.filter(item => {
    return item !== tag;
  })
}

/**
 * 搜索过滤
 */
const onSearch = () => {

  tagList.value = originTagList
      .map(parentTag => { //parentTag是一个对象
        const tempchildren = [...parentTag.children];
        const tempParentTag = {...parentTag}; //tempParentTag是一个对象
        tempParentTag.children = tempchildren.filter(item => item.text.includes(searchText.value))
        return tempParentTag //返回的是一个对象
      })

};

/**
 * 清空标签
 */
const onCancel = () => {
  searchText.value = '';
  tagList.value = originTagList
};

//已选中的标签
const activeIds = ref([]);
const activeIndex = ref(0);

/**
 * 执行搜索
 */
const doSreachResult = () => {
  router.push({
    path:'/user/list',
    query:{
      tags:activeIds.value
    }
  })
}



</script>

<style scoped>

</style>