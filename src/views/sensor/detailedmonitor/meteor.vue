<template>
  <div class="common-layout">
    <el-container>
      <el-header
        class="header"
        v-model="selectedOption"
        @change="handleOptionChange"
      >
        <div class="features">
          <div class="features-title">空气温度</div>
          <p class="features-value">{{ data.ambientTemperature }} &#8451;</p>
        </div>
        <div class="features">
          <div class="features-title">空气湿度</div>
          <p class="features-value">{{ data.ambientHumidity }} %</p>
        </div>
        <div class="features">
          <div class="features-title">光照强度</div>
          <p class="features-value">{{ data.lightIntensity }} lux</p>
        </div>
        <div class="features">
          <div class="features-title">二氧化碳</div>
          <p class="features-value">{{ data.co2 }} ppm</p>
        </div>
        <div class="features">
          <div class="features-title">电源</div>
          <p class="features-value">{{ data.dewTemp }} V</p>
        </div>
        <div class="features">
          <div class="features-title">信号强度</div>
          <p class="features-value">{{ data.rssi }} dBm</p>
        </div>
      </el-header>

      <el-main>
        <el-row
          style="height: 40px; margin-top: 50px; width: 100%"
          class="display-row"
        >
          <el-col :span="24">
            <el-radio-group style="margin-right: 2%">
              <el-radio label="12" border size="small">过去12h</el-radio>
              <el-radio label="24" border size="small">过去1天</el-radio>
              <el-radio label="168" border size="small">过去1周</el-radio>
              <el-radio label="720" border size="small">过去1月</el-radio>
            </el-radio-group>
            <!-- </el-col> -->
            <!-- <el-col :span="12"> -->
            <el-date-picker
              size="small"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
            <!-- </el-col> -->
            <!-- <el-col :span="4"> -->
            <el-button size="small" style="background-color: #1989fa"
              ><i style="color: white" class="el-icon-search"
            /></el-button>
          </el-col>
        </el-row>
      </el-main>
      <el-footer>
        <div class="charts">
          <div id="main" style="width: 100%; height: 400px"></div>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<script setup>
// import Vue from "vue";
import { onMounted, ref, render } from "vue";
import * as echarts from "echarts";
import {
  getChartData,
  getHunidityData,
  getTempData,
  getCoData,
  getLightData,
} from "@/api/sensor/meteor";
import { getNtrData } from "@/api/sensor/nutrientMonitor";
import { getWeaData } from "@/api/sensor/weatherMonitor";

const data = {
  co2: ref(0),
  dewTemp: ref(0),
  rssi: ref(0),
  ambientTemperature: ref(0),
  ambientHumidity: ref(0),
  lightIntensity: ref(0),
  detectedTime: ref(92),
};
onMounted(() => {
  updateData();
  // 创建图表实例
  var chart = echarts.init(document.getElementById("main"));

  // 绘制图表
  chart.setOption({
    // 图表配置项
    // 例如：x 轴、y 轴、数据系列等配置
    xAxis: {
      type: "category",
      data: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "数据",
        type: "line",
        smooth: true, // 平滑折线图
        data: [14, 45, 1, 13, 13, 5, 6, 2, 3, 2],
      },
    ],
  });
});
function updateData() {
  getWeaData().then((res) => {
    data.ambientTemperature.value = res.data[0].ambientTemperature;
    data.ambientHumidity.value = res.data[0].ambientHumidity;
    data.lightIntensity.value = res.data[0].llightIntensity;
    data.detectedTime.value = res.data[0].detectedTime;
  });
  getNtrData().then((res) => {
    data.co2.value = res.data[0].co2;
    data.dewTemp.value = res.data[0].dewTemp;
    data.rssi.value = res.data[0].rssi;
  });
}

// //监听选项变化
// const handleOptionChange = () => {
//   fetchData;
// };
// // 监听时间范围变化，重新获取数据
// const handleDateRangeChange = () => {
//   fetchData();
// };
// // 组件初始化时获取数据
// onMounted(() => {
//   fetchData();
// });
// return {
//   chartData ,
//   selectedOption,
//   selectedRange,
//   selectedDateRange,
//   handleOptionChange,
//   handleDateRangeChange,
// };

// function upChartRange = () => {
//        getChartData().then(data => {
//           ChartData.value = data;
//           drawChart()

//        })
//       };

// const option = {
//   // 配置ECharts的选项和数据
//   series: [
//     {
//       type: 'bar',
//       data: data,
//     },
//   ],
// };
</script>
<style>
.header {
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  height: 85px;
}
/* .sensor{
  display: flexbox;
  border:1px solid black ; 
  padding-top: 5px;
  padding-left: 10px; 
  width: 100px;
  height: 85px;
} */

.features {
  width: 150px;
  height: 130px;
  text-align: center;
  box-shadow: 0px 0px 1px gray inset;
}
.features:hover {
  box-shadow: 0px 0px 10px #ddd inset;
}
.features-title {
  font-family: 微软雅黑;
  font-weight: bold;
  padding-top: 25px;
}
.features-value {
  font-family: 微软雅黑;
  font-weight: bold;
  font-size: 20px;
  color: #008eef;
}
.features-value-active {
  color: white;
}
.charts {
  margin-left: 250px;
  width: 500px;
  height: 500px;
  margin-top: 10px;
}
.el-footer {
  width: 500px;
  height: 500px;
}
</style>