<template>
    <h4>题目1</h4>
  <el-row>
    <el-col :span="12">111</el-col>
    <el-col :span="12">222</el-col>
    <el-col :span="12">111</el-col>
    <el-col :span="12">222</el-col>
    <el-col :span="12">111</el-col>
    <el-col :span="12">222</el-col>
    <el-col :span="12">111</el-col>
    <el-col :span="12">222</el-col>
    <el-col :span="12">111</el-col>
    <el-col :span="12">222</el-col>
  </el-row>
  <h4>题目2</h4>
  <el-row>
    <el-col :span="12">111</el-col>
    <el-col :span="12">222</el-col>
    <el-col :span="12">111</el-col>
    <el-col :span="12">222</el-col>
    <el-col :span="12">111</el-col>
    <el-col :span="12">222</el-col>
    <el-col :span="12">111</el-col>
    <el-col :span="12">222</el-col>
    <el-col :span="12">111</el-col>
    <el-col :span="12">222</el-col>
  </el-row>
</template>
<script setup>
import {useRouter,useRoute} from 'vue-router'
import request from '@/utils/requestUtils'
const router = useRouter()
const route = useRoute()
request.post('/app/publicForm/template',{type:'entiry'}).then(res=>{
  console.log(res,'请求的结果')
})


</script>
<style>
</style>