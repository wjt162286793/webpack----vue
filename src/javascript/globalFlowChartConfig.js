const readyConfig = {
  //连接锚点位置
  Anchors:["Bottom","Left","Top","Right"],
  //画布容器id
  Container:"canvasBox",
  //连接线类型
  Connector:['Straight',{stub:20,gap:1}],
  //鼠标不能拖动删除线
  ConnectionsDetachable:false,
  //删除线的时候节点不删除
  DeleteEndpointsOnDetach:true,
  //端点的类型
  Endpoint:['blank',{Overlays:''}],
  //端点的样式
  EndpointStyle:{fill:'#eee',outlineWidth:1},
  //log日志
  LogEnabled:true,
  //连线的样式
  paintStyle:{stroke:'#000',strokeWidth:2,outlineStroke:'transparent',outlineWidth:10},
  //拖拽时的样式
  dragOptions:{ cursor: 'pointer', zIndex: 2000 },
  //绘图的模式
  renderMode:'canvas',
  //鼠标滑过线条的样式
  hoverPaintStyle:{ stroke: '#b0b2b5', strokeWidth: 3 },
}

const defaultList = [
    {
        label:'风险提交',
        left:200,
        top:100,
        id:'node1',
        isSource:true,
        isTarget:false,
        to:['node2']
    },
    {
        label:'审核通过',
        left:200,
        top:200,
        id:'node2',
        isSource:true,
        isTarget:true,
        to:['node3']
    },
    {
        label:'缺陷改造',
        left:200,
        top:300,
        id:'node3',
        isSource:true,
        isTarget:true,
        to:['node4']
    },
    {
        label:'检查核定',
        left:200,
        top:400,
        id:'node4',
        isSource:true,
        isTarget:true,
        to:['node5']
    },
    {
        label:'注销提交',
        left:200,
        top:500,
        id:'node5',
        isSource:false,
        isTarget:true
    }
]

export default {
    readyConfig,
    defaultList
}
