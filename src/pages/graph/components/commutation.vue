<template>
  <div id="chartBox"></div>
</template>

<script setup>
let echarts = inject("echarts");
const option = ref({});
let base = +new Date(1988, 9, 3);
let oneDay = 24 * 3600 * 1000;
let data = [[base, Math.random() * 300]];
for (let i = 1; i < 20000; i++) {
  let now = new Date((base += oneDay));
  data.push([+now, Math.round((Math.random() - 0.5) * 20 + data[i - 1][1])]);
}

const chartFun = () => {
  const chartDom = document.getElementById("chartBox");
  const myChart = echarts.init(chartDom);
  option.value = {
    tooltip: {
      trigger: "axis",
      position: function (pt) {
        return [pt[0], "10%"];
      },
    },
    title: {
      left: "center",
      text: "通信记录",
    },
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: "none",
        },
        restore: {},
        saveAsImage: {},
      },
    },
    xAxis: {
      type: "time",
      boundaryGap: false,
    },
    yAxis: {
      type: "value",
      boundaryGap: [0, "100%"],
    },
    dataZoom: [
      {
        type: "inside",
        start: 0,
        end: 20,
      },
      {
        start: 0,
        end: 20,
      },
    ],
    series: [
      {
        name: "通信流量",
        type: "line",
        smooth: true,
        symbol: "none",
        areaStyle: {},
        data: data,
      },
    ],
  };
  myChart.setOption(option.value);
};

onMounted(() => {
  nextTick(() => {
    chartFun();
  });
});
</script>

<style lang="less" scoped>
#chartBox {
  margin-top: 20px;
  width: 1400px;
  height: 600px;
}
</style>
