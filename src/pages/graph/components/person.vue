<template>
  <div>
    <div
      style="
        border: #efefef solid 1px;
        height: calc(100vh - 180px);
        width: 100%;
      "
    >
      <RelationGraph
        ref="seeksRelationGraph"
        :options="userGraphOptions"
        class="graph"
      />
    </div>
  </div>
</template>

<script setup>
let seeksRelationGraph = ref(null);
const userGraphOptions = {
  backgrounImage: "",
  backgrounImageNoRepeat: true,
  layouts: [
    {
      label: "手工",
      layoutName: "fixed",
      layoutClassName: "seeks-layout-fixed",
      defaultJunctionPoint: "border",
      defaultNodeShape: 0,
      defaultLineShape: 1,
    },
  ],
  defaultNodeBorderWidth: 0,
  defaultNodeShape: 1,
  allowShowMiniNameFilter: false,
  allowShowMiniToolBar: false,
  defaultJunctionPoint: "lr",
  defaultLineShape: 1,
};
function setGraphData() {
  const _orign_data = {
    entname: "保护伞公司",
    invs: [
      { id: "inv1", text: "一号工厂", desc: "40%" },
      { id: "inv2", text: "二号工厂", desc: "30%" },
      { id: "inv3", text: "三号工厂", desc: "10%" },
      { id: "inv4", text: "销售部", desc: "10%" },
      { id: "inv5", text: "维修部", desc: "10%" },
    ],
    persons: [
      { id: "person1", text: "数据分析部", desc: "董事长" },
      { id: "person2", text: "数据仓库部", desc: "总经理" },
      { id: "person3", text: "模型产出部", desc: "监事" },
      { id: "person4", text: "算法研究部", desc: "董事" },
    ],
    asInvs: [
      { id: "asinv1", text: "化学部", desc: "80%" },
      { id: "asinv2", text: "病毒研究所", desc: "70%" },
      { id: "asinv3", text: "制药中心", desc: "20%" },
    ],
    branchs: [
      { id: "branch1", text: "软件开发部", desc: "80%" },
      { id: "branch2", text: "硬件制造部", desc: "70%" },
      { id: "branch4", text: "机器人研究部", desc: "70%" },
      { id: "branch5", text: "生物工程研究部", desc: "20%" },
    ],
  };
  const _center = {
    x: 0,
    y: 0,
  };
  const graphData = {
    rootId: "root",
    nodes: [],
    lines: [],
  };
  // 添加根节点和虚拟节点
  const rootNode = {
    id: graphData.rootId,
    text: _orign_data.entname,
    styleClass: "c-g-center",
    color: "#A4C1FF",
    width: 250,
    height: 50,
    x: _center.x - 125,
    y: _center.y - 25,
  };
  const invRootNode = {
    id: "invRoot",
    text: "汽车",
    styleClass: "c-g-group-node",
    color: "#FFC5A6",
    width: 100,
    height: 50,
  };
  const personRootNode = {
    id: "personRoot",
    text: "大数据",
    styleClass: "c-g-group-node",
    color: "#B9FFA7",
    width: 100,
    height: 50,
  };
  const asinvRootNode = {
    id: "asinvRoot",
    text: "医疗保健",
    styleClass: "c-g-group-node",
    color: "#FFBEC1",
    width: 100,
    height: 50,
  };
  const branchRootNode = {
    id: "branchRoot",
    text: "高科技",
    styleClass: "c-g-group-node",
    color: "#FFA1F8",
    width: 100,
    height: 50,
  };
  invRootNode.x = _center.x - 200 - invRootNode.width;
  invRootNode.y = _center.y - 130;
  personRootNode.x = _center.x - 200 - personRootNode.width;
  personRootNode.y = _center.y + 90;
  asinvRootNode.x = _center.x + 200;
  asinvRootNode.y = _center.y - 130;
  branchRootNode.x = _center.x + 200;
  branchRootNode.y = _center.y + 90;
  // 添加节点数据到graphData
  graphData.nodes.push(rootNode);
  graphData.nodes.push(invRootNode);
  graphData.nodes.push(personRootNode);
  graphData.nodes.push(asinvRootNode);
  graphData.nodes.push(branchRootNode);
  // 添加根节点和虚拟节点之间的关系，并将关系数据放入graphData
  graphData.lines.push({
    from: rootNode.id,
    to: invRootNode.id,
    styleClass: "c-g-l-group",
    color: "#C7E9FF",
    lineShape: 2,
  });
  graphData.lines.push({
    from: rootNode.id,
    to: personRootNode.id,
    styleClass: "c-g-l-group",
    color: "#C7E9FF",
    lineShape: 2,
  });
  graphData.lines.push({
    from: rootNode.id,
    to: asinvRootNode.id,
    styleClass: "c-g-l-group",
    color: "#C7E9FF",
    lineShape: 2,
  });
  graphData.lines.push({
    from: rootNode.id,
    to: branchRootNode.id,
    styleClass: "c-g-l-group",
    color: "#C7E9FF",
    lineShape: 2,
  });
  // 将股东加入虚拟节点"股东"
  _orign_data.invs.forEach((thisNode, _index) => {
    thisNode.width = 200;
    thisNode.x = invRootNode.x - 300 - thisNode.width;
    thisNode.y = invRootNode.y + _index * 30 * -1 + 30;
    graphData.nodes.push(thisNode);
    graphData.lines.push({
      from: invRootNode.id,
      to: thisNode.id,
      text: thisNode.desc,
      color: "#FFC5A6",
      arrow: "none",
      lineShape: 4,
    });
  });
  // 将高管加入虚拟节点"高管"
  _orign_data.persons.forEach((thisNode, _index) => {
    thisNode.width = 200;
    thisNode.x = personRootNode.x - 200 - thisNode.width;
    thisNode.y = personRootNode.y + _index * 30;
    graphData.nodes.push(thisNode);
    graphData.lines.push({
      from: personRootNode.id,
      to: thisNode.id,
      text: thisNode.desc,
      color: "#B9FFA7",
      arrow: "none",
      lineShape: 4,
    });
  });
  // 将对外投资企业加入虚拟节点"对外投资"
  _orign_data.asInvs.forEach((thisNode, _index) => {
    thisNode.x = asinvRootNode.x + 200;
    thisNode.y = asinvRootNode.y + _index * 30 * -1 + 30;
    graphData.nodes.push(thisNode);
    graphData.lines.push({
      from: asinvRootNode.id,
      to: thisNode.id,
      text: thisNode.desc,
      color: "#FFBEC1",
      lineShape: 4,
    });
  });
  // 将分支机构加入虚拟节点"分支机构东"
  _orign_data.branchs.forEach((thisNode, _index) => {
    thisNode.x = branchRootNode.x + 200;
    thisNode.y = branchRootNode.y + _index * 30;
    graphData.nodes.push(thisNode);
    graphData.lines.push({
      from: branchRootNode.id,
      to: thisNode.id,
      text: thisNode.desc,
      color: "#FFA1F8",
      lineShape: 4,
    });
  });
  seeksRelationGraph.value.setJsonData(graphData, (graphInstance) => {});
}
onMounted(() => {
  // console.log(seeksRelationGraph, "??相关设置");
  seeksRelationGraph.value.setOptions.defaultLineShape = 1;
  setGraphData();
});
</script>

<style lang="less" scoped>
.box {
  // overflow: auto;
}

/deep/ .rel-map-canvas {
  position: relative;
  // background-image: url(../../../assets/img/umbrella.jpeg);
}

/deep/ .c-mini-toolbar {
  margin-left: 1600px;
  margin-top: 0;
}

.graph {
  width: 100%;
  height: 100%;
}
</style>
