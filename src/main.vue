<template>
  <div>
    <el-config-provider :locale="zhCn">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<script setup>
import * as echarts from "echarts";
// 引入中文包
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
if (localStorage.getItem("theme")) {
  document.body.dataset.theme = localStorage.getItem("theme");
} else {
  document.body.dataset.theme = "purple";
  localStorage.setItem("theme", "blue");
}


import { provide } from "vue";
provide("echarts", echarts);
// export default {
//   name: "Main",
//   created() {
//     document.body.dataset.theme = "blue";
//     console.log(this.$echarts, "图标");
//   },
//   data() {
//     return {};
//   },
// };
</script>

<style lang="less" scoped>
</style>
