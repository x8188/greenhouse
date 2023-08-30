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
      <div class="fndiv">
        <div style="display: flex;justify-content: space-evenly;align-items: baseline;">

          <div class="fndivItem ui raised segment">
            <a class="ui teal ribbon label">状态操作</a>
            <a
                class="opBu"
                type="primary"
                @click="StartWork"
            >继续工作</a>
            <a
                class="opBu"
                type="primary"
                @click="FinishWork"
            >暂停工作</a>
          </div>
          <div class="fndivItem ui raised segment">
            <a class="ui teal ribbon label">充电操作</a>
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
          </div>
          <div class="fndivItem ui raised segment">
            <a class="ui teal ribbon label">地图操作</a>
              <a
                  class="opBu"
                  type="primary"
                  @click="SaveMap"
              >保存地图</a>
              <a
                  class="opBu"
                  type="primary"
                  @click="RenewMap"
              >地图重建</a>
          </div>

        </div>
      </div>
      <div class="right">
        <el-card>
        <h3>&nbsp;&nbsp;&nbsp;&nbsp;机器人操作</h3>
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
              <div class="button" 
              @mousedown.native="Uppushrod"
              @mouseup.native="Stoppushrod">
                <span class="text">上升推杆</span>
              </div>
            </div>
            <div class="button-wrapper">
              <div class="button"
              @mousedown.native="Lowpushrod"
              @mouseup.native="Stoppushrod">
                <span class="text">下降推杆</span>
              </div>
            </div>
            <!-- <div class="button-wrapper">
              <div class="button" @click="Stoppushrod">
                <span class="text">停止推杆</span>
              </div>
            </div> -->
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
          
          <el-row type="flex" justify="left">
            <el-col :span="8"> <el-progress type="circle" :percentage="electricity" /></el-col>


            <el-col :span="16">
              <a
                  class="opBu"
                  type="primary"
                  @click="UploadMap"
              >上载地图</a>
              <a
                  class="opBu"
                  type="primary"
                  @click="ChargeWork"
              >启动机器人</a>
              <a
                  class="opBu"
                  type="primary"
                  @click="FinChargeWork"
              >结束机器人</a>
            </el-col>

        </el-row>
        </div>
        <h3>&nbsp;&nbsp;&nbsp;&nbsp;状态信息</h3>

        <el-descriptions>
    <el-descriptions-item label="机器人状态">{{robot_state}}<el-icon :size="20" color="green"><SuccessFilled /></el-icon></el-descriptions-item>
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
      //小车是否通电
      robotcharge:'',
      //小车电量
      electricity:'',
      //小车状态
      robot_state:'',
      //电动推杆信息
      pushrod_state:'',

      //定时查询小车电量
      electrictyInterval:null,
      //定时获取小车位置
      gpsInterval:null,
      //定时获取重建地图信息
      setupInterval:null,

      // 加载时缩放比例
      percentage: 1,
      // 按钮缩放比例
      multiple: 1,
      //地图是否上传
      isupload:false,
      //小车是否开始工作
      iswork:false,
      //小车是否在充电
      isbattery:false,
      //小车是否已经停止
      isstop:false,
      //是否开始重建地图
      issetmap:false,

      //上载图片原始宽高
      Oriheight:0,
      Oriwidth:0
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

    //清除重建地图查询
    clearInterval(this.setupInterval)
    this.setupInterval=null
  },
  methods:{
    //重建地图
    RenewMap(){
       const data={
        command_query:'rebuild_map'
      }
      state_robot(data).then((res)=>{
        console.log(res)
        const obj=eval('('+res.message+')')
         const startmessage=obj.map_data
         console.log(startmessage)
        if(startmessage=='map_rebuilding')
        {
          clearInterval(this.gpsInterval)
          this.GetMapinfo()
          this.issetmap=true
          this.$message({
          type: 'info',
          message: '地图开始重建'
        })
        }
        else {
          this.$message({
          type: 'info',
          message: '地图重建失败'
        })
        }
        console.log('地图开始重建！')
      }).catch(()=>{})
    },
    //保存重建地图
    SaveMap(){
      if (this.issetmap===false) {
        this.$message({
          type: 'info',
          message: '请先开始重建地图'
        })
      } else {
        const data={
        command_query:'save_map'
      }
      state_robot(data).then((res)=>{
        const obj=eval('('+res.message+')')
         const startmessage=obj.map_data
        if(startmessage=='map_saved')
        {
          clearInterval(this.setupInterval)
          this.$message({
          type: 'info',
          message: '保存地图成功'
        })
        }
        else {
          this.$message({
          type: 'info',
          message: '保存地图失败'
        })
        }
        console.log('地图保存！')
      }).catch(()=>{})
      }
    },
    //上载地图
    UploadMap(){
      const datamap={
        command_map:'upload_map'
      }
      const datainfo={
        command_query:'upload_map'
      }
      state_robot(datainfo).then((res)=>{
        const obj=eval('('+res.message+')')
         const startmessage=obj.map_data
        if(startmessage=='map_exists')
        {
          this.$message({
          type: 'info',
          message: '上载地图成功'
        })
        this.Oriheight=obj.height
        this.Oriwidth=obj.width
        const that = this
      let img = document.getElementById('mapImg')
      console.log(img)
      img.getAttribute('width') && img.removeAttribute('width')
      img.getAttribute('height') && img.removeAttribute('height')
      img.getAttribute('style') && img.removeAttribute('style')
      console.log(that.maxHeight,that.maxWidth)
      map_robot(datamap).then((res)=>{
        const blob=new Blob([res])
        const objectUrl = window.URL.createObjectURL(blob)
        img.src = objectUrl
        img.style.marginLeft = '100'
        // that.Oriheight=img.height
        // that.Oriwidth=img.width
        console.log(that.Oriwidth,that.Oriheight)
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
        this.GetDirect()
        this.isupload=true
        console.log('上载地图成功！')
      }).catch((error)=>{
          console.log(error)
      })
        }
        else {
          this.$message({
          type: 'info',
          message: '上载地图失败'
        })
        }
      }).catch(()=>{})
    },
    //启动机器人
    ChargeWork(){
      const data={
        command_query:'query_information'
      }
     state_robot(data).then((res)=>{
       const obj=eval('('+res.message+')')
       this.robotcharge=obj.robot_state
            //如果机器人正在运行 则让其显示信息
     if(this.robotcharge!='robot_stopping')
     {
      this.$message({
          type: 'info',
          message: '机器人正在运行中'
        })
        this.iswork=true
        this.GetRobotinfo()
        // this.GetDirect()
     }
     //如果机器人没有运行，则让其启动
     else{
      const data={
        command_instruction:'start_robot'
      }
      control_robot(data).then((res)=>{
        // const startmessage=res.message
        // console.log(startmessage)
        const obj=eval('('+res.message+')')
         const startmessage=obj.robot_state
        // console.log(startmessage)
        if(startmessage=='start_successfully')
        {
          this.GetRobotinfo()
          // this.GetDirect()
          this.iswork=true
          this.$message({
          type: 'info',
          message: '启动成功'
        })
        }
        else {
          this.$message({
          type: 'info',
          message: '启动失败'
        })
        }
        console.log('启动机器人！')
      }).catch(()=>{})
     }
     }).catch(()=>{})
    },
    //结束机器人
    FinChargeWork(){
      const data={
        command_instruction:'work_termination'
      }
      control_robot(data).then((res)=>{
        const obj=eval('('+res.message+')')
         const startmessage=obj.robot_state
        if(startmessage=='work_stopped')
        {
          clearInterval(this.electrictyInterval)
          clearInterval(this.gpsInterval)
          clearInterval(this.setupInterval)
          this.showCurrentPoint=false
          this.$message({
          type: 'info',
          message: '机器人正在结束'
        })
        }
        else {
          this.$message({
          type: 'info',
          message: '机器人结束失败'
        })
        }
        console.log('机器人结束！')
      }).catch(()=>{})
    },
    //继续工作
    StartWork(){
      if (this.isstop===false) {
        this.$message({
          type: 'info',
          message: '请先暂停工作'
        })
      } else {
        const data={
        command_instruction:'work_continue'
      }
      control_robot(data).then((res)=>{
        const obj=eval('('+res.message+')')
         const startmessage=obj.robot_state
        // const obj=eval('('+res.message+')')
        //  const startmessage=obj.command_instruction
        // console.log(startmessage)
        if(startmessage=='continue_working')
        {
          this.$message({
          type: 'info',
          message: '继续移动成功'
        })
        }
        else {
          this.$message({
          type: 'info',
          message: '继续移动失败'
        })
        }
        console.log('继续移动！')
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
        command_instruction:'automatic_charge'
      }
      control_robot(data).then((res)=>{
        const obj=eval('('+res.message+')')
         const startmessage=obj.robot_state
        if(startmessage=='automatic_charging')
        {
          this.isbattery=true
          this.$message({
          type: 'info',
          message: '返回充电成功'
        })
        }
        else {
          this.$message({
          type: 'info',
          message: '返回充电失败'
        })
        }
        console.log('返回充电！')
      }).catch(()=>{})
      }
    },
    //结束充电
    FinishBattery(){
      if (this.isbattery===false) {
        this.$message({
          type: 'info',
          message: '请先开始充电'
        })
      } else {
        const data={
        command_instruction:'stop_charge'
      }
      control_robot(data).then((res)=>{
        const obj=eval('('+res.message+')')
         const startmessage=obj.robot_state
        if(startmessage=='stop_charging')
        {
          this.$message({
          type: 'info',
          message: '结束充电成功'
        })
        }
        else {
          this.$message({
          type: 'info',
          message: '结束充电失败'
        })
        }
        console.log('结束充电！')
      }).catch(()=>{})
      }
    },
    //暂停工作
    FinishWork(){
      if (this.iswork===false) {
        this.$message({
          type: 'info',
          message: '请先开始工作'
        })
      } else {
        const data={
        command_instruction:'work_pause'
      }
      control_robot(data).then((res)=>{
        const obj=eval('('+res.message+')')
         const startmessage=obj.robot_state
        if(startmessage=='pause_working')
        {
          this.isstop=true      
          this.$message({
          type: 'info',
          message: '暂停移动成功'
        })
        }
        else {
          this.$message({
          type: 'info',
          message: '暂停移动失败'
        })
        }
        console.log('暂停机器人！')
      }).catch(()=>{})
      }
    },

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
    //获取机器人信息
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
          console.log("左边缘的偏移量"+offsetLeft)
          const x = (obj.robot_information.robot_pose.x / this.percentage) * this.multiple + offsetLeft
          const y = obj.robot_information.robot_pose.y
          console.log(x,y)
          console.log("图片元素高"+mapNavigate.height)
          const newy = ((this.Oriheight - y) / this.percentage) * this.multiple
          console.log("新高度"+newy)
          const a = document.getElementById('CurrentPoint')   
          a.style.marginTop = `${newy}px`
          a.style.left = `${x}px`
     }).catch(()=>{})
      }, 1500);
    },
    //获取重建地图信息
    GetMapinfo(){
      this.setupInterval=setInterval(() => {
        const data={
          command_map:'update_map'
      }
      const that = this
      let img = document.getElementById('mapImg')
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
      }).catch((error)=>{
          console.log(error)
      })
      }, 1000); 
    },
    //推杆上升控制
    Uppushrod(){
      if (this.iswork===false) {
        this.$message({
          type: 'info',
          message: '请先启动机器人'
        })
      } else {
        const data={
        command_instruction:'rise_pushrod'
      }
      control_robot(data).then((res)=>{
        const obj=eval('('+res.message+')')
         const startmessage=obj.pushrod_state
        if(startmessage=='pushrod_rising')
        {
          this.$message({
          type: 'info',
          message: '正在上升'
        })
        }
        else {
          this.$message({
          type: 'info',
          message: '上升失败'
        })
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
        command_instruction:'decline_pushrod'
      }
      control_robot(data).then((res)=>{
        const obj=eval('('+res.message+')')
         const startmessage=obj.pushrod_state
        if(startmessage=='pushrod_declining')
        {
          this.$message({
          type: 'info',
          message: '正在下降'
        })
        }
        else {
          this.$message({
          type: 'info',
          message: '下降失败'
        })
        }
        console.log('推杆下降！')
      }).catch(()=>{})
      }
    },
    //推杆停止控制
    Stoppushrod(){
       const data={
        command_instruction:'stop_pushrod'
      }
      control_robot(data).then((res)=>{
        const obj=eval('('+res.message+')')
         const startmessage=obj.pushrod_state
        if(startmessage=='pushrod_stopped')
        {
          this.$message({
          type: 'info',
          message: '正在停止'
        })
        }
        else {
          this.$message({
          type: 'info',
          message: '停止失败'
        })
        }
        console.log('推杆停止！')
      }).catch(()=>{})
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

  min-width: 350px;
}
.fndiv {
  float: bottom;;
  width: 70%;
  /* overflow: hidden; */
  left: 0;

  position:absolute;
  opacity: 0.85;
  bottom: 0;
  margin-bottom: 1%;
  /* background-color: #02f816; */
  min-width: 600px;
}
.fndivItem{
  width: 250px;
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
    margin:10px 20px 0px 20px;
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
      
    &:nth-child(3) {
        
        &:after {
          background: rgb(96,134,193);
          background: -moz-linear-gradient(45deg,  rgba(96,134,193,1) 0%, rgba(239,224,151,1) 70%, rgba(214,100,102,1) 100%);
          background: -webkit-gradient(linear, left bottom, right top, color-stop(0%,rgba(96,134,193,1)), color-stop(70%,rgba(239,224,151,1)), color-stop(100%,rgba(214,100,102,1)));
          background: -webkit-linear-gradient(45deg,  rgba(96,134,193,1) 0%,rgba(239,224,151,1) 70%,rgba(214,100,102,1) 100%);
          background: -o-linear-gradient(45deg,  rgba(96,134,193,1) 0%,rgba(239,224,151,1) 70%,rgba(214,100,102,1) 100%);
          background: -ms-linear-gradient(45deg,  rgba(96,134,193,1) 0%,rgba(239,224,151,1) 70%,rgba(214,100,102,1) 100%);
          background: linear-gradient(45deg,  rgba(96,134,193,1) 0%,rgba(239,224,151,1) 70%,rgba(214,100,102,1) 100%);
          background-size: 300% 300%;
        }
      }
      
      &:nth-child(2) {
        
        &:after {
          background: rgb(230,54,196);
          background: -moz-linear-gradient(left, rgba(230,54,196,1) 0%, rgba(63,206,165,1) 48%, rgba(80,64,139,1) 96%);
          background: -webkit-linear-gradient(left, rgba(230,54,196,1) 0%,rgba(63,206,165,1) 48%,rgba(80,64,139,1) 96%);
          background: linear-gradient(to right, rgba(230,54,196,1) 0%,rgba(63,206,165,1) 48%,rgba(80,64,139,1) 96%);
          filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#e636c4', endColorstr='#50408b',GradientType=1 );
          background-size: 300% 300%;
        }
      }
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

<style scoped>
/* .svg-wrapper {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
	  margin: 0 auto;
  width: 320px;  
}
.shape {
  stroke-dasharray: 140 540;
  stroke-dashoffset: -474;
  stroke-width: 8px;
  fill: transparent;
  stroke: #19f6e8;
  border-bottom: 5px solid black;
  transition: stroke-width 1s, stroke-dashoffset 1s, stroke-dasharray 1s;
}
.text {
  font-family: 'Roboto Condensed';
  font-size: 22px;
  line-height: 32px;
  letter-spacing: 8px;
  color: #fff;
  top: -48px;
  position: relative;
}
.svg-wrapper:hover .shape {
  stroke-width: 2px;
  stroke-dashoffset: 0;
  stroke-dasharray: 760;
} */
</style>