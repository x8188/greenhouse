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

    <div class="someInfo">
      <div class="Info"></div>
      <div class="Info"></div>
      <div class="Info"></div>
      <div class="Info"></div>
    </div>

    <div class="someInfo" style="margin-top: 50px;">
      <button class="button">
        Fancy Button
        <div class="button__horizontal"></div>
        <div class="button__vertical"></div>
      </button>
      <button class="button">
        Fancy Button
        <div class="button__horizontal"></div>
        <div class="button__vertical"></div>
      </button>
      <button class="button">
        Fancy Button
        <div class="button__horizontal"></div>
        <div class="button__vertical"></div>
      </button>
      <button class="button">
        Fancy Button
        <div class="button__horizontal"></div>
        <div class="button__vertical"></div>
      </button>
    </div>

    
    <!-- <div class="box">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <div class="content">
          <h2>My animated Border </h2>
          <p><a>All our modules are designed to play nicely with responsive of course. At the end of the day it comes down to the theme you use - our code doesn't get in your way.</a></p>
        </div>
        
    </div> -->

    <div class="monitor-platform">
      <monitor-platform></monitor-platform>
    </div>
  </div>
</template>

<script >
import { reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import weatherMonitor from "@/views/sensor/monitor_page/weatherMonitor.vue";
import nutrientMonitor from "@/views/sensor/monitor_page/nutrientMonitor.vue";
import videoPage from "@/views/sensor/monitor_page/videoPage.vue";
import monitorPlatform from "@/views/sensor/monitorplatform/monitorPlatform.vue";
// import {ref} from 'vue'
// import { onMounted, onUnmounted } from 'vue'
import * as echarts from "echarts";
//
export default {
  components: {
    weatherMonitor,
    nutrientMonitor,
    videoPage,
    monitorPlatform,
  },


  // setup() {
  //   const displayData = ref(null) //存储大屏展示数据的响应式变量

  // },
  // 从后端 API 获取传感器数据
  // const fetchSensorData = () => {
  //   // 使用适当的 API 请求库（如 axios）从后端获取数据
  //   // 更新 nutrientSensors 和 weatherSensors 中的传感器数值
  // };

  // onMounted(() => {
  //   fetchSensorData(); // 在组件挂载后获取传感器数据
  // });
};

</script>

<style lang='scss' scoped>
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
.someInfo {
  display: flex;
  justify-content: space-around;
}
.Info {
  height: 300px;
  width: 300px;

  padding: 20px;

  background: linear-gradient(
    to right bottom,
    rgba(255, 255, 255, 0.7),
    rgba(255, 255, 255, 0.5),
    rgba(255, 255, 255, 0.4)
  );
  background-color: #ececec;

  /* 使背景模糊化 */
  backdrop-filter: blur(10px);
  box-shadow: 0 0 20px #3c9f64;
  border-radius: 15px;
}

body {
	
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	background: #fcf3ec;
	
}

.button {
	
	--offset: 10px;
	--border-size: 2px;
	
	display: block;
	position: relative;
	padding: 1.5em 3em;
	appearance: none;
	border: 0;
	background: transparent;
	color: #3c9f64;
	text-transform: uppercase;
	letter-spacing: .25em;
	outline: none;
	cursor: pointer;
	font-weight: bold;
	border-radius: 0;
	box-shadow: inset 0 0 0 var(--border-size) currentcolor;
	transition: background .8s ease;
	
	&:hover {
		background: rgba(100, 0, 0, .03);
	}
	
	&__horizontal,
	&__vertical {
		position: absolute;
		top: var(--horizontal-offset, 0);
		right: var(--vertical-offset, 0);
		bottom: var(--horizontal-offset, 0);
		left: var(--vertical-offset, 0);
		transition: transform .8s ease;
		will-change: transform;
		
		&::before {
			content: '';
			position: absolute;
			border: inherit;
		}
	}
	
	&__horizontal {
		--vertical-offset: calc(var(--offset) * -1);
		border-top: var(--border-size) solid currentcolor;
		border-bottom: var(--border-size) solid currentcolor;
		
		&::before {
			top: calc(var(--vertical-offset) - var(--border-size));
			bottom: calc(var(--vertical-offset) - var(--border-size));
			left: calc(var(--vertical-offset) * -1);
			right: calc(var(--vertical-offset) * -1);
		}
	}
	
	&:hover &__horizontal {
		transform: scaleX(0);
	}
	
	&__vertical {
		--horizontal-offset: calc(var(--offset) * -1);
		border-left: var(--border-size) solid currentcolor;
		border-right: var(--border-size) solid currentcolor;
		
		&::before {
			top: calc(var(--horizontal-offset) * -1);
			bottom: calc(var(--horizontal-offset) * -1);
			left: calc(var(--horizontal-offset) - var(--border-size));
			right: calc(var(--horizontal-offset) - var(--border-size));
		}
	}
	
	&:hover &__vertical {
		transform: scaleY(0);
	}
	
}


.box{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 300px;
  background: #114525a6;
  box-sizing: border-box;
  overflow: hidden;
  box-shadow: 0 20px 50px #3c9f64;
  border: 2px solid #3c9f64;
  color: white;
  padding: 20px;
}
 
.box:before{
  content: '';
  position:absolute;
  top:0;
  left:-100%;
  width:100%;
  height:100%;
  background: rgba(255,255,255,0.1);
  transition:0.5s;
  pointer-events: none;
}
 
.box:hover:before{
  left:-50%;
  transform: skewX(-5deg);
}
 
 
.box .content{
  position:absolute;
  top:15px;
  left:15px;
  right:15px;
  bottom:15px;
  border:1px solid #f0a591;
  padding:20px;
  text-align:center;
  box-shadow: 0 5px 10px rgba(9,0,0,0.5);
  
}
 
.box span{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
  box-sizing: border-box;
  
}
 
.box span:nth-child(1)
{
  transform:rotate(0deg);
}
 
.box span:nth-child(2)
{
  transform:rotate(90deg);
}
 
.box span:nth-child(3)
{
  transform:rotate(180deg);
}
 
.box span:nth-child(4)
{
  transform:rotate(270deg);
}
 
.box span:before
{
  content: '';
  position: absolute;
  width:100%;
  height: 2px;
  background: #50dfdb;
  animation: animate 30s linear infinite;
}
 
@keyframes animate {
  0% {
  transform:scaleX(0);
  transform-origin: left;
  }
  50%
  {
    transform:scaleX(1);
  transform-origin: left;
  }
  50.1%
  {
    transform:scaleX(1);
  transform-origin: right;
    
  }
  
  100%
  {
    transform:scaleX(0);
  transform-origin: right;
    
  }
  
  
}
</style>