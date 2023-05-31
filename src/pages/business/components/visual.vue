<template>
    <ul class="box">
        <li class="leftMenu">
            <h3>选择节点</h3>
            <el-collapse>
                <el-collapse-item :title="item1.name" v-for="(item1, index) in leftMenuData">
                
                        <draggable @start="moveStart" @end="moveEnd" v-model="item1.children" :options="options">
                        <div v-for="(item2, n) in item1.children" class="content" :divOption="JSON.stringify(item2)" @mousedown="mouseDownFun">{{ item2.context }}</div>
                       </draggable>
                 

                    
                </el-collapse-item>
            </el-collapse>
        </li>
        <li class="plumbBox">
            <div v-for="(item, index) in info" :key="item.name" :id="item.name" :style="getStyle(item)">
              <el-icon class="plumbNode"><CirclePlusFilled /></el-icon>
                {{ item.context }}
                <el-icon class="is-loading" v-if="item.status === 'loading'" color="blue">
                    <Loading />
                </el-icon>
                <el-icon v-else-if="item.status === 'success'" color="green">
                    <CircleCheckFilled />
                </el-icon>
                <el-icon v-else-if="item.status === 'error'" color="red">
                    <CircleCloseFilled />
                </el-icon>
            </div>
        </li>

    <li class="rightContent"></li>
  </ul>
</template>
<script setup>
//引入jsPlumb
import { jsPlumb } from 'jsplumb'
import {VueDraggableNext} from 'vue-draggable-next'
import { ElMessage } from 'element-plus';
import lodash from 'lodash'
const draggable = VueDraggableNext
let plumbBox = null
let plumbBoxPositionInfo = reactive({})
//鼠标和节点的内部差距,为了让节点更精准的判断区域
let nodePositionDiff = reactive({})
//后面需要回传给父组件的值
let plumbList = ref([])
//连线基础配置
let jsPlumbConnectOptions = {
        isSource: true,
        isTarget: true,
        // 动态锚点、提供了4个方向 Continuous、AutoDefault
        anchor: ["Continuous",{shape:"Circle"}],
        overlays: [['Arrow', { width: 8, length: 8, location: 1 }]] // overlay
      }
//左侧菜单节点的拖拽配置
const options = { 
                    preventOnFilter: false,
                    sort: false,
                    disabled: false,
                    ghostClass: 'tt',
                    // 不使用H5原生的配置
                    forceFallback: true
}
//画布节点的拖拽连线配置
const jsplumbSourceOptions = {
  filter:'.plumbNode',
  filterExclude:false,
  anchor:'Continuous',
  allowLoopback:true,
  maxConnections: -1,
  onMaxConnections:function (info,e){
    console.log(`超过了最大值连线:${info.maxConnections}`)
  }
}

//默认配置
let globalConfig = {
  anchor: ["Bottom", "Top", "Left", "Right"],
  connector: "Bezier",
  endpoint: "Blank",
  paintStyle: { stroke: "#364249", strokeWidth: 1 },
  overlays: [["Arrow", { width: 5, length: 5, location: 1 }]],
  endpointStyle: {
    fill: "lightgray",
    outlineStroke: "darkgray",
    outlineWidth: 2,
  },
};
//左侧
let leftMenuData = ref([
    {
        name: '起始列表',
        children: [
            {
                name: 'div11',
                to: [],
                top: 0,
                left: 0,
                context: '起始节点1',
                status: 'loading'
            },
            {
                name: 'div12',
                to: [],
                top: 0,
                left: 0,
                context: '起始节点2',
                status: 'loading'
            }
        ]
    },
    {
        name: '完结列表',
        children: [
            {
                name: 'div21',
                to: [],
                top: 0,
                left: 0,
                context: '完结节点1',
                status: 'loading'
            },
            {
                name: 'div22',
                to: [],
                top: 0,
                left: 0,
                context: '完结节点2',
                status: 'loading'
            }
        ]
    },
])
//渲染节点信息(默认是后台传过来的)
let info = ref([
  {
    name: "div1",
    to: ["div2", "div3"],
    top: 300,
    left: 100,
    color: "red",
    context: "开始运行",
    status: "success",
    isSource: true,
    isTarget: false,
  },
  {
    name: "div2",
    to: ["div4"],
    top: 200,
    left: 500,
    color: "green",
    context: "构建任务1",
    status: "success",
    isSource: true,
    isTarget: true,
  },
  {
    name: "div3",
    to: ["div5"],
    top: 400,
    left: 500,
    color: "green",
    context: "构建任务2",
    status: "error",
    isSource: true,
    isTarget: true,
  },
  {
    name: "div4",
    to: [],
    top: 200,
    left: 900,
    color: "blue",
    context: "完成部署1",
    status: "success",
    isSource: false,
    isTarget: true,
  },
  {
    name: "div5",
    to: [],
    top: 400,
    left: 900,
    color: "blue",
    context: "完成部署2",
    status: "loading",
    isSource: false,
    isTarget: true,
  },
]);
//合并节点信息和配置
info.value.map((item) => (item = Object.assign(item, globalConfig)));

//新增一个节点
const addNode = (newInfo) => {
   info.value.push(newInfo)
    renderNode()
}

