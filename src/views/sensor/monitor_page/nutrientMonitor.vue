<template>
  <div class="agriculture-monitoring" style="margin: 0 auto;min-width: 300px;">
    <h2 class="two"></h2>
    <div class="sensor-values">
      <div
        class="ui raised segment"
        style="
          background-image: linear-gradient(
            to left top,
            #fffaf5,
            #fffbf9,
            #fffcfd,
            #fffeff,
            #ffffff
          );
        "
      >
        <a class="ui teal ribbon label">二氧化碳</a>
        <div class="datadiv">
          <img
            src="@/assets/img/co2.png"
            alt=""
            style="width: 60px; height: 60px"
          />
          <ul>
            <div class="datafont">{{ data.co2.value }} </div>
            <li>{{ data.detectedTime.value }}</li>
          </ul>
        </div>
      </div>
      <div
        class="ui raised segment"
        style="
          background-image: linear-gradient(
            to left top,
            #effbf0,
            #eefdfa,
            #f4fdff,
            #fbfeff,
            #ffffff
          );
        "
      >
        <a class="ui teal ribbon label">露水温度</a>
        <div class="datadiv">
          <img
            src="@/assets/img/dewTemp.png"
            alt=""
            style="width: 60px; height: 60px"
          />
          <ul>
            <div class="datafont">{{ data.dewTemp.value }} </div>
            <li>{{ data.detectedTime.value }}</li>
          </ul>
        </div>
      </div>
      <div
        class="ui raised segment"
        style="
          background-image: linear-gradient(
            to left top,
            #f9f7fc,
            #faf9fd,
            #fcfbfe,
            #fdfdfe,
            #ffffff
          );
        "
      >
        <a class="ui teal ribbon label">信号强度</a>
        <div class="datadiv">
          <img
            src="@/assets/img/xinhao.png"
            alt=""
            style="width: 60px; height: 60px"
          />
          <ul>
            <div class="datafont">{{ data.rssi.value }} </div>
            <li>{{ data.detectedTime.value }}</li>
          </ul>
        </div>
      </div>
      <!-- <div class="sensor-value">
        <div class="sensor-label">二氧化碳</div>
        <div class="sensor-reading">{{ data.co2 }} lux</div>
        <div class="sensor-time">{{ data.detectedTime }}</div>
      </div>
      <div class="sensor-value">
        <div class="sensor-label">电源</div>
        <div class="sensor-reading"> {{ data.dewTemp }} V</div>
        <div class="sensor-time">{{ data.detectedTime }}</div>
        
      </div>
      <div class="sensor-value">
        <div class="sensor-label">信号强度</div>
        <div class="sensor-reading"> {{ data.rssi }} dBm</div>
        <div class="sensor-time">{{ data.detectedTime }}</div>
         
      </div> -->
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getNtrData } from "@/api/sensor/nutrientMonitor";
const data = {
  co2: ref(0),
  dewTemp: ref(0),
  rssi: ref(0),
  detectedTime: ref(0),
};

onMounted(() => {
  updateData(); // 获取并显示初始数据

  // 每隔一分钟调用一次updateData()函数
  setInterval(() => {
    updateData();
  }, 60000); // 时间间隔为一分钟（单位为毫秒）
});
function updateData() {
  function isValidData(value) {
    return value !== 0 && value !== null;
  }
  const noData = '暂无数据';
  getNtrData().then((res) => {
    const lastDataIndex = res.data.length - 1;
    const dataItem = res.data[lastDataIndex];  
    if (dataItem.hasOwnProperty('co2')) {
      data.co2.value = isValidData(dataItem.co2) ? dataItem.co2+' ppm' : noData;
    } else {
      data.co2 = noData;
    }
    if (dataItem.hasOwnProperty('dewTemp')) {
      data.dewTemp.value = isValidData(dataItem.dewTemp) ? dataItem.dewTemp+'℃' : noData;
    } else {
      data.dewTemp = noData;
    }
    if (dataItem.hasOwnProperty('rssi')) {
      data.rssi.value = isValidData(dataItem.rssi) ? dataItem.rssi+' dBm' : noData;
    } else {
      data.rssi = noData;
    }
    if (dataItem.hasOwnProperty('detectedTime')) {
      data.detectedTime.value = isValidData(dataItem.detectedTime) ? dataItem.detectedTime+' lux' : noData;
    } else {
      data.detectedTime = noData;
    } 
    data.detectedTime.value = res.data[lastDataIndex].detectedTime;
   
  
  });
}
</script>

<style scoped>
.agriculture-monitoring {
  /* width: 100%;*/
  /* border: 1px solid #ccc;; */
  /* box-shadow:0 0 1px;
  border-radius: 5px; */
  /* text-align: center;  */
 
}
.sensor-value {
  display: flex;
  flex-wrap: wrap;
  font-size: 21px;
  font-weight: 500;
  border-radius: 5px;
  margin: 10px;
  padding: 10px;
  opacity: 0.5;
  background-color: #7fb7a191;
  justify-content: center;
  width: 100%;
  height: 120px;
}
/* 其他样式设置 */

.two {
  width: 100%;
  height: 20px;
  justify-content: center;
}
.sensor-values {
  width: 100%;

  /* 其他样式设置 */
}

.sensor-label {
  margin-top: 23px;
  /* margin-left: px; */
  /* height: 0px; */
  width: 35%;
  justify-content: center;
  align-items: center;
  /* margin: 10px; */
  padding-bottom: 18px;
}

.sensor-reading {
  width: 45%;
  margin-top: 25px;
  justify-content: center;
  align-items: center;
  padding-bottom: 18px;
}
.sensor-time {
  width: 100%;
  /* height: 100%; */
  /* height: 60px; */
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
}

.datadiv{
  display: flex; 
  align-items: center
}

.datafont{
  font-size: 30px;
    font-weight: bolder;
    text-align: center;
    margin-top: -40px;
    margin-bottom: 20px;
}
</style>