<template>
  <div id="chartBox"></div>
</template>
 
<script setup>
import { ref, inject, onMounted } from "vue";
let echarts = inject("echarts");

onMounted(() => {
  let echart = echarts.init(document.querySelector("#chartBox"));
  echart.setOption({
    title: {
      show: true,
      text: "系统使用量",
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
        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        axisTick: {
          alignWithLabel: true,
        },
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        name: "使用量",
        type: "bar",
        barWidth: "60%",
        data: [8, 10, 4, 20, 7, 0, 8],
      },
    ],
  });
});
</script>
 
<style lang="less" scoped>
#chartBox {
  width: 600px;
  height: 300px;
}
</style>