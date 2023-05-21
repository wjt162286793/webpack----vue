<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Main",
  created() {
    document.body.dataset.theme = "blue";
  },
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
</style>
