<template>
  <el-table :data="tableData" stripe :max-height="maxCustomH" :flexible="true">
    <el-table-column v-for="item in tableProps" :prop="item" :label="item" min-width="120" :key="item" />
  </el-table>
</template>

<script setup>
import { ref,watchEffect } from 'vue';
import { getJsonByCSV,jsonToTable } from '@/utils/tree';

// const url = 'src/assets/2022-5-5-16.00.csv';
const props = defineProps({
  url: {
    type: String,
    default: ''
  },
  maxCustomH: {
    type: String,
    default: '85vh'
  }
})
const emits = defineEmits(['getDates'])

const tableProps = ref([]);
const tableData = ref([]);

watchEffect(() => {
  if (props.url) {
    getJsonByCSV(props.url).then(result => {
      console.log(result,'kkk');
      tableProps.value = result[0]
      tableData.value = jsonToTable(result)
      emits('getDates', result[0].slice(1))
    })
  }
})
</script>

<style scoped>
</style>
