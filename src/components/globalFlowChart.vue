<template>
    <div class="contentBox">
        <div class="leftMenu">
            <h3>流程节点</h3>
            <draggable @start="nodeMoveStart" @end="nodeMoveEnd" v-model="props.leftNodeList">
                <div v-for="(nodeItem, nodeIndex) in leftNodeOptionsList" :key="nodeItem.nodeId" 
                @mousedown="(el)=>downNode(el,nodeItem)"
                class="nodeItem">{{ nodeItem.label
                }}</div>
            </draggable>
            <div class="btnBox">
            <el-button type="primary" @click="saveFlow">保存</el-button>
            <el-button type="primary" @click="callBack">返回</el-button>
            </div>
        </div>
        <div class="canvasBox" id="canvasBox" @contextmenu.prevent="openMenuFun($event,'canvasBox')" @click.prevent="canvasBoxClick">
            <div v-for="(canvasNodeItem, canvasNodeIndex) in infoList" :key="canvasNodeIndex" :id="canvasNodeItem.id" 
                :style="canvasNodeStyle(canvasNodeItem)">
                <div class="pointNode">
                    <el-icon><CirclePlusFilled /></el-icon>
                </div>
                {{ canvasNodeItem.label }}
                <div class="statusIcon">
                    <el-icon color="green" v-if="canvasNodeItem.status === 'success'"><CircleCheckFilled /></el-icon>
                    <el-icon color="#000" v-else-if="canvasNodeItem.status === 'loading'"><Loading /></el-icon>
                    <el-icon color="red" v-else-if="canvasNodeItem.status === 'error'"><CircleCloseFilled /></el-icon>
                </div>
            </div>

        </div>
        <div class="contextMenu" :style="contextStyle" v-show="contextMenuShow">
          <div v-for="(menuItem,menuIndex) in contextMenuList" @click="menuClickFun(menuItem)">{{ menuItem.label }}</div>
        </div>
    </div>
    <el-dialog
    v-model="dialogVisible"
    :title="dialogTitle"
    width="20%"
  >
  <el-input v-model.trim="inputValue" maxlength="10"/>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDiaLog">取消</el-button>
        <el-button type="primary" @click="okDiaLog">
           确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
//函数库
const _ = require('lodash')

//图片保存插件
const html2canvas = require('html2canvas')
//消息框
import { ElMessage } from "element-plus";
//uuid
import { v4 as uuidv4 } from "uuid";
//引入可拖拽组件
import { VueDraggableNext } from "vue-draggable-next";
//引入画布基础配置信息
import globalConfig from '@/javascript/globalFlowChartConfig'
//引入画布的一些事件
import globalFun from '@/javascript/globalFlowChartFun'

//使用可拖拽组件
const draggable = VueDraggableNext;
//引入jsplumb插件
const JSPlUMB = require('jsplumb')
//实例化插件
let plumbInstance = JSPlUMB.jsPlumb.getInstance()
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
//右键菜单
let contextMenuList = ref([])
//选中的连线信息
let activeLineInfo = reactive({
    sourceId:'',
    targetId:''
})
//选中的节点信息
let activeNodeInfo = reactive({})
//弹框标识
let dialogVisible = ref(false)
//弹框标题
let dialogTitle = ref('')
//输入框的值
let inputValue = ref('')
//右键操作标识
let doneType = ref('')
// //缩放程度
// let zoom = ref(0.5)

//props传值
const props = defineProps({
    //默认节点信息
    leftNodeList: Array,
    leftNodeOptionsList:Array
})

//自定义事件
const emit = defineEmits(['saveFlow','callBack'])


