import { ARSCMapBox } from 'arscmapbox'

// 省市县坐标名称数据
const shiData = require('@/assets/testGeoData/Centroid_shi.json')
const xianData = require('@/assets/testGeoData/Centroid_xian.json')
const provinceCenter = require('@/assets/testGeoData/center.json')

// 特区税收数据
const jingjinjiTax = require('@/assets/dataRecord/京津冀资源税税收.json')
const zhusanjaioTax = require('@/assets/dataRecord/珠三角资源税收收入.json')
const changsanjiaoTax = require('@/assets/dataRecord/长三角资源税税收收入.json')
const zdcs = require('@/assets/dataRecord/全国重点城市资源税税收收入.json')
const zjjjd = require('@/assets/dataRecord/长江经济带资源税税收收入.json')

const landUseMaData = require('@/json/landuse/dist/map/landuse-map-data.json')

const dataIndex = {
  京津冀: jingjinjiTax,
  珠三角: zhusanjaioTax,
  长三角: changsanjiaoTax,
  重点城市: zdcs,
  长江经济带: zjjjd
}

function getTaxDataOfPolygonSpecial (polygonJson, cityName) {
  const taxData = dataIndex[cityName]
  if (!taxData) {
    return polygonJson
  }

  polygonJson.features.forEach((item) => {
    const properties = item.properties
    if (properties.shi_code) {
      // 当前是市
      for (let i = 0; i < taxData.length; i++) {
        if (
          properties.shi_code.toString() === taxData[i]['城市code'].toString()
        ) {
          Object.assign(item.properties, taxData[i])
        }
      }
    } else if (properties.sheng_code) {
      // 当前是省
      for (let j = 0; j < taxData.length; j++) {
        if (
          properties.sheng_code.toString() === taxData[j]['省code'].toString()
        ) {
          Object.assign(item.properties, taxData[j])
        }
      }
    } else if (properties.xian_code) {
      // 当前是县
      debugger
    }
  })

  return polygonJson
}

function getTaxDataOfPolygon (polygonJson, taxInfo) {
  polygonJson.features.forEach((item) => {
    const strCode = item.properties.adcode
    for (let i = 0; i < taxInfo.length; i++) {
      if (strCode === taxInfo[i].adcode) {
        Object.assign(item.properties, taxInfo[i])
      }
    }
  })
  return polygonJson
}

function getMoveLineData (code, level, center) {
  const jsonInfo = []
  const start = {
    x: center[0],
    y: center[1],
    type: 'start',
    attr1: 40
  }
  for (let i = 0; i < provinceCenter.length; i++) {
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

function getResourcePoint (
  currentResourcePOIDataBase,
  code,
  level,
  polygonJson,
  isSpecial,
  sourceType
) {
  const jsonInfo = []
  // var meiData = currentResourcePOIDataBase

  // 特殊区域
  if (polygonJson && isSpecial) {
    // var strCode
    polygonJson.features.forEach((item) => {
      if (item.properties.shi_code) {
        // strCode = item.properties.shi_code.toString()
        // meiData.forEach((item) => {
        //   if ((item['市编码'] && item['市编码'].toString()) === strCode) {
        //     jsonInfo.push(item)
        //   }
        // })
      }
    })

    if (sourceType) {
      jsonInfo.filter(function (item) {
        return item['品类'] === sourceType
      })
    }
    // 过滤
    return jsonInfo
  }

  // 普通区域
  if (level === 'country') {
    // return meiData
    landUseMaData.all.forEach((item) => {
      jsonInfo.push(item)
    })
  } else if (level === 'province') {
    landUseMaData.gd.forEach((item) => {
      jsonInfo.push(item)
    })
  } else if (level === 'city') {
    landUseMaData.gz.forEach((item) => {
      jsonInfo.push(item)
    })
  } else if (level === 'district') {
    landUseMaData.nansha.forEach((item) => {
      jsonInfo.push(item)
    })
  }

  // if (sourceType) {
  //   jsonInfo = jsonInfo.filter(function (item) {
  //     return item['品类'] === sourceType
  //   })
  // }
  return jsonInfo
}

function getNextCanton (parentCode, type) {
  parentCode = parentCode.toString()
  const jsonInfo = []
  if (type === 'province') {
    for (let i = 0; i < shiData.length; i++) {
      if (shiData[i].sheng_code === parentCode) {
        jsonInfo.push({
          x: shiData[i].coordinates[0],
          y: shiData[i].coordinates[1],
          name: shiData[i].shi_name
        })
      }
    }
  } else if (type === 'city') {
    for (let j = 0; j < xianData.length; j++) {
      if (xianData[j].shi_code === parentCode) {
        jsonInfo.push({
          x: xianData[j].coordinates[0],
          y: xianData[j].coordinates[1],
          name: xianData[j].xian_name
        })
      }
    }
  } else if (type === 'country') {
    const jsonInfoRaw = require('@/json/YFYJ/map/countryHouseDataText.json')
    for (let m = 0; m < jsonInfoRaw.length; m++) {
      jsonInfo.push({
        x: jsonInfoRaw[m].x,
        y: jsonInfoRaw[m].y,
        name: jsonInfoRaw[m].name
      })
    }
  // eslint-disable-next-line no-empty
  } else {}
  return jsonInfo
}
function getSpecialCantonName (polygonJson) {
  const jsonInfo = []
  polygonJson.features.forEach((item) => {
    const coordinates = item.properties.centroid.coordinates
    const nameP = item.properties
    jsonInfo.push({
      x: coordinates[0],
      y: coordinates[1],
      name: nameP.xian_name || nameP.shi_name || nameP.sheng_name
    })
  })
  return jsonInfo
}
function loadChinaNameAndStar (map) {
  const jsonInfo = []

  jsonInfo.push({
    // 必填参数(x、y)
    x: 104.260903,
    y: 36.075545,
    name: '中 华 人 民 共 和 国'
  })

  const layerName = 'test_pointLayer_text_china' // 图层名
  const zoom = false // 是否飞到点集所在位置，默认为false
  // options是一个扩展功能的参数，后期有什么新的要扩展的可以放在里面
  const options = {
    textSize: 20,
    textColor: 'rgb(0,200,200)',
    borderColor: 'rgb(100,100,100)',
    borderWidth: 2,
    minZoom: 0,
    maxZoom: 5
  }
  const textField = 'name'
  ARSCMapBox.CreatTextLayer(map, layerName, jsonInfo, textField, zoom, options)
  loadStar(map)
  // taiwanNoDataFun(map)
}
function loadEveryProvince (map) {
  // var jsonInfoRaw = require('@/assets/testGeoData/center.json')
  const jsonInfo = require('@/json/YFYJ/map/countryHouseDataText.json')
  // var jsonInfo = []
  // for (var i = 0; i < jsonInfoRaw.length; i++) {
  //   jsonInfo.push({
  //     x: jsonInfoRaw[i].x,
  //     y: jsonInfoRaw[i].y,
  //     name: jsonInfoRaw[i].name
  //   })
  // }
  const layerName = 'test_pointLayer_text_allProvince' // 图层名
  const zoom = false // 是否飞到点集所在位置，默认为false
  // options是一个扩展功能的参数，后期有什么新的要扩展的可以放在里面
  const options = {
    textSize: 15,
    textColor: 'rgb(0,200,200)',
    borderColor: 'rgb(100,100,100)',
    borderWidth: 1,
    minZoom: 5,
    maxZoom: 15
  }
  const textField = 'name'
  ARSCMapBox.CreatTextLayer(map, layerName, jsonInfo, textField, zoom, options)
}
function loadStar (map) {
  // 创建五角星图层
  const jsonInfo2 = []
  jsonInfo2.push({
    // 必填参数(x、y)
    x: 116.543183,
    y: 40.059408
  })

  const layerName2 = 'test_pointLayer_star' // 图层名
  // options是一个扩展功能的参数，后期有什么新的要扩展的可以放在里面
  const options2 = {
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
  const jsonInfo = []

  jsonInfo.push({
    // 必填参数(x、y)
    x: 120.96787,
    y: 23.747063,
    name: '台湾省\n（暂无数据）'
  })

  const layerName = 'test_pointLayer_text_taiwan'// 图层名
  const zoom = false// 是否飞到点集所在位置，默认为false
  // options是一个扩展功能的参数，后期有什么新的要扩展的可以放在里面
  const options = {
    textSize: 16,
    textColor: 'rgb(200,200,200)',
    borderColor: 'rgb(100,100,100)',
    borderWidth: 1,
    minZoom: 0,
    maxZoom: 24
  }
  const textField = 'name'
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

// 将数据的最大最小区间分成7等分, 每个等分区间内指定固定一种颜色 ?
function returnColorSegment (data, col) {
  const colorData = [...data]
  colorData.sort((a, b) => a.properties[col] - b.properties[col])
  const result = colorData.filter((f) => f.properties[col])
  let min = result[0].properties[col]
  const max = result[result.length - 1].properties[col]

  const step = (max - min) / 11

  let segment = ['#c7e8f7']
  const color = [
    '#b1d9f9',
    '#7fb7fd',
    '#5c92fb',
    '#4269ed',
    '#7385b9',
    '#8590a5',
    '#a6a482',
    '#dec446',
    '#fab523',
    '#f6801f'
  ]

  for (let i = 0; i < 10; i++) {
    segment = [
      ['>', ['get', col], parseFloat((min += step).toFixed(2))],
      color[i],
      ...segment
    ]
  }

  segment = ['case', ...segment]

  return segment
}
// 前三名 指定色阶, 后面所有都是一个默认颜色.
export function return4ColorSegment (data, col) {
  const colorData = [...data]
  // 倒序
  colorData.sort((a, b) => b.properties[col] - a.properties[col])
  const result = colorData.filter((f) => f.properties[col])

  const level0 = result[0].properties[col]
  const level1 = result[1].properties[col]
  const level2 = result[2].properties[col]

  let segment = ['#14c2ff']
  const color = [
    '#ea7854',
    '#1f3bb4',
    '#3364fe'
  ]

  segment = [
    ['>', ['get', col], parseFloat((level0 - 0.01).toFixed(2))], color[0],
    ['>', ['get', col], parseFloat((level1 - 0.01).toFixed(2))], color[1],
    ['>', ['get', col], parseFloat((level2 - 0.01).toFixed(2))], color[2],
    ...segment
  ]

  segment = ['case', ...segment]

  return segment
}

export function CreatCircle (map, layerName, center, radius, options) {
  options = options || {}

  // 绘制圆形区域的函数
  const createGeoJSONCircle = function (center, radiusInKm, points) {
    if (!points) points = 64

    const coords = {
      latitude: center[1],
      longitude: center[0]
    }

    const km = radiusInKm

    const ret = []
    const distanceX = km / (111.320 * Math.cos(coords.latitude * Math.PI / 180))
    const distanceY = km / 110.574

    let theta, x, y
    for (let i = 0; i < points; i++) {
      theta = (i / points) * (2 * Math.PI)
      x = distanceX * Math.cos(theta)
      y = distanceY * Math.sin(theta)

      ret.push([coords.longitude + x, coords.latitude + y])
    }
    ret.push(ret[0])

    return {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [{
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [ret]
          }
        }]
      }
    }
  }

  map.addSource(layerName + '_source', createGeoJSONCircle(center, radius))

  map.addLayer({
    id: layerName,
    type: 'fill',
    source: 'polygon',
    layout: {},
    paint: options.paint || {
      'fill-color': 'blue',
      'fill-opacity': 0.6
    }
  })
}

export {
  loadChinaNameAndStar,
  loadEveryProvince,
  getNextCanton,
  getResourcePoint,
  getMoveLineData,
  getTaxDataOfPolygon,
  getParentCodeAndLevel,
  getTaxDataOfPolygonSpecial,
  getSpecialCantonName,
  returnColorSegment,
  taiwanNoDataFun
}
