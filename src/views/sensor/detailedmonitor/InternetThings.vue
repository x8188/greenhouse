<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <el-row class="tac">
          <el-col :span="24">
            <el-menu default-active="2" class="el-menu-vertical-demo" @select="handleMenuselect">
              <el-menu-item index="2">
                <el-icon><icon-menu /></el-icon>
                <span>智能灌溉</span>
              </el-menu-item>
              <el-menu-item index="3">
                <el-icon><document /></el-icon>
                <span>田间监控</span>
              </el-menu-item>
              <el-menu-item index="4">
                <el-icon><setting /></el-icon>
                <span>气象监测</span>
                <div></div>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-main>
        <!-- <component
          :is="selectedMenuComponent"
        ></component> -->
        <div v-if="selectedMenu === '4'">
          <meteor></meteor>
        </div>
      </el-main>
    </el-container>
  </div>
</template> 
<script lang="ts" >
import { useRouter } from "vue-router"; 
import { ref } from "vue";

// import {
//   Document,
//   Menu as IconMenu,
//   Location,
//   Setting,
//   SetUp,
// } from "@element-plus/icons-vue";

export default {
  data() {
    return {
      // index: 0,
      selectedMenu:''
    };
  },
  methods: {
    handleMenuselect(index) {
      this.selectedMenu = index;
    },
    // handleWeatherMonitoringChange() {
    //   this.showContent = true; // 或者根据需要设置为false
    // },
  },
  computed: {
  
    // selectedMenuComponent() {
    //   if (this.index == 4) {
    //     return "meteor";
    //   }
    //   return "";
    //   // 其他目录项对应的组件
    // },
  },
  components: {
 
  },

  setup() {
    // const handleMenuClick = (index) => {
    //   index;
    // };

    const handleOpen = (key: string, keyPath: string[]) => {
      console.log(key, keyPath);
    };
    const handleClose = (key: string, keyPath: string[]) => {
      console.log(key, keyPath);
    };

    // return {
    //   handleMenuClick,
    // };
  },
};
</script>
<style scoped>
.tac {
  height: 860px;
}
</style>



 

