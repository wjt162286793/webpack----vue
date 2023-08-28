<template>
  <div class="contentBox">
    <el-tabs type="border-card">
      <el-tab-pane label="用户列表">
        <UserList></UserList>
      </el-tab-pane>
      <el-tab-pane label="角色管理">
        <Role></Role>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script setup>
import UserList from "./userList.vue";
import Role from "./role.vue";
</script>
<style lang="less" scoped>
.contentBox {
  height: 100%;
}
::v-deep(.el-tabs--border-card) {
  border-bottom: none !important;
}
</style>