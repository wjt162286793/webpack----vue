<template>
  <router-view></router-view>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
const route = useRoute();
const router = useRouter();
if (route.name === "task") {
  router.push({
    name: "taskList",
  });
}

watch(route, (newVal, oldVal) => {
  // console.log(newVal, oldVal, "路由值变化");
  if (newVal.name === "task") {
    router.push({
      name: "taskList",
    });
  }
});
</script>

<style lang="less" scoped>
</style>
