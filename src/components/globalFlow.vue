<template>
  <div class="flowBox">
    <div class="legend">
      <h4>图例</h4>
      <div class="legendBox" id="legendBox">
        <el-row>
          <draggable
            @start="moveStart"
            @end="moveEnd"
            v-model="lengendList"
            :options="dragOptions"
            style="display: contents"
          >
            <el-col
              :span="12"
              v-for="(legendItem, lengendIndex) in lengendList"
              :key="lengendIndex"
            >
              <div
                :class="lengendClass(legendItem.name)"
                :node_type="legendItem.name"
                @mousedown="clickLengend(legendItem.name)"
              >
                <img
                  :src="
                    require(`@/assets/flowchartSvg/${legendItem.svgName}.svg`)
                  "
                  alt=""
                />
                <span>{{ legendItem.title }}</span>
              </div>
            </el-col>
          </draggable>
        </el-row>
      </div>
      <h4>工具</h4>
      <el-row>
        <el-col
              :span="12"
              v-for="(utilName, lengendIndex) in utilsList"
              :key="lengendIndex"
            >
              <div
                :class="lengendClass(utilName.name)"
                :node_type="utilName.name"
                @mousedown="clickLengend(utilName.name)"
              >
                <img
                  :src="
                    require(`@/assets/flowchartSvg/${utilName.svgName}.svg`)
                  "
                  alt=""
                />
                <span>{{ utilName.title }}</span>
              </div>
            </el-col>
      </el-row>
    </div>
    <div :class="!isMode ? 'chartNormal' : 'chartMode'">
      <canvas
        width="1500"
        height="800"
        id="canvas"
        @mousedown="canvasDown"
        @mouseup="canvasUp"
        @mousemove="canvasMove"
        @click="clickCanvas"
      ></canvas>
    </div>
    <div class="setting">
      <h4>节点信息</h4>
      <p>
        {{activeNodeInfo}}
      </p>
    </div>
  </div>
