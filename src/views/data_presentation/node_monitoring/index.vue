<template>
  <body>
    <el-container>
      <el-main>
        <el-card class="card-container">
          <div class="big-wrapper" style="margin-top: 10px">
            <!-- 第一部分搜索框 -->
            <div class="card-title">
              <div class="card-title-line"></div>
              <div class="card-title-content">通过节点名称搜索查询</div>
            </div>
            <el-card class="SearchBox-card">
              <div class="searchbox">
                <el-input
                  prefix-icon="el-icon-search"
                  v-model="keyword"
                  @click="searchData"
                  clearable
                  placeholder="搜索节点名称"
                  class="searchtable"
                  style="width: 75%"
                >
                </el-input>
                <el-button style="margin-bottom: 10px; width: 15%"
                  >searching……</el-button
                >
              </div>
              <div class="input-title">
                e.g. <span>种类一</span> or <span>种类二</span>or
                <span>种类三</span>
              </div>
            </el-card>
            <div class="card-title">
              <div class="card-title-line"></div>
              <div class="card-title-content">通过选择具体节点查询</div>
            </div>
            <el-card class="SearchBox-card nodeBox">
              <p>选择节点</p>
              <el-cascader
                v-model="value"
                :options="options"
                :props="props"
                @change="handleChangeCascader"
                class="node-cascader"
              />
              <el-button>searching……</el-button>
            </el-card>
          </div>
        </el-card>
        <!--可视化结果-->
        <div class="title">
          <div class="node-title">
            <div class="node-title-content">该节点相关数据</div>
          </div>
        </div>
        <el-card class="card-container" style="margin-top: 10px">
          <div class="big-wrappe node-list" style="margin-top: 10px">
            <div class="node-form">
              <el-form
                :label-position="left"
                label-width="100px"
                :model="formLabelAlign"
                style="max-width: 460px"
              >
                <el-form-item label="节点名称">
                  <el-input disabled v-model="formLabelAlign.name" />
                </el-form-item>
                <el-form-item label="节点创建人">
                  <el-input disabled v-model="formLabelAlign.user" />
                </el-form-item>
                <el-form-item label="节点创建时间">
                  <el-input disabled v-model="formLabelAlign.time" />
                </el-form-item>
                <el-form-item label="父根节点">
                  <el-input disabled v-model="formLabelAlign.father" />
                </el-form-item>
                <el-form-item label="子节点个数">
                  <el-input disabled v-model="formLabelAlign.number" />
                </el-form-item>
                <el-form-item label="节点内图片/表格数">
                  <el-input disabled v-model="formLabelAlign.dataNum" />
                </el-form-item>
              </el-form>
            </div>
            <div class="node-chart">
              <div id="pieChart"></div>
            </div>
          </div>
        </el-card>

        <!-- 节点操控数据 -->
        <div class="title">
          <div class="node-title">
            <div class="node-title-content">节点操控日志</div>
          </div>
          <el-card class="card-container">
            <div class="big-wrappe" style="margin-top: 10px">
              <div id="lineChart"></div>
            </div>
          </el-card>
        </div>
      </el-main>
    </el-container>
  </body>
</template>

<script setup>
import * as echarts from "echarts";
import { reactive, ref, onMounted } from "vue";

/* 节点信息表单  */
const formLabelAlign = reactive({
  name: "种类一",
  user: "admin",
  time: "2023-3-23",
  father: "种苗品种",
  number: 10,
  dataNum: 10,
});

const keyword = ref('')
const value = ref([]);

const handleChangeCascader = (value) => {
  console.log(value);
};

/* 饼图数据 */
const pieOption = {
  title: {
    text: "子节点数据数",
    left: "center",
  },
  tooltip: {
    trigger: "item",
  },
  legend: {
    // 图例
    orient: "vertical",
    left: "left",
  },
  series: [
    {
      type: "pie", // type设置为饼图
      radius: "50%",
      data: [
        { value: 1048, name: "节点一" },
        { value: 735, name: "节点二" },
        { value: 580, name: "节点三" },
        { value: 484, name: "节点四" },
        { value: 300, name: "节点五" },
      ],
      label: {
        show: true,
        formatter: "{c}", // b代表名称，c代表对应值，d代表百分比
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,

          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
    },
  ],
};

/* 折线图数据 */
const data2 = [
  ["2000-06-05", 116],
  ["2000-06-06", 129],
  ["2000-06-07", 135],
  ["2000-06-08", 86],
  ["2000-06-09", 73],
  ["2000-06-10", 85],
  ["2000-06-11", 73],
  ["2000-06-12", 68],
  ["2000-06-13", 92],
  ["2000-06-14", 130],
  ["2000-06-15", 245],
  ["2000-06-16", 139],
  ["2000-06-17", 115],
  ["2000-06-18", 111],
  ["2000-06-19", 309],
  ["2000-06-20", 206],
  ["2000-06-21", 137],
  ["2000-06-22", 128],
  ["2000-06-23", 85],
  ["2000-06-24", 94],
  ["2000-06-25", 71],
  ["2000-06-26", 106],
  ["2000-06-27", 84],
  ["2000-06-28", 93],
  ["2000-06-29", 85],
  ["2000-06-30", 73],
  ["2000-07-01", 83],
  ["2000-07-02", 125],
  ["2000-07-03", 107],
  ["2000-07-04", 82],
  ["2000-07-05", 44],
  ["2000-07-06", 72],
  ["2000-07-07", 106],
  ["2000-07-08", 107],
  ["2000-07-09", 66],
  ["2000-07-10", 91],
  ["2000-07-11", 92],
  ["2000-07-12", 113],
  ["2000-07-13", 107],
  ["2000-07-14", 131],
  ["2000-07-15", 111],
  ["2000-07-16", 64],
  ["2000-07-17", 69],
  ["2000-07-18", 88],
  ["2000-07-19", 77],
  ["2000-07-20", 83],
  ["2000-07-21", 111],
  ["2000-07-22", 57],
  ["2000-07-23", 55],
  ["2000-07-24", 60],
];

const dateList = data2.map(function (item) {
  return item[0];
});
const valueList = data2.map(function (item) {
  return item[1];
});

const lineOption = {
  visualMap: [
    {
      show: false,
      type: "continuous",
      seriesIndex: 0,
      min: 0,
      max: 400,
    },
  ],
  title: [
    {
      left: "center",
      text: "节点图片添加日志",
    },
  ],
  tooltip: {
    trigger: "axis",
  },
  xAxis: [
    {
      data: dateList,
    },
  ],
  yAxis: [{}],
  series: [
    {
      type: "line",
      showSymbol: false,
      data: valueList,
    },
  ],
};

/* 选择框数据 */
const options = [
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
  {
    value: "component",
    label: "Component",
    children: [
      {
        value: "basic",
        label: "Basic",
        children: [
          {
            value: "layout",
            label: "Layout",
          },
          {
            value: "color",
            label: "Color",
          },
          {
            value: "typography",
            label: "Typography",
          },
          {
            value: "icon",
            label: "Icon",
          },
          {
            value: "button",
            label: "Button",
          },
        ],
      },
      {
        value: "form",
        label: "Form",
        children: [
          {
            value: "radio",
            label: "Radio",
          },
          {
            value: "checkbox",
            label: "Checkbox",
          },
          {
            value: "input",
            label: "Input",
          },
          {
            value: "input-number",
            label: "InputNumber",
          },
          {
            value: "select",
            label: "Select",
          },
          {
            value: "cascader",
            label: "Cascader",
          },
          {
            value: "switch",
            label: "Switch",
          },
          {
            value: "slider",
            label: "Slider",
          },
          {
            value: "time-picker",
            label: "TimePicker",
          },
          {
            value: "date-picker",
            label: "DatePicker",
          },
          {
            value: "datetime-picker",
            label: "DateTimePicker",
          },
          {
            value: "upload",
            label: "Upload",
          },
          {
            value: "rate",
            label: "Rate",
          },
          {
            value: "form",
            label: "Form",
          },
        ],
      },
      {
        value: "data",
        label: "Data",
        children: [
          {
            value: "table",
            label: "Table",
          },
          {
            value: "tag",
            label: "Tag",
          },
          {
            value: "progress",
            label: "Progress",
          },
          {
            value: "tree",
            label: "Tree",
          },
          {
            value: "pagination",
            label: "Pagination",
          },
          {
            value: "badge",
            label: "Badge",
          },
        ],
      },
      {
        value: "notice",
        label: "Notice",
        children: [
          {
            value: "alert",
            label: "Alert",
          },
          {
            value: "loading",
            label: "Loading",
          },
          {
            value: "message",
            label: "Message",
          },
          {
            value: "message-box",
            label: "MessageBox",
          },
          {
            value: "notification",
            label: "Notification",
          },
        ],
      },
      {
        value: "navigation",
        label: "Navigation",
        children: [
          {
            value: "menu",
            label: "Menu",
          },
          {
            value: "tabs",
            label: "Tabs",
          },
          {
            value: "breadcrumb",
            label: "Breadcrumb",
          },
          {
            value: "dropdown",
            label: "Dropdown",
          },
          {
            value: "steps",
            label: "Steps",
          },
        ],
      },
      {
        value: "others",
        label: "Others",
        children: [
          {
            value: "dialog",
            label: "Dialog",
          },
          {
            value: "tooltip",
            label: "Tooltip",
          },
          {
            value: "popover",
            label: "Popover",
          },
          {
            value: "card",
            label: "Card",
          },
          {
            value: "carousel",
            label: "Carousel",
          },
          {
            value: "collapse",
            label: "Collapse",
          },
        ],
      },
    ],
  },
  {
    value: "resource",
    label: "Resource",
    children: [
      {
        value: "axure",
        label: "Axure Components",
      },
      {
        value: "sketch",
        label: "Sketch Templates",
      },
      {
        value: "docs",
        label: "Design Documentation",
      },
    ],
  },
];

/* 子节点数据数目饼图 */
onMounted(() => {
  initHistogram();
  initHistogram2();
});

/*饼图 */
function initHistogram() {
  let chartDoms = document.querySelector("#pieChart");
  let myChart = echarts.init(chartDoms);
  pieOption && myChart.setOption(pieOption);
}

/*折线图 */
function initHistogram2() {
  let chartDom2 = document.querySelector("#lineChart");
  let myChart2 = echarts.init(chartDom2);

  lineOption && myChart2.setOption(lineOption);
}
</script>

<style lang="less" scoped>
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
}

.big-wrapper {
  width: 95%;
  margin: auto;
}

.card-container .SearchBox-card {
  border-radius: 20px;
}

.searchtable {
  margin-bottom: 10px;
}

.SearchBox-card {
  margin: 10px;
  margin-bottom: 20px;
}

.searchbox {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.input-title {
  color: grey;
  font-size: 12px;
}

.input-title span {
  color: rgb(78, 151, 211);
}

/*card的title */
.card-title {
  width: 30%;
  color: rgb(64, 64, 112);
  border-radius: 10px;
  height: 40px;
  display: flex;
}
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

.nodeBox {
  :deep(.el-cascader) {
    margin-right: 20px;
  }
}

/* 所有标签 */
.title {
  width: 95%;
  margin: auto;
}
.node-title {
  background-color: rgb(154, 190, 175);
  color: #fff;
  height: 50px;
  width: 100%;
  border-radius: 10px;
  margin: 10px auto;
}
.node-title-content {
  float: left;
  margin-left: 20px;
  font-size: 16px;
  line-height: 50px;
}

/* 节点可视化部分内容 */
/* List of tree node */
.node-list {
  display: flex;
  justify-content: space-between;

  .node-form {
    width: 50%;
  }

  .node-chart {
    width: 50%;
  }
}

#pieChart {
  width: 100%;
  height: 300px;
  background: #fff;
}

#lineChart {
  width: 100%;
  height: 400px;
  background: #fff;
}
</style>