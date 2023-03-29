<template>
  <body>
    <el-container>
      <el-main>
        <el-card class="card-container">
          <div class="big-wrapper">
            <!-- 第一部分 -->
            <div class="card-title">
              <div class="card-title-line"></div>
              <div class="card-title-content">通过Key值选择图片列表</div>
            </div>
            <el-card class="nodeBox">
              <p>选择Key值</p>
              <el-cascader
                v-model="value"
                :options="selectOptions"
                :props="props"
                @change="handleChangeCascader"
                class="node-cascader"
              />
              <el-button>searching……</el-button>
            </el-card>
          </div>
        </el-card>
      </el-main>
    </el-container>
  </body>
</template>

<script setup name="species">
import { reactive, ref, onMounted } from "vue";
import { getTree } from "@/api/tree.js";
/* 选择框数据 */
const selectOptions = ref([
{
    value: "guide",
    label: "Guide",
    children: [
      {
        value: "disciplines",
        label: "Disciplines",
        children: [
          {
            value: "consistency",
            label: "Consistency",
          },
          {
            value: "feedback",
            label: "Feedback",
          },
          {
            value: "efficiency",
            label: "Efficiency",
          },
          {
            value: "controllability",
            label: "Controllability",
          },
        ],
      },
      {
        value: "navigation",
        label: "Navigation",
        children: [
          {
            value: "side nav",
            label: "Side Navigation",
          },
          {
            value: "top nav",
            label: "Top Navigation",
          },
        ],
      },
    ],
  }, 
]);

const routesData = ref([

]);

const treeType = ref(1); // 树的种类

const getTreeList = () =>{
    getTree(treeType.value, 0, 1).then((res) => {
        routesData.value = res.data.children; 
        //过滤routesData数组
        console.log(routesData.value[0].length,'999');
        routesData.value.map((item) =>{
            
        })
  });
}

onMounted(() =>{
    getTreeList();
})
</script>

<style lang="less" scoped>
/* 统一按钮样式 */
:deep(.el-button) {
  background: rgb(85, 123, 116);
  color: #fff;
}

.card-container {
  width: 95%;
  border-radius: 50px;
  margin: auto;

  :deep(.el-card__body) {
    padding: 15px 20px 20px 20px !important;
  }

  .big-wrapper {
    width: 95%;
    margin: auto;

    .card-title {
      width: 30%;
      color: rgb(64, 64, 112);
      border-radius: 10px;
      height: 40px;
      display: flex;

      .card-title-line {
        width: 2%;
        height: 40px;
        background-color: rgb(154, 190, 175);
      }

      .card-title-content {
        float: left;
        margin-left: 20px;
        font-size: 16px;
        line-height: 40px;
      }
    }

    /* 第一部分 */
    .nodeBox {
      margin: 10px;
      margin-bottom: 20px;
      border-radius: 20px;
      :deep(.el-cascader) {
        margin-right: 20px;
      }
    }
  }
}
</style>