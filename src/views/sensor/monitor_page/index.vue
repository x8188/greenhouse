<template>
  <div>
    <div class="app">
      <div class="weather-monitoring">
        <weather-monitor></weather-monitor>
      </div>
      <div class="video">
        <video-page></video-page>
      </div>
      <div class="nutrient-monitoring">
        <nutrient-monitor></nutrient-monitor>
      </div>
    </div>

    <div class="monitor-platform">
      <monitor-platform></monitor-platform>
    </div>
  </div>
</template>

<script >
import { reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import weatherMonitor from "./weatherMonitor.vue";
import nutrientMonitor from "./nutrientMonitor.vue";
import videoPage from "./videoPage.vue";
import monitorPlatform from "../monitorplatform/monitorPlatform.vue";
// import {ref} from 'vue'
// import { onMounted, onUnmounted } from 'vue'

//
export default {
  components: {
    weatherMonitor,
    nutrientMonitor,
    videoPage,
    monitorPlatform,
  },

  
};
</script>

<style scoped>
.app {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  /* background-color: #7fb7a191; */
}

.nutrient-monitoring,
.weather-monitoring {
  /* flex: 1 1 30%;
  justify-content: center;
  margin-bottom: 20px;
  width: 35%;
  padding: 0 20px; */

  display: flex;
  justify-content: center;
  align-items: center;
  align-items: flex-start;
  flex-direction: column;
  width: 30%;
}
.video {
  /* flex: 1 1 40%; */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40%;
  /* margin-bottom: 20px;
  padding: 0 20px; */
}
/* .nutrient-monitoring{
  
} */
.sensor-card {
  background-color: #f2f2f2;
  padding: 10px;
  margin-bottom: 10px;
}
</style>