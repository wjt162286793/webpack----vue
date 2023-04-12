<template>
  <div class="box">{{ msg }}</div>
</template>

<script>
export default {
  name: "Main",
  data() {
    return {
      msg: "webpack to vue : success",
    };
  },
};
</script>

<style lang="less" scoped>
.box {
  color: red;
}
</style>
