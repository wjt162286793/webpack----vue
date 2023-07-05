<template>
  <div class="nameContent">
    方案名称:&nbsp;&nbsp;<el-input
      v-model.trim="scenario_name"
      style="width: 200px; margin-left: 30px';margin-right:20px;"
    ></el-input>
    模型规范:&nbsp;&nbsp;<el-select
      v-model="mode_type"
      style="width: 200px; margin-left: 30px';margin-right:20px;"
    >
      <el-option
        v-for="(item, index) in typeOptions"
        :key="index"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
  </div>
  <ul class="box">
    <li class="leftMenu">
      <h3>选择节点</h3>
      <el-collapse>
        <el-collapse-item
          :title="item1.name"
          v-for="(item1, index) in leftMenuData"
          :key="index"
        >
          <draggable
            @start="moveStart"
            @end="moveEnd"
            v-model="item1.children"
            :options="options"
          >
            <div
              v-for="(item2, n) in item1.children"
              class="content"
              :divOption="JSON.stringify(item2)"
              @mousedown="mouseDownFun"
              :key="n"
            >
              {{ item2.config[0].value }}
            </div>
          </draggable>
        </el-collapse-item>
      </el-collapse>
    </li>
    <li class="plumbBox" id="plumbBox">
      <div
        v-for="(item, index) in info"
        :key="index"
        :id="item.id"
        :style="getStyle(item)"
        :class="item.id === activeNode.id ? 'activeNode' : 'normalNode'"
        @click="sendActive(item)"
      >
        <div class="plumbNode" :id="item.id + 'plumbNode'">
          <el-icon :size="20">
            <CirclePlusFilled />
          </el-icon>
        </div>
        {{ item.config[0].value }}
        <el-icon
          class="is-loading"
          v-if="item.status === 'loading'"
          color="blue"
        >
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

    <li class="rightContent">
      <h3>节点操作</h3>
      <div style="padding-left: 10px">
        <RightForm
          ref="rightForm"
          @changeActiveNodeInfo="changeActiveNodeInfo"
          @deleteLine="deleteLine"
          @deleteNode="deleteNode"
        ></RightForm>
      </div>
    </li>
  </ul>
