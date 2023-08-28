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
            width: 7px;
            height: 7px;
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
        <el-card >
        <h3>&nbsp;&nbsp&nbsp;&nbsp机器人操作</h3>
        <el-row type="flex" justify="left">
          <el-button
            class="uploadmap"
            type="primary"
            @click="UploadMap"
        >上载地图</el-button>
          <el-button
            class="renewmap"
            type="primary"
            @click="RenewMap"
        >地图重建</el-button>
        <el-button
            class="savemap"
            type="primary"
            @click="SaveMap"
        >保存地图</el-button>
        </el-row>
        <el-row type="flex" justify="left">
          <el-button
              class="shrinkmap"
              type="primary"
              @click="Shrink"
          >缩小地图</el-button>
          <el-button
              class="largemap"
              type="primary"
              @click="Enlarge"
          >放大地图</el-button>
        </el-row>
        <el-row type="flex" justify="left">
        <el-button
            class="ChargeWork"
            type="primary"
            @click="ChargeWork"
        >启动机器人</el-button>
        <el-button
            class="FinChargeWork"
            type="primary"
            @click="FinChargeWork"
        >结束机器人</el-button>
        </el-row>
        <el-row type="flex" justify="left">
        <el-button
            class="startwork"
            type="primary"
            @click="StartWork"
        >继续工作</el-button>
        <el-button
            class="finishwork"
            type="primary"
            @click="FinishWork"
        >暂停工作</el-button>
        </el-row>
        <el-row type="flex" justify="left">
          <el-button
            class="backbattery"
            type="primary"
            @click="BackBattery"
        >返回充电</el-button>
        <el-button
            class="finishbattery"
            type="primary"
            @click="FinishBattery"
        >结束充电</el-button>
        </el-row>
        <!-- <el-row type="flex" justify="left">
          <el-button
              class="back"
              type="primary"
              @click="RobotState"
          >机器人状态</el-button>
        </el-row> -->
        <h3>&nbsp;&nbsp&nbsp;&nbsp推杆控制</h3>
        <el-row type="flex" justify="left">
        <el-button
            class="uppushrod"
            type="primary"
            @mousedown.native="Uppushrod"
           @mouseup.native="Stoppushrod"
        >上升推杆</el-button>
        <el-button
            class="lowpushrod"
            type="primary"
            @mousedown.native="Lowpushrod"
            @mouseup.native="Stoppushrod"
        >下降推杆</el-button>
        </el-row>
        <div class="demo-progress">
          <h3>&nbsp;&nbsp&nbsp;&nbsp电量显示</h3>
    <el-progress type="circle" :percentage="electricity" />
        </div>
        <h3>&nbsp;&nbsp&nbsp;&nbsp状态信息</h3>
        <el-descriptions>
    <el-descriptions-item label="机器人状态">{{robot_state}}</el-descriptions-item>
    <el-descriptions-item label="推杆状态">{{pushrod_state}}</el-descriptions-item>
  </el-descriptions>
</el-card>
      </div>
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
        command_map:'rebuild_map'
      }
      map_robot(data).then((res)=>{
        const startmessage=res.message
        console.log(startmessage)
        if(startmessage=='map_rebuilding')
        {
          this.GetMapinfo()
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
      const data={
        command_map:'save_map'
      }
      map_robot(data).then((res)=>{
        const startmessage=res.message
        console.log(startmessage)
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
        if(res.message=='地图文件不存在，请重建')
        {
          this.$message({
          type: 'info',
          message: '地图文件不存在，请重建'
        })
        }else{
        const blob=new Blob([res])
        const objectUrl = window.URL.createObjectURL(blob)
        img.src = objectUrl
        img.style.marginLeft = '100'
        that.Oriheight=img.height
        that.Oriwidth=img.width
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
      }
      }).catch((error)=>{
          console.log(error)
      })
    },
    //启动机器人
    ChargeWork(){
      const data={
        command_query:'query_information'
      }
     state_robot(data).then((res)=>{
       console.log(res.message)
       const obj=eval('('+res.message+')')
       this.robotcharge=obj.robot_state
     }).catch(()=>{})
     //如果机器人正在运行 则让其显示信息
     if(this.robotcharge=='robot_working')
     {
      this.$message({
          type: 'info',
          message: '机器人正在运行中'
        })
        this.GetRobotinfo()
        // this.GetDirect()
        this.iswork=true
     }
     //如果机器人没有运行，则让其启动
     else{
      const data={
        command_instruction:'start_robot'
      }
      control_robot(data).then((res)=>{
        const startmessage=res.message
        console.log(startmessage)
        // const obj=eval('('+res.message+')')
        //  const startmessage=obj.command_instruction
        // console.log(startmessage)
        if(startmessage=='start_robot')
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
    },
    //结束机器人
    FinChargeWork(){
      const data={
        command_instruction:'work_termination'
      }
      control_robot(data).then((res)=>{
        const startmessage=res.message
        console.log(startmessage)
        if(startmessage=='work_stopped')
        {
          clearInterval(this.electrictyInterval)
          clearInterval(this.gpsInterval)
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
        const startmessage=res.message
        console.log(startmessage)
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
        command_instruction:'Automatic_charge'
      }
      control_robot(data).then((res)=>{
        const startmessage=res.message
        console.log(startmessage)
        if(startmessage=='Automatic_charge')
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
        const startmessage=res.message
        console.log(startmessage)
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
        const startmessage=res.message
        console.log(startmessage)
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
          command_query:'update_map'
      }
      const that = this
      let img = document.getElementById('mapImg')
      img.getAttribute('width') && img.removeAttribute('width')
      img.getAttribute('height') && img.removeAttribute('height')
      img.getAttribute('style') && img.removeAttribute('style')
      console.log(that.maxHeight,that.maxWidth)
      state_robot(data).then((res)=>{
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
        const startmessage=res.message
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
        const startmessage=res.message
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
        const startmessage=res.message
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
  //  Stopbutton() {
  //   if (this.iswork===false) {
  //       this.$message({
  //         type: 'info',
  //         message: '请先开始工作'
  //       })
  //     } else {
  //     }
  //  }
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
  opacity: 0.65;
}
#mapImg {
  margin-left: 200px;
  /* position: absolute;
  left: 50%;
  transform: translateX(-50%); */
  /* margin: 0 auto; */
}
#mapShow {
  position: relative;
}
</style>
