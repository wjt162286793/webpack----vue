const readyConfig = {
    //   //连接锚点位置
    //   Anchors:["Bottom","Left","Top","Right"],
    //   //画布容器id
    //   Container:"canvasBox",
    //   //连接线类型
    //   Connector:['Straight',{stub:20,gap:1}],
    //   //鼠标不能拖动删除线
    //   ConnectionsDetachable:false,
    //   //删除线的时候节点不删除
    //   DeleteEndpointsOnDetach:true,
    //   //端点的类型
    //   Endpoint:['blank',{Overlays:''}],
    //   //端点的样式
    //   EndpointStyle:{fill:'#eee',outlineWidth:1},
    //   //log日志
    //   LogEnabled:true,
    //   //连线的样式
    //   paintStyle:{stroke:'#000',strokeWidth:2,outlineStroke:'transparent',outlineWidth:10},
    //   //拖拽时的样式
    //   dragOptions:{ cursor: 'pointer', zIndex: 2000 },
    //   //绘图的模式
    //   renderMode:'canvas',
    //   //鼠标滑过线条的样式
    //   hoverPaintStyle:{ stroke: '#b0b2b5', strokeWidth: 3 },
    
    //画布容器id
    Container:"canvasBox",
    //连接锚点位置
    anchor: ['Bottom', 'Top', 'Left', 'Right'],
    //连线类型
    // connector: 'Bezier',
    connector:'Straight',
    //末端类型
    endpoint: 'Blank',
    //线条样式
    paintStyle: { stroke: '#000', strokeWidth: 1 },
    //连线上的配置
    overlays: [['Arrow', { width: 5, length: 5, location: 1 }]],
    //末端样式
    endpointStyle: { fill: 'lightgray', outlineStroke: 'darkgray', outlineWidth: 2 },
    //移动到线上的样式
    hoverPaintStyle: { stroke: "#000", strokeWidth: 1.3 },
    //线条设置的粗一些,容易点击
    paintStyle: {
        stroke: "#364249",
        strokeWidth: 1,
        outlineStroke: "transparent",
        outlineWidth: 10,
      },
}

const defaultList = [
    {
        label: '风险提交',
        left: 200,
        top: 100,
        id: 'node1',
        isSource: true,
        isTarget: false,
        to: ['node2']
    },
    {
        label: '审核通过',
        left: 200,
        top: 200,
        id: 'node2',
        isSource: true,
        isTarget: true,
        to: ['node3']
    },
    {
        label: '缺陷改造',
        left: 200,
        top: 300,
        id: 'node3',
        isSource: true,
        isTarget: true,
        to: ['node4']
    },
    {
        label: '检查核定',
        left: 200,
        top: 400,
        id: 'node4',
        isSource: true,
        isTarget: true,
        to: ['node5']
    },
    {
        label: '注销提交',
        left: 200,
        top: 500,
        id: 'node5',
        isSource: false,
        isTarget: true
    }
]

export default {
    readyConfig,
    defaultList
}
