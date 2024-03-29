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
              :src="require(`@/assets/flowchartSvg/${utilName.svgName}.svg`)"
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
        :style="{ background: canvasStyleInfo.background }"
      ></canvas>
    </div>
    <div class="setting">
      <h4>画布信息</h4>
      <p>画布背景色:</p>
      <el-color-picker v-model="canvasStyleInfo.background" :disabled="route.query.type === 'detail'"/>
      <p>画布下载</p>
      <div style="display: flex">
        <el-input
          v-model="imageName"
          placeholder="请输入图片名称"
          style="width: 140px"
        ></el-input>
        <el-button type="primary" style="width: 30px" @click="downLoad">下载</el-button>
      </div>

      <!-- <p>画布缩放比例:</p>
      <el-slider v-model="canvasStyleInfo.scale" :show-tooltip="false" :min="0" :max="2" :step="0.1" style="width: 180px;" @input="changeScale"/> -->
      <template v-if="activeNodeInfo.id && nodeList.length>0">
        <h4>节点信息</h4>
        <div>
          <p>节点主题颜色</p>
          <el-color-picker
          :disabled="route.query.type === 'detail'"
            v-model="activeNodeInfo.color"
            @active-change="changeNodeThemeColor"
          />
        </div>
        <div v-if="activeNodeInfo.modeType !== 'linkLine' && activeNodeInfo.modeType !== 'text'">
          <p>节点字体颜色</p>
          <el-color-picker
          :disabled="route.query.type === 'detail'"
            v-model="activeNodeInfo.text.color"
            @active-change="changeNodeTextColor"
          />
        </div>
        <div v-if="activeNodeInfo.modeType !== 'linkLine' && activeNodeInfo.modeType !== 'text'">
          <p>节点文字信息</p>
          <el-input
          :disabled="route.query.type === 'detail'"
            v-model="activeNodeInfo.text.info"
            style="180px"
            @input="changeNodeTextInfo"
          ></el-input>
        </div>
        <div v-if="activeNodeInfo.modeType === 'linkLine'">
          <el-button type="primary" @click="deleteLine" :disabled="route.query.type === 'detail'">删除连线</el-button>
        </div>
        <div v-if="activeNodeInfo.modeType !== 'linkLine'">
          <el-button type="primary" @click="deleteNode" :disabled="route.query.type === 'detail'">删除节点</el-button>
        </div>
      </template>
    </div>
    <el-input
    :disabled="route.query.type === 'detail'"
    @blur="saveTextareaValue"
    v-show="textareaShow"
    :style="textareaClass"
    v-model="textareaValue"
    maxlength="30"
    show-word-limit
    type="textarea"
    :rows="textareaClass.rows"
  />
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
  createText
} from "@/javascript/globalFlowFun.js";
const draggable = VueDraggableNext; //拖拽组件
const route = useRoute()
let mousePosition = ref({}) //
let lengendList = reactive(allConfig.lengendList); //图例集合
let utilsList = reactive(allConfig.utilsList); //工具集合
let legendActiveItem = ref(""); //当前选中图例
let isMode = ref(false); //是否为模块
let canvas = null; //画布
let canvasMode = null; //画布实例
let nodeList = ref([]); //画布内容数组
let activeNodeInfo = ref({}); //活动的组件信息
let isLinkLine = ref(false); //是否为连线状态
let activeLineId = ref(undefined); //当前连线的id
let linkLineFlag = ref(false); //连线标志
let linkLineFrom = ref(undefined); //线条起点
let linkLineTarget = ref(undefined); //线条终点
let clickNodeFlag = ref(false); //是否点击节点
let eventName = ref(undefined); //当前处于什么事件
let canvasStyleInfo = ref({
  background: "#fff",
  scale: 1,
});
let imageName = ref("画布");
let textareaValue = ref('')
let textareaShow = ref(false)
let textareaClass = ref({
  position:'absolute',
  left:'300px',
  top:'300px',
  index:1000,
  width:'300px',
  border:'1px dashed #23cf7d',
  outline:'none',
  rows:5
})
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
    if(route.query.type === 'detail'){
        return
    }
  textareaShow.value = false
  legendActiveItem.value = name;
  isLinkLine.value = false;
  if (name === "mode") {
    // isMode.value = true
  } else if (name === "link") {
    isLinkLine.value = true;
  } else if (name === "allClear") {
    canvasMode.clearRect(0, 0, canvas.width, canvas.height);
    nodeList.value = [];
  } else if (name === "resetLengend") {
    legendActiveItem.value = undefined;
  } else if(name === 'label'){
    textareaShow.value = true
  }
  else {
  }
};
//图例拖动开始
const moveStart = (el) => {
};
//图例拖动结束
const moveEnd = (el) => {
  let position = {
    x: el.originalEvent.clientX,
    y: el.originalEvent.clientY,
  };
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
        if(route.query.type === 'detail'){
        return
    }
  eventName.value = "mousedown";
  let position = canvas.getBoundingClientRect();
  let positionInfo = {
    x: el.clientX - position.left,
    y: el.clientY - position.top,
  };
  if (isLinkLine.value === true) {
    linkLineFlag.value = true;
    changeNodeList(positionInfo);
  } else {
    clickNodeFlag.value = true;
  }
  draw(positionInfo);
};
//画布中鼠标抬起
const canvasUp = (el) => {
  eventName.value = "mouseup";
  linkLineFlag.value = false;
  clickNodeFlag.value = false;
  let position = canvas.getBoundingClientRect();
  let positionInfo = {
    x: el.clientX - position.left,
    y: el.clientY - position.top,
  };
  textareaShow.value = false
  if(legendActiveItem.value === 'label'){
    textareaShow.value = true
    textareaClass.value.left = el.layerX+'px'
    textareaClass.value.top = el.layerY+'px'
  }
  draw(positionInfo);
};
//画布中鼠标移动
const canvasMove = (el) => {
    if(route.query.type === 'detail'){
        return
    }
  eventName.value = "mousemove";
  if (isLinkLine.value === true) {
    if (linkLineFlag.value === true) {
      createLinkTarget(el);
      draw();
    }
  } else {
    if (clickNodeFlag.value === true) {
      switch (activeNodeInfo.value.modeType) {
        case "rectStroke":
          activeNodeInfo.value.x = el.offsetX - 100;
          activeNodeInfo.value.y = el.offsetY - 100;
          break;
        case "rectFill":
          activeNodeInfo.value.x = el.offsetX - 100;
          activeNodeInfo.value.y = el.offsetY - 100;
          break;
        case "arcFill":
          activeNodeInfo.value.x = el.offsetX;
          activeNodeInfo.value.y = el.offsetY;
          break;
        case "three":
          activeNodeInfo.value.x1 = el.offsetX;
          activeNodeInfo.value.y1 = el.offsetY - 100;
          activeNodeInfo.value.x2 = el.offsetX - 100;
          activeNodeInfo.value.y2 = el.offsetY + 100;
          activeNodeInfo.value.x3 = el.offsetX + 100;
          activeNodeInfo.value.y3 = el.offsetY + 100;
          break
      }
      moveLineInfo(el);
      draw();
    }
  }
};
const canvasLeave = (el) =>{
  legendActiveItem.value = undefined
}
//节点移动时线条位置的改变
const moveLineInfo = (el) => {
  if (!activeNodeInfo.value || !activeNodeInfo.value.fromList) {
    return;
  }
  if (activeNodeInfo.value.fromList.length > 0) {
    activeNodeInfo.value.fromList.forEach((Item) => {
      let line = nodeList.value.find((item) => Item === item.id);
      line.fromX = el.offsetX;
      line.fromY = el.offsetY;
    });
  }
  if (activeNodeInfo.value.targetList.length > 0) {
    activeNodeInfo.value.targetList.forEach((Item) => {
      let line = nodeList.value.find((item) => Item === item.id);
      line.targetX = el.offsetX;
      line.targetY = el.offsetY;
    });
  }
};
//画布初始化
let canvasInit = (list) => {
  canvas = document.getElementById("canvas");
  canvasMode = canvas.getContext("2d");
  nodeList.value = list
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
    canvasMode.lineWidth = 5;
    /**填充矩形(实物) */
    if (item.modeType === "rectFill") {
      canvasMode.rect(item.x, item.y, item.width, item.height);
      canvasMode.fillStyle = item.color;
      canvasMode.strokeStyle = item.color;
      canvasMode.fill();
      canvasMode.stroke();
      canvasMode.fillStyle = item.text.color;
      canvasMode.font = "18px Times";
      canvasMode.fillText(item.text.info, item.x + 80, item.y + 100);
    } else if (item.modeType === "three") {
      /**描边三角形(业务线)*/
      canvasMode.moveTo(item.x1, item.y1);
      canvasMode.lineTo(item.x2, item.y2);
      canvasMode.lineTo(item.x3, item.y3);
      canvasMode.lineTo(item.x1, item.y1);
      canvasMode.closePath();
      canvasMode.fillStyle = item.color;
      canvasMode.fill();
      canvasMode.fillStyle = item.text.color;
      canvasMode.font = "18px Times";
      canvasMode.fillText(item.text.info, item.x1 - 30, item.y1 + 130);
    } else if (item.modeType === "rectStroke") {
      /**描边矩形(模块)*/
      canvasMode.rect(item.x, item.y, item.width, item.height);
      canvasMode.fillStyle = "#fff";
      canvasMode.strokeStyle = item.color;
      canvasMode.fill();
      canvasMode.stroke();
      canvasMode.fillStyle = item.text.color;
      canvasMode.font = "18px Times";
      canvasMode.fillText(item.text.info, item.x + 80, item.y + 100);
    } else if (item.modeType === "arcFill") {
      /**圆形(供应商)*/
      canvasMode.arc(item.x, item.y, item.arcSize, 0, Math.PI * 2, false);
      canvasMode.fillStyle = "#fff";
      canvasMode.strokeStyle = item.color;
      canvasMode.fill();
      canvasMode.stroke();
      canvasMode.fillStyle = item.text.color;
      canvasMode.font = "18px Times";
      canvasMode.fillText(item.text.info, item.x - 30, item.y);
    } else if (item.modeType === "linkLine") {
      /**连线*/
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
    /*绘制文本*/
    else if(item.modeType === "text"){
      canvasMode.strokeStyle = canvasStyleInfo.value.background
      canvasMode.fillStyle = canvasStyleInfo.value.background
      canvasMode.lineWidth = 1
      let maxLength = item.info.reduce(function(newVal,oldVal){
       return newVal.length>oldVal.length?newVal.length:oldVal.length
      })
      canvasMode.rect(item.textX-200,item.textY-50,(maxLength+1)*10,(item.info.length+1)*20)
      canvasMode.fill()
      canvasMode.stroke()
      canvasMode.fillStyle = item.color;
      canvasMode.font = "18px Times";
      item.info.forEach((m,n)=>{
        canvasMode.fillText(m,item.textX-200,item.textY-30+20*n)
      })
    }

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
        if (isLinkLine.value === true) {
          if (activeLineId.value) {
            if (eventName.value === "mousedown") {
              if (item.modeType !== "linkLine") {
                linkLineFrom.value = item.id;
                item.fromList.push(activeLineId.value);
              }
            } else if (eventName.value === "mouseup") {
              if (item.modeType !== "linkLine") {
                linkLineTarget.value = item.id;
                item.targetList.push(activeLineId.value);
              }
            }
          }
        }
        if(activeNodeInfo.value.modeType === 'text'){
          textareaShow.value = true
          textareaClass.value.left = activeNodeInfo.value.textX +'px'
          textareaClass.value.top = activeNodeInfo.value.textY-50 + 'px'
          textareaClass.value.rows = 5
          let str = activeNodeInfo.value.info.join('\n')
        textareaValue.value = `${str}`
        }

      }
    }
    canvasMode.closePath();
  });
};
//通过操作对节点列表数据进行修改
const changeNodeList = (position) => {
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
      break
    case "label":
      let Info = createText(position)
      let textInfo = `${textareaValue.value}`
      Info.info = textInfo.split('\n')
      textareaValue.value = ''
      textareaShow.value = false
      nodeList.value.push(Info);
      break
  }
  let list0 = [];
  let list1 = [];
  let list2 = [];
  let list3 = []
  nodeList.value.forEach((m) => {
    if (m.nodeIndex === 0) {
      list0.push(m);
    } else if (m.nodeIndex === 1) {
      list1.push(m);
    } else if (m.nodeIndex === 2) {
      list2.push(m);
    }else if (m.nodeIndex === 1000) {
       list3.push(m)
    }
  });
  nodeList.value = [].concat(list0).concat(list1).concat(list2).concat(list3);
};
const changeScale = () => {
  requestAnimationFrame(draw);
};
//修改节点主题色
const changeNodeThemeColor = (value) => {
  activeNodeInfo.value.color = value;
  requestAnimationFrame(draw);
};
//修改节点字体颜色
const changeNodeTextColor = (value) => {
  activeNodeInfo.value.text.color = value;
  requestAnimationFrame(draw);
};
//修改节点中的字体文字
const changeNodeTextInfo = (value) => {
  activeNodeInfo.value.text.info = value;
  requestAnimationFrame(draw);
};
//删除当前选中节点
const deleteNode = () => {
  textareaShow.value = false
  textareaValue.value = ''
  let index = nodeList.value.findIndex(
    (item) => item.id === activeNodeInfo.value.id
  );
  nodeList.value.splice(index, 1);
  if(activeNodeInfo.value.fromList){
    activeNodeInfo.value.fromList.forEach((m) => {
    if (m) {
      deleteLinkLine(m);
    }
  });
  }
  if(activeNodeInfo.value.targetList){
    activeNodeInfo.value.targetList.forEach((m) => {
    if (m) {
      deleteLinkLine(m);
    }
  });
  }

  requestAnimationFrame(draw);
};
//删除当前选中连接线
const deleteLine = () => {
  deleteLinkLine(activeNodeInfo.value.id);
};
//删除节点附带的连接线
const deleteLinkLine = (id) => {
  let index = nodeList.value.findIndex((m) => m.id === id);
  if (index !== -1) {
    nodeList.value.splice(index, 1);
  }
  nodeList.value.forEach((n) => {
    if (n.fromList) {
      let fromIndex = n.fromList.findIndex((z) => z === id);
      if (fromIndex !== -1) {
        n.fromList.splice(fromIndex, 1);
      }
    }
    if (n.targetList) {
      let targetIndex = n.targetList.findIndex((z) => z === id);

      if (targetIndex !== -1) {
        n.targetList.splice(targetIndex, 1);
      }
    }
  });
  requestAnimationFrame(draw);
};
//文本框焦点消失时保存文本
const saveTextareaValue = ()=>{
  textareaShow.value = false
  changeNodeList({
    x:parseInt(textareaClass.value.left),
    y:parseInt(textareaClass.value.top)+50
  })   
}
//下载
const downLoad = ()=>{
    const dataURL = canvas.toDataURL('image/png');
	
	// 创建img元素，用于预览图片
	const img = document.createElement('img');
	img.src = dataURL;
	document.body.appendChild(img);
	
	// 创建a元素，用于下载图片
	const link = document.createElement('a');
	link.href = dataURL;
	link.download = `${imageName.value}.png`;
	
	// 添加a元素到DOM中，并触发点击事件以下载图片
	document.body.appendChild(link);
	link.click();
  document.body.removeChild(img)
  document.body.removeChild(link)
}
defineExpose({
nodeList,
canvasInit
})
</script>
<style lang="less" scoped>
.flowBox {
  width: 100%;
  height: 800px;
  display: flex;
  position: relative;
  .legend,
  .setting {
    padding-left: 10px;
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