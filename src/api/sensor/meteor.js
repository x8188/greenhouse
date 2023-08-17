import request from '@/utils/request'
// 详细数据echarts展示
export function getChartData(){
    return request({
      url: '/greenhouse/data/all',
      method: 'get',
      params: {
        
      },
      timeout: 1000*600000
    })
  }
  export function getHunidityData(){
    return request({
      url: '/greenhouse/data/ambientHumidity',
      method: 'get',
      params: {
        
      },
      timeout: 1000*600000
    })
  }
  export function getTempData(){
    return request({
      url: '/greenhouse/data/ambientTemperature',
      method: 'get',
      params: {
        
      },
      timeout: 1000*600000
    })
  }
  export function getCoData(){
    return request({
      url: '/greenhouse/data/CO2',
      method: 'get',
      params: {
        
      },
      timeout: 1000*600000
    })
  }
  export function getLightData(){
    return request({
      url: '/greenhouse/data/lightIntensity',
      method: 'get',
      params: {
        
      },
      timeout: 1000*600000
    })
  }
  
  