</template>
<script setup>
import allConfig from "../javascript/flowchartConfig";
import { VueDraggableNext } from "vue-draggable-next";
import { ElMessage } from "element-plus";
import { v4 as uuidv4 } from "uuid";
import {
  createRectFill,
  createTreeBox,
  createRectStroke,
  createArcStroke,
  createLinkLine,
} from "@/javascript/globalFlowFun.js";
const draggable = VueDraggableNext; //拖拽组件
let lengendList = reactive(allConfig.lengendList); //图例集合
let utilsList = reactive(allConfig.utilsList) //工具集合
let legendActiveItem = ref(""); //当前选中图例
let isMode = ref(false); //是否为模块
let canvas = null; //画布
let canvasMode = null; //画布实例
let nodeList = ref([]); //画布内容数组
let activeNodeInfo = ref([]); //活动的组件信息
let isLinkLine = ref(false); //是否为连线状态
let activeLineId = ref(undefined); //当前连线的id
let linkLineFlag = ref(false); //连线标志
let linkLineFrom = ref(undefined) //线条起点
let linkLineTarget = ref(undefined) //线条终点
let clickNodeFlag = ref(false); //是否点击节点
let eventName = ref(undefined) //当前处于什么事件
//拖拽配置
const dragOptions = {
  preventOnFilter: false,
  sort: false,
  disabled: false,
  ghostClass: "tt",
  forceFallback: true,
};
//图例的样式
let lengendClass = (name) => {
  if (name !== legendActiveItem.value) {
    return "lengendItemNormal";
  } else {
    return "lengendItemActive";
  }
};
//点击图例事件
let clickLengend = (name) => {
  console.log(name, "活动的");
  legendActiveItem.value = name;
  isLinkLine.value = false;
  if (name === "mode") {
    // isMode.value = true
  } else if (name === "link") {
    isLinkLine.value = true;
  } else if(name === 'allClear'){
    canvasMode.clearRect(0,0,canvas.width,canvas.height)
    nodeList.value = []
  } else if(name === 'resetLengend'){
    legendActiveItem.value = undefined
  }
  else {
  }
};
//图例拖动开始
const moveStart = (el) => {
  console.log("移动开始", el);
};
//图例拖动结束
const moveEnd = (el) => {
  console.log("移动结束", el);
  let position = {
    x: el.originalEvent.clientX,
    y: el.originalEvent.clientY,
  };
  console.log("鼠标的位置", position);
  if (
    position.x < 202 + 100 ||
    position.x > 1702 - 100 ||
    position.y < 52 + 100 ||
    position.y > 852 - 100
  ) {
    ElMessage({
      message: "未拖入画布之中",
      type: "warning",
    });
  } else {
    changeNodeList(position);
    draw(null);
  }
};
//点击画布
const clickCanvas = (el) => {};
//画布中鼠标按下
const canvasDown = (el) => {
  eventName.value = 'mousedown'
  let position = canvas.getBoundingClientRect();
  let positionInfo = {
    x: el.clientX - position.left,
    y: el.clientY - position.top,
  };
  if (isLinkLine.value === true) {
    console.log(el, "画布按下");
    linkLineFlag.value = true;
    changeNodeList(positionInfo);
  }else{
    clickNodeFlag.value = true;
  }
  draw(positionInfo);
};
//画布中鼠标抬起
const canvasUp = (el) => {
  eventName.value = 'mouseup'
  linkLineFlag.value = false;
  clickNodeFlag.value = false;
  console.log(el, "鼠标在画布上抬起", nodeList.value);
  let position = canvas.getBoundingClientRect();
  let positionInfo = {
    x: el.clientX - position.left,
    y: el.clientY - position.top,
  };
  draw(positionInfo)
};
//画布中鼠标移动
const canvasMove = (el) => {
  eventName.value = 'mousemove'
  if (isLinkLine.value === true) {
    if (linkLineFlag.value === true) {
      createLinkTarget(el);
      draw()
    }
  }else{
    if (clickNodeFlag.value === true) {
    switch (activeNodeInfo.value.modeType) {
      case "rectStroke":
        activeNodeInfo.value.x = el.offsetX-100;
        activeNodeInfo.value.y = el.offsetY-100;
      break
      case "rectFill":
        activeNodeInfo.value.x = el.offsetX-100;
        activeNodeInfo.value.y = el.offsetY-100;
      break
      case "arcFill":
        activeNodeInfo.value.x = el.offsetX;
        activeNodeInfo.value.y = el.offsetY;
      break
      case "three":
      activeNodeInfo.value.x1 = el.offsetX
      activeNodeInfo.value.y1 = el.offsetY-100
      activeNodeInfo.value.x2 = el.offsetX-100
      activeNodeInfo.value.y2 = el.offsetY+100
      activeNodeInfo.value.x3 = el.offsetX+100
      activeNodeInfo.value.y3 = el.offsetY+100
    }
    moveLineInfo(el)
    draw();
  }
  }
};
//节点移动时线条位置的改变
const moveLineInfo = (el)=>{
  console.log(activeNodeInfo.value,el,'移动的信息')
  if(!activeNodeInfo.value){
    return
  }
  if(activeNodeInfo.value.fromList.length>0){
    activeNodeInfo.value.fromList.forEach(Item=>{
      let line = nodeList.value.find(item=>Item === item.id)
      console.log(line,'线的信息1')
      line.fromX = el.offsetX 
      line.fromY = el.offsetY 
    })
  }
  if(activeNodeInfo.value.targetList.length>0){
    activeNodeInfo.value.targetList.forEach(Item=>{
      let line = nodeList.value.find(item=>Item === item.id)
      console.log(line,'线的信息2')
      line.targetX = el.offsetX
      line.targetY = el.offsetY
    })
  }
}
//画布初始化
const canvasInit = () => {
  canvas = document.getElementById("canvas");
  canvasMode = canvas.getContext("2d");
  draw(null);
};
//创建连接起始点
let createLinkTarget = (el) => {
  let linkLineInfo =
    nodeList.value[
      nodeList.value.findIndex((item) => item.id === activeLineId.value)
    ];
  if (el.offsetX > 0 && el.offsetY > 0) {
    linkLineInfo.targetX = el.offsetX;
    linkLineInfo.targetY = el.offsetY;
    requestAnimationFrame(draw);
  }
};
//绘制图形(核心方法)
const draw = (positionInfo) => {
  canvasMode.clearRect(0, 0, canvas.width, canvas.height);
  nodeList.value.forEach((item, index) => {
    canvasMode.beginPath();
    canvasMode.restore()
    canvasMode.lineWidth = 20;
    /**填充矩形(实物) */
    if (item.modeType === "rectFill") {
      canvasMode.rect(item.x, item.y, item.width, item.height);
      canvasMode.fillStyle = item.color;
      canvasMode.strokeStyle = item.color;
      canvasMode.fill();
      canvasMode.stroke();
      canvasMode.save()
      canvasMode.font = '30px Times'
      canvasMode.fillText(item.text.info,item.text.x,item.text.y)
      canvasMode.fillStyle = item.text.color
      canvasMode.save()
      canvasMode.restore()
    } 
    /**描边三角形(业务线)*/
    else if (item.modeType === "three") {
      canvasMode.moveTo(item.x1, item.y1);
      canvasMode.lineTo(item.x2, item.y2);
      canvasMode.lineTo(item.x3, item.y3);
      canvasMode.lineTo(item.x1, item.y1);
      canvasMode.fillText(item.text.info,item.text.x,item.text.y)
      canvasMode.fillStyle = item.color;
      canvasMode.fill();
      canvasMode.font = '30px Times'
      canvasMode.fillText(item.text.info,item.text.x,item.text.y)
      canvasMode.fillStyle = item.text.color
      canvasMode.save()
      canvasMode.restore()
    } else if (item.modeType === "rectStroke") {
      /**描边矩形(模块)*/
      canvasMode.rect(item.x, item.y, item.width, item.height);
      canvasMode.fillStyle = "#fff";
      canvasMode.strokeStyle = item.color;
      canvasMode.fill();
      canvasMode.stroke();
      canvasMode.font = '30px Times'
      canvasMode.fillText(item.text.info,item.text.x,item.text.y)
      canvasMode.fillStyle = item.text.color
      canvasMode.save()
      canvasMode.restore()
    } else if (item.modeType === "arcFill") {
      /**圆形(供应商)*/
      canvasMode.arc(item.x, item.y, item.arcSize, 0, Math.PI * 2, false);
      canvasMode.fillStyle = "#fff";
      canvasMode.strokeStyle = item.color;
      canvasMode.fill();
      canvasMode.stroke();
      canvasMode.font = '30px Times'
      canvasMode.fillText(item.text.info,item.text.x,item.text.y)
      canvasMode.fillStyle = item.text.color
      canvasMode.save()
      canvasMode.restore()
    }
    /**连线*/ 
    else if (item.modeType === "linkLine") {
      canvasMode.moveTo(item.fromX, item.fromY);
      if (item.targetX && item.targetY) {
        canvasMode.lineTo(item.targetX, item.targetY);
      } else {
        canvasMode.lineTo(item.fromX, item.fromY);
      }
      canvasMode.lineCap = "round";
      canvasMode.fillStyle = item.color;
      canvasMode.strokeStyle = item.color;
      canvasMode.fill();
      canvasMode.stroke();
    }
    canvasMode.save();
    //判断点击触发元素
    if (positionInfo) {
      console.log(positionInfo,'???')
      const isTarget_path = canvasMode.isPointInPath(
        positionInfo.x,
        positionInfo.y
      );
      const isTarget_stroke = canvasMode.isPointInStroke(
        positionInfo.x,
        positionInfo.y
      );
      if (isTarget_path || isTarget_stroke) {
        console.log("点击到了某元素", item, index);
        activeNodeInfo.value = item;
        if(isLinkLine.value === true){
          if(activeLineId.value){
            if(eventName.value === 'mousedown'){
              if(item.modeType !== 'linkLine'){
            console.log(item.id,'起源id',activeLineId.value)
            linkLineFrom.value = item.id
            item.fromList.push(activeLineId.value)
              }
         }else if(eventName.value === 'mouseup'){
          if(item.modeType !== 'linkLine'){
            console.log(item.id,'目标id',activeLineId.value)
            linkLineTarget.value = item.id
            item.targetList.push(activeLineId.value)
          } 
         }
          }

        }
      }
    }
    canvasMode.closePath();
  });
};
//通过操作对节点列表数据进行修改
const changeNodeList = (position) => {
  console.log(legendActiveItem.value, "???type");
  isLinkLine.value = false;
  switch (legendActiveItem.value) {
    case "entiry":
      nodeList.value.push(createRectFill(position));
      break;
    case "triangle":
      nodeList.value.push(createTreeBox(position));
      break;
    case "mode":
      nodeList.value.push(createRectStroke(position));
      break;
    case "ellipse":
      nodeList.value.push(createArcStroke(position));
      break;
    case "link":
      let lineInfo = createLinkLine(position);
      nodeList.value.push(lineInfo);
      activeLineId.value = lineInfo.id;
      isLinkLine.value = true;
  }
  let list0 = []
  let list1 = []
  let list2 = []
  nodeList.value.forEach(m=>{
    if(m.nodeIndex === 0){
      list0.push(m)
    }else if(m.nodeIndex === 1){
      list1.push(m)
    }
    else if(m.nodeIndex === 2){
      list2.push(m)
    }
  })
  nodeList.value = [].concat(list0).concat(list1).concat(list2)
};
onMounted(() => {
  canvasInit();
});
</script>
<style lang="less" scoped>
.flowBox {
  width: 100%;
  height: 800px;
  display: flex;
  .legend,
  .setting {
    width: 200px;
    height: 800px;
    background: #e0dede;
    display: flex;
    flex-direction: column;
    align-content: center;
    h4 {
      font-size: 18px;
      margin: 10px auto;
      border-bottom: #000 dashed 1px;
    }
  }
  .chartNormal {
    flex: 1;
    border: 2px dashed #deec0e;
    cursor: pointer;
    box-sizing: border-box;
  }
  .chartMode {
    flex: 1;
    border: 2px dashed #deec0e;
    box-sizing: border-box;
    cursor: url("@/assets/flowchartSvg/笔.svg") 0 32, auto;
  }
  .lengendItemNormal {
    margin-top: 10px;
    height: 60px;
    margin: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
  }
  .lengendItemActive {
    margin: 10px;
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