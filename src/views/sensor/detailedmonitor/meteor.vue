<template>
  <div>
    <div class="BG"></div>
    <div class="common-layout">
      <el-container>
        <el-header class="header">
          <div
            class="features"
            :class="{ active: state.selectedOption === 'temp' }"
            label="空气温度"
            value="temp"
            @click="handleOptionChange('temp')"
          >
            <div class="features-title">空气温度</div>
            <p class="features-value">{{ data.ambientTemperature.value }}</p>
            <img
              src="../../../assets/sensor_imge/monitor/1.png"
              alt=""
              class="features-imge"
            />
          </div>
          <div
            class="features"
            :class="{ active: state.selectedOption === 'hun' }"
            label="空气湿度"
            value="hun"
            @click="handleOptionChange('hun')"
          >
            <div class="features-title">空气湿度</div>
            <p class="features-value">{{ data.ambientHumidity.value }}</p>
            <img
              src="../../../assets/sensor_imge/monitor/7.png"
              alt=""
              class="features-imge"
            />
          </div>
          <div
            class="features"
            :class="{ active: state.selectedOption === 'light' }"
            label="光照强度"
            value="light"
            @click="handleOptionChange('light')"
          >
            <div class="features-title">光照强度</div>
            <p class="features-value">{{ data.lightIntensity.value }}</p>
            <img
              src="../../../assets/sensor_imge//monitor/4.png"
              alt=""
              class="features-imge"
            />
          </div>
          <div
            class="features"
            :class="{ active: state.selectedOption === 'dewTemp' }"
            label="露水温度"
            value="dewTemp"
            @click="handleOptionChange('dewTemp')"
          >
            <div class="features-title">露水温度</div>
            <p class="features-value">{{ data.dewTemp.value }}</p>
            <img
              src="../../../assets/sensor_imge//monitor/5.png"
              alt=""
              class="features-imge"
            />
          </div>
          <div
            class="features"
            :class="{ active: state.selectedOption === 'co' }"
            label="二氧化碳"
            value="co"
            @click="handleOptionChange('co')"
          >
            <div class="features-title">二氧化碳</div>
            <p class="features-value">{{ data.co2.value }}</p>
            <img
              src="../../../assets/sensor_imge//monitor/2.png"
              alt=""
              class="features-imge"
            />
          </div>

          <div
            class="features"
            :class="{ active: selectedOption === 'signal' }"
            label="信号强度"
            value="signal"
            @click="handleOptionChange('signal')"
          >
            <div class="features-title">信号强度</div>
            <p class="features-value">{{ data.rssi.value }}</p>
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
            <el-col :span="24" class="time">
              <el-radio-group
                v-model="state.selectedTime"
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
              <div class="block">
                <el-date-picker
                  class="feature-select"
                  v-model="state.startTime"
                  type="datetime"
                  size="big"
                  placeholder="开始时间"
                  format="YYYY/MM/DD hh:mm:ss"
                  value-format="YYYY-MM-DD hh:mm:ss"
                  :disabled-date="disabledStartDate"
                  @change="handleTimeChange2"
                />
                <el-date-picker
                  class="feature-select"
                  v-model="state.endTime"
                  :default-value="defaultEndTime"
                  type="datetime"
                  size="big"
                  placeholder="结束时间"
                  format="YYYY/MM/DD hh:mm:ss"
                  value-format="YYYY-MM-DD hh:mm:ss"
                  :disabled-date="disabledEndDate"
                  @change="handleTimeChange2"
                />
              </div>
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
  </div>
</template>

<script setup>
// import Vue from "vue";
import {
  computed,
  onMounted,
  reactive,
  ref,
  watchEffect,
  watch,
  render,
} from "vue";
import * as echarts from "echarts";
import {
  getHunidityData,
  getTempData,
  getCoData,
  getLightData,
  getDewTempData,
  getLightDataByTime,
  getHunidityDataByTime,
  getTempDataByTime,
  getCoDataByTime,
  getDewTempByTime,
} from "@/api/sensor/meteor";
import { getNtrData } from "@/api/sensor/nutrientMonitor";
import { getWeaData } from "@/api/sensor/weatherMonitor";
import { timestamp } from "@vueuse/core";
// let isDateSelected;
const data = {
  co2: ref(0),
  dewTemp: ref(0),
  rssi: ref(""),
  ambientTemperature: ref(0),
  ambientHumidity: ref(0),
  lightIntensity: ref(0),
  detectedTime: ref(92),
};
const state = reactive({
  selectedOption: ref("temp"),
  selectedTime: ref(1),
  startTime: ref(null),
  endTime: ref(null),
});

const selectedOption = ref("");
let selectedTime = ref("");
const updateChart = ref("");
const handleOptionChange = (value) => {
  console.log(value);
  state.selectedOption = value;
};
const handleTimeChange = () => {
  state.startTime = null;
  state.endTime = null;
};

const handleTimeChange2 = () => {
  state.selectedTime = null;
};
const handleClick = () => {
  handleTimeChange();
};

const disabledStartDate = (date) => {
  if (state.endTime) {
    return date > new Date() || date >= state.endTime;
  }
  return date > new Date();
};
const disabledEndDate = (date) => {
  if (state.startTime) {
    return date > new Date() || date < state.startTime;
  }
  return date > new Date();
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
    } else if (state.selectedOption === "dewTemp") {
      const res = await getDewTempByTime(state.selectedTime);
      console.log(res.data);
      state.data = res.data;
    }

    if (state.data) {
      updateChart.value();
    }
  }
  if (state.selectedOption && state.startTime && state.endTime) {
    if (state.selectedOption === "co") {
      const res = await getCoData({
        starttime: state.startTime,
        endtime: state.endTime,
      });
      console.log(res);
      state.data = res.data;
    } else if (state.selectedOption === "hun") {
      const res = await getHunidityData({
        starttime: state.startTime,
        endtime: state.endTime,
      });
      console.log(res);
      state.data = res.data;
    } else if (state.selectedOption === "temp") {
      const res = await getTempData({
        starttime: state.startTime,
        endtime: state.endTime,
      });
      console.log(res);
      state.data = res.data;
    } else if (state.selectedOption === "light") {
      const res = await getLightData({
        starttime: state.startTime,
        endtime: state.endTime,
      });
      console.log(res.data);
      state.data = res.data;
    } else if (state.selectedOption === "dewTemp") {
      const res = await getDewTempData({
        starttime: state.startTime,
        endtime: state.endTime,
      });
      console.log(res.data);
      state.data = res.data;
    }

    if (state.data) {
      updateChart.value();
    } else {
      state.data = [];
    }
  }
};

onMounted(() => {
  updateChart.value = () => {
    let chart = document.getElementById("main");
    chart.removeAttribute('_echarts_instance_')
    const myChart = echarts.init(chart)
    let data = []; 
      let base = new Date().getTime();
      let time;
      if (state.selectedTime == 1) {
        time = 5 * 60 * 1000;
      } else if (state.selectedTime == 2) {
        time = 10 * 60 * 1000;
      } else if (state.selectedTime == 3) {
        time = 60 * 60 * 1000;
      } else if (state.selectedTime == 4){
        time = 4 * 60 * 60 * 1000;
      } else{
        base = new Date(state.endTime).getTime()
        time = (new Date(state.endTime).getTime() - new Date(state.startTime).getTime())/(state.data.length-1)
     
      }
      for (let i = 0; i < state.data.length; i++) {
        let now = new Date((base -= time));
        data.push([
          // ([now.getFullYear(), now.getMonth() + 1, now.getDate(),].join('/')),
          `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()} ${(
            "" + now.getHours()
          ).padStart(2, "0")}:${("" + now.getMinutes()).padStart(2, "0")}`,
          state.data[i],
        ]);
      }
    const option = {
      tooltip: {
        trigger: "axis",
        position: function (pt) {
          return [pt[0], "10%"];
        },
      },
      title: {
        left: "center",
        // text: "History Data Chart",
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
        axisLabel: {
          textStyle: {
            fontSize: 13, // 设置字体大小
            color: "#333", // 设置字体颜色
          },
        },
      },
      yAxis: {
        type: "value",
        boundaryGap: [0, "100%"],
        axisLabel: {
          textStyle: {
            fontSize: 16, // 设置字体大小
            color: "#333", // 设置字体颜色
          },
        },
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
          data: data,
          type: "line",
          smooth: true,
          symbol: "none",
          // areaStyle: {},
          lineStyle: {
            width: 4, // 设置曲线的粗细，单位为像素
          },
        },
      ],
    };
 
    // chart.setOption(option);
    myChart.setOption(option)
  };
});

onMounted(() => {
  updateData(); // 获取并显示初始数据
});
function updateData() {
  function isValidData(value) {
    return value !== 0 && value !== null;
  }
  const noData = "暂无数据";
  getWeaData().then((res) => {
    const lastDataIndex = res.data.length - 1;
    const dataItem = res.data[lastDataIndex];
    if (dataItem.hasOwnProperty("ambientTemperature")) {
      data.ambientTemperature.value = isValidData(dataItem.ambientTemperature)
        ? dataItem.ambientTemperature + " ℃"
        : noData;
    } else {
      data.ambientTemperature = noData;
    }
    if (dataItem.hasOwnProperty("ambientHumidity")) {
      data.ambientHumidity.value = isValidData(dataItem.ambientHumidity)
        ? dataItem.ambientHumidity + " %"
        : noData;
    } else {
      data.ambientHumidity = noData;
    }
    if (dataItem.hasOwnProperty("lightIntensity")) {
      data.lightIntensity.value = isValidData(dataItem.lightIntensity)
        ? dataItem.lightIntensity + " lux"
        : noData;
    } else {
      data.lightIntensity = noData;
    }
    data.detectedTime.value = res.data[lastDataIndex].detectedTime;
  });
  getNtrData().then((res) => {
    const lastDataIndex = res.data.length - 1;
    const dataItem = res.data[lastDataIndex];
    if (dataItem.hasOwnProperty("co2")) {
      data.co2.value = isValidData(dataItem.co2)
        ? dataItem.co2 + " ppm"
        : noData;
    } else {
      data.co2 = noData;
    }
    if (dataItem.hasOwnProperty("dewTemp")) {
      data.dewTemp.value = isValidData(dataItem.dewTemp)
        ? dataItem.dewTemp + " ℃"
        : noData;
    } else {
      data.co2 = noData;
    }
    if (dataItem.hasOwnProperty("rssi")) {
      data.rssi.value = isValidData(dataItem.rssi)
        ? dataItem.rssi + " dBm"
        : noData;
    } else {
      data.rssi = noData;
    }
  });
}
defineExpose({
  selectedOption,
  selectedTime,
  handleOptionChange,
  handleTimeChange,
});
watchEffect(() => {
  getData();
});
// return{
//   pickerOptions
// }
</script>
<style scoped>
.BG {
  content: "";
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  --color-filter: hue-rotate(25.4219deg);
  background-size: cover;

  opacity: 0.4;
}
.header {
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  width: 100%;
  height: 85px;
}

.features {
  width: 200px;
  height: 180px;
  position: relative;
  text-align: center;
  margin-top: 20px;
  margin-left: 20px;

  /* 使背景模糊化 */
  backdrop-filter: blur(10px);
  box-shadow: 0 0 10px #3c9f64;
  border-radius: 5px;
  background-color: #008fef09 0;
}
.features:hover {
  box-shadow: 0px 0px 10px #31b6e7 inset;
  /* background-color: #4eaee9a7 ; */
}
.active {
  /* 定义活动状态的样式 */
  /* 例如，可以设置背景色或文本颜色等 */
  box-shadow: 0px 0px 10px #31b6e7 inset;
  /* background-color: #c84343;
  color: #000000; */
}
.feature-select {
  backdrop-filter: blur(10px);
  box-shadow: 0 0 10px #3c9f64;
}
.features-title {
  font-size: 25px;
  font-family: 微软雅黑;
  font-weight: bold;
  padding-top: 32px;
}
.features-value {
  font-family: 微软雅黑;
  font-weight: bold;
  font-size: 24px;
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

.el-col {
  display: flex;
  width: 100%;
  padding: 0;
  flex-wrap: nowrap;
}

.el-radio-group {
  margin-left: 15%;
  line-height: 60px;
}

.block {
  border-right: solid 1px var(--el-border-color);
  flex: 1;
  display: flex;
  align-items: center;
  margin-left: 2%;
}
.block .el-input {
  margin-left: 3%;
}
.time {
  display: flex;
  text-align: center;
}
</style>