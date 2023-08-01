<template>
    <div class="contentBox">
        <div class="leftMenu">
            <h3>流程节点</h3>
            <draggable @start="nodeMoveStart" @end="nodeMoveEnd" v-model="props.leftNodeList">
                <div v-for="(nodeItem, nodeIndex) in leftNodeList" :key="nodeItem.nodeId" 
                @mousedown="(el)=>downNode(el,nodeItem)"
                class="nodeItem">{{ nodeItem.label
                }}</div>
            </draggable>
        </div>
        <div class="canvasBox" id="canvasBox">
            <div v-for="(canvasNodeItem, canvasNodeIndex) in infoList" :key="canvasNodeIndex" :id="canvasNodeItem.id" @contextmenu.prevent="openMenuFun($event,canvasNodeItem)"
                :style="canvasNodeStyle(canvasNodeItem)">
                <div class="pointNode">
                    <el-icon><CirclePlusFilled /></el-icon>
                </div>
                {{ canvasNodeItem.label }}</div>
        </div>
        <div class="contextMenu" :style="contextStyle" v-show="contextMenuShow">
        右键------------</div>
    </div>
</template>
<script setup>
import lodash from "lodash";
//消息框
import { ElMessage } from "element-plus";
//uuid
import { v4 as uuidv4 } from "uuid";
//引入可拖拽组件
import { VueDraggableNext } from "vue-draggable-next";
//引入画布基础配置信息
import globalConfig from '@/javascript/globalFlowChartConfig'
//使用可拖拽组件
const draggable = VueDraggableNext;
//引入jsplumb插件
import { jsPlumb } from 'jsplumb'
//实例化插件
let plumbInstance = jsPlumb.getInstance()
//定义数据(全局的核心数据)
let infoList = ref([])
//画布节点初始化
let canvasBox = ref(null)
//画布位置坐标自信息
let canvasBoxPositionInfo = reactive()
//最终的数据
let plumbInfoList = ref([])
//左侧拖拽的数据
let activeLeftNode = reactive({})
//鼠标和节点的差距对比
let nodePositionDiff = reactive({});
//页面绘制标识
let renderFlag = ref(undefined);
//右键菜单标识
let contextMenuShow = ref(false)
//右键菜单样式
let contextStyle = reactive({left:0,top:0})
//props传值
const props = defineProps({
    //左侧节点信息
    leftNodeList: Array
})
//鼠标开始拖拽左侧
const nodeMoveStart = (el) => {
    console.log(el, '鼠标开始的位置')
}
//鼠标停止左侧的拖拽
const nodeMoveEnd = (el) => {
    console.log(el,'鼠标停止的位置')
    refreshCanvas()
    //判断位置
    judgePosition(
    activeLeftNode,
    canvasBoxPositionInfo,
    el.originalEvent.x,
    el.originalEvent.y
  );
}
//鼠标选取左侧的节点
const downNode = (el,nodeItem) =>{
    console.log('活动的具体信息',nodeItem)
    activeLeftNode = nodeItem
      //具体位置鼠标信息
  let mousedownPositionInfo = { x: el.clientX, y: el.clientY };
  //被拖拽节点初始的位置信息
  let moveBoxBeforePosition = {
    x: el.target.getBoundingClientRect().x,
    y: el.target.getBoundingClientRect().y,
  };
  nodePositionDiff = {
    leftDiff: mousedownPositionInfo.x - moveBoxBeforePosition.x,
    topDiff: mousedownPositionInfo.y - moveBoxBeforePosition.y,
  };
}
//重新获取画布的信息,画布的位置
const refreshCanvas = () => {
    canvasBox.value = document.querySelector('.canvasBox')
    console.log(canvasBox.value.getBoundingClientRect(), '画布信息')
    canvasBoxPositionInfo = canvasBox.value.getBoundingClientRect()
}
//判断拖动区域
const judgePosition = (dragNodeInfo, plumbBoxPositionInfo, x, y) => {
  //拖拽至画布外部
  if (
    x - nodePositionDiff.leftDiff < plumbBoxPositionInfo.left ||
    x + 200 - nodePositionDiff.leftDiff > plumbBoxPositionInfo.right ||
    y - nodePositionDiff.topDiff < plumbBoxPositionInfo.top ||
    y + 40 - nodePositionDiff.topDiff > plumbBoxPositionInfo.bottom
  ) {
    ElMessage({
      message: "节点不能拖拽至画布之外",
      type: "error",
    });
  } else {
    dragNodeInfo.left =
      x - plumbBoxPositionInfo.left - nodePositionDiff.leftDiff;
    dragNodeInfo.top = y - plumbBoxPositionInfo.top - nodePositionDiff.topDiff;
    addNode(dragNodeInfo);
  }
};
//添加新的节点
const addNode = (dragNodeInfo)=>{
 console.log(dragNodeInfo,'添加的节点信息')
 let addInfo = {
    id:uuidv4(),
    isSource:true,
    isTarget:true,
    label:'新的节点',
    to:[],
    left:dragNodeInfo.left,
    top:dragNodeInfo.top
 }
 infoList.value.push(Object.assign(addInfo,globalConfig.readyConfig))

 nextTick(()=>{
    renderFlag.value = 'new'
    makeFun(Object.assign(addInfo,globalConfig.readyConfig));
 })

}
//画布中节点的样式
const canvasNodeStyle = (canvasNodeInfo) => {
    return {
        width: '200px',
        height: '40px',
        lineHeight: '40px',
        textAlign: 'center',
        position: 'absolute',
        left: canvasNodeInfo.left + 'px',
        top: canvasNodeInfo.top + 'px',
        border: '1px solid #eee',
        boxShadow:'#9bdafe 1px 1px 4px 1px',
        cursor: 'pointer',
    }
}
//渲染节点信息
const renderFun = (flag)=>{
    if(flag === 'new'){
        renderFlag.value === 'once'
    }
    plumbInstance.deleteEveryConnection();
    plumbInstance.deleteEveryEndpoint();
    refreshCanvas()
        let renderList = []
        infoList.value.forEach(item => {
            if (item.to && item.to.length > 0) {
                item.to.forEach(v => {
                    let infoObj = {
                        source: item.id,
                        target: v,
                        anchor:item.anchor,
                        connector:item.connector,
                        endpoint:item.endpoint,
                        overlays:item.overlays,
                        paintStyle:item.paintStyle,
                        endpointStyle:item.endpointStyle
                    }
                    renderList.push(infoObj)
                })

            }
        })
        plumbInstance.ready(() => {
            renderList.forEach(item=>{
                plumbInstance.connect(item)
            })
            console.log(infoList.value,'待渲染的信息')
            infoList.value.forEach(item=>{
                makeFun(item)
                plumbInstance.draggable(item.id, {
          containment: "parent",
          stop: function (el) {
            item.left = el.pos[0];
            item.top = el.pos[1];
          },
        });
            })

        })
}
//给节点设置可连接属性
const makeFun = (item) => {
    console.log(item,'渲染=================')
    plumbInstance.setSourceEnabled(item.id, item.isSource);
    plumbInstance.setTargetEnabled(item.id, item.isTarget);
    plumbInstance.setDraggable(item.id, true);
    plumbInstance.makeSource(item.id, {
    filter: ".pointNode",
    filterExclude: false,
    allowLoopback: true,
    maxConnections: -1,
    Container: item.Container,
    anchor: item.anchor,
    connector: item.connector,
    endpoint: item.endpoint,
    overlays: item.overlays,
    paintStyle: item.paintStyle,
    hoverPaintStyle: item.hoverPaintStyle,
    endpointStyle: item.endpointStyle,
  });
  plumbInstance.makeTarget(item.id, {
    filter: ".pointNode",
    filterExclude: false,
    allowLoopback: true,
    maxConnections: 1,
    Container: item.Container,
    anchor: item.anchor,
    connector: item.connector,
    endpoint: item.endpoint,
    overlays: item.overlays,
    paintStyle: item.paintStyle,
    hoverPaintStyle: item.hoverPaintStyle,
    endpointStyle: item.endpointStyle,
  });
  plumbInstance.draggable(item.id, {
    containment: "parent",
    stop: function (el) {
      item.left = el.pos[0];
      item.top = el.pos[1];
    },
  });
};

