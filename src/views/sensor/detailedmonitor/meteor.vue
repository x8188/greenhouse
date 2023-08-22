<template>
  <div class="BG"></div>
  <div class="common-layout">
    <el-container>
      <el-header class="header">
        <div
          class="features"
          label="空气温度"
          value="temp"
          @click="handleOptionChange('temp')"
        >
          <div class="features-title">空气温度</div>
          <p class="features-value">{{ data.ambientTemperature }} &#8451;</p>
          <img
            src="../../../assets/sensor_imge/monitor/1.png"
            alt=""
            class="features-imge"
          />
        </div>
        <div
          class="features"
          label="空气湿度"
          value="hun"
          @click="handleOptionChange('hun')"
        >
          <div class="features-title">空气湿度</div>
          <p class="features-value">{{ data.ambientHumidity }} %</p>
          <img
            src="../../../assets/sensor_imge/monitor/7.png"
            alt=""
            class="features-imge"
          />
        </div>
        <div
          class="features"
          label="光照强度"
          value="light"
          @click="handleOptionChange('light')"
        >
          <div class="features-title">光照强度</div>
          <p class="features-value">{{ data.lightIntensity }} lux</p>
          <img
            src="../../../assets/sensor_imge//monitor/4.png"
            alt=""
            class="features-imge"
          />
        </div>
        <div
          class="features"
          label="二氧化碳"
          value="co"
          @click="handleOptionChange('co')"
        >
          <div class="features-title">二氧化碳</div>
          <p class="features-value">{{ data.co2 }} ppm</p>
          <img
            src="../../../assets/sensor_imge//monitor/2.png"
            alt=""
            class="features-imge"
          />
        </div>
        <div
          class="features"
          label="电源"
          value="power"
          @click="handleOptionChange('power')"
        >
          <div class="features-title">电源</div>
          <p class="features-value">{{ data.dewTemp }} V</p>
          <img
            src="../../../assets/sensor_imge//monitor/5.png"
            alt=""
            class="features-imge"
          />
        </div>
        <div
          class="features"
          label="信号强度"
          value="signal"
          @click="handleOptionChange('signal')"
        >
          <div class="features-title">信号强度</div>
          <p class="features-value">{{ data.rssi }} dBm</p>
          <img
            src="../../../assets/sensor_imge//monitor/6.png"
            alt=""
            class="features-imge"
          />
        </div>
      </el-header>

      <el-main>
        <el-row
          style="
            height: 60px;
            margin-top: 140px;
            width: 100%;
            text-align: center;
          "
          class="display-row"
        >
          <el-col :span="24">
            <el-radio-group
              v-model="selectedTime"
              @change="handleTimeChange"
              @click="handleClick"
              style="margin-right: 2%"
            >
              <el-radio label="1" border size="big" class="feature-select"
                >过去12h</el-radio
              >
              <el-radio label="2" border size="big" class="feature-select"
                >过去1天</el-radio
              >
              <el-radio label="3" border size="big" class="feature-select"
                >过去1周</el-radio
              >
              <el-radio label="4" border size="big" class="feature-select">
                过去1月</el-radio
              >
            </el-radio-group>
            <!-- </el-col> -->
            <!-- <el-col :span="12"> -->

            <el-date-picker
              class="feature-select"
              v-model="state.timeTotime"
              @change="handleTimeChange2"
              size="big"
              type="datetimerange"
              range-separator="To"
              start-placeholder="Start date"
              end-placeholder="End date"
            />
          </el-col>
        </el-row>
      </el-main>
      <div class="charts">
        <div
          id="main"
          style="
            width: 1200px;
            height: 500px;
            margin: 0 auto;
            backdrop-filter: blur(10px);
            box-shadow: 0 0 10px #3c9f64;
          "
        ></div>
      </div>
    </el-container>
  </div>
</template>

