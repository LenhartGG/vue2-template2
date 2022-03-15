<template>
  <div id="myMap"></div>
</template>
<script>
/* eslint-disable */
import { ARSCMapBox } from 'arscmapbox'
import { GEO_JSON } from '../../utils/mapEnum'
import { mapLayerUrl } from './utils/mapLayer'
import {
  loadChinaNameAndStar,
  loadEveryProvince,
  getNextCanton,
  getMoveLineData,
  getTaxDataOfPolygon,
  getParentCodeAndLevel,
  // returnColorSegment,
  CreatCircle,
  // getResourcePoint,
  taiwanNoDataFun
} from './utils/mapJs'
export default {
  name: 'map1',
  data () {
    return {
      map: '',
      currentAdcode: 100000,
      currentLevel: 'country', // 当前行政区等级：国（country)、省(province)、市(city)
      currentStyle: 5, // 当前地图展示效果：1：色阶；2：热力；3：散点；4：萤火虫；5：聚合效果
    }
  },
  mounted () {
    this.initMap()
  },
  methods: {
    /**
     * 百度地图坐标转高德地图坐标
     * BD09 -> GCJ02
     */
    setJson () {
      const mapJson = require('@/json/YFYJ/map/propertyListSlim.json')
      mapJson.forEach(item => {
        const arr = gcoord.transform(
          [item.x, item.y], // 经纬度坐标
          gcoord.BD09, // 当前坐标系
          gcoord.GCJ02 // 目标坐标系
        )
        item.x = arr[0]
        item.y = arr[1]
      })
      this.mapJson = mapJson
    },
    
    initMap () {
      this.map = ARSCMapBox.initMap({
        container: 'myMap', // 必填项，(HTMLElement | string) ，进行地图渲染的HTML元素，或该元素的字符串id
        layers: [
          {
            serviceType: 'WMTS',
            serviceUrl: mapLayerUrl.gaodeImageUrl,
            source: 'gaode',
            tileSize: 578,
            minzoom: 0,
            maxzoom: 18,
            id: 'gao_de_tiles_layer',
            layout: {
              visibility: 'none'
            }
          },
          {
            serviceType: 'WMTS',
            serviceUrl: mapLayerUrl.blueScreenMapUrl,
            source: 'gaode',
            tileSize: 578,
            minzoom: 0,
            maxzoom: 18,
            id: 'blue_tiles_layer'
          }
        ],
        maxBounds: [
          [60, 15],
          [160, 56]
        ],
        center: [108, 40.012005], // 非必填，([x,y]) ，初始中心点坐标,默认[0,0]
        zoom: 3.7, // 非必填，(Number) ,地图初始的缩放比例,默认值0
        pitch: 0, // 非必填，(Number) ,地图初始化时的倾角，按偏离屏幕水平面的度数计量（0-60），默认是0
        antialias: false, // 非必填，(Boolean) ，抗锯齿，通过false关闭提升性能，默认为false
        minZoom: 3,
        maxZoom: 18
      })
      // 特别强调，如果是地图初始化加载后就要执行一些地图相关的操作，一定要等到map加载完成后再执行，也就是下面的写法：
      this.map.on('load', () => {
        this.cantonUpdate(true)
      })
    },
    
    cantonUpdate (isFirst) {
      const jsonInfo = { ...GEO_JSON[this.currentAdcode] }
      this.getTaxData(jsonInfo, isFirst)
    },

    getTaxData (jsonInfo, isFirst) {
      let taxInfo = []
      if (
        parseInt(this.currentAdcode) !== 100000 &&
        parseInt(this.currentAdcode) !== 370200 &&
        parseInt(this.currentAdcode) !== 370214
      ) {
        return
      }
      if (this.currentLevel === 'district') {
        this.switchLayer(2)
        this.switchMapType(5)
        return
      } else if (this.currentLevel === 'country') {
        taxInfo = require('@/json/YFYJ/TaxData/provinceTaxData.json')
          .data
      } else if (this.currentLevel === 'province') {
        taxInfo = require('@/json/YFYJ/TaxData/cityTaxData.json').data
      } else if (this.currentLevel === 'city') {
        taxInfo = require('@/json/YFYJ/TaxData/districtTaxData.json')
          .data
      }
      this.currentAreaData = getTaxDataOfPolygon(jsonInfo, taxInfo)
      this.currentCantonName = getNextCanton(
        this.currentAdcode,
        this.currentLevel
      ) // 无需后台

      if (isFirst) {
        this.LoadJSONLine(this.map, jsonInfo, '_jsonLineFirstLevelLayer', false)
        loadEveryProvince(this.map) // 加载各省基础注记
      }

      this.Loadlayer(!isFirst)
    },
    LoadJSONLine (map, jsonInfo, layerName, zoom) {
      // let layerName2 = 'test_geojsonLayer'// 图层名
      // options是一个扩展功能的参数，后期有什么新的要扩展的可以放在里面
      const options = {
        lineStyle: {
          'line-color': 'rgba(150,150,150,0.9)',
          'line-width': 1,
          'line-opacity': 0.9
        }
      }
      ARSCMapBox.LoadGeoJsonLayer(map, layerName, jsonInfo, zoom, options)
    },
    Loadlayer (zoom) {
      this.clearMapLayer()
      // if (this.currentStyle === 1) {
        // 色阶图
        // this.LoadColorMap(zoom)
        // 加载边界线
        this.LoadCantonLine(
          this.map,
          this.currentAreaData,
          '_currentBorder',
          false
        )
        this.loadCantonName()
        loadChinaNameAndStar(this.map)
    },
    clearMapLayer () {
      this.linerColorBarVisible = false
      this.linerColorBarMaxValue = 0
      this.linerColorBarMinValue = 0
      this.mapClickPopup && this.mapClickPopup.remove()
      ARSCMapBox.clearLayerByName(this.map, '_colorMapLayer')
      ARSCMapBox.clearLayerByName(this.map, 'zys_scoreLayer')
      ARSCMapBox.clearLayerByName(this.map, 'test_pointLayer_text_cantonName')
      ARSCMapBox.clearLayerByName(this.map, '_clusterMapLayer')
      ARSCMapBox.clearLayerByName(this.map, '_heatMapLayer')
      ARSCMapBox.clearLayerByName(this.map, '_fireWormMapLayer')
      ARSCMapBox.clearLayerByName(this.map, '_pointMapLayer')
      ARSCMapBox.clearLayerByName(this.map, 'mark_layer_image_2')
      ARSCMapBox.clearLayerByName(this.map, '_cantonPolygonLayer')
      ARSCMapBox.clearLayerByName(this.map, 'test_pointLayer_star')
      ARSCMapBox.clearLayerByName(this.map, 'test_pointLayer_text_taiwan')
      ARSCMapBox.clearLayerByName(this.map, 'round_text_layer')
    },
    loadCantonName () {
      const jsonInfo = this.currentCantonName
      const layerName = 'test_pointLayer_text_cantonName' // 图层名
      const zoom = false // 是否飞到点集所在位置，默认为false
      // options是一个扩展功能的参数，后期有什么新的要扩展的可以放在里面
      const options = {
        overlapAllow: false,
        textSize: 18,
        textColor: 'rgb(240,240,240)',
        borderColor: 'rgb(150,150,150)',
        borderWidth: 1
      }
      const textField = 'name'
      ARSCMapBox.CreatTextLayer(
        this.map,
        layerName,
        jsonInfo,
        textField,
        zoom,
        options
      )
    },
    LoadCantonLine (map, jsonInfo, layerName, zoom) {
      // let layerName2 = 'test_geojsonLayer'// 图层名
      // options是一个扩展功能的参数，后期有什么新的要扩展的可以放在里面
      const options = {
        lineStyle: {
          'line-color': 'rgba(200,200,200,0.8)',
          'line-width': 2,
          'line-opacity': 0.9
        }
      }
      ARSCMapBox.LoadGeoJsonLayer(map, layerName, jsonInfo, zoom, options)
    },
  }
}
</script>
<style lang="scss" scoped>
#myMap {
  width: 1900px;
  height: 1080px;
  margin: 0 auto;
}
</style>
