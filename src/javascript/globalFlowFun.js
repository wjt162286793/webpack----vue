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
      x1:position.x,
      y1:position.y-25,
      x2:position.x-25,
      y2:position.y+25,
      x3:position.x+25,
      y3:position.y+25,
      name:'业务线',
      color:'red',
      modeType:'three',
      styleType:'stroke',
      id:uuidv4()
    }
}