<script setup>
// import Vue from "vue";
import { onMounted, reactive, ref } from "vue";
import * as echarts from "echarts";
import {
  getHunidityData,
  getTempData,
  getCoData,
  getLightData,
  getLightDataByTime,
  getHunidityDataByTime,
  getTempDataByTime,
  getCoDataByTime,
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
const state = reactive({
  selectedOption: "",
  selectedTime: "",
  timeTotime:
    ref <
    [Date, Date] >
    [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
  data: [],
});

const selectedOption = ref("");
const selectedTime = ref("");
const updateChart = ref("");

const handleOptionChange = (value) => {
  console.log(value);
  state.selectedOption = value;
};
// const handleClick = (value) => {
//   state.selectedTime = value;
//   if(state.timeTotime == "" || !state.timeTotime){
//     this.$message({
//                     message: "请输入时间段！",
//                     type: "error",
//                 })
//   }else {
//     const DataToData = {
//       endTime:state.timeTotime[1],
//       startTime : state.timeTotime[0],

//     };
//     getSensorHistoryByDate(DataToData).then((res) => {
//       state.data = [];
//       state.date =[];
//       for (let i=0;i<res.data.length;i++){
//         this.data.push(res.data[i].value);
//         this.date.push(res.data[i].dataTime)
//       }
//     })
//   }

// }

const handleTimeChange = (value) => {
  state.selectedTime = value;

  const clickedTime = new Date(); // 当前点击时刻
  const pastTime = new Date(clickedTime.getTime() - value * 60 * 60 * 1000); // value小时之前的时间
  const clickedTimeString = formatDate(clickedTime); // 格式化点击时刻的时间字符串
  const pastTimeString = formatDate(pastTime); // 格式化value小时之前的时间字符串
  console.log(clickedTimeString);
  console.log(pastTimeString);
  getData(pastTimeString, clickedTimeString);
};
const handleTimeChange2 = () => {
  console.log(state.timeTotime, "uiui");

  const endTime = state.timeTotime[1];
  const startTime = state.timeTotime[0];
  // console.log(startTime)
  // console.log(endTime);
  const endTimeString = formatDate(endTime);
  const startTimeString = formatDate(startTime);
  console.log(endTimeString);
  console.log(startTimeString);
  getData(startTimeString, endTimeString);
  // console.log(endTime);
  // console.log(startTime);
  // getData(startTime, endTime);
};

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
const getData = async () => {
  if (state.selectedOption && state.selectedTime) {
    // let data;
    if (state.selectedOption === "co") {
      const res = await getCoDataByTime(state.selectedTime);
      console.log(res);
      state.data = res.data;
    } else if (state.selectedOption === "hun") {
      const res = await getHunidityDataByTime(state.selectedTime);
      console.log(res);
      state.data = res.data;
    } else if (state.selectedOption === "temp") {
      const res = await getTempDataByTime(state.selectedTime);
      console.log(res);
      state.data = res.data;
    } else if (state.selectedOption === "light") {
      const res = await getLightDataByTime(state.selectedTime);
      console.log(res.data);
      state.data = res.data;
    }
    if (state.data) {
      updateChart.value();
    }
  }
  if (state.selectedOption && state.timeTotime) {
    const endTime = state.timeTotime[1];
    const startTime = state.timeTotime[0];
    const endTimeString = formatDate(endTime);
    const startTimeString = formatDate(startTime);
    if (state.selectedOption === "co") {
      const res = await getCoData({
        starttime: startTimeString,
        endtime: endTimeString,
      });
      console.log(res);
      state.data = res.data;
    } else if (state.selectedOption === "hun") {
      const res = await getHunidityData({
        starttime: startTimeString,
        endtime: endTimeString,
      });
      console.log(res);
      state.data = res.data;
    } else if (state.selectedOption === "temp") {
      const res = await getTempData({
        starttime: startTimeString,
        endtime: endTimeString,
      });
      console.log(res);
      state.data = res.data;
    } else if (state.selectedOption === "light") {
      const res = await getLightData({
        starttime: startTimeString,
        endtime: endTimeString,
      });
      console.log(res.data);
      state.data = res.data;
    }
    if (state.data) {
      updateChart.value();
    }
  }
};
onMounted(() => {
  updateChart.value = () => {
    console.log(state.data);
    const chart = echarts.init(document.getElementById("main"));
    const option = {
      // 图表配置项
      tooltip: {
        trigger: "item",
      },
      xAxis: {
        type: "category",
        itemStyle: {
          normal: {
            label: {
              show: true, // 在折线拐点上显示数据
            },
          },
        },
        lineStyle: {
          color: "#16f1da",
        },
        data: [],
      },
      yAxis: {
        type: "value",
        lineStyle: {
          color: ["#f3f3f3"],
        },
      },
      series: [
        {
          data: state.data,
          type: "line",
          smooth: true,
          sampling: "average",
          // showSymbol: false,
          // tooltip: {
          //   show: true,
          // },
          // symbol: "circle",
          // symbolSize: 14,

          itemStyle: {
            color: "#188df0",
          },
          lineStyle: {
            normal: {
              width: 4,
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#34A3E5",
                  },
                  {
                    offset: 1,
                    color: "#934CD5",
                  },
                ],
              },
            },
          },
        },
      ],
    };

    chart.setOption(option);
  };
});

onMounted(() => {
  updateData(); // 获取并显示初始数据
});
function updateData() {
  getWeaData().then((res) => {
    data.ambientTemperature.value = res.data[0].ambientTemperature;
    data.ambientHumidity.value = res.data[0].ambientHumidity;
    data.lightIntensity.value = res.data[0].lightIntensity;
    data.detectedTime.value = res.data[0].detectedTime;
  });
  getNtrData().then((res) => {
    data.co2.value = res.data[0].co2;
    data.dewTemp.value = res.data[0].dewTemp;
    data.rssi.value = res.data[0].rssi;
  });
}

// export { selectedOption, selectedTime, handleOptionChange, handleTimeChange };
defineExpose({
  selectedOption,
  selectedTime,
  handleOptionChange,
  handleTimeChange,
});
</script>
<style>
/* .common-layout{
  background-imge:;
} */
.BG {
  content: "";
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  --color-filter: hue-rotate(25.4219deg);
  background-size: cover;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.2),
      rgba(255, 255, 255, 0.2)
    ),
    url("../../../assets/sensor_imge/meteor_imge.jpg");
  z-index: -2;

  opacity: 0.6;
}
.header {
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
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
  width: 200px;
  height: 180px;
  position: relative;
  text-align: center;
  margin-top: 20px;
  margin-left: 20px;
  /* background: linear-gradient(
    to right bottom,
    rgba(255, 255, 255, 0.7),
    rgba(255, 255, 255, 0.5),
    rgba(255, 255, 255, 0.4)
  );
  background-color: #ececec; */

  /* 使背景模糊化 */
  backdrop-filter: blur(10px);
  box-shadow: 0 0 10px #3c9f64;
  border-radius: 5px;

  /* border:1px solid #63caef; */
  /* box-shadow: 0px 0px 1px gray inset; */
  background-color: #008fef09 0;
}
.features:hover {
  box-shadow: 0px 0px 10px #31b6e7 inset;
  /* background-color: #4eaee9a7 ; */
}
.feature-select {
  backdrop-filter: blur(10px);
  box-shadow: 0 0 10px #3c9f64;
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
.features-imge {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 70px;
  height: 70px;
}
.features-value-active {
  color: white;
}
.charts {
  /* margin-left: 250px; */
  width: 100%;
  height: 800px;
  margin-top: 20px;
  text-align: center;
}
.el-footer {
  width: 500px;
  height: 500px;
}

.demo-date-picker {
  display: flex;
  width: 100%;
  padding: 0;
  flex-wrap: wrap;
}

.demo-date-picker .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  flex: 1;
}
</style>