<template>
  <div class="weather-monitoring" style="width: 60%;margin: 0 auto;">
    <h2 class="one"></h2>
    <div class="sensor-data">
      <div class="ui raised segment" style="height: 12s0px;width: 300px;">
        <a class="ui teal ribbon label">空气温度</a>
        <ul>
          <li>{{ data.ambientTemperature }} &#8451; </li>
          <li>{{ data.detectedTime }}</li>
        </ul>
      </div>
      <div class="ui raised segment" style="height: 120px;width: 300px;">
        <a class="ui teal ribbon label">空气湿度</a>
        <ul>
          <li>{{ data.ambientHumidity }} %</li>
          <li>{{ data.detectedTime }}</li>
        </ul>
      </div>
      <div class="ui raised segment" style="height: 120px;width: 300px;">
        <a class="ui teal ribbon label">光照强度</a>
        <ul>
          <li>{{ data.lightIntensity }} ppm</li>
          <li>{{ data.detectedTime }}</li>
        </ul>
      </div>
      <!-- <div class="sensor">
        <div class="sensor-name">空气温度</div>

        <p class="sensor-num">{{ data.ambientTemperature }} &#8451;</p>
        <div class="sensor-time">{{ data.detectedTime }}</div>
      </div>
      <div class="sensor">
        <div class="sensor-name">空气湿度</div>
        <p class="sensor-num">{{ data.ambientHumidity }} %</p>
        <div class="sensor-time">{{ data.detectedTime }}</div>
      </div>
      <div class="sensor">
        <div class="sensor-name">光照强度</div>
        <p class="sensor-num">{{ data.lightIntensity }} ppm</p>
        <div class="sensor-time">{{ data.detectedTime }}</div>
      </div> -->
    </div>
  </div>
</template>
  
  <script setup>
import { ref, onMounted } from "vue";
import { getWeaData } from "@/api/sensor/weatherMonitor";

const data = {
  ambientTemperature: ref(0),
  ambientHumidity: ref(0),
  lightIntensity: ref(0),
  detectedTime: ref(92),
};

onMounted(() => {
  updateData(); // 获取并显示初始数据

  // 每隔一分钟调用一次updateData()函数
  setInterval(() => {
    updateData();
  }, 60000); // 时间间隔为一分钟（单位为毫秒）
});

function updateData() {
  // const data = {
  //   ambientTemperature,
  //   ambientHumidity,
  //   lightIntensity,
  // };

  getWeaData().then((res) => {
    data.ambientTemperature.value = res.data[0].ambientTemperature;
    data.ambientHumidity.value = res.data[0].ambientHumidity;
    data.lightIntensity.value = res.data[0].llightIntensity;
    data.detectedTime.value = res.data[0].detectedTime;
  });
}
</script>
  
  <style scoped>
.weather-monitoring {
  background: color #f1f1f1;
  /* display: flex; */
  /* flex-wrap: wrap; */
  /* border: 1px solid #ccc;; */
  width: 100%;
  /* box-shadow:0 0 1px;
  border-radius: 5px; */
  /* text-align: center; */
}
.sensor-data {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.one {
  /* background-color: rgb(120, 171, 154); */
  width: 100%;
  justify-content: center;
  height: 20px;
}
.sensor {
  display: flex;
  flex-wrap: wrap;
  font-size: 21px;
  font-weight: 500;
  /* justify-content: center; */
  /* flex: 1 1 50%; */
  width: 100%;
  height: 120px;
  margin: 10px;
  padding: 10px;
  opacity: 0.5;
  background-color: #7fb7a191;
  /* border: 1px solid #ccc; */
  /* box-shadow:0 0 1px; */
  border-radius: 5px;
}
.sensor-name {
  margin-top: 23px;
  /* height: 0px; */
  width: 55%;
  justify-content: center;
  align-items: center;
}
.sensor-num {
  width: 35%;
  margin-top: 25px;
  justify-content: center;
  align-items: center;
}
.sensor-time {
  width: 100%;
  /* height: 100%; */
  /* height: 60px; */
  justify-content: center;
  align-items: center;
  margin-top: 3px;
}

.ui.raised.segment {
  -webkit-box-shadow: 0 2px 4px 0 rgba(34, 36, 38, 0.12),
    0 2px 10px 0 rgba(34, 36, 38, 0.15);
  box-shadow: 0 2px 4px 0 rgba(34, 36, 38, 0.12),
    0 2px 10px 0 rgba(34, 36, 38, 0.15);
}
.ui.segment {
  position: relative;
  background: #fff;
  -webkit-box-shadow: 0 1px 2px 0 rgba(34, 36, 38, 0.15);
  box-shadow: 0 1px 2px 0 rgba(34, 36, 38, 0.15);
  margin: 1rem 0;
  padding: 1em 1em;
  border-radius: 0.28571429rem;
  border: 1px solid rgba(34, 36, 38, 0.15);
}

.ui.segment:first-child {
  margin-top: 0;
}

.ui.segment:last-child {
  margin-bottom: 0;
}

.ui.teal.ribbon.label {
  border-color: #00827c !important;
}

.ui.teal.label,
.ui.teal.labels .label {
  background-color: #00b5ad !important;
  /* border-color: #00b5ad!important; */
  color: #fff !important;
}

.ui.ribbon.label {
  left: calc(-1rem - 1.2em);
  margin-right: -1.2em;
  padding-left: calc(1rem + 1.2em);
  padding-right: 1.2em;
}

.ui.ribbon.label {
  position: relative;
  margin: 0;
  min-width: -webkit-max-content;
  min-width: 400px;
  min-width: max-content;
  border-radius: 0 0.28571429rem 0.28571429rem 0;
  border-color: rgba(0, 0, 0, 0.15);
}
.ui.label,
.ui.labels .label {
  font-size: 0.85714286rem;
}
.ui.label {
  display: inline-block;
  line-height: 1;
  vertical-align: baseline;
  margin: 0 0.14285714em;
  background-color: #e8e8e8;
  background-image: none;
  padding: 0.5833em 0.833em;
  color: rgba(0, 0, 0, 0.6);
  text-transform: none;
  font-weight: 700;
  border: 0 solid transparent;
  border-radius: 0.28571429rem;
  -webkit-transition: background 0.1s ease;
  transition: background 0.1s ease;
}

.ui.ribbon.label:after {
  position: absolute;
  content: "";
  top: 100%;
  left: 0;
  background-color: transparent !important;
  border-style: solid;
  border-width: 0 1.2em 1.2em 0;
  border-color: transparent;
  border-right-color: inherit;
  width: 0;
  height: 0;
}

.ui.teal.labels .label:hover,
a.ui.teal.label:hover {
  background-color: #009c95 !important;
  border-color: #009c95 !important;
  color: #fff !important;
}

</style>