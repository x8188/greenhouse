<template>
  <div>
    <div class="hkv">
      <div class="left" >
        <!--        <el-row :gutter="20">-->
        <!--          <el-col :span="18">-->
        <!--            <el-row type="flex" align="middle" :gutter="20">-->
        <!--              <el-col :span="4">-->
        <!--                <div class="img-small">-->
        <!--                  <el-image :src="backimg" fit="fit" />-->
        <!--                  <div>大田1</div>-->
        <!--                </div>-->
        <!--              </el-col>-->
        <!--            </el-row>-->
        <!--          </el-col>-->
        <!--        </el-row>-->
        <div class="plugin" style="height:70%;" ref="box">
          <!-- <img :src="selectedDevice.path" alt="" height="100%" width="100%" alt=""> -->
          <div id="divPlugin"  />
        </div>
      </div>
      <div class="right">
        <el-card shadow="never">
          <div slot="header" class="clearfix">
            <span><i class="el-icon-video-camera-solid" /> 云台控制</span>
          </div>
          <div>
            <el-row :gutter="20">
              <!-- 云台控制两组按钮之间的距离 -->
              <el-col :span="13">
                <!-- 方向键之间的距离 -->
                <el-row type="flex" justify="center">
                  <el-col :span="8"  class="menu">
                    <el-button type="primary"  size="small" icon="" class="iconfont icon-108fangxiang_xiangshang2" @mousedown.native="mouseDownPTZControl(1)" @mouseup.native="mouseUpPTZControl" />
                  </el-col>
                </el-row>
                <el-row type="flex" justify="center">
                  <el-col :span="8" class="menu">
                    <el-button type="primary"  size="small" icon="" class="iconfont icon-111fangxiang_xiangzuo2" @mousedown.native="mouseDownPTZControl(3)" @mouseup.native="mouseUpPTZControl" />
                  </el-col>
                  <el-col :span="8" class="menu">
                    <el-button type="primary"   size="small" icon="" class="iconfont icon-109fangxiang_xiangyou2" @mousedown.native="mouseDownPTZControl(4)" @mouseup.native="mouseUpPTZControl" />
                  </el-col>
                </el-row>
                <el-row type="flex" justify="center">
                  <el-col :span="8"  class="menu">
                    <el-button type="primary"  size="small" icon="" class="iconfont icon-110fangxiang_xiangxia2" @mousedown.native="mouseDownPTZControl(2)" @mouseup.native="mouseUpPTZControl" />
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="10" style="width:40%">
                <el-row style="text-align:center;margin-top:9%;margin-bottom:9%;">
                  <el-col :span="12" class="menu">
                    <el-button type="primary" size="small" icon="" class="iconfont icon-iconbig" title="放大" @mousedown.native="PTZZoomIn()" @mouseup.native="PTZZoomStop()"/>
                  </el-col>
                  <el-col :span="12" class="menu">
                    <el-button type="primary" size="small" icon="" class="iconfont icon-search-minus" title="缩小" @mousedown.native="PTZZoomout()" @mouseup.native="PTZZoomStop()"/>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
        </el-card>
        <el-card shadow="never">
          <div slot="header" class="clearfix">
            <span><i class="el-icon-view" /> 预览</span>
          </div>
          <div>
            <el-row style="text-align:center;margin-top:7%;margin-bottom:7%">
              <el-col :span="12" class="menu">
                <el-button style="width:80%;" type="primary" size="small" @click.native="clickOpenSound">打开声音</el-button>
              </el-col>
              <el-col :span="12" class="menu">
                <el-button style="width:80%;" type="primary" size="small" @click.native="clickCloseSound">关闭声音</el-button>
              </el-col>
              <el-col :span="12" class="menu">
                <el-button style="width:80%;" type="primary" size="small" @click.native="startElectron">启用电子放大</el-button>
              </el-col>
              <el-col :span="12" class="menu">
                <el-button style="width:80%;" type="primary" size="small" @click.native="closeElectron">禁用电子放大</el-button>
              </el-col>
              <el-col :span="12" class="menu">
                <el-button style="width:80%;" type="primary" size="small" @click.native="full">全屏</el-button>
              </el-col>
              <el-col :span="12" class="menu">
                <el-button style="width:80%;" type="primary" size="small" @click.native="clickGetDeviceInfo()">获取设备信息</el-button>
              </el-col>
            </el-row>
          </div>
        </el-card>
        <!--        <el-card shadow="never">-->
        <!--          <div slot="header" class="clearfix">-->
        <!--            <span><i class="el-icon-setting" /> 本地配置</span>-->
        <!--          </div>-->
        <!--          <div>-->
        <!--            <el-row style="text-align:center;margin-top:6%;">-->
        <!--              <el-col :span="24" class="menu">-->
        <!--                预览抓图保存路径-->
        <!--                &lt;!&ndash; <el-button type="primary" size="small" @click="handleGetPath('snapPath')">浏览</el-button> &ndash;&gt;-->
        <!--                <el-button type="primary" size="small" @click.native="clickOpenFileDlg('previewPicPath', 0);" style="margin-bottom:5%;width:25%">浏览</el-button>-->
        <!--                &lt;!&ndash; <div>{{this.previewPicPath}}</div> &ndash;&gt;-->
        <!--                <el-input-->
        <!--                  placeholder=""-->
        <!--                  v-model="previewPicPath"-->
        <!--                  clearable>-->
        <!--                </el-input>-->

        <!--              </el-col>-->
        <!--              <el-col :span="24" class="menu">-->
        <!--                <el-row style="text-align:center;margin-top:3%;margin-bottom:7%">-->
        <!--                  <el-col :span="12">-->
        <!--                    <el-button style="width:50%;" type="primary" size="small" @click.native="clickGetLocalCfg();getLocalCfg()">获取</el-button>-->
        <!--                  </el-col>-->.
        <!--                  <el-col :span="12">-->
        <!--                    <el-button style="width:50%;" type="primary" size="small" @click="clickSetLocalCfg">设置</el-button>-->
        <!--                  </el-col>-->
        <!--                </el-row>-->
        <!--              </el-col>-->
        <!--            </el-row>-->
        <!--          </div>-->
        <!--        </el-card>-->
      </div>
    </div>
    <!-- <el-button type="primary" :loading="loginLoading" @click="onLogin">登录</el-button> -->
    <!-- <el-button type="primary" :loading="startPlayLoading" @click="clickStartRealPlay" style="margin-left:102px">开始预览</el-button>
    <el-button type="primary" @click="clickStopRealPlay">停止预览</el-button>
    <el-button type="primary" @click="onLogout">退出</el-button> -->
  </div>
</template>
<script>
import {WebVideoCtrl} from '../../../../public/webVideoCtrl'
import '../../../assets/icons/icon1/iconfont.css'

export default {
  data() {
    return {
      hkvInfo: {
        ip: '192.168.1.64', // 海康威视摄像头/硬盘录像机的ip地址
        port: '80', // 海康威视摄像头/硬盘录像机的端口
        username: 'admin', // 海康威视摄像头/硬盘录像机的用户名
        password: 'video666', // 海康威视摄像头/硬盘录像机的密码
        channels: []// 海康威视摄像头/硬盘录像机的通道
      },
      mySelectWnd: 0, // 当前选中的窗口
      g_bPTZAuto: false,
      iProtocol: 1,
      loginLoading: false,
      startPlayLoading: false,
      iStreamType: 1,
      bZeroChannel: false,
      iRtspPort: 0,
      snapPath: '',
      pictures_path: [],
      listLoading: true,
      audioLoading: true,
      selectedDevice: {},
      channels:0,
      previewPicPath:""
    }
  },
  created: function() {
    // console.log(this.$store.getters.id)
  },
  mounted: function() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    let ie=userAgent.indexOf("Trident") > -1//是否是ie内核
    // alert(!ie);
    if(!ie){
      alert("监控视频显示需将浏览器切换到兼容模式！")
    }
    this.videoInitPlugin() // 初始化video界面
    //处理ie不是兼容模式
    this.onLogin()
    this.clickStartRealPlay(this.channels)

  },

  destroyed: function() {
    this.clickStopRealPlay()
    this.onLogout()
  },
  methods: {
    // 获取图片
    // click_play(index){
    //   if(this.channels != index){
    //     this.channels = index
    //     this.clickStartRealPlay(this.channels)
    //   }
    //   // console.log(111);
    //   console.log(index);
    // },
    // printChange(key1, key2) {
    //   // key1是目标图片的索引值
    //   // key2是原来原配的索引值
    //   // console.log(key1 + "....." + key2);
    //   this.selectedDevice = this.pictures_path[key1]
    // },
    onLogin() {
      var that = this
      console.log(that);
      that.loginLoading = true
      // 登录设备
      WebVideoCtrl.I_Login(that.hkvInfo.ip, that.iProtocol, that.hkvInfo.port, that.hkvInfo.username, that.hkvInfo.password, {
        async: false,
        success: function(xmlDoc) {
          console.log('xmlDoc2', xmlDoc);//不能删除
          console.log('登录成功')
          // TODO 获取通道信息
          that.getChannelInfo()
          that.getDevicePort(that.hkvInfo.ip + '_' + that.hkvInfo.port)
          that.loginLoading = false
          // that.$message({
          //   showClose: true,
          //   message: '登录成功',
          //   type: 'success',
          // })
        },
        error: function() {
          that.loginLoading = false
          // that.$message({
          //   showClose: true,
          //   message: '登录失败',
          //   type: 'error'
          // })
        }
      })
    },
    onLogout() {
      this.hkvInfo.channels = []
      var szDeviceIdentify = this.hkvInfo.ip + '_' + this.hkvInfo.port
      var iRet = WebVideoCtrl.I_Logout(szDeviceIdentify)
      if (iRet == 0) {
        // this.$message({
        //   showClose: true,
        //   message: '退出成功',
        //   type: 'success'
        // })
      } else {
        // this.$message({
        //   showClose: true,
        //   message: '退出失败',
        //   type: 'error'
        // })
      }
    },
    clickStartRealPlay(channels) {
      // 开始预览
      var that = this
      that.startPlayLoading = true
      var szDeviceIdentify = that.hkvInfo.ip + '_' + that.hkvInfo.port
      var j = that.hkvInfo.channels.length > 4 ? 4 : that.hkvInfo.channels.length
      var oWndInfo = WebVideoCtrl.I_GetWindowStatus(this.mySelectWnd)
      console.log(oWndInfo);
      if (oWndInfo !== null) {// 已经在播放了，先停止
        // for (var i = 0; i < j; i++) {
        console.log(channels);
        // setTimeout(that.startRealPlay(szDeviceIdentify, 0, that.hkvInfo.channels[channels]), 500)
        WebVideoCtrl.I_Stop({
          success: function () {
            setTimeout(that.startRealPlay(szDeviceIdentify, 0, that.hkvInfo.channels[channels]), 500)
          }
        });
      } else {
        console.log(that.hkvInfo.channels[0]);
        setTimeout(that.startRealPlay(szDeviceIdentify, 0, that.hkvInfo.channels[channels]), 500)
      }
      console.log(222);
      that.startPlayLoading = false
    },
    videoInitPlugin: function() {
      var iRet = WebVideoCtrl.I_CheckPluginInstall()
      if (iRet === -1) {
        alert('您还未安装过插件，双击开发包目录里的WebComponentsKit.exe安装')
        return
      }
      this.initPlugin()
    },
    initPlugin: function() {
      var that = this
      this.$nextTick(()=>{
        console.log('left',this.$refs.box.clientWidth)
      })
      var width=this.$refs.box.clientWidth
      var height=this.$refs.box.clientHeight
      WebVideoCtrl.I_InitPlugin(width, height, {
        bWndFull: true, // 是否支持单窗口双击全屏，默I_CheckPluginInstall
        iWndowType: 1,//设置窗口分割数量
        // myCbSelWnd: function(xmlStr) { // 自己新增的方法
        //   var jsonObj = that.$x2js.xml2js(xmlStr)
        //   that.mySelectWnd = jsonObj.RealPlayInfo.SelectWnd
        //   var szInfo = '当前选择的窗口编号：' + that.mySelectWnd
        //   console.log(szInfo)
        // },
        cbInitPluginComplete: function() {
          WebVideoCtrl.I_InsertOBJECTPlugin('divPlugin')
          // 检查插件是否最新
          if (WebVideoCtrl.I_CheckPluginVersion() === -1) {
            alert('检测到新的插件版本，双击开发包目录里的WebComponentsKit.exe升级！')
            return
          }
        }
      })
    },
    getDevicePort: function(szDeviceIdentify) {
      var oPort = WebVideoCtrl.I_GetDevicePort(szDeviceIdentify)
      this.iRtspPort = oPort.iRtspPort
    },
    startRealPlay: function(szDeviceIdentify, iWndIndex, iChannelID) {
      var that = this
      console.log(iChannelID)
      WebVideoCtrl.I_StartRealPlay(szDeviceIdentify, {
        iRtspPort: that.iRtspPort,
        iWndIndex: iWndIndex,
        iStreamType: 1,
        iChannelID: iChannelID,
        bZeroChannel: that.bZeroChannel,
        // success: function() {
        //   that.$alert('', {
        //     showClose: true,
        //     title: '成功',
        //     message: '开始预览通道' + iChannelID + '成功',
        //     type: 'success',
        //   })
        // },
        error: function(status, xmlDoc2) {
          console.log(xmlDoc2)// 不能删除
          // that.$alert('', {
          //   title: '失败',
          //   message: '开始预览通道' + iChannelID + '失败',
          //   type: 'error'
          // })
          if (status === 403) {
            console.log('szInfo 设备不支持Websocket取流！')
          } else {
            console.log('开始预览失败 ', status, xmlDoc2)
          }
        }
      })
    },
    clickStopRealPlay: function() {
      var j = this.hkvInfo.channels.length > 4 ? 4 : this.hkvInfo.channels.length
      for (var i = 0; i < j; i++) {
        setTimeout(this.stopRealPlay(i), 1000)
      }
    },
    stopRealPlay: function(iWndIndex) {
      var that = this
      WebVideoCtrl.I_Stop({
        iWndIndex: iWndIndex,
        // success: function() {
        //   that.$message('', {
        //     title: '成功',
        //     message: '停止预览窗口' + iWndIndex + '成功',
        //     type: 'success'
        //   })
        // },
        // error: function() {
        //   that.$message('', {
        //     title: '失败',
        //     message: '停止预览窗口' + iWndIndex + '失败',
        //     type: 'error'
        //   })
        // }
      })
    },
    // 获取通道，实际上可以根据自己的项目，获取数字通道，模拟通道，零通道中的一个或多个，不用全部获取（提高效率）
    getChannelInfo: function() {
      var that = this
      var szDeviceIdentify = this.hkvInfo.ip + '_' + this.hkvInfo.port
      that.hkvInfo.channels=[]
      // debugger
      // 数字通道
      // WebVideoCtrl.I_GetDigitalChannelInfo(szDeviceIdentify, {
      //     async: false,
      //     mysuccess: function(xmlStr) {
      //       console.log('mysuccess I_GetDigitalChannelInfo: ', xmlStr)
      //       var jsonObj = that.$x2js.xml2js(xmlStr)
      //       var list = jsonObj.InputProxyChannelStatusList.InputProxyChannelStatus
      //       for (var x = 0; x < list.length; x++) {
      //         that.hkvInfo.channels.push(list[x].id)
      //       }
      //       console.log(that.hkvInfo.channels);
      //     },
      //     success: function(xmlDoc) {
      //     },
      //     error: function(status, xmlDoc) {
      //       console.log('获取数字通道失败')
      //       // console.log(xmlDoc)
      //     }
      //   }
      // )
      // TODO 模拟通道
      // 模拟通道
      WebVideoCtrl.I_GetAnalogChannelInfo(szDeviceIdentify, {
        async: false,
        // success: function(xmlStr) {
        //   var jsonObj = that.$(x2js).xml2js(xmlStr)
        //   console.log('模拟通道 my success', xmlStr)
        //   var list = jsonObj.VideoInputChannelList;
        //   for (var x = 0; x < list.length; x++) {
        //     that.hkvInfo.channels.push(list[x].VideoInputChannel.id);
        //   }
        //   var id = jsonObj.VideoInputChannelList.VideoInputChannel.id
        //   that.hkvInfo.channels.push(id)
        // },
        success: function(xmlDoc) {
          let oChannels = $(xmlDoc).find("VideoInputChannel");
          $.each(oChannels, function (i) {
            let id = $(this).find("id").eq(0).text()
            let name = $(this).find("name").eq(0).text()
            console.log(id)
            if ("" == name) {
              name = "Camera " + (i < 9 ? "0" + (i + 1) : (i + 1));
            }
            that.hkvInfo.channels.push({
              id:id,
              name:name
            })
          });
          console.log('模拟通道success', xmlDoc)
        },
        error: function(status, xmlDoc) {
          console.log('模拟通道error', xmlDoc)
        }
      })
      // TODO 零通道
    },
    mouseDownPTZControl: function(iPTZIndex) {
      var oWndInfo = WebVideoCtrl.I_GetWindowStatus(this.mySelectWnd)
      console.log(oWndInfo)
      console.log(iPTZIndex)
      var iPTZSpeed=4
      if (oWndInfo !== null) {
        if (iPTZIndex === 9 && this.g_bPTZAuto) {
          iPTZSpeed = 0
        } else {
          this.g_bPTZAuto = false
        }

        WebVideoCtrl.I_PTZControl(iPTZIndex, false, {
          iPTZSpeed: iPTZSpeed,
          mysuccess: function(xmlStr) {
            console.log('I_PTZControl', xmlStr)
            if (iPTZIndex === 9 && this.g_bPTZAuto) {
              console.log(oWndInfo.szDeviceIdentify + ' 停止云台成功！mouseDown')
            } else {
              console.log(oWndInfo.szDeviceIdentify + ' 开启云台成功！mouseDown')
            }
            if (iPTZIndex === 9) {
              this.g_bPTZAuto = !this.g_bPTZAuto
            }
          },
          error: function(status, xmlDoc) {
            console.log(oWndInfo.szDeviceIdentify + ' 开启云台失败！mouseDown', status, xmlDoc)
          }
        })
      }
    },
    mouseUpPTZControl: function() {
      var oWndInfo = WebVideoCtrl.I_GetWindowStatus(this.mySelectWnd)
      if (oWndInfo !== null) {
        WebVideoCtrl.I_PTZControl(1, true, {
          mysuccess: function(xmlStr) {
            console.log(oWndInfo.szDeviceIdentify + ' 停止云台成功！mouseUp', xmlStr)
          },
          error: function(status, xmlDoc) {
            console.log(oWndInfo.szDeviceIdentify + ' 停止云台失败！mouseUp', status, xmlDoc)
          }
        })
      }
    },

    full() {
      WebVideoCtrl.I_FullScreen(true)
    },
    startElectron() {
      let number = WebVideoCtrl.I_EnableEZoom()
      if (number == 0) {
        alert('开启电子放大成功')
      } else {
        alert('开启电子放大失败')
      }
    },
    closeElectron() {
      let number = WebVideoCtrl.I_DisableEZoom()
      if (number == 0) {
        alert('关闭电子放大成功')
      } else {
        alert('关闭电子放大失败')
      }
    },
    clickGetDeviceInfo() {
      var szDeviceIdentify = this.hkvInfo.ip + '_' + this.hkvInfo.port

      if (null == szDeviceIdentify) {
        return;
      }

      WebVideoCtrl.I_GetDeviceInfo(szDeviceIdentify, {
        mysuccess: function (xmlDoc) {
          var arrStr = [];
          arrStr.push("设备名称：" + $(xmlDoc).find("deviceName").eq(0).text() + "\r\n");
          arrStr.push("设备ID：" + $(xmlDoc).find("deviceID").eq(0).text() + "\r\n");
          arrStr.push("型号：" + $(xmlDoc).find("model").eq(0).text() + "\r\n");
          arrStr.push("设备序列号：" + $(xmlDoc).find("serialNumber").eq(0).text() + "\r\n");
          arrStr.push("MAC地址：" + $(xmlDoc).find("macAddress").eq(0).text() + "\r\n");
          arrStr.push("主控版本：" + $(xmlDoc).find("firmwareVersion").eq(0).text() + " " + $(xmlDoc).find("firmwareReleasedDate").eq(0).text() + "\r\n");
          arrStr.push("编码版本：" + $(xmlDoc).find("encoderVersion").eq(0).text() + " " + $(xmlDoc).find("encoderReleasedDate").eq(0).text() + "\r\n");
          console.log(szDeviceIdentify + " 获取设备信息成功！");
          console.log(arrStr);
          alert(arrStr.join(""));
        },
        error: function (status, xmlDoc) {
          console.log(szDeviceIdentify + " 获取设备信息失败！", status, xmlDoc);
        }
      });
    },

    close3D() {
      let number = WebVideoCtrl.I_Disable3DZoom()
      if (number == 0) {
        alert('关闭3D放大成功')
      } else {
        alert('关闭3D放大失败')
      }
    },
    getLocalCfg() {
      var xml = WebVideoCtrl.I_GetLocalCfg()
      console.log(xml);
      var jsonObj = this.$x2js.xml2js(xml)
      console.log(jsonObj)
    },

    PTZZoomIn() {
      var oWndInfo = WebVideoCtrl.I_GetWindowStatus(this.mySelectWnd);

      if (oWndInfo != null) {
        WebVideoCtrl.I_PTZControl(10, false, {
          iWndIndex: this.mySelectWnd,
          success: function (xmlDoc) {
            console.log(oWndInfo.szDeviceIdentify + " 调焦+成功！");
          },
          error: function (status, xmlDoc) {
            console.log(oWndInfo.szDeviceIdentify + "  调焦+失败！", status, xmlDoc);
          }
        });
      }
    },
    PTZZoomout() {
      var oWndInfo = WebVideoCtrl.I_GetWindowStatus(this.mySelectWnd);

      if (oWndInfo != null) {
        WebVideoCtrl.I_PTZControl(11, false, {
          iWndIndex: this.mySelectWnd,
          success: function (xmlDoc) {
            console.log(oWndInfo.szDeviceIdentify + " 调焦-成功！");
          },
          error: function (status, xmlDoc) {
            console.log(oWndInfo.szDeviceIdentify + "  调焦-失败！", status, xmlDoc);
          }
        });
      }
    },
    PTZZoomStop() {
      var oWndInfo = WebVideoCtrl.I_GetWindowStatus(this.mySelectWnd);

      if (oWndInfo != null) {
        WebVideoCtrl.I_PTZControl(11, true, {
          iWndIndex: this.mySelectWnd,
          success: function (xmlDoc) {
            console.log(oWndInfo.szDeviceIdentify + " 调焦停止成功！");
          },
          error: function (status, xmlDoc) {
            console.log(oWndInfo.szDeviceIdentify + "  调焦停止失败！", status, xmlDoc);
          }
        });
      }
    },
    capture() { // 抓图
      var xmlDoc = WebVideoCtrl.I_GetLocalCfg();
      var oWndInfo = WebVideoCtrl.I_GetWindowStatus(this.mySelectWnd)
      console.log(oWndInfo);
      console.log(xmlDoc);
      var szChannelID = this.channels;
      var szPicName = oWndInfo.szDeviceIdentify + "_" + szChannelID + "_" + new Date().getTime() + ".jpg";
      // szPicName += ("0" === szCaptureFileFormat) ? ".jpg": ".bmp";
      var number = WebVideoCtrl.I_CapturePic(szPicName, {
        iWndowType: this.mySelectWnd,
        bDateDir: true
      })
      if (number == 0) {
        alert('抓图成功')
      } else {
        alert('抓图失败')
      }
    },
    clickOpenFileDlg(id, iType) {
      var szDirPath = WebVideoCtrl.I_OpenFileDlg(iType);
      // 返回选择的文件夹的路径
      if (szDirPath != -1 && szDirPath != "" && szDirPath != null) {
        // $("#" + id).val(szDirPath);
        console.log(szDirPath);
        this.previewPicPath = szDirPath
      }
    },
// 获取本地参数
    clickGetLocalCfg() {
      var xmlDoc = WebVideoCtrl.I_GetLocalCfg();
      console.log(111);
      console.log(xmlDoc);
      if (xmlDoc != null) {
        // $("#previewPicPath").val($(xmlDoc).find("CapturePath").eq(0).text());
        this.clickSetLocalCfg()
        console.log("本地配置获取成功！");
      } else {
        console.log("本地配置获取失败！");
      }
    },
    clickSetLocalCfg() {
      var szLocalCofing = `<CapturePath>${this.snapPath}</CapturePath> `
      var number = WebVideoCtrl.I_SetLocalCfg(szLocalCofing)
      if (number == 0) {
        alert('设置成功')
      } else {
        // alert('设置失败')
      }
    },
    handleGetPath(path) {
      /*
                * 该方法只支持IE.
                * 语法：strDir=Shell.BrowseForFolder(Hwnd,Title,Options,[RootFolder])
                * 参数：Hwnd：包含对话框的窗体句柄（handle），一般设置为0
                * Title：将在对话框中显示的说明，为字符串
                * Options：使用对话框的特殊方式，为长整数，一般设置为0
                * RootFolder：（可选的），用来设置浏览的最顶层文件夹，缺省时为“桌面”，可以将其设置为一个路径或“特殊文件夹常数”
                * */
      try {
        let filePath
        const objSrc = new ActiveXObject('Shell.Application').BrowseForFolder(0, '请选择保存路径', 0, '')
        if (objSrc != null) {
          filePath = objSrc.Items().Item().Path
          if (filePath.charAt(0) == ':') {
            alert('请选择文件夹.')
            return false
          }
          this.snapPath = filePath
        }
      } catch (e) {
        alert(e + '请设置IE，Internet选项－安全－自定义级别－将ActiveX控件和插件前3个选项设置为启用，然后再尝试。')
        return false
      }
    },
    clickOpenSound(){
      var oWndInfo = WebVideoCtrl.I_GetWindowStatus(this.mySelectWnd),
          szInfo = "";

      if (oWndInfo != null) {
        var allWndInfo = WebVideoCtrl.I_GetWindowStatus();
        // 循环遍历所有窗口，如果有窗口打开了声音，先关闭
        for (var i = 0, iLen = allWndInfo.length; i < iLen; i++) {
          oWndInfo = allWndInfo[i];
          if (oWndInfo.bSound) {
            WebVideoCtrl.I_CloseSound(oWndInfo.iIndex);
            break;
          }
        }
        var iRet = WebVideoCtrl.I_OpenSound();
        if (0 == iRet) {
          szInfo = "打开声音成功！";
          alert('打开声音成功')
        } else {
          szInfo = "打开声音失败！";
          alert('打开声音失败')
        }
        console.log(oWndInfo.szDeviceIdentify + " " + szInfo);
      }
    },
    clickCloseSound(){
      var oWndInfo = WebVideoCtrl.I_GetWindowStatus(this.mySelectWnd),
          szInfo = "";
      if (oWndInfo != null) {
        var iRet = WebVideoCtrl.I_CloseSound();
        if (0 == iRet) {
          szInfo = "关闭声音成功！";
          alert('关闭声音成功')
        } else {
          szInfo = "关闭声音失败！";
          alert('关闭声音失败')
        }
        console.log(oWndInfo.szDeviceIdentify + " " + szInfo);
      }
    }
  }
}
</script>

<style scoped>
.hkv{
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.left{
  flex: 1.9;
}
.left .topall{
  width:100%;
  text-align: center;
  /* margin-left: auto;
  margin-right: auto; */
}
.left .topall .topCarousel{
  width: 85%;
  /* width: 1240px; */
  text-align: center;


  position: relative;
  margin-left: auto;
  margin-right: auto;
}
.right{
  /* flex: 0.7; */
  flex: 0.7;
}
.el-carousel__item h4 {
  color: #e6e9ec;
  font-size: 14px;
  opacity: 0.75;
  /* line-height: 300px; */
  margin: 0;
}

.el-carousel__item{
  /* width: 450px; */
  justify-content: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
.top{
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  font-size: 17px;
  border: 1px ;
}
.carousel{font-size:60px;font-weight:normal;color:gray;}
.carousel:hover{color:black;cursor:pointer;}
.menu{
  margin-top:10px;
}
.pic{
  width: 97%;
  margin-left: 1% ;
  margin-right: 1%;
}
.plugin{
  text-align: center;
  width: 60%;
  /*margin: 0 auto;*/
  margin-top: 10%;
  margin-left: 10%;
  /* margin-left:7%; */
  /* margin-right:3% */
}
.el-carousel__item .play{
  /* position: relative; */
  width: 100%;
  height: 100%;
}
.el-carousel__item .play image{
  /* position: relative; */
  /* width: 600px; */
  width: 100%;
}
.el-carousel__item .play h4{
  position: absolute;
  bottom: 20px;
  left: 45%;
}
.el-carousel__item .play::before{
  content: '';
  /* 隐藏遮罩层 */
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /*background: rgba(0, 0, 0, .4) url(images/play.png) no-repeat center;*/
  background-size: 22% 40%;
}
.el-carousel__item .play:hover::before{
  /* background-image: url("images/play.png"); */
  display: block;
}
.el-input__inner{
  border: 0px;
}
</style>

