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
    </div>
  </div>
</template>



 

 <script>

// import videoUrl from "../../../assets/sensor_imge/show_school.mp4"
export default {
  data() {
    return {
      videoUrl: 'http://60.205.164.47:8000/rtp/00A4C799.live.mp4',
    };
  },
};
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

