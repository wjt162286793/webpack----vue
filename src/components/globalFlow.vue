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
      <canvas width="1500" height="800" id="canvas" @mousedown="canvasDown" @mouseup="canvasUp" @mousemove="canvasMove"></canvas>
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
import { ElMessage } from 'element-plus';
import {v4 as uuidv4} from 'uuid'
import {createRectFill,createTreeBox}  from '@/javascript/globalFlowFun.js'
const draggable = VueDraggableNext;
let lengendList = reactive(allConfig.lengendList)
let legendActiveItem = ref('')
let isMode = ref(false)
let canvas = null
let canvasMode = null
let nodeList = ref([])
let activeNode = ref({})
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
  let position = {
    x:el.originalEvent.clientX,
    y:el.originalEvent.clientY
  }
  console.log('鼠标的位置',position)
  if((position.x<202+25)||(position.x>1702-25)||(position.y<52+25)||(position.y>852-25)){
    ElMessage({
      message:'未拖入画布之中',
      type:'warning'
    })
  }else{
    changeNodeList(position)
    draw()
  }
}
const canvasDown = (el)=>{
  console.log(el,'点击画布')
}
const canvasUp = (el)=>{
  console.log(el,'鼠标在画布上抬起')
  let canvasPosition = canvas.getBoundingClientRect()
          let positionInfo = {
            x:el.clientX- canvasPosition.left,
            y:el.clientY- canvasPosition.top
          }       
        //   console.log(positionInfo,'位置信息')
        let index =  nodeList.value.findIndex(item=>positionInfo.x>item.x&&positionInfo.x<item.x+item.width&&positionInfo.y>item.y&&positionInfo.y<item.y+item.height)
        if(index !== -1){
            activeNode.value = nodeList.value[index]
            console.log(activeNode.value,'点中的节点信息')
        }
}
const canvasMove = (el)=>{
  // console.log(el,'在画布上移动')
}
const canvasInit = ()=>{
  canvas = document.getElementById('canvas')
  canvasMode = canvas.getContext('2d')
  draw()
  
}
const draw = ()=>{
  canvasMode.beginPath()
  nodeList.value.forEach(item=>{
    if(item.modeType === 'rectFill'){
      canvasMode.fillStyle = item.color
    canvasMode.fillRect(item.x,item.y,item.width,item.height)
    }else if(item.modeType === 'three'){
      console.log('在不在',item)
      canvasMode.fillStyle = item.color
      canvasMode.moveTo(item.x1,item.y1)
      canvasMode.lineTo(item.x2,item.y2)
      canvasMode.lineTo(item.x3,item.y3)
      canvasMode.lineTo(item.x1,item.y1)
      // canvasMode.strokeStyle = item.color
    }
    canvasMode.save()
  })
  canvasMode.closePath();
}
const changeNodeList = (position)=>{
  console.log(legendActiveItem.value,'???type')
   switch(legendActiveItem.value){
    case 'entiry':
      nodeList.value.push(createRectFill(position))
      break
    case 'triangle':
      nodeList.value.push(createTreeBox(position))
   }

}
onMounted(() => {
  canvasInit()
})
</script>
<style lang="less" scoped>
.flowBox {
  width: 100%;
  height: 800px;
  display: flex;
  .legend,.setting{
    width: 200px;
    height: 800px;
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