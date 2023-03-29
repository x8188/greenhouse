<template>
  <div class="app-container home">
    <el-row :gutter="20">
      <el-col :sm="24" :lg="24">
        <blockquote  style="font-size: 24px">
          <img src="@/assets/logo/logo.png" style="width:50px;height:50px" alt="">
          <div>欢迎来到表型管理系统！</div>
          <br />
        </blockquote>
        <hr />
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :sm="24" :lg="12" style="padding-left: 20px">
       
        <p>
          <!--
          <el-button
            type="primary"
            icon="Cloudy"
            plain
            @click="goTarget('https://gitee.com/y_project/RuoYi-Vue')"
            >访问码云</el-button
          >

          -->
          <el-button
            icon="HomeFilled"
            plain
            >主页内容</el-button
          >
        </p>
      </el-col>

      <!-- <el-col :sm="24" :lg="12" style="padding-left: 50px">
        <el-row>
         
        </el-row>
      </el-col>
    </el-row>
    <el-divider />
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="12" :lg="8">
        

          

            
      </el-col> -->
      
    </el-row>

    <div class="projectcard_bigContainer">
      <router-link to="/identifypre/plug" className="projectcard_container">
        <div className="project_imgbox">
            <img src="@/assets/home/1.png" />
            <div className="project_text">
                <h4>穴盘检测</h4>
                <span>苗盘生长点检测</span>
                <span>苗盘穴孔检测</span>
                <span>苗盘超绿检测</span>
            </div>
        </div>
      </router-link>
      <router-link to="/identifypre/blade" className="projectcard_container">
        <div className="project_imgbox">
            <img src="@/assets/home/2.png" />
            <div className="project_text">
                <h4>叶片检测</h4>
                <span>叶片检测</span>
            </div>
        </div>
      </router-link>
      <router-link to="/identifypre/growthpre" className="projectcard_container">
        <div className="project_imgbox">
            <img src="@/assets/home/3.png" />
            <div className="project_text">
                <h4>生长预测</h4>
            </div>
        </div>
      </router-link>

    </div>

  </div>
</template>

<script setup name="Index">
import useUserStore from '@/store/modules/user';
const user = useUserStore()
const version = ref('3.8.2')

function goTarget(url) {
  window.open(url, '__blank')
}
</script>

<style scoped lang="scss">


.app-container{
  background: linear-gradient(90.21deg, #eeeeee -5.91%, #c5ebc0 111.58%);
  opacity: 1;
}

.projectcard_bigContainer{
  display: flex;
}

.projectcard_container{
    margin: .5vw 1vw;
    width: 26vw;
}

.project_imgbox {
  width:380px;
  height: 300px;
    position: relative;
    border-radius: 20px;
    overflow: hidden;
    margin-bottom: 1vw;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}

.project_imgbox img{
   width: 100%;
   height: 100%;
}

.project_imgbox::before {
    content: "";
    background: linear-gradient(90.21deg, #a6b8c5 -5.91%, #4996a0 111.58%);
    opacity: 0.85;
    position: absolute;
    width: 100%;
    height: 0;
    transition: 0.4s ease-in-out;
}

.project_imgbox:hover::before {
    height: 100%;
}

.project_text {
    position: absolute;
    text-align: center;
    top: 65%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: 0.5s ease-in-out;
    opacity: 0;
    width: 100%;
    color: aliceblue;
}

.project_imgbox:hover .project_text {
    top: 50%;
    opacity: 1;
}

.project_text h4 {
    font-size: 2vw;
    font-weight: 700;
    letter-spacing: .1vw;
    line-height: 3vw;
}

.project_text span {
  display: flex;
  flex-direction: column;
    font-style: italic;
    font-weight: 400;
    font-size: 1vw;
    letter-spacing: .2px;
}

.home {
  blockquote {
    padding: 10px 20px;
    margin: 0 0 20px;
    font-size: 17.5px;
    border-left: 5px solid #eee;
  }
  hr {
    margin-top: 20px;
    margin-bottom: 20px;
    border: 0;
    border-top: 1px solid #eee;
  }
  .col-item {
    margin-bottom: 20px;
  }

  ul {
    padding: 0;
    margin: 0;
  }

  font-family: "open sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 13px;
  color: #676a6c;
  overflow-x: hidden;

  ul {
    list-style-type: none;
  }

  h4 {
    margin-top: 0px;
  }

  h2 {
    margin-top: 10px;
    font-size: 26px;
    font-weight: 100;
  }

  p {
    margin-top: 10px;

    b {
      font-weight: 700;
    }
  }

  .update-log {
    ol {
      display: block;
      list-style-type: decimal;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0;
      margin-inline-end: 0;
      padding-inline-start: 40px;
    }
  }
}
</style>

