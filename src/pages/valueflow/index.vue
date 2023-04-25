<template>
  <el-upload
    v-model:file-list="fileList"
    multiple
    :limit="1"
    :before-upload="beforeUpdate"
  >
    <el-button type="primary">选择文件</el-button>
  </el-upload>
  <el-button @click="check">准备上传</el-button>
</template>

<script setup>
import { ref } from "vue";
const fileList = ref([]);
let formData = new FormData();
const beforeUpdate = function (file) {
  console.log(file, "文件");
  // console.log(fileList, "文件列表");
  formData.append("file", file);
  formData.append("id", "222");
  formData.append("name", "wjt");
  console.log(formData, "什么1");
  //  formData.append(file)
};
const check = function () {
  console.log(formData.get("file"), "什么");
};
</script>

<style lang="less" scoped>
</style>
