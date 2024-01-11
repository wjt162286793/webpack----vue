<template>
  <router-view></router-view>
</template>

<script setup>
import * as VueRouter from "vue-router"
const route = VueRouter.useRoute();
const router = VueRouter.useRouter();
if (route.name === "entiry") {
  router.push({
    name: "entiryList",
  });
}

watch(route, (newVal, oldVal) => {
  // console.log(newVal, oldVal, "路由值变化");
  if (newVal.name === "entiry") {
    router.push({
      name: "entiryList",
    });
  }
});
</script>

<style lang="less" scoped>
</style>
