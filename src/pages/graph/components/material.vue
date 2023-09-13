<template>
  <div class="box">
    <div id="chartBox"></div>
  </div>
</template>

<script setup>
import mapData from "./worldMap.json";
import "@/javascript/world";
console.log(mapData, "数据...");
let echarts = inject("echarts");

const getAirportCoord = (idx) => {
  return [mapData.airports[idx][3], mapData.airports[idx][4]];
};
const routes = mapData.routes.map(function (airline) {
  return [getAirportCoord(airline[1]), getAirportCoord(airline[2])];
});
const chartFun = () => {
  const chartDom = document.getElementById("chartBox");
  const myChart = echarts.init(chartDom);
  myChart.setOption({
    geo3D: {
      map: "world",
      shading: "realistic",
      silent: true,
      environment: "#333",
      realisticMaterial: {
        roughness: 0.8,
        metalness: 0,
      },
      postEffect: {
        enable: true,
      },
      groundPlane: {
        show: false,
      },
      light: {
        main: {
          intensity: 1,
          alpha: 30,
        },
        ambient: {
          intensity: 0,
        },
      },
      viewControl: {
        distance: 70,
        alpha: 89,
        panMouseButton: "left",
        rotateMouseButton: "right",
      },
      itemStyle: {
        color: "#000",
      },
      regionHeight: 0.5,
    },
    series: [
      {
        type: "lines3D",
        coordinateSystem: "geo3D",
        effect: {
          show: true,
          trailWidth: 1,
          trailOpacity: 0.5,
          trailLength: 0.2,
          constantSpeed: 5,
        },
        blendMode: "lighter",
        lineStyle: {
          width: 0.2,
          opacity: 0.05,
        },
        data: routes,
      },
    ],
  });
  // window.addEventListener("keydown", function () {
  //   myChart.dispatchAction({
  //     type: "lines3DToggleEffect",
  //     seriesIndex: 0,
  //   });
  // });
};
onMounted(() => {
  nextTick(() => {
    chartFun();
  });
});
</script>

<style lang="less" scoped>
.box {
  background: #2a2a2a;
  display: flex;
  width: 100%;
  height: 100%;
}
#chartBox {
  width: 1500px;
  height: 700px;
  margin: auto;
}
</style>
