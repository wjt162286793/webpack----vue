<template>
  <div class="flowBox">
    <div class="legend">
      <h4>
        图例
      </h4>
      <div class="legendBox" id="legendBox">
        <el-row>
          <draggable @start="moveStart" @end="moveEnd" v-model="lengendList" :options="dragOptions" style="display: contents;">
            <el-col :span="12" v-for="(legendItem,lengendIndex) in lengendList" :key="lengendIndex">
      <div :class="lengendClass(legendItem.name)" @click="clickLengend(legendItem.name)">
        <img :src="require(`@/assets/flowchartSvg/${legendItem.svgName}.svg`)" alt="">
        <span>{{ legendItem.title }}</span>
      </div>
   
    </el-col> </draggable>
  </el-row>

      </div>
    </div>
     <div :class="!isMode?'chartNormal':'chartMode'">
      <canvas width="1000" height="500" id="canvas" @mousedown="canvasDown" @mouseup="canvasUp" @mousemove="canvasMove"></canvas>
     </div>
     <div class="setting">
      <h4>
        画布设置
      </h4>
      
     </div>
  </div>
</template>
<script setup>
import allConfig from '../javascript/flowchartConfig'
import { VueDraggableNext } from "vue-draggable-next";

const draggable = VueDraggableNext;
let lengendList = reactive(allConfig.lengendList)
let legendActiveItem = ref('')
let isMode = ref(false)
let canvas = null
let canvasMode = null
const dragOptions = {
  preventOnFilter: false,
  sort: false,
  disabled: false,
  ghostClass: "tt",
  forceFallback: true,
};
let lengendClass = (name)=>{
  if(name !== legendActiveItem.value){
    return 'lengendItemNormal'
  }else{
    return 'lengendItemActive'
  }
}
let clickLengend = (name)=>{
  if(legendActiveItem.value === name){
    legendActiveItem.value = ''
    isMode.value = false
  }else{
    console.log(name,'活动的')
  legendActiveItem.value = name
  if(name === 'mode'){
    isMode.value = true
  }else{
    isMode.value = false
  }
  }

}
const moveStart = (el)=>{
  console.log('移动开始',el)
}
const moveEnd = (el) =>{
  console.log('移动结束',el)
}
const canvasDown = (el)=>{
  console.log(el,'点击画布')
}
const canvasUp = (el)=>{
  console.log(el,'鼠标移入画布上')
}
const canvasMove = (el)=>{
  console.log(el,'在画布上移动')
}
const canvasInit = ()=>{
  canvas = document.getElementById('canvas')
  canvasMode = canvas.getContext('2d')
  canvasMode.fillRect(25, 25, 100, 100);
  canvasMode.clearRect(45, 45, 60, 60);
  canvasMode.strokeRect(50, 50, 50, 50);
  console.log(canvasMode,'canvas的方法集合')
}
onMounted(() => {
  canvasInit()
})
</script>
<style lang="less" scoped>
.flowBox {
  width: 100%;
  max-height: 500px;
  display: flex;
  .legend,.setting{
    width: 200px;
    height: 500px;
    background: #e0dede;
    display: flex;
    flex-direction: column;
    align-content: center;
    h4{
      font-size: 18px;
      margin:10px auto;
      border-bottom: #000 dashed 1px;
    }
  }
  .chartNormal{
    flex:1;
    border: 2px dashed #deec0e;
    cursor: pointer;
    box-sizing: border-box;
  }
  .chartMode{
    flex:1;
    border: 2px dashed #deec0e;
    box-sizing: border-box;
    cursor: url('@/assets/flowchartSvg/笔.svg') 0 32,auto;;
  }
  .lengendItemNormal{
      margin-top: 10px;
      height: 60px;
      margin:10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      cursor: pointer;
    }
    .lengendItemActive{
      margin:10px;
      margin-top: 10px;
      height: 60px;
      display: flex;
      flex-direction: column;
      align-items: center;
      border: #d81e06 1px dashed;
      cursor: pointer;
    }
// .setting{
//   cursor:url('@/assets/flowchartSvg/笔.svg') 0 32,auto;
// }
}
</style>