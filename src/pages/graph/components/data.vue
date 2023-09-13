<template>
  <div id="chart"></div>
</template>

<script setup>
let echarts = inject("echarts");

const option = ref({});
const nameList = [
  "煤炭",
  "石油",
  "天然气",
  "水",
  "电",
  "电信",
  "交通",
  "医疗",
  "住房",
  "教育",
];
const genData = (count) => {
  // prettier-ignore
  const legendData = [];
  const seriesData = [];
  nameList.forEach((item) => {
    legendData.push(item);
    seriesData.push({
      name: item,
      value: Math.round(Math.random() * 100),
    });
  });
  return {
    legendData: legendData,
    seriesData: seriesData,
  };
};
const data = genData(11);
const chartFun = () => {
  const chartDom = document.getElementById("chart");
  const myChart = echarts.init(chartDom);
  option.value = {
    title: {
      text: "投资&消费收益比重",
      subtext: "纯属虚构",
      left: "center",
      top: 50,
    },
    color: [
      "#91cc75",
      "#f1b2c3",
      "#6b5428",
      "#1497db",
      "#ef6c00",
      "#d33428",
      "#9ad653",
      "#d6b3f4",
      "#1e1e1e",
      "#fb5865",
    ],
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
    legend: {
      type: "scroll",
      orient: "vertical",
      right: 10,
      top: 200,
      bottom: 20,
      data: data.legendData,
    },
    series: [
      {
        name: "姓名",
        type: "pie",
        radius: "55%",
        center: ["40%", "50%"],
        data: data.seriesData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
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
#chart {
  width: 1400px;
  height: 600px;
}
</style>
