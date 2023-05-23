<template>
  <div class="chartBox">
    <div id="chartBox1"></div>
    <div id="chartBox2"></div>
    <div id="chartBox3"></div>
  </div>
</template>
 
<script setup>
import { ref, inject, onMounted } from "vue";
let echarts = inject("echarts");
function chart1Fn(){
  let echart1 = echarts.init(document.querySelector("#chartBox1"));
  echart1.setOption({
    title: {
      show: true,
      text: "主要资产收入",
      left:'300px',
      textStyle:{
        color:'#2c984a',
        fontSize:20,
      }
      
      // textVerticalAlign:'center',
    },
    toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        data: ["汽车", "保险", "保健品", "芯片", "数据模型"],
        axisTick: {
          alignWithLabel: true,
        },
      },
    ],
    yAxis: [
      {
        name:'单位(万元)',
        type: "value",
      },
    ],
    series: [
      {
        name: "收益",
        type: "bar",
        barWidth: "60%",
        data: [100, 600, 410, 60, 1400],
      },
    ],
  });
}
function chart2Fn(){
  let echart2 = echarts.init(document.querySelector("#chartBox2"));
  echart2.setOption({
    title: {
      show: true,
      text: "主要投资领域",
      left:'300px',
      textStyle:{
        color:'#e73f32',
        fontSize:20,
      }
      
      // textVerticalAlign:'center',
    },
    toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        data: ["大数据","芯片","流水线升级","机器学习","医疗"],
        axisTick: {
          alignWithLabel: true,
        },
      },
    ],
    yAxis: [
      {
        name:'单位(万元)',
        type: "value",
      },
    ],
    series: [
      {
        name: "支出",
        type: "bar",
        barWidth: "60%",
        data: [280, 130, 300, 500, 80],
      },
    ],
  });
}
  function chart3Fn(){
  let echart3 = echarts.init(document.querySelector("#chartBox3"));
  echart3.setOption({
    title: {
    text: '各月份主要资产净收益',
    top:'30px',
    left:'750px',
      textStyle:{
        color:'#2f7cee',
        fontSize:20,
      }
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['汽车','数据模型','芯片','医疗产品','保险'],
    top:'280px',
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '10%',
    containLabel: true
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: '汽车',
      type: 'line',
      stack: '',
      data: [607,560,730,420,445,473,532,671,730,610,558,690]
    },
    {
      name: '数据模型',
      type: 'line',
      stack: '',
      data: [330,120,150,226,192,320,183,237,150,90,158,292]
    },
    {
      name: '芯片',
      type: 'line',
      stack: '',
      data: [10,30,20,10,15,20,23,47,20,10,18,29]
    },
    {
      name: '医疗产品',
      type: 'line',
      stack: '',
      data: [100,160,130,120,135,140,123,137,180,230,158,129]
    },
    {
      name: '保险',
      type: 'line',
      stack: '',
      data: [140,260,140,160,150,173,133,197,107,200,198,294]
    }
  ]
  });
}
onMounted(() => {
  chart1Fn()
  chart2Fn()
  chart3Fn()
});
</script>
 
<style lang="less" scoped>
.chartBox{
  display: flex;
  flex-wrap: wrap;
}
#chartBox1 {
  width: 800px;
  height: 300px;
}
#chartBox2 {
  width: 800px;
  height: 300px;
}
#chartBox3{
  margin-top: 50px;
  width: 1600px;
  height: 300px;
}
</style>