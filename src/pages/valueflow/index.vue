<template>
  <router-view></router-view>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
const route = useRoute();
const router = useRouter();
if (route.name === "valueflow") {
  router.push({
    name: "valueflowList",
  });
}

watch(route, (newVal, oldVal) => {
  // console.log(newVal, oldVal, "路由值变化");
  if (newVal.name === "valueflow") {
    router.push({
      name: "valueflowList",
    });
  }
});
</script>

<style lang="less" scoped>
</style>
