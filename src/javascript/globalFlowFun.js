import { v4 as uuidv4 } from 'uuid'
//创建一个填充矩形
export let createRectFill = (position) => {
   return {
      x: position.x - 202 - 100,
      y: position.y - 52 - 100,
      width: 200,
      height: 200,
      name: '实物',
      color: 'red',
      modeType: 'rectFill',
      styleType: 'fill',
      id: uuidv4(),
      nodeIndex:1,
      fromList:[],
      targetList:[],
      text:{
         info:'实物',
         color:'#fff'
      }
   }
}
//创建一个三角形
export let createTreeBox = (position) => {
   return {
      x1: position.x - 200,
      y1: position.y - 50 - 100,
      x2: position.x - 200 - 100,
      y2: position.y - 50 + 100,
      x3: position.x - 200 + 100,
      y3: position.y - 50 + 100,
      name: '业务线',
      color: 'red',
      modeType: 'three',
      styleType: 'stroke',
      id: uuidv4(),
      nodeIndex:1,
      fromList:[],
      targetList:[],
      text:{
         info:'业务线',
         color:'#fff'
      }
   }
}
//创建一个描边矩形
export let createRectStroke = (position) => {
   return {
      x: position.x - 202 - 100,
      y: position.y - 52 - 100,
      width: 200,
      height: 200,
      name: '模块',
      color: 'red',
      modeType: 'rectStroke',
      styleType: 'stroke',
      id: uuidv4(),
      nodeIndex:1,
      fromList:[],
      targetList:[],
      text:{
         info:'模块',
         color:'red'
      }
   }
}
//创建一个圆形
export let createArcStroke = (position) => {
   return {
      x: position.x - 202,
      y: position.y - 52,
      arcSize: 100,
      name: '供应商',
      color: 'red',
      modeType: 'arcFill',
      styleType: 'fill',
      id: uuidv4(),
      nodeIndex:1,
      fromList:[],
      targetList:[],
      text:{
         info:'供应商',
         color:'red'
      }
   }
}
//创建连线
export let createLinkLine = (position) => {
   return {
      fromX: position.x,
      fromY: position.y,
      targetX: null,
      targetY: null,
      lineWidth: 20,
      name: '连接线',
      color: 'red',
      modeType: 'linkLine',
      styleType: 'fill',
      id: uuidv4(),
      nodeIndex:0
   }
}
//创建一个文本
export let createText = (position) =>{
   console.log(position,'文本地址')
   return {
      textX:position.x,
      textY:position.y,
      color:'red',
      modeType:'text',
      id:uuidv4(),
      nodeIndex:1000,
      info:'',
   }
}