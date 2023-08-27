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
            <p class="features-value">{{ data.ambientTemperature }} &#8451;</p>
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
            <p class="features-value">{{ data.ambientHumidity }} %</p>
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
            <p class="features-value">{{ data.lightIntensity }} lux</p>
            <img
              src="../../../assets/sensor_imge//monitor/4.png"
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
            <p class="features-value">{{ data.co2 }} ppm</p>
            <img
              src="../../../assets/sensor_imge//monitor/2.png"
              alt=""
              class="features-imge"
            />
          </div>
          <div
            class="features"
            :class="{ active: state.selectedOption === 'power' }"
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
            :class="{ active: selectedOption === 'signal' }"
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
                  placeholder="Start date"
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
                  placeholder="End date"
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
import { computed, onMounted, reactive, ref, watchEffect, watch } from "vue";
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
import { timestamp } from "@vueuse/core";
// let isDateSelected;
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
  startTime:ref(null),
  endTime:ref(null),
  // timeTotime:
  //   ref <
  //   [Date, Date] >
  //   [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
  // data: [],
}); 

const selectedOption = ref("");
let selectedTime = ref("");
const updateChart = ref("");
const handleOptionChange = (value) => {
  console.log(value);
  state.selectedOption = value;
};
watch(selectedTime, (newValue) => {
  // 根据选择的时间进行相应的逻辑处理
  if (newValue === "1") {
    // 过去 12 小时
    const end = new Date();
    const start = new Date(end - 12 * 60 * 60 * 1000);
    state.startTime = start;
    state.endTime = end;
  } else if (newValue === "2") {
    // 过去 1 天
    const end = new Date();
    const start = new Date(end - 24 * 60 * 60 * 1000);
    startTime.value = start;
    endTime.value = end;
  } else if (newValue === "3") {
    // 过去 1 周
    const end = new Date();
    const start = new Date(end - 7 * 24 * 60 * 60 * 1000);
    startTime.value = start;
    endTime.value = end;
  } else if (newValue === "4") {
    // 过去 1 月
    const end = new Date();
    const start = new Date(end - 30 * 24 * 60 * 60 * 1000);
    startTime.value = start;
    endTime.value = end;
  } else {
    // 默认情况
    startTime.value = null;
    endTime.value = null;
  }
});
// watch([state.startTime, state.endTime], ([start, end]) => {
//   console.log("startTime:", start);
//   console.log("endTime:", end);
// });
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

const disabledStartDate = computed(() => {
  if ( state.endTime) {
    return (date) => date && (date > new Date() || date >= state.endTime);
  }
  return (date) => date && date > new Date();
});
const disabledEndDate = computed(() => {
  if ( state.startTime ) {
    console.log(state.startTime, "kkk");
    return (date) => date && (date > new Date() || date < state.startTime);
  }
  return (date) => date && date > new Date();
}); 
watch(state.startTime,(date) => { 
  state.startTime.value = date 
})
watch(state.endTime,(date) => {
  state.endTime.value = date
}) 
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
      console.log(selectedTime);
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
    console.log(state.data, "llll");
    const chart = echarts.init(document.getElementById("main"));
    let base = new Date().getTime();
    let data = [];
    let time;
    if (state.selectedTime == 1) {
      time = 5 * 60 * 1000;
    } else if (state.selectedTime == 2) {
      time = 10 * 60 * 1000;
    } else if (state.selectedTime == 3) {
      time = 60 * 60 * 1000;
    } else {
      time = 4 * 60 * 60 * 1000;
    }
    console.log(state.data, "123");

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

    console.log(data, "456");
    const option = {
      tooltip: {
        trigger: "axis",
        position: function (pt) {
          return [pt[0], "10%"];
        },
      },
      title: {
        left: "center",
        text: "History Data Chart",
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
    chart.setOption(option);
  };
});

onMounted(() => {
  updateData(); // 获取并显示初始数据
});
function updateData() {
  getWeaData().then((res) => {
    const lastDataIndex = res.data.length - 1;
    data.ambientTemperature.value = res.data[lastDataIndex].ambientTemperature;
    data.ambientHumidity.value = res.data[lastDataIndex].ambientHumidity;
    data.lightIntensity.value = res.data[lastDataIndex].lightIntensity;
    data.detectedTime.value = res.data[lastDataIndex].detectedTime;
  });
  getNtrData().then((res) => {
    const lastDataIndex = res.data.length - 1;
    data.co2.value = res.data[lastDataIndex].co2;
    data.dewTemp.value = res.data[lastDataIndex].dewTemp;
    data.rssi.value = res.data[lastDataIndex].rssi;
  });
}

// export { selectedOption, selectedTime, handleOptionChange, handleTimeChange };
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
    url("../../../assets/sensor_imge/meteor_imge2.jpg");
  z-index: -3;

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
  margin-left: 5%;
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
</style>