<template>
  <el-row>
    <el-col :span="8">
      <div class="box" @click="jump('financeStatic')">
        <img src="@/assets/img/财务统计.png" alt="" />
        <h4>财务统计</h4>
      </div>
    </el-col>
    <el-col :span="8">
      <div class="box" @click="jump('personStatic')">
        <img src="@/assets/img/人员统计.png" alt="" />
        <h4>人员统计</h4>
      </div>
    </el-col>
    <el-col :span="8">
      <div class="box" @click="jump('entiryStatic')">
        <img src="@/assets/img/实体统计.png" alt="" />
        <h4>实体统计</h4>
      </div>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="8">
      <div class="box" @click="jump('dataStatic')">
        <img src="@/assets/img/数据统计.png" alt="" />
        <h4>数据统计</h4>
      </div>
    </el-col>
    <el-col :span="8">
      <div class="box" @click="jump('commutationStatic')">
        <img src="@/assets/img/通信记录.png" alt="" />
        <h4>通信记录</h4>
      </div>
    </el-col>
    <el-col :span="8">
      <div class="box" @click="jump('materialStorage')">
        <img src="@/assets/img/物资仓库.png" alt="" />
        <h4>物资仓库</h4>
      </div>
    </el-col>
  </el-row>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
const jump = function (flag) {
  router.push({
    name: flag,
  });
};
</script>

<style lang="less" scoped>
.box {
  cursor: pointer;
  height: 180px;
  //   background: red;
  margin: 25px;
  box-shadow: 2px 2px 2px #eeeeee;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 40px;
    height: 40px;
  }
  h4 {
    font-size: 40px;
    color: #409eff;
    margin-left: 20px;
  }
}
.box:hover {
  box-shadow: 4px 4px 4px #a18686;
  transform: translate(-10px, -10px);
}
</style>