</template>
<script setup>
//引入jsPlumb
import { jsPlumb } from "jsplumb";
import { VueDraggableNext } from "vue-draggable-next";
import { ElMessage } from "element-plus";
import lodash from "lodash";
import { v4 as uuidv4 } from "uuid";
import { reactive } from "vue";
import word from "@/dictionaries/business.json";
import RightForm from "./rightForm";
//名称和规范
console.log(typeOptions,'下拉框类型')
let typeOptions = word.typeOptions
let scenario_name = ref("");
let mode_type = ref("");
let doneFlag = ref("new");
//拖拽组件实例
const draggable = VueDraggableNext;
let plumbBox = null;
let plumbBoxPositionInfo = reactive({});
//鼠标和节点的内部差距,为了让节点更精准的判断区域
let nodePositionDiff = reactive({});
//后面需要回传给父组件的值
let plumbList = ref([]);
//绘制标识
let renderFlag = ref(undefined);
//动态节点
let activeNode = ref({});
let rightForm = ref(null);
/*
----------------------------------------------
//连线基础配置
let jsPlumbConnectOptions = {
        isSource: true,
        isTarget: true,
        // 动态锚点、提供了4个方向 Continuous、AutoDefault
        anchor: ["Continuous",{shape:"Circle"}],
        overlays: [['Arrow', { width: 8, length: 8, location: 1 }]] // overlay
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
----------------------------------------------
*/
//修改
const doneType = (flag, row) => {
  doneFlag.value = flag;
  if (row) {
    console.log("???", row);
    scenario_name.value = row.scenarioName;
    mode_type.value = row.modeType;
    info.value = row.flowInfo;
  }
};
//左侧菜单节点的拖拽配置
const options = {
  preventOnFilter: false,
  sort: false,
  disabled: false,
  ghostClass: "tt",
  // 不使用H5原生的配置
  forceFallback: true,
};
//默认配置
let globalConfig = {
  Container: "plumbBox",
  anchor: ["Bottom", "Top", "Left", "Right"],
  connector: "Bezier",
  endpoint: "Blank",
  paintStyle: {
    stroke: "#364249",
    strokeWidth: 1,
    outlineStroke: "transparent",
    outlineWidth: 10,
  },
  hoverPaintStyle: { stroke: "#000", strokeWidth: 1.3 },
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
    name: "起始列表",
    children: [
      {
        to: [],
        top: 0,
        left: 0,
        status: "loading",
        isSource: true,
        isTarget: false,
        config: [
          {
            label: "名称",
            name: "label",
            type: "text",
            value: "起始节点1",
            require: true,
          },
          {
            label: "描述",
            name: "description",
            type: "textarea",
            value: "",
            require: false,
          },
          {
            label: "归属",
            name: "affiliation",
            type: "select",
            value: "check",
            require: true,
            options: [
              { label: "审核信息", value: "check" },
              { label: "生产经营", value: "manage" },
              { label: "结算报销", value: "account" },
            ],
          },
        ],
      },
      {
        to: [],
        top: 0,
        left: 0,
        status: "loading",
        isSource: true,
        isTarget: true,
        config: [
          {
            label: "名称",
            name: "label",
            type: "text",
            value: "起始节点2",
            require: true,
          },
          {
            label: "描述",
            name: "description",
            type: "textarea",
            value: "",
            require: false,
          },
          {
            label: "归属",
            name: "affiliation",
            type: "select",
            value: "check",
            require: true,
            options: [
              { label: "审核信息", value: "check" },
              { label: "生产经营", value: "manage" },
              { label: "结算报销", value: "account" },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "完结列表",
    children: [
      {
        to: [],
        top: 0,
        left: 0,
        status: "loading",
        type: "target",
        isSource: false,
        isTarget: false,
        config: [
          {
            label: "名称",
            name: "label",
            type: "text",
            value: "完结节点1",
            require: true,
          },
          {
            label: "描述",
            name: "description",
            type: "textarea",
            value: "check",
            require: false,
          },
          {
            label: "归属",
            name: "affiliation",
            type: "select",
            value: "",
            require: true,
            options: [
              { label: "审核信息", value: "check" },
              { label: "生产经营", value: "manage" },
              { label: "结算报销", value: "account" },
            ],
          },
        ],
      },
      {
        to: [],
        top: 0,
        left: 0,
        status: "loading",
        isSource: false,
        isTarget: false,
        config: [
          {
            label: "名称",
            name: "label",
            type: "text",
            value: "完结节点2",
            require: true,
          },
          {
            label: "描述",
            name: "description",
            type: "textarea",
            value: "",
            require: false,
          },
          {
            label: "归属",
            name: "affiliation",
            type: "select",
            value: "check",
            require: true,
            options: [
              { label: "审核信息", value: "check" },
              { label: "生产经营", value: "manage" },
              { label: "结算报销", value: "account" },
            ],
          },
        ],
      },
    ],
  },
]);
//渲染节点信息(默认是后台传过来的)
let info = ref([]);
//新增一个节点
const addNode = (newInfo) => {
  newInfo.id = uuidv4();
  newInfo = Object.assign(newInfo, globalConfig);
  info.value.push(newInfo);
  console.log(newInfo, "???新增节点的信息");
  // makeFun(newInfo)
  nextTick(() => {
    renderFlag.value = "new";
    makeFun(newInfo);
  });
};

//新增一条连线
const addLine = () => {
  info.value[3].to = ["div6"];
  renderNode();
};
const mouseDownFun = (event) => {
  //具体位置鼠标信息
  let mousedownPositionInfo = { x: event.clientX, y: event.clientY };
  //被拖拽节点初始的位置信息
  let moveBoxBeforePosition = {
    x: event.target.getBoundingClientRect().x,
    y: event.target.getBoundingClientRect().y,
  };
  nodePositionDiff = {
    leftDiff: mousedownPositionInfo.x - moveBoxBeforePosition.x,
    topDiff: mousedownPositionInfo.y - moveBoxBeforePosition.y,
  };
};
//开始拖动
const moveStart = (el) => {
  console.log(el, "开始拖动");
};
//停止拖动
const moveEnd = (el) => {
  refreshPlumbPostionInfo();
  let dragNodeInfo = JSON.parse(el.item.attributes.divOption.nodeValue);
  judgePosition(
    dragNodeInfo,
    plumbBoxPositionInfo,
    el.originalEvent.x,
    el.originalEvent.y
  );
};
//判断拖动区域
const judgePosition = (dragNodeInfo, plumbBoxPositionInfo, x, y) => {
  //拖拽至画布外部
  if (
    x - nodePositionDiff.leftDiff < plumbBoxPositionInfo.left ||
    x + 180 - nodePositionDiff.leftDiff > plumbBoxPositionInfo.right ||
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
//刷新画布区域信息
const refreshPlumbPostionInfo = () => {
  plumbBox = document.querySelector(".plumbBox");
  if (plumbBox) {
    let positionInfo = plumbBox.getBoundingClientRect();
    plumbBoxPositionInfo = positionInfo;
  }
};
//渲染节点
const renderNode = (flag) => {
  //合并节点信息和配置
  info.value.map((item) => (item = Object.assign(item, globalConfig)));
  //这里需要等所依赖的DOM节点全部渲染完毕,才能进行图形渲染
  nextTick(() => {
    if (flag === "new") {
      renderFlag.value = "once";
    }
    plumbInit.deleteEveryConnection();
    plumbInit.deleteEveryEndpoint();
    refreshPlumbPostionInfo();
    //渲染画布中的信息节点
    let renderList = [];
    // if(info.value.length<1){return}
    info.value.forEach((item) => {
      if (item.to.length > 0) {
        item.to.forEach((v) => {
          renderList.push({
            source: item.id,
            target: v,
            anchor: item.anchor,
            connector: item.connector,
            endpoint: item.endpoint,
            overlays: item.overlays,
            paintStyle: item.paintStyle,
            hoverPaintStyle: item.hoverPaintStyle,
            endpointStyle: item.endpointStyle,
          });
        });
      }
    });
    plumbList.value = renderList;
    //渲染函数
    plumbInit.ready(() => {
      renderList.forEach((item) => {
        // plumbInit.connect(item,jsPlumbConnectOptions);
        plumbInit.connect(item);
      });
      info.value.forEach((item) => {
        makeFun(item);
        plumbInit.draggable(item.id, {
          containment: "parent",
          stop: function (el) {
            item.left = el.pos[0];
            item.top = el.pos[1];
          },
        });
      });
    });
  });
};
//设置节点可连接属性
const makeFun = (item) => {
  plumbInit.setSourceEnabled(item.id, item.isSource);
  plumbInit.setTargetEnabled(item.id, item.isTarget);
  plumbInit.setDraggable(item.id, true);
  plumbInit.makeSource(item.id, {
    filter: ".plumbNode",
    filterExclude: false,
    allowLoopback: true,
    maxConnections: -1,
    Container: "plumbBox",
    anchor: item.anchor,
    connector: item.connector,
    endpoint: item.endpoint,
    overlays: item.overlays,
    paintStyle: item.paintStyle,
    hoverPaintStyle: item.hoverPaintStyle,
    endpointStyle: item.endpointStyle,
  });
  plumbInit.makeTarget(item.id, {
    filter: ".plumbNode",
    filterExclude: false,
    allowLoopback: true,
    maxConnections: 1,
    Container: "plumbBox",
    anchor: item.anchor,
    connector: item.connector,
    endpoint: item.endpoint,
    overlays: item.overlays,
    paintStyle: item.paintStyle,
    hoverPaintStyle: item.hoverPaintStyle,
    endpointStyle: item.endpointStyle,
  });
  plumbInit.draggable(item.id, {
    containment: "parent",
    stop: function (el) {
      item.left = el.pos[0];
      item.top = el.pos[1];
    },
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
//
plumbInit.bind("click", (conn, originalEvent) => {
  console.log(conn, "点击连线");
  let lineInfo = {};
  console.log(info.value, "整体信息");
  let sourceInfo = info.value.find((v) => v.id === conn.sourceId);
  let targetInfo = info.value.find((v) => v.id === conn.targetId);
  lineInfo = {
    sourceInfo,
    targetInfo,
  };
  rightForm.value.getLineInfo(lineInfo);
  // console.log("点击了", coon, originalEvent);
  // plumbInit.deleteConnection(conn);
});
//连线触发事件
plumbInit.bind("connection", (event) => {
  // console.log(event, "新的连线事件触发");
  // forceUpdate();
  let sourceNode = info.value.find((item) => item.id === event.sourceId);
  console.log(sourceNode.to, event.targetId, "???");
  if (sourceNode.to.findIndex((v) => v === event.targetId) === -1) {
    sourceNode.to.push(event.targetId);
  }
  plumbInit.repaint();
  nextTick(() => {
    renderFlag.value = "new";
  });
  if (renderFlag.value === "new") {
    console.log("新的页面刷新");
    renderFlag.value = "once";
    renderNode("new");
  }
  // console.log(info.value,'所有节点')
  // renderNode()
});

//切换动态节点
function sendActive(node) {
  activeNode.value = node;
  console.log(activeNode.value, "动态节点");
  rightForm.value.changeFormData(activeNode.value.config);
}

onMounted(() => {
  setTimeout(() => {
    //     info.value = [
    //   {
    //     name: "div1",
    //     to: ["div2", "div3"],
    //     top: 300,
    //     left: 100,
    //     color: "red",
    //     context: "开始运行",
    //     status: "success",
    //     isSource: true,
    //     isTarget: false,
    //   },
    //   {
    //     name: "div2",
    //     to: ["div4"],
    //     top: 200,
    //     left: 500,
    //     color: "green",
    //     context: "构建任务1",
    //     status: "success",
    //     isSource: true,
    //     isTarget: true,
    //   },
    //   {
    //     name: "div3",
    //     to: ["div5"],
    //     top: 400,
    //     left: 500,
    //     color: "green",
    //     context: "构建任务2",
    //     status: "error",
    //     isSource: true,
    //     isTarget: true,
    //   },
    //   {
    //     name: "div4",
    //     to: [],
    //     top: 200,
    //     left: 900,
    //     color: "blue",
    //     context: "完成部署1",
    //     status: "success",
    //     isSource: false,
    //     isTarget: true,
    //   },
    //   {
    //     name: "div5",
    //     to: [],
    //     top: 400,
    //     left: 900,
    //     color: "blue",
    //     context: "完成部署2",
    //     status: "loading",
    //     isSource: false,
    //     isTarget: true,
    //   },
    // ]
    renderNode();
    nextTick(() => {
      console.log("页面初次渲染完毕");
      renderFlag.value = "render";
    });
  });
});
//右侧保存值
const changeActiveNodeInfo = (info) => {
  console.log(info, "保存后的新值");
  activeNode.value.config = info;
  nextTick(() => {
    renderFlag.value = "new";
    makeFun(activeNode.value);
  });
};
//删除线
const deleteLine = (deleteLineInfo) => {
  console.log(deleteLineInfo, "要删除的连线信息");
  console.log(info.value, "全量信息");
  let sourceIndex = info.value.findIndex(
    (item) => item.id === deleteLineInfo.sourceInfo.id
  );
  let deleteTargetId = deleteLineInfo.targetInfo.id;
  let deleteTargetIndex = info.value[sourceIndex].to.findIndex(
    (v) => v === deleteTargetId
  );
  info.value[sourceIndex].to.splice(deleteTargetIndex, 1);
  renderNode();
};
//删除节点
const deleteNode = (nodeInfo) => {
  console.log(activeNode.value);
  let nodeIndex = info.value.findIndex(
    (item) => item.id === activeNode.value.id
  );
  info.value.splice(nodeIndex, 1);
  info.value.forEach((item) => {
    let flagIndex = item.to.findIndex((v) => v === activeNode.value.id);
    if (flagIndex !== -1) {
      item.to.splice(flagIndex, 1);
    }
  });
  console.log(info.value, "节点列表");
  renderNode();
  activeNode.value = {};
  rightForm.value.changeFormData([]);
};
//暴露给父组件的值,需要父组件发送请求
defineExpose({
  plumbList,
  info,
  scenario_name,
  mode_type,
  doneType,
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
  h3 {
    width: 200px;
    height: 30px;
    line-height: 30px;
    text-align: center;
  }
}

.plumbNode {
  float: left;
  line-height: 45px;
}
.activePlumbNode {
  float: left;
  line-height: 45px;
  background: #0bcfe9;
}
.normalNode {
  background-color: #fff;
}
.activeNode {
  background-color: #80eaf8;
}
.nameContent {
  padding-bottom: 14px;
  border-bottom: 1px solid #eee;
}
</style>







 



    