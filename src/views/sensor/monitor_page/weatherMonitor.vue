<template>
  <div class="weather-monitoring" style="width: 60%;margin: 0 auto;">
    <h2 class="one"></h2>
    <div class="sensor-data">
      <div class="ui raised segment" style="height: 120px;    background-image: linear-gradient(to left top, #fffaf5, #fffbf9, #fffcfd, #fffeff, #ffffff);">
        <a class="ui teal ribbon label">空气温度</a>
        <ul>
          <li>{{ data.ambientTemperature }} &#8451; </li>
          <li>{{ data.detectedTime }}</li>
        </ul>
      </div>
      <div class="ui raised segment" style="height: 120px;background-image: linear-gradient(to left top, #effbf0, #eefdfa, #f4fdff, #fbfeff, #ffffff);">
        <a class="ui teal ribbon label">空气湿度</a>
        <ul>
          <li>{{ data.ambientHumidity }} %</li>
          <li>{{ data.detectedTime }}</li>
        </ul>
      </div>
      <div class="ui raised segment" style="height: 120px;background-image: linear-gradient(to left top, #f9f7fc, #faf9fd, #fcfbfe, #fdfdfe, #ffffff);">
        <a class="ui teal ribbon label">光照强度</a>
        <ul>
          <li>{{ data.lightIntensity }} ppm</li>
          <li>{{ data.detectedTime }}</li>
        </ul>
      </div> 
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
  width: 100%; 
}
.sensor-data {
  width: 100%;
}
.one {
  width: 100%;
  justify-content: center;
  height: 20px;
}
.sensor {
  display: flex;
  flex-wrap: wrap;
  font-size: 21px;
  font-weight: 500; 
  width: 100%;
  height: 120px;
  margin: 10px;
  padding: 10px;
  opacity: 0.5;
  background-color: #7fb7a191; 
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
  justify-content: center;
  align-items: center;
  margin-top: 3px;
}

</style>