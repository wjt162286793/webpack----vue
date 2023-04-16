<template>
  <div>
    <!-- <el-button type="primary" @click="createVueFile">创建vue文件</el-button> -->
    <span>账号: {{ userInfo.name }}</span>
    <br />
    <span>密码: {{ userInfo.password }}</span>
    <br />
    <span>用户标识: {{ userInfo.token }}</span>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "dashboard",
  created() {
    console.log(this.$store.state.user.userInfo, "vuex");
    this.userInfo = this.$store.state.user.userInfo;
  },
  methods: {
    createVueFile() {
      this.$axios.get("app/user/createVue").then((res) => {
        console.log(res);
      });
    },
  },
};
</script>

<style lang="less" scoped>
</style>