//新增一条连线
const addLine = () => {
    info.value[3].to = ['div6']
    renderNode()
}
const mouseDownFun = (event)=>{
//具体位置鼠标信息
let mousedownPositionInfo = {x:event.clientX,y:event.clientY}
//被拖拽节点初始的位置信息
let moveBoxBeforePosition = {x:event.target.getBoundingClientRect().x,y:event.target.getBoundingClientRect().y}
nodePositionDiff = {leftDiff:mousedownPositionInfo.x - moveBoxBeforePosition.x,topDiff:mousedownPositionInfo.y - moveBoxBeforePosition.y}

}
//开始拖动
const moveStart = (el)=>{
 console.log(el,'开始拖动')
}
//停止拖动
const moveEnd = (el)=>{
    refreshPlumbPostionInfo()
 let dragNodeInfo = JSON.parse(el.item.attributes.divOption.nodeValue)
 judgePosition(dragNodeInfo,plumbBoxPositionInfo,el.originalEvent.x,el.originalEvent.y)
}
//判断拖动区域
const judgePosition = (dragNodeInfo,plumbBoxPositionInfo,x,y)=>{
  //拖拽至画布外部
  if((x - nodePositionDiff.leftDiff<plumbBoxPositionInfo.left)||(x + 180-nodePositionDiff.leftDiff>plumbBoxPositionInfo.right)||(y- nodePositionDiff.topDiff<plumbBoxPositionInfo.top)||(y+ 40-nodePositionDiff.topDiff>plumbBoxPositionInfo.bottom)){
    ElMessage({
        message:'节点不能拖拽至画布之外',
        type:'error'
    })
  }else{
    dragNodeInfo.left = x - plumbBoxPositionInfo.left - nodePositionDiff.leftDiff
    dragNodeInfo.top = y - plumbBoxPositionInfo.top - nodePositionDiff.topDiff
    addNode(dragNodeInfo)
  }
}
//刷新画布区域信息
const refreshPlumbPostionInfo = ()=>{
    plumbBox = document.querySelector('.plumbBox')
        let positionInfo = plumbBox.getBoundingClientRect()
        plumbBoxPositionInfo = positionInfo
}
//渲染节点
const renderNode = () => {
    //这里需要等所依赖的DOM节点全部渲染完毕,才能进行图形渲染
    plumbInit.repaintEverything()
    nextTick(() => {
        //获取画布的位置和区域信息
        refreshPlumbPostionInfo()        
        //渲染画布中的信息节点
        let renderList = []
        info.value.forEach(item => {
            if (item.to.length > 0) {
                item.to.forEach(v => {
                    renderList.push({
                        source: item.name,
                        target: v,
                        anchor: item.anchor,
                        connector: item.connector,
                        endpoint: item.endpoint,
                        overlays: item.overlays,
                        paintStyle: item.paintStyle,
                        endpointStyle: item.endpointStyle
                    })
                })
            }
        })
        plumbList.value = renderList

    //渲染函数
    plumbInit.ready(() => {
      renderList.forEach((item) => {
        // plumbInit.connect(item,jsPlumbConnectOptions);
        plumbInit.connect(item)
      });
      info.value.forEach((item) => {
        // plumbInit.makeSource(item.name,lodash.merge(jsplumbSourceOptions,{}))
        plumbInit.draggable(item.name, {
          containment: "parent",
          stop: function (el) {
            item.left = el.pos[0]
            item.top = el.pos[1]
          },
        });
      });
    });
  });
};

// 给元素设置渲染样式
const getStyle = function (item) {
  return {
    position: "absolute",
    left: item.left + "px",
    top: item.top + "px",
    // color:item.color,
    // border:'1px solid #',
    width: "180px",
    height: "36px",
    lineHeight: "36px",
    textAlign: "center",
    borderLeft: "5px solid blue",
    borderRadius: "4%",
    boxShadow: "#eee 3px 3px 3px 3px",
    cursor: "pointer",
  };
};
//初始化jsplumb实例
let plumbInit = jsPlumb.getInstance();
onMounted(() => {
  renderNode();
  // info.value.forEach(item=>{
  //   plumbInit.makeSource(item.name,lodash.merge(jsplumbSourceOptions,{}))
  // })
});

//暴露给父组件的值,需要父组件发送请求
defineExpose({
  plumbList,
  info,
});
</script>
<style lang="less" scoped>
.box {
  width: 100%;
  height: 100%;
  display: flex;
}

.leftMenu {
  width: 240px;
  border-right: 1px solid #d3d3d3;
  border-bottom: 1px solid #d3d3d3;
  h3 {
    width: 100%;
    height: 30px;
    line-height: 30px;
    background: #eee;
    text-align: center;
   }
    .content {
        width: 180px;
        height: 40px;
        border: dashed 1px #030303;
        text-align: center;
        line-height: 40px;
        margin-bottom: 10px;
        margin-right: 10px;
        cursor: pointer;
    }

    // display: flex;
    // flex-direction: column;
    // align-items: center;

  // display: flex;
  // flex-direction: column;
  // align-items: center;
}

.plumbBox {
  overflow: scroll;
  position: relative;
  // margin: 0 20px;
  width: 100%;
  border-right: 1px solid #d3d3d3;
}

.rightContent {
  width: 240px;
  border-bottom: 1px solid #d3d3d3;
}
</style>







 