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
      <h4>画布设置</h4>
      <p>
        {{ activeNodeInfo }}
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
const draggable = VueDraggableNext;
let lengendList = reactive(allConfig.lengendList);
let legendActiveItem = ref("");
let isMode = ref(false);
let canvas = null;
let canvasMode = null;
let nodeList = ref([]);
let activeNodeInfo = ref([]);
let activeNode = ref({});
let isLinkLine = ref(false);
let activeLineId = ref(undefined);
let linkLineFlag = ref(false);
let clickNodeFlag = ref(false);
const dragOptions = {
  preventOnFilter: false,
  sort: false,
  disabled: false,
  ghostClass: "tt",
  forceFallback: true,
};
let lengendClass = (name) => {
  if (name !== legendActiveItem.value) {
    return "lengendItemNormal";
  } else {
    return "lengendItemActive";
  }
};
let clickLengend = (name) => {
  // if(legendActiveItem.value === name){
  //   legendActiveItem.value = ''
  //   isMode.value = false
  // }else{
  console.log(name, "活动的");
  legendActiveItem.value = name;
  if (name === "mode") {
    // isMode.value = true
  } else if (name === "link") {
    isLinkLine.value = true;
  } else {
    isMode.value = false;
  }
  // }
};
const moveStart = (el) => {
  console.log("移动开始", el);
};
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
const clickCanvas = (el) => {};
const canvasDown = (el) => {
  let position = canvas.getBoundingClientRect();
  let positionInfo = {
    x: el.clientX - position.left,
    y: el.clientY - position.top,
  };
  if (isLinkLine.value === true) {
    console.log(el, "画布按下");
    linkLineFlag.value = true;
    changeNodeList(positionInfo);
  }
  draw(positionInfo);
};
const canvasUp = (el) => {
  linkLineFlag.value = false;
  clickNodeFlag.value = false;
  console.log(el, "鼠标在画布上抬起", nodeList.value);
};
const canvasMove = (el) => {
  // console.log(el, "在画布上移动");
  if (isLinkLine.value === true) {
    if (linkLineFlag.value === true) {
      createLinkTarget(el);
    }
  }
  if (clickNodeFlag.value === true) {
    console.log(activeNodeInfo, "当前的信息", el);
    switch (activeNodeInfo.value.modeType) {
      case "rectStroke":
        activeNodeInfo.value.x = el.offsetX - 100;
        activeNodeInfo.value.y = el.offsetY - 100;
    }
    draw();
  }
};
const canvasInit = () => {
  canvas = document.getElementById("canvas");
  canvasMode = canvas.getContext("2d");
  draw(null);
};
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
const draw = (positionInfo) => {
  canvasMode.clearRect(0, 0, canvas.width, canvas.height);
  nodeList.value.forEach((item, index) => {
    canvasMode.beginPath();
    /**填充矩形(实物) */
    if (item.modeType === "rectFill") {
      canvasMode.rect(item.x, item.y, item.width, item.height);
      canvasMode.fillStyle = item.color;
      canvasMode.strokeStyle = item.color;
      canvasMode.fill();
      canvasMode.stroke();
      // canvasMode.fillRect(item.x,item.y,item.width,item.height)
    } else if (item.modeType === "three") {
      /**三角形(业务线)*/
      console.log("在不在", item);
      // canvasMode.strokeStyle = item.color
      canvasMode.moveTo(item.x1, item.y1);
      canvasMode.lineTo(item.x2, item.y2);
      canvasMode.lineTo(item.x3, item.y3);
      canvasMode.lineTo(item.x1, item.y1);
      // canvasMode.stroke()
      canvasMode.fillStyle = item.color;
      canvasMode.fill();
      // canvasMode.strokeStyle = item.color
    } else if (item.modeType === "rectStroke") {
      /**描边矩形(模块)*/
      canvasMode.rect(item.x, item.y, item.width, item.height);
      canvasMode.fillStyle = "#fff";
      canvasMode.strokeStyle = item.color;
      canvasMode.fill();
      canvasMode.stroke();
    } else if (item.modeType === "arcFill") {
      /**圆形(供应商)*/
      canvasMode.arc(item.x, item.y, item.arcSize, 0, Math.PI * 2, false);
      canvasMode.fillStyle = "#fff";
      canvasMode.strokeStyle = item.color;
      canvasMode.fill();
      canvasMode.stroke();
    } else if (item.modeType === "linkLine") {
      // canvasMode.arc(
      //   item.fromX,
      //   item.fromY,
      //   item.lineWidth / 2,
      //   0,
      //   Math.PI * 2,
      //   false
      // );
      canvasMode.moveTo(item.fromX, item.fromY);
      if (item.targetX && item.targetY) {
        canvasMode.lineTo(item.targetX, item.targetY);
        // canvasMode.lineTo(item.targetX - 1, item.targetY - 1);
        // canvasMode.lineTo(item.targetX - 1, item.targetY + 1);
        // canvasMode.lineTo(item.targetX + 1, item.targetY - 1);
      } else {
        canvasMode.lineTo(item.fromX, item.fromY);
      }
      // canvasMode.lineCap = "round";
      canvasMode.lineWidth = item.lineWidth;
      canvasMode.fillStyle = item.color;
      canvasMode.strokeStyle = item.color;
      canvasMode.fill();
      canvasMode.stroke();
    }
    canvasMode.save();
    //判断点击触发元素
    if (positionInfo) {
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
        clickNodeFlag.value = true;
      }
    }
    canvasMode.closePath();
  });
};
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