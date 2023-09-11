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
// const makeWord = (max, min) => {
//   const nameLen = Math.ceil(Math.random() * max + min);
//   const name = [];
//   for (var i = 0; i < nameLen; i++) {
//     name.push(nameList[Math.round(Math.random() * nameList.length - 1)]);
//   }
//   return name.join("");
// };
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
  // for (var i = 0; i < count; i++) {
  //   var name =
  //     Math.random() > 0.65
  //       ? makeWord(4, 1) + "·" + makeWord(3, 0)
  //       : makeWord(2, 1);
  //   legendData.push(name);
  //   seriesData.push({
  //     name: name,
  //     value: Math.round(Math.random() * 100000),
  //   });
  // }
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
      top: 20,
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
  width: 1200px;
  height: 600px;
}
</style>