//鼠标开始拖拽左侧
const nodeMoveStart = (el) => {
    // console.log(el, '鼠标开始的位置')
}
//鼠标停止左侧的拖拽
const nodeMoveEnd = (el) => {
    // console.log(el,'鼠标停止的位置')
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
    // console.log('活动的具体信息',nodeItem)
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
    // console.log(canvasBox.value.getBoundingClientRect(), '画布信息')
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
//  console.log(dragNodeInfo,'添加的节点信息')
 let addInfo = {
    id:uuidv4(),
    isSource:dragNodeInfo.isSource,
    isTarget:dragNodeInfo.isTarget,
    maxConnections:dragNodeInfo.maxConnections,
    label:dragNodeInfo.label,
    to:[],
    left:dragNodeInfo.left,
    top:dragNodeInfo.top,
    status:'loading',

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
                        // connectorOverlays:item.connectorOverlays,
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
            // console.log(infoList.value,'待渲染的信息')
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
    // console.log(item,'渲染=================')
    plumbInstance.setSourceEnabled(item.id, item.isSource);
    plumbInstance.setTargetEnabled(item.id, item.isTarget);
    plumbInstance.setDraggable(item.id, true);
    if(item.isSource){
        plumbInstance.makeSource(item.id, {
    filter: ".pointNode",
    filterExclude: false,
    allowLoopback: true,
    maxConnections: item.maxConnections || -1,
    Container: item.Container,
    anchor: item.anchor,
    connector: item.connector,
    endpoint: item.endpoint,
    overlays: item.overlays,
    paintStyle: item.paintStyle,
    hoverPaintStyle: item.hoverPaintStyle,
    endpointStyle: item.endpointStyle,
    allowLoopback:true
  });
    }
    if(item.isTarget){
        plumbInstance.makeTarget(item.id, {
    filter: ".pointNode",
    filterExclude: false,
    allowLoopback: true,
    maxConnections: item.maxConnections || 1,
    Container: item.Container,
    anchor: item.anchor,
    connector: item.connector,
    endpoint: item.endpoint,
    overlays: item.overlays,
    paintStyle: item.paintStyle,
    hoverPaintStyle: item.hoverPaintStyle,
    endpointStyle: item.endpointStyle,
    allowLoopback:true
  });
    }

  plumbInstance.draggable(item.id, {
    containment: "parent",
    stop: function (el) {
      item.left = el.pos[0];
      item.top = el.pos[1];
    },
  });
};
//连线右击事件
plumbInstance.bind("contextmenu",(con)=>{
    // console.log(con,'连线右键')
    activeLineInfo.sourceId = con.sourceId
    activeLineInfo.targetId = con.targetId
    contextMenuShow.value = true
    contextMenuList.value = globalConfig.contextMenuList.lineNode
    // console.log('连线的信息',activeLineInfo)
})
//连线触发事件
plumbInstance.bind("connection", (event) => {
//   console.log(event, "新的连线事件触发");
  // forceUpdate();
  let sourceNode = infoList.value.find((item) => item.id === event.sourceId);
//   console.log(sourceNode.to, event.targetId, "???");
  if (sourceNode.to.findIndex((v) => v === event.targetId) === -1) {
    sourceNode.to.push(event.targetId);
  }
  plumbInstance.repaint();
  nextTick(() => {
    renderFlag.value = "new";
  });
  if (renderFlag.value === "new") {
    // console.log("新的页面刷新");
    renderFlag.value = "once";
    renderFun("new");
  }
//   console.log(infoList.value,'连线成功后的数据====')
});
//连线触发之前
plumbInstance.bind('beforeDrop',(info)=>{
    // console.log(info,'连线之前')
    let sourceInfo = infoList.value.find(item=>item.id === info.sourceId)
    let targetInfo = infoList.value.find(item=>item.id === info.targetId)
    // console.log(sourceInfo,'起始节点')
    // console.log(targetInfo,'目标节点')
    if(sourceInfo.isSource === false){
        ElMessage({
            type:'warning',
            message:`${sourceInfo.label}节点不能作为连接起始点`
        })
        return false
    }else{
        if(targetInfo.isTarget === false){
            ElMessage({
            type:'warning',
            message:`${targetInfo.label}节点不能作为连接终点`
        })
        return false
        }else{
            return true
        }
    }
  })
//画布的右键事件
const openMenuFun = (event,nodeItem)=>{
    contextMenuShow.value = false
    // console.log(event,nodeItem,'右键事件')
    contextStyle.left = event.x-230+'px'
    contextStyle.top = event.y-170+'px'
    if(event.target.id){
        contextMenuShow.value = true
        if(event.target.id === 'canvasBox'){
        // console.log('右键的画布')
        contextMenuList.value = globalConfig.contextMenuList.canvasBox
    }else{
        // console.log(event.target.id,'节点')
        activeNodeInfo = infoList.value.find(v=>v.id === event.target.id)
        contextMenuList.value = globalConfig.contextMenuList.canvasNode
    }
    }else{
        // console.log('点击的连线')
    }

}
//画布的点击事件
const canvasBoxClick = ()=>{
    contextMenuShow.value = false
}
const menuClickFun = (item)=>{
//   console.log(item,'节点信息')
contextMenuShow.value = false
doneType.value =  globalFun[item.value](plumbInstance,infoList,activeNodeInfo,activeLineInfo)
switch(doneType.value){
  case 'rename':
    dialogVisible.value = true
    dialogTitle.value = '重命名'
    inputValue.value = activeNodeInfo.label
  break
  case 'deleteNode':
    nextTick(()=>{
    renderFun('new')
})
  break
  case 'reset':
  nextTick(()=>{
    renderFun('new')
})
  break
  case 'downLoad':
    let canvasBox = document.querySelector('#canvasBox')
  html2canvas(canvasBox,{}).then((canvas)=>{
    let imgUrl = canvas.toDataURL()
    console.log(imgUrl,'图片地址')
    	// 创建img元素，用于预览图片
	const img = document.createElement('img')
	img.src = imgUrl;
	document.body.appendChild(img);
	
	// 创建a元素，用于下载图片
	const link = document.createElement('a');
    link.style.width = '0px'
    link.style.height = '0px'
    link.className = 'temporaryImg'
	link.href = imgUrl;
    //图片名称随机
	link.download = `${uuidv4()}.png`;
	
	// 添加a元素到DOM中，并触发点击事件以下载图片
	document.body.appendChild(link);
	link.click();
     nextTick(()=>{
        document.body.removeChild(img)
    document.body.removeChild(link)
     })
  })
  break
  case 'deleteLine':
  nextTick(()=>{
    renderFun('new')
  })
  break
  case 'run':
  nextTick(()=>{
    renderFun('new')
  })
  break
  case 'loading':
  nextTick(()=>{
    renderFun('new')
  })
  break
  case 'breakOff':
  nextTick(()=>{
    renderFun('new')
  })
  break
}

}

//保存数据
const saveFlow = ()=>{
emit("saveFlow",infoList.value)
}
//返回
const callBack = ()=>{
  emit("callBack")
}
const closeDiaLog = ()=>{
    dialogVisible.value = false
    inputValue.value = ''
}
const okDiaLog = ()=>{
    console.log(inputValue.value,'输入框的值')
    switch(doneType.value){
        case 'rename':
            if(inputValue.value.length<1){
                ElMessage({
                    message:"值不能为空",
                    type:"warning"
                })
                return
            }else{
                activeNodeInfo.label = inputValue.value
            }
    }
    closeDiaLog()
    nextTick(()=>{
    renderFun()
})

}

//获取节点信息并进行默认配置
const getInfoList =(info)=>{
  if(info){
    infoList.value = info
  }else{
    infoList.value = _.cloneDeep(globalConfig.defaultList)
  }
  infoList.value.map(item=>item = Object.assign(item,globalConfig.readyConfig))
      nextTick(() => {
        renderFun()
        renderFlag.value = 'render'
    })
}

//暴露组件方法
defineExpose({
  getInfoList
})

onMounted(() => {
})
onBeforeUnmount(()=>{
    infoList.value = []

})
</script>
<style lang="less" scoped>
.contentBox {
    display: flex;
    height: 560px;
    position: relative;

    .leftMenu {
        width: 220px;
        height: 700px;
        padding: 10px;
        position: relative;
        .btnBox{
          position: absolute;
          bottom: 0px;
          left: 40px;
        }
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
        .statusIcon{
            position: absolute;
            right: 10px;
            top: 0px;
        }
    }
}
.contextMenu{
    position: absolute;
    left:0;
    top: 0;
    border: #eee 1px solid;
    // border-bottom: none;
    box-shadow: #eee 1px 1px 1px 1px;
    div{
        width: 180px;
        padding: 10px;
        // border-bottom: 1px solid #000;
        text-align: center;
        background: #fff;
        cursor: pointer;
    }
    div:hover{
        background-color: #e6e6e9;
    }
}
</style>