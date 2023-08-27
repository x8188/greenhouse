<template>
  <div>
   <div class="left">
    <div id="mapShow" class="left">
      <!-- 展示样例 -->
      <!-- 显示当前位置点 -->
      <div
          v-if="showCurrentPoint"
          id="CurrentPoint"
          style="
            width: 13px;
            height: 13px;
            border-radius: 50%;
            background: #f00;
            position: absolute;
          "
          @click="showCurrentPoint=false"
      />
      <!-- 显示初始化点 -->
      <div
          v-show="showPoint"
          id="InitPoint"
          style="
            width: 13px;
            height: 13px;
            border-radius: 50%;
            background: #0f0;
            position: absolute;
          "
          @click="showPoint=false"
      />

      <!-- 显示导航点 -->
      <div
          v-show="showNavigatePoint"
          id="NavigatePoint"
          style="
            width: 13px;
            height: 13px;
            border-radius: 50%;
            background: blue;
            position: absolute;
          "
          @click="showNavigatePoint = false"
      />
      <!-- 地图上添加导航点 -->
      <!-- 加载地图 -->
      <img id="mapImg" >
    </div>
  </div>
<!--    </div>-->
    <!-- <div class="right"> -->
      <!-- <el-card shadow="never"> -->
        <!-- <div slot="header" class="clearfix">
          <span><i class="el-icon-video-camera-solid" /> 小车控制</span>
        </div> -->
        <!-- <div>
          <el-row class="rowstyle" :gutter="30">
            <el-col :span="12">
              <el-row :gutter="0">
                <el-col :span="8" class="menu">
                  <el-button
                      type="primary"
                      size="small"
                      icon="TopLeft"
                      @mousedown.native="MoveToLeftandTop"
                      @mouseup.native="stops"
                  />
                </el-col>
                <el-col :span="8" class="menu">
                  <el-button
                      type="primary"
                      size="small"
                      icon="Top"
                      @mousedown.native="MoveToUp"
                      @mouseup.native="stops"
                  />
                </el-col>
                <el-col :span="8" class="menu">
                  <el-button
                      type="primary"
                      size="small"
                      icon="TopRight"
                      @mousedown.native="MoveToRightandTop"
                      @mouseup.native="stops"
                  />
                </el-col>
                <el-col :span="8" class="menu">
                  <el-button
                      type="primary"
                      size="small"
                      icon="Back"
                      @mousedown.native="MoveToLeft"
                      @mouseup.native="stops"
                  />
                </el-col>
                <el-col :span="8" class="menu">
                  <el-button
                      type="primary"
                      size="small"
                      icon="VideoPause"
                      @mousedown.native="stop"
                  />
                </el-col>
                <el-col :span="8" class="menu">
                  <el-button
                      type="primary"
                      size="small"
                      icon="Right"
                      @mousedown.native="MoveToRight"
                      @mouseup.native="stops"
                  />
                </el-col>
                <el-col :span="8" class="menu">
                  <el-button
                      type="primary"
                      size="small"
                      icon="BottomLeft"
                      @mousedown.native="MoveToLeftDown"
                      @mouseup.native="stops"
                  />
                </el-col>
                <el-col :span="8" class="menu">
                  <el-button
                      type="primary"
                      size="small"
                      icon="Bottom"
                      @mousedown.native="MoveToDown"
                      @mouseup.native="stops"
                  />
                </el-col>
                <el-col :span="8" class="menu">
                  <el-button
                      type="primary"
                      size="small"
                      icon="BottomRight"
                      @mousedown.native="MoveToRightDown"
                      @mouseup.native="stops"
                  />
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </div> -->
      <!-- </el-card> -->
      <div class="right">
        <el-card>
        <h3>&nbsp;&nbsp;&nbsp;&nbsp;小车操作</h3>
        <el-row type="flex" justify="left">
          <a
            class="opBu"
            type="primary"
            @click="RenewMap"
        >地图重建</a>
        <a
            class="opBu"
            type="primary"
            @click="UploadMap"
        >上载地图</a>
        </el-row>
        <el-row type="flex" justify="left">
          <a
              class="opBu"
              type="primary"
              @click="Shrink"
          >缩小地图</a>
          <a
              class="opBu"
              type="primary"
              @click="Enlarge"
          >放大地图</a>
        </el-row>
        <el-row type="flex" justify="left">
        <a
            class="opBu"
            type="primary"
            @click="StartWork"
        >开始工作</a>
        <a
            class="opBu"
            type="primary"
            @click="FinishWork"
        >结束工作</a>
        </el-row>
        <el-row type="flex" justify="left">
          <a
            class="opBu"
            type="primary"
            @click="BackBattery"
        >返回充电</a>
        <a
            class="opBu"
            type="primary"
            @click="FinishBattery"
        >结束充电</a>
        </el-row>
        <!-- <el-row type="flex" justify="left">
          <el-button
              class="back"
              type="primary"
              @click="RobotState"
          >机器人状态</el-button>
        </el-row> -->
        <h3>&nbsp;&nbsp;&nbsp;&nbsp;推杆控制</h3>
        <div>

          <div class="container">
            <div class="button-wrapper">
              <div class="button" @click="Uppushrod">
                <span class="text">上升推杆</span>
              </div>
            </div>
            <div class="button-wrapper">
              <div class="button" @click="Lowpushrod">
                <span class="text">下降推杆</span>
              </div>
            </div>
            <div class="button-wrapper">
              <div class="button" @click="Stoppushrod">
                <span class="text">停止推杆</span>
              </div>
            </div>
          </div>
        <!-- <el-button
            class="uppushrod"
            type="primary"
            @click="Uppushrod"
        >上升推杆</el-button>
        <el-button
            class="lowpushrod"
            type="primary"
            @click="Lowpushrod"
        >下降推杆</el-button>
        <el-button
            class="stoppushrod"
            type="primary"
            @click="Stoppushrod"
        >停止推杆</el-button> -->
        </div>
        <div class="demo-progress">
          <h3>&nbsp;&nbsp;&nbsp;&nbsp;电量显示</h3>
    <el-progress type="circle" :percentage="electricity" />
        </div>
        <h3>&nbsp;&nbsp;&nbsp;&nbsp;状态信息</h3>

        <el-descriptions>
    <el-descriptions-item label="小车状态">{{robot_state}}<el-icon :size="20" color="green"><SuccessFilled /></el-icon></el-descriptions-item>
    <el-descriptions-item label="推杆状态">{{pushrod_state}}<el-icon :size="20" color="red"><CircleCloseFilled /></el-icon></el-descriptions-item>
  </el-descriptions>
</el-card>

      </div>
      <!-- <div class="container">
			<a href="#" class="opBu">Example 1</a>
			<a href="#">Example 2</a>
			<a href="#">Example 3</a>
		</div> -->

    </div>
</template>

<script>
import {control_robot} from '@/api/greencar/car'
import {map_robot} from "../../../api/greencar/car";
import {state_robot} from "../../../api/greencar/car";

export default {
  name: "cartest",
  data(){
    return{
      maxHeight: 0,
      maxWidth: 0,
     // 是否显示小车位置点
     showCurrentPoint: false,
      //小车状态
      robotPose:{
        x:'',
        y:'',
        theta:''
      },
      //小车电量
      electricity:'50',
      //小车状态
      robot_state:'',
      //电动推杆信息
      pushrod_state:'',
      //定时查询小车电量
      electrictyInterval:null,
      //定时获取小车位置
      gpsInterval:null,
      // 加载时缩放比例
      percentage: 1,
      // 按钮缩放比例
      multiple: 1,
      //地图是否上传
      isupload:false,
      //小车是否开始工作
      iswork:false,
      //小车是否在充电
      isbattery:false

    }
  },
  mounted() {
    const left = document.getElementsByClassName('left')
    const height = left[0].clientHeight
    const width = left[0].clientWidth
    this.maxHeight = height
    this.maxWidth = width
    // console.log(width,height)
  },
  beforeDestroy() {
    //清除电量轮询
    clearInterval(this.electrictyInterval)
    this.electrictyInterval = null
    //清除位置轮询
    clearInterval(this.gpsInterval)
    this.gpsInterval=null
  },
  methods:{
    //重建地图
    RenewMap(){

    },
    //上载地图
    UploadMap(){
      const data={
        command_map:'upload_map'
      }
      const that = this
      let img = document.getElementById('mapImg')
      console.log(img)
      img.getAttribute('width') && img.removeAttribute('width')
      img.getAttribute('height') && img.removeAttribute('height')
      img.getAttribute('style') && img.removeAttribute('style')
      console.log(that.maxHeight,that.maxWidth)
      map_robot(data).then((res)=>{
        console.log(res)
        const blob=new Blob([res])
        const objectUrl = window.URL.createObjectURL(blob)
        img.src = objectUrl
        img.style.marginLeft = '100'
        img.onload = function() {
          console.log(img.height,img.width)
          if (that.maxWidth < img.width) {
            const percentage = img.width / that.maxWidth
            // 缩放比例
            const multiple = percentage.toFixed(1).toString().split('.')[1] >= 5 ? Math.ceil(percentage) : Math.floor(percentage)
            console.log(img.width / that.maxWidth);
            console.log(multiple);
            that.percentage = multiple
            const width = img.width; const height = img.height
            img.width = width / multiple
            img.height = height / multiple
            img.style.marginLeft = 0
          }
          window.URL.revokeObjectURL(objectUrl)
        }
        this.isupload=true
        console.log('上载地图成功！')
      }).catch(()=>{})
    },
    //开始工作
    StartWork(){
      if (this.isupload===false) {
        this.$message({
          type: 'info',
          message: '请先上载地图'
        })
      } else {
        const data={
        command_instruction:'start_robot'
      }
      control_robot(data).then((res)=>{
        // const startmessage=res.message
        // console.log(startmessage)
        const obj=eval('('+res.message+')')
         const startmessage=obj.command_instruction
        console.log(startmessage)
        if(startmessage=='start_robot')
        {
          this.GetRobotinfo()
          this.GetDirect()
          this.iswork=true
          alert('启动成功')
        }
        else {
          alert('启动失败')
        }
        console.log('启动机器人！')
      }).catch(()=>{})
      }
    },
    //返回充电
    BackBattery(){
      if (this.iswork===false) {
        this.$message({
          type: 'info',
          message: '请先开始工作'
        })
      } else {
        const data={
        command_instruction:'Automatic_charge'
      }
      control_robot(data).then((res)=>{
        const startmessage=res.message
        console.log(startmessage)
        if(startmessage=='Automatic_charge')
        {
          this.isbattery=true
          alert('返回充电成功')
        }
        else {
          alert('返回充电失败')
        }
        console.log('返回充电！')
      }).catch(()=>{})
      }
    },
    //结束充电  （接口还未写）
    FinishBattery(){
      if (this.isbattery===false) {
        this.$message({
          type: 'info',
          message: '请先开始充电'
        })
      } else {
        const data={
        command_instruction:'Automatic_charge'
      }
      control_robot(data).then((res)=>{
        const startmessage=res.message
        console.log(startmessage)
        if(startmessage=='Automatic_charge')
        {
          alert('结束充电成功')
        }
        else {
          alert('结束充电失败')
        }
        console.log('结束充电！')
      }).catch(()=>{})
      }
    },
    //结束工作
    FinishWork(){
      if (this.iswork===false) {
        this.$message({
          type: 'info',
          message: '请先开始工作'
        })
      } else {
        const data={
        command_instruction:'work_termination'
      }
      control_robot(data).then((res)=>{
        const startmessage=res.message
        console.log(startmessage)
        if(startmessage=='work_termination')
        {
          clearInterval(this.electrictyInterval)
          clearInterval(this.gpsInterval)
          this.showCurrentPoint=false
          alert('结束成功')
        }
        else {
          alert('结束失败')
        }
        console.log('结束机器人！')
      }).catch(()=>{})
      }
    },
    //机器人状态信息
    RobotState(){
      const data={
        command_query:'query_information'
      }
     state_robot(data).then((res)=>{
       console.log(res.message)
       const obj=eval('('+res.message+')')
       console.log(obj)
       console.log(obj.robot_information)
       console.log(obj.robot_information.robot_pose.x)
     }).catch(()=>{})
    },
    //获取机器人位置

    //缩放地图
    Shrink(){
      if (this.isupload===false) {
        this.$message({
          type: 'info',
          message: '请先上载地图'
        })
      } else {
      const img = document.getElementById('mapImg')
      const width = img.width
      const height = img.height
      // console.log(width, height);
      this.multiple = this.multiple / 1.6
      img.width = width / 1.6
      img.height = height / 1.6
      }
    },

    //放大地图
    Enlarge(){
      if (this.isupload===false) {
        this.$message({
          type: 'info',
          message: '请先上载地图'
        })
      } else {
      const img = document.getElementById('mapImg')
      const width = img.width
      const height = img.height
      // console.log(width, height);
      this.multiple = this.multiple * 1.6
      img.width = width * 1.6
      img.height = height * 1.6
      }
    },
    //获取小车信息
    GetRobotinfo(){
      this.electrictyInterval=setInterval(() => {
        const data={
        command_query:'query_information'
      }
     state_robot(data).then((res)=>{
       let obj=eval('('+res.message+')')
       this.electricity=obj.robot_information.electricity
       this.robot_state=obj.robot_state
       this.pushrod_state=obj.robot_information.pushrod_state
     }).catch(()=>{})
      }, 2000);
    },
    //机器人当前位置
    GetDirect() {
      this.gpsInterval=setInterval(() => {
        const data={
        command_query:'query_information'
      }
      if (this.showCurrentPoint === false) {
        this.showCurrentPoint = true
      }
     state_robot(data).then((res)=>{
       let obj=eval('('+res.message+')')
       const mapNavigate = document.getElementById('mapImg')
          const offsetLeft = mapNavigate.offsetLeft
          const x = (obj.robot_information.robot_pose.x / this.percentage) * this.multiple + offsetLeft
          const y = obj.robot_information.robot_pose.y
          console.log(x,y)
          console.log(mapNavigate.height)
          const newy = ((mapNavigate.height - y) / this.percentage) * this.multiple
          console.log(newy)
          const a = document.getElementById('CurrentPoint')
          console.log(a)
          // a.style.marginTop = `${y}px`
          a.style.marginTop = `${newy}px`
          a.style.left = `${x}px`
          console.log(a)
     }).catch(()=>{})
      }, 1500);
    },
    //推杆上升控制
    Uppushrod(){
      if (this.iswork===false) {
        this.$message({
          type: 'info',
          message: '请先开始工作'
        })
      } else {
        const data={
        command_instruction:'rise'
      }
      control_robot(data).then((res)=>{
        const startmessage=res.message
        if(startmessage=='rise')
        {
          alert('正在上升')
        }
        else {
          alert('上升失败')
        }
        console.log('推杆上升！')
      }).catch(()=>{})
      }
    },
    //推杆下降控制
    Lowpushrod(){
      if (this.iswork===false) {
        this.$message({
          type: 'info',
          message: '请先开始工作'
        })
      } else {
        const data={
        command_instruction:'decline'
      }
      control_robot(data).then((res)=>{
        const startmessage=res.message
        if(startmessage=='decline')
        {
          alert('正在下降')
        }
        else {
          alert('下降失败')
        }
        console.log('推杆下降！')
      }).catch(()=>{})
      }
    },
    //推杆停止控制
    Stoppushrod(){
      if (this.iswork===false) {
        this.$message({
          type: 'info',
          message: '请先开始工作'
        })
      } else { const data={
        command_instruction:'stop'
      }
      control_robot(data).then((res)=>{
        const startmessage=res.message
        if(startmessage=='stop')
        {
          alert('正在停止')
        }
        else {
          alert('停止失败')
        }
        console.log('推杆停止！')
      }).catch(()=>{})
      }
    },
   Stopbutton() {
    if (this.iswork===false) {
        this.$message({
          type: 'info',
          message: '请先开始工作'
        })
      } else {
      }
   }
  }
}
</script>

<style scoped>
.rowstyle {
  display: flex;
  justify-content: space-between;
}
.left {
  width: 75%;
  margin-right: 25%;
  /* position: relative; */
}
.demo-progress .el-progress--circle {
  margin-right: 15px;
}
.right {
  float: right;
  width: 25%;
  /* overflow: hidden; */
  right: 0;
  top: 120px;
  position: fixed;
  opacity: 0.85;
  /* background-color: #02f816; */
}
#mapImg {
  margin-left: 200px;
  /* position: absolute;
  left: 50%;
  transform: translateX(-50%); */
  /* margin: 0 auto; */
}
/* #mapShow {
  position: relative;
} */
</style>


<style lang="less" scoped>
// @import url('https://fonts.googleapis.com/css?family=Signika+Negative:400,600,700');

body {
  margin: 0;
  background: #2b2f3c;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  height: 100vh;
  font-family: 'Signika Negative', sans-serif;
  
  h1 {
    text-transform: uppercase;
    text-align: center;
    color: #fff;
    font-size: 3em;
    letter-spacing: 0.05em;
    margin-bottom: 1em;
  }
  
    
  .opBu {
    display: inline-block;
    margin: 10px 20px;
    color: #fff;
    line-height: 1em;
    letter-spacing: 0.15em;
    text-decoration: none;
    text-transform: uppercase;
    font-weight: 600;
    padding: 0.9em 2.5em;
    border: 0.15em solid transparent;
    background: #2b2f3c;
    border-radius: 3em;
    position: relative;
    z-index: 1;
    overflow: hidden;
    
    &:before {
      content: "";
      display: block;
      border-radius: 3.5em;
      position: absolute;
      background: inherit;
      top: 0.2em;
      left: 0.2em;
      right: 0.2em;
      bottom: 0.2em;
      z-index: -1;
    }
    
    &:after {
      content: "";
      display: block;
      //border-radius: 3.5em;
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      z-index: -2;
      transform: rotate(0deg);
      animation: gradient 2s ease alternate infinite;
      -webkit-animation-play-state: paused;
      animation-play-state: paused;
    }
    
    &:hover:after {
        -webkit-animation-play-state: running;
        animation-play-state: running;
      }
    
    &{
      
      &:after {
        background: rgb(51,203,235);
        background: -moz-linear-gradient(left, rgba(51,203,235,1) 0%, rgba(40,214,98,1) 30%, rgba(240,119,57,1) 70%, rgba(227,54,107,1) 100%);
        background: -webkit-linear-gradient(left, rgba(51,203,235,1) 0%,rgba(40,214,98,1) 30%,rgba(240,119,57,1) 70%,rgba(227,54,107,1) 100%);
        background: linear-gradient(to right, rgba(51,203,235,1) 0%,rgba(40,214,98,1) 30%,rgba(240,119,57,1) 70%,rgba(227,54,107,1) 100%);
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#33cbeb', endColorstr='#e3366b',GradientType=1 );
        background-size: 300% 300%;
      }

    }
      
      // &:nth-child(2) {
        
      //   &:after {
      //     background: rgb(230,54,196);
      //     background: -moz-linear-gradient(left, rgba(230,54,196,1) 0%, rgba(63,206,165,1) 48%, rgba(80,64,139,1) 96%);
      //     background: -webkit-linear-gradient(left, rgba(230,54,196,1) 0%,rgba(63,206,165,1) 48%,rgba(80,64,139,1) 96%);
      //     background: linear-gradient(to right, rgba(230,54,196,1) 0%,rgba(63,206,165,1) 48%,rgba(80,64,139,1) 96%);
      //     filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#e636c4', endColorstr='#50408b',GradientType=1 );
      //     background-size: 300% 300%;
      //   }
      // }
  }

  @-webkit-keyframes gradient {.keyframes;}
  @keyframes gradient {.keyframes;}
  .keyframes () {
          0% {background-position: 0% 50%;}
          50% {background-position: 95% 50%;}
          100% {background-position: 0% 50%;}
  }
  
}

</style>

<style lang="scss" scoped>

$colors: #FF8B94, #02A7E1, #98CB4A, #AE5A41, #F7D842;

@for $i from 1 through length($colors) {
	.container .button-wrapper:nth-child(#{length($colors)}n+#{$i}) div:before {
		border-color: nth($colors, $i);
	} 
  .container .button-wrapper:nth-child(#{length($colors)}n+#{$i}) div {
		border-color: nth($colors, $i);
	} 
}

.container {  
  z-index: 99;
  // height: 100vh;
  display: flex;
  // justify-content: center;
  align-items: center;
  flex: 0;
  flex-wrap: wrap;
  .button-wrapper {
    overflow:hidden;  
    .button {
    position:relative;
    text-transform: uppercase;
    color: #555555;
    border: solid 2px #02A7E1;
    padding: 10px 30px;
    z-index:1;
    cursor: pointer;
    &::before {
      position:absolute;
      border-bottom: solid 3px;
      content:'';
      min-height: 10px;
      min-width: 100px;
      z-index:200;
      left: 50%;
      transform: translateX(-50%);
      top: 60%;
      opacity:1;
      transition-duration:0.5s;
      
    }
    &::after {
      pointer-events: none;
      position:absolute;
      content:'';
      width: 600px;
      height: 160px;
      border-radius:50%;
      background-color: #fff;
      //background-color: red;
      
      //border: solid 2px red;
      top:-120%;
      left:-30%; 
      z-index: -10;
      //transform: rotate(30deg);
      transition-duration: 2s;
    }
    &:hover:after {
      width:0;
      height:50px;
    }
    &:hover:before {
      opacity:0;
    }
  }
  }
}


</style>