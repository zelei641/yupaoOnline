<template>
  <div>
    <button @click="addDiv">添加div</button>
    <div v-html="newDivContent"></div>
  </div>
</template>

<script setup>

import {ref} from "vue";

const newDivContent = ref('')

const addDiv = () =>  {
  newDivContent.value += '<div>这是一个动态添加的div</div>';
}



</script>