export const leftNodeList = [
    {
        label: '风险提交',
        nodeId: 1,
        maxConnections:1,
        isSource:true,
        isTarget:false
    },
    {
        label: '审核通过',
        nodeId: 2,
        maxConnections:1,
        isSource:true,
        isTarget:true
    },
    {
        label: '缺陷改造',
        nodeId: 3,
        maxConnections:1,
        isSource:true,
        isTarget:true
    },
    {
        label: '检查核定',
        nodeId: 4,
        maxConnections:1,
        isSource:true,
        isTarget:true
    },
    {
        label: '注销提交',
        nodeId: 5,
        maxConnections:1,
        isSource:true,
        isTarget:true
    }
]

export const leftNodeOptionsList = [
    {
        label:'起始节点(单)',
        id:'start_node_single',
        maxConnections:1,
        isSource:true,
        isTarget:false
        
    },
    {
        label:'起始节点(多)',
        id:'start_node_single',
        maxConnections:-1,
        isSource:true,
        isTarget:false
    },
    {
       label:'中间节点(单)',
       id:'center_node_single',
       maxConnections:1,
       isSource:true,
       isTarget:true
    },
    {
        label:'中间节点(多)',
        id:'center_node_more',
        maxConnections:-1,
        isSource:true,
        isTarget:true
     },
    {
        label:'完结节点(单)',
        id:'over_node_single',
        maxConnections:1,
        isSource:false,
        isTarget:true
    },
    {
        label:'完结节点(多)',
        id:'over_node_more',
        maxConnections:-1,
        isSource:false,
        isTarget:true
    },
]
