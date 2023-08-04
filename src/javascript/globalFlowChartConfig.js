const readyConfig = {
    RenderMode:'canvas',
    //画布容器id
    Container:"canvasBox",
    //连接锚点位置
    anchor: ['Bottom', 'Top', 'Left', 'Right'],
    //连线类型
    // connector: 'Bezier',
    connector:'Straight',
    //线条上的一些文字等
    // connectorOverlays: [
    //     ['Arrow', {
    //       width: 10,
    //       length: 10,
    //       location: 1
    //     }],
    //     ['Label', {
    //       label: '文字',
    //       cssClass: '',
    //       labelStyle: {
    //         color: 'red'
    //       },
    //       events: {
    //         click: function (labelOverlay, originalEvent) {
    //           console.log('click on label overlay for :' + labelOverlay.component)
    //           console.log(labelOverlay)
    //           console.log(originalEvent)
    //         }
    //       }
    //     }]
    //   ],
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
        to: ['node2'],
        status:'success'
    },
    {
        label: '审核通过',
        left: 600,
        top: 200,
        id: 'node2',
        isSource: true,
        isTarget: true,
        to: ['node3'],
        status:'success'
    },
    {
        label: '缺陷改造',
        left: 200,
        top: 300,
        id: 'node3',
        isSource: true,
        isTarget: true,
        to: ['node4'],
        status:'error'
    },
    {
        label: '检查核定',
        left: 600,
        top: 400,
        id: 'node4',
        isSource: true,
        isTarget: true,
        to: ['node5'],
        status:'loading'
    },
    {
        label: '注销提交',
        left: 200,
        top: 500,
        id: 'node5',
        isSource: false,
        isTarget: true,
        status:'loading'
    }
]

const contextMenuList = {
    canvasBox:[
        {
            label:'清除画布',
            value:'reset'
        },
        {
            label:'下载图形',
            value:'downLoad'
        }     
    ],
    canvasNode:[
        {
            label:'启动',
            value:'run'
        },
        {
            label:'中断',
            value:'breakOff'
        },
        {
            label:'暂停',
            value:'loading'
        },
        {
            label:'重命名',
            value:'rename'
        },
        {
            label:'删除节点',
            value:'deleteNode'
        }   
    ],
    lineNode:[
        {
            label:'删除连线',
            value:'deleteLine'
        },
        // {
        //     label:'修改文字',
        //     value:'changeText'
        // }
    ]
}
export default {
    readyConfig,
    defaultList,
    contextMenuList
}
