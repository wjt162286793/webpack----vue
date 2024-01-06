<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script setup>
if (localStorage.getItem("theme")) {
  document.body.dataset.theme = localStorage.getItem("theme");
} else {
  document.body.dataset.theme = "purple";
  localStorage.setItem("theme", "blue");
}

import * as echarts from "echarts";
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