//连线触发事件
plumbInstance.bind("connection", (event) => {
  console.log(event, "新的连线事件触发");
  // forceUpdate();
  let sourceNode = infoList.value.find((item) => item.id === event.sourceId);
  console.log(sourceNode.to, event.targetId, "???");
  if (sourceNode.to.findIndex((v) => v === event.targetId) === -1) {
    sourceNode.to.push(event.targetId);
  }
  plumbInstance.repaint();
  nextTick(() => {
    renderFlag.value = "new";
  });
  if (renderFlag.value === "new") {
    console.log("新的页面刷新");
    renderFlag.value = "once";
    renderFun("new");
  }

  console.log(infoList.value,'连线成功后的数据====')
});
const openMenuFun = (event,nodeItem)=>{
    console.log(event,nodeItem,'右键事件')
    contextStyle.left = event.x-220+'px'
    contextStyle.top = event.y-120+'px'
    contextMenuShow.value = true
}
//获取默认的信息并进行默认配置
infoList.value = lodash.cloneDeep(globalConfig.defaultList)
infoList.value.map(item=>item = Object.assign(item,globalConfig.readyConfig))

onMounted(() => {
    nextTick(() => {
        renderFun()
        renderFlag.value = 'render'
    })
})
onBeforeUnmount(()=>{
    infoList.value = []

})
</script>
<style lang="less" scoped>
.contentBox {
    display: flex;
    height: 600px;
    position: relative;

    .leftMenu {
        width: 220px;
        padding: 10px;

        // background: red;
        h3 {
            text-align: center;
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 10px;
        }

        .nodeItem {
            cursor: pointer;
            text-align: center;
            border: 1px dashed #eee;
            line-height: 40px;
            border: 1px dashed rgb(66, 114, 218);
            height: 40px;
            margin-bottom: 10px;
        }
    }

    .rightInfo {
        width: 200px;
        // background: green;
    }

    .canvasBox {
        flex: 1;
        border: 1px solid #eee;
        height: 700px;
        width: 100%;
        display: block;
        position: relative;
        .pointNode{
            position: absolute;
            left: 10px;
            top: 0px;
        }
    }
}
.contextMenu{
    position: absolute;
    left:0;
    top: 0;
    border: #000 1px solid;
}
</style>