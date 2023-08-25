<template>
  <div :style="{ width: displayWidth }" class="video_contain">
    <h2 class="title"> </h2>
    <!-- 智慧大屏内容 -->
    <div class="video-container">
      <!-- <div v-for="video in videos" :key="video.id" class="video-item">
        根据视频数据渲染视频内容 -->
        
        <div class="tv-bg">
          <div style="margin:0 auto;width:100%;height:360px;background:black;">
            <video
            controls='controls'
            :src="videoUrl" 
            width="100%" 
            height="100%" 
            autoplay="autoplay"  
            style="z-index:99; background-color: rgb(0, 0, 0);"
            class="video_content"
            >
            </video>
          </div>
        </div>
        <div class="tv-sub" ></div>
       
        <!-- <template>
          <div class="home">
            <Scene :eventList="eventList"></Scene>
            <BigScreen :dataInfo="dataInfo" :eventList="eventList"></BigScreen>
          </div>
        </template> -->
      <!-- </div> -->
    </div>
  </div>
</template>



 

// <script setup>
import videoUrl from "../../../assets/sensor_imge/show_school.mp4"
// import Scene from "../../../components/SensorScreen/Scene.vue";
// import BigScreen from "../../../components/SensorScreen/BigScreen.vue";
// import LightWall from "../../../three/mesh/LightWall";
// import { onMounted, reactive, ref } from "vue";
// // import { getSmartCityInfo, getSmartCityList } from "@/api/api";
// import gsap from "gsap";
// console.log(testVertex);

// const displayWidth = ref("40%");

// const dataInfo = reactive({
//   iot: { number: 0 },
//   event: { number: 0 },
//   power: { number: 0 },
//   test: { number: 0 },
// });

// onMounted(async () => {
//   changeInfo();
//   getEventList();
//   setInterval(() => {
//     changeInfo();
//     getEventList();
//   }, 10000);
// });

// const changeInfo = async () => {
//   let res = await getSmartCityInfo();

//   for (let key in dataInfo) {
//     dataInfo[key].name = res.data.data[key].name;
//     dataInfo[key].unit = res.data.data[key].unit;
//     gsap.to(dataInfo[key], {
//       number: res.data.data[key].number,
//       duration: 1,
//     });
//   }
// };

// const eventList = ref([]);
// const getEventList = async () => {
//   let result = await getSmartCityList();
//   eventList.value = result.data.list;
// };
</script>
<style>
.title {
  flex: 1 1 40%;
  justify-content: center;
}
.video_contain {
  /* background-color :#f1f1f1; */
  display: flex;
  flex-wrap: wrap; 
  width: 100%; 
  border-radius: 5px;
  text-align: center;
}
.video-container{
  display: flex;
  width: 100%;
  flex-wrap: wrap; 
}

.tv-bg {
    width:100%;
    height: 450px;
    /* background: url("../../../assets/sensor_imge/screen_bottom/1.png"); */
    background-repeat: no-repeat;
    background-size: 100% auto;
    padding-top: 40px;
}
.tv-sub {
    pointer-events: none;
    position: absolute;
    top: 340px;
    left: 0;
    width: 100%;
    height: 300px;
    /* background: url("../../assets/images/screen/7.png"); */
    background-repeat: no-repeat;
    background-size: 100% auto;
}
.video_content{
  width: 100%;
  height: 360px;
}
</style>

