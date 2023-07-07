import {v4 as uuidv4} from 'uuid'
//创建一个填充矩形
export let createRectFill = (position)=>{
   return{
      x:position.x-202-25,
      y:position.y-52-25,
      width:50,
      height:50,
      name:'实体',
      color:'red',
      modeType:'rectFill',
      styleType:'fill',
      id:uuidv4()
    }
}
//创建一个三角形
export let createTreeBox = (position)=>{
   return{
      x1:position.x-200,
      y1:position.y-50-25,
      x2:position.x-200-25,
      y2:position.y-50+25,
      x3:position.x-200+25,
      y3:position.y-50+25,
      name:'业务线',
      color:'red',
      modeType:'three',
      styleType:'stroke',
      id:uuidv4()
    }
}
//创建一个描边矩形
export let createRectStroke = (position)=>{
   return{
      x:position.x-202-25,
      y:position.y-52-25,
      width:50,
      height:50,
      name:'实体',
      color:'red',
      modeType:'rectStroke',
      styleType:'stroke',
      id:uuidv4()
    }
}
//创建一个圆形
export let createArcFill = (position)=>{
   return{
      x:position.x-202,
      y:position.y-52,
      arcSize:25,
      name:'供应商',
      color:'red',
      modeType:'arcFill',
      styleType:'fill',
      id:uuidv4()
    }
}