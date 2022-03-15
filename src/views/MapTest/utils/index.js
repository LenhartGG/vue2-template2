import { ARSCMapBox } from 'arscmapbox'
import vuex from '@/store/index'

var shiData = require('@/assets/testGeoData/Centroid_shi.json')
var xianData = require('@/assets/testGeoData/Centroid_xian.json')
var meiData = require('@/assets/testGeoData/税源信息.json')
var provinceCenter = require('@/assets/testGeoData/center.json')
var taxDataPolygon = require('@/json/tax/tax-data.json')
const countryTrend = require('@/json/tax/country-trend.json')
// var shanxishengTax = require('@/assets/dataRecord/山西省税收收入3.json')
// var neimengTax = require('@/assets/dataRecord/内蒙古税收收入3.json')
// 原始数据x/y是反的，这里过滤一下
meiData.forEach((item) => {
  var a = item.x
  item.x = item.y
  item.y = a
})

function getTaxDataOfPolygon (polygonJson, level, code) {
  const taxData = []
  polygonJson.features.forEach((item) => {
    var strCode = item.properties.adcode
    for (var i = 0; i < taxDataPolygon.length; i++) {
      if (strCode === taxDataPolygon[i].adcode) {
        taxData.push(taxDataPolygon[i])
        Object.assign(item.properties, taxDataPolygon[i])
      }
    }
  })
  vuex.dispatch('setTaxData', taxData)
  if (code === '100000') {
    vuex.dispatch('setTrendData', countryTrend)
  } else if (level === 'province') {
    const data = { ...countryTrend }

    const { y1, y2, y3 } = data
    const temp1 = []
    const temp2 = []
    const temp3 = []
    y1.forEach((item) => {
      temp1.push((parseFloat(item) * Math.random()).toFixed(2))
    })
    y2.forEach((item) => {
      temp2.push((parseFloat(item) * Math.random()).toFixed(2))
    })
    y3.forEach((item) => {
      temp3.push((parseFloat(item) * Math.random()).toFixed(2))
    })
    data.y1 = [...temp1]
    data.y2 = [...temp2]
    data.y3 = [...temp3]
    vuex.dispatch('setTrendData', data)
    //   // 山西省数据
    //   if (code === 140000 || code === '140000') {
    //     polygonJson.features.forEach(item => {
    //       var strCode = Number(item.properties.adcode)
    //       for (var i = 0; i < shanxishengTax.length; i++) {
    //         if (shanxishengTax[i]['城市code'] === strCode && !shanxishengTax[i]['县']) {
    //           Object.assign(item.properties, shanxishengTax[i])
    //           continue
    //         }
    //       }
    //     })
    //   }
    //   // 内蒙古数据
    //   if (code === 150000 || code === '150000') {
    //     polygonJson.features.forEach(item => {
    //       var strCode = Number(item.properties.adcode)
    //       for (var i = 0; i < neimengTax.length; i++) {
    //         if (neimengTax[i]['城市code'] === strCode && !neimengTax[i]['县']) {
    //           Object.assign(item.properties, neimengTax[i])
    //           continue
    //         }
    //       }
    //     })
    //   }
  } else if (level === 'city') {
    const data = { ...countryTrend }

    const { y1, y2, y3 } = data
    const temp1 = []
    const temp2 = []
    const temp3 = []
    y1.forEach((item) => {
      temp1.push((parseFloat(item) * Math.random()).toFixed(2))
    })
    y2.forEach((item) => {
      temp2.push((parseFloat(item) * Math.random()).toFixed(2))
    })
    y3.forEach((item) => {
      temp3.push((parseFloat(item) * Math.random()).toFixed(2))
    })
    data.y1 = [...temp1]
    data.y2 = [...temp2]
    data.y3 = [...temp3]
    vuex.dispatch('setTrendData', data)
    //   if (code === 140900 || code === '140900' || code === '140200' || code === 140200) {
    //     polygonJson.features.forEach(item => {
    //       for (var i = 0; i < shanxishengTax.length; i++) {
    //         if (shanxishengTax[i]['县'] === item.properties.name) {
    //           Object.assign(item.properties, shanxishengTax[i])
    //           continue
    //         }
    //       }
    //     })
    //   }
  }

  return polygonJson
}

function getMoveLineData (code, level, center) {
  var jsonInfo = []
  // if (level === 'country') {
  var start = {
    x: center[0],
    y: center[1],
    type: 'start',
    attr1: 40
  }
  for (var i = 0; i < provinceCenter.length; i++) {
    jsonInfo.push({
      start: start,
      end: {
        x: provinceCenter[i].coordinates[0],
        y: provinceCenter[i].coordinates[1],
        attr1: Math.random() * 10,
        type: 'end'
      },
      field2: Math.random() * 10
    })
  }

  return jsonInfo
}

function getResourcePoint (code, level) {
  var jsonInfo = []
  if (level === 'country') {
    return meiData
  } else if (level === 'province') {
    meiData.forEach((item) => {
      if (item['省编码'].toString() === code.toString()) {
        jsonInfo.push(item)
      }
    })
  } else if (level === 'city') {
    meiData.forEach((item) => {
      if (item['市编码'].toString() === code.toString()) {
        jsonInfo.push(item)
      }
    })
  }
  return jsonInfo
}
function getNextCanton (parentCode, type) {
  parentCode = parentCode.toString()
  var jsonInfo = []
  if (type === 'province') {
    for (var i = 0; i < shiData.length; i++) {
      if (shiData[i].sheng_code === parentCode) {
        jsonInfo.push({
          x: shiData[i].coordinates[0],
          y: shiData[i].coordinates[1],
          name: shiData[i].shi_name
        })
      }
    }
  } else if (type === 'city') {
    for (var j = 0; j < xianData.length; j++) {
      if (xianData[j].shi_code === parentCode) {
        jsonInfo.push({
          x: xianData[j].coordinates[0],
          y: xianData[j].coordinates[1],
          name: xianData[j].xian_name
        })
      }
    }
  } else if (type === 'country') {
    var jsonInfoRaw = require('@/assets/testGeoData/center.json')
    for (var m = 0; m < jsonInfoRaw.length; m++) {
      jsonInfo.push({
        x: jsonInfoRaw[m].coordinates[0],
        y: jsonInfoRaw[m].coordinates[1],
        name: jsonInfoRaw[m].name
      })
    }
  } else {
  }
  return jsonInfo
}
// function getParentCanton(parentCode, type){

// }
function loadChinaNameAndStar (map) {
  var jsonInfo = []

  jsonInfo.push({
    // 必填参数(x、y)
    x: 104.260903,
    y: 36.075545,
    name: '中 华 人 民 共 和 国'
  })

  var layerName = 'test_pointLayer_text_china' // 图层名
  var zoom = false // 是否飞到点集所在位置，默认为false
  // options是一个扩展功能的参数，后期有什么新的要扩展的可以放在里面
  var options = {
    textSize: 20,
    textColor: 'rgb(0,200,200)',
    borderColor: 'rgb(100,100,100)',
    borderWidth: 2,
    minZoom: 0,
    maxZoom: 5
  }
  var textField = 'name'
  ARSCMapBox.CreatTextLayer(map, layerName, jsonInfo, textField, zoom, options)
  loadStar(map)
  taiwanNoDataFun(map)
}
function loadEveryProvince (map) {
  var jsonInfoRaw = require('@/assets/testGeoData/center.json')
  var jsonInfo = []
  for (var i = 0; i < jsonInfoRaw.length; i++) {
    jsonInfo.push({
      x: jsonInfoRaw[i].coordinates[0],
      y: jsonInfoRaw[i].coordinates[1],
      name: jsonInfoRaw[i].name
    })
  }
  var layerName = 'test_pointLayer_text_allProvince' // 图层名
  var zoom = false // 是否飞到点集所在位置，默认为false
  // options是一个扩展功能的参数，后期有什么新的要扩展的可以放在里面
  var options = {
    textSize: 15,
    textColor: 'rgb(0,200,200)',
    borderColor: 'rgb(100,100,100)',
    borderWidth: 1,
    minZoom: 5,
    maxZoom: 15
  }
  var textField = 'name'
  ARSCMapBox.CreatTextLayer(map, layerName, jsonInfo, textField, zoom, options)
}
function loadStar (map) {
  // 创建五角星图层
  var jsonInfo2 = []
  jsonInfo2.push({
    // 必填参数(x、y)
    x: 116.543183,
    y: 40.059408
  })

  var layerName2 = 'test_pointLayer_star' // 图层名
  // options是一个扩展功能的参数，后期有什么新的要扩展的可以放在里面
  var options2 = {
    imageMapping: {
      start_image_1: require('@/assets/beijing.png')
    },
    opacity: 1.0,
    scale: 0.1,
    imageName: 'start_image_1',
    minZoom: 0,
    maxZoom: 24
  }
  // clickCallBack是一个点击回调函数（可以不传入)
  ARSCMapBox.CreatPointLayer(map, layerName2, jsonInfo2, false, options2)
}
function taiwanNoDataFun (map) {
  var jsonInfo = []

  jsonInfo.push({
    // 必填参数(x、y)
    x: 120.96787,
    y: 23.747063,
    name: '台湾省\n（暂无数据）'
  })

  var layerName = 'test_pointLayer_text_taiwan' // 图层名
  var zoom = false // 是否飞到点集所在位置，默认为false
  // options是一个扩展功能的参数，后期有什么新的要扩展的可以放在里面
  var options = {
    textSize: 16,
    textColor: 'rgb(200,200,200)',
    borderColor: 'rgb(100,100,100)',
    borderWidth: 1,
    minZoom: 0,
    maxZoom: 24
  }
  var textField = 'name'
  ARSCMapBox.CreatTextLayer(map, layerName, jsonInfo, textField, zoom, options)
}
function getParentCodeAndLevel (code) {
  code = code.toString()
  if (code.substring(code.length - 4) === '0000') {
    // 省，则上一级是全国
    return ['100000', 'country']
  } else if (code.substring(code.length - 2) === '00') {
    // 市，则上一级是省
    return [code.substring(0, 2) + '0000', 'province']
  } else {
    return [code.substring(0, 4) + '00', 'city']
  }
}

function returnColorSegment (data, col) {
  const colorData = [...data]
  colorData.sort((a, b) => a.properties[col] - b.properties[col])
  const result = colorData.filter((f) => f.properties[col])

  let min = result[0].properties[col]
  const max = result[result.length - 1].properties[col]

  const step = (max - min) / 7

  let segment = ['#B6D2EC']
  const color = [
    '#9FC8FF',
    '#6EACFF',
    '#4790FB',
    '#0665F4',
    '#FCD626',
    '#F6801F'
  ]

  for (let i = 0; i < 6; i++) {
    segment = [
      ['>', ['get', col], parseFloat((min += step).toFixed(2))],
      color[i],
      ...segment
    ]
  }

  segment = ['case', ...segment]

  return segment
}

export {
  loadChinaNameAndStar,
  loadEveryProvince,
  getNextCanton,
  getResourcePoint,
  getMoveLineData,
  getTaxDataOfPolygon,
  getParentCodeAndLevel,
  returnColorSegment
}
