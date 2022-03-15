<template>
  <div id="myMap"></div>
</template>
<script>
/* eslint-disable */
import { ARSCMapBox } from 'arscmapbox'
import { mapLayerUrl } from './utils/mapLayer'
import { GEO_JSON } from '@/utils/mapEnum'
import {
  loadEveryProvince,    // 加载各省基础名称
  getNextCanton,
  loadChinaNameAndStar,   // 北京标五角星标记
  taiwanNoDataFun,    // 加载台湾数据为空
  getTaxDataOfPolygon
} from './utils/mapJs'
import { getColorSegment3 } from '@/utils/colorSegmentJs'
export default {
  name: 'YFYJTEST',
  data () {
    return {
      map: '',
      currentCantonName: '',
      currentAreaData: ''
    }
  },
  mounted () {
    this.initMap()
  },
  methods: {
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
        this.map.clickPriorLayerName = '_colorMapLayer'
        // 监听鼠标右击事件,返回上一级
        this.map.on('mouseup', e => {
          console.log(e)
          console.log(e.originalEvent)
        })
        this.cantonUpdate(true)
      })
    },
    cantonUpdate (isFirst) {
      const jsonInfo = { ...GEO_JSON['100000'] }
      console.log(jsonInfo)
      this.getTaxData(jsonInfo, isFirst)
    },
    getTaxData (jsonInfo, isFirst) {
      const taxInfo = require('@/json/YFYJ/TaxData/provinceTaxData.json').data
      this.currentAreaData = getTaxDataOfPolygon(jsonInfo, taxInfo)
      // this.currentCantonName = getNextCanton(
      //   this.currentAdcode,
      //   this.currentLevel
      // ) // 无需后台
      this.LoadCantonLine(
        this.map,
        jsonInfo,
        '_jsonLineFirstLevelLayer',
        false
      )
      this.LoadColorMap()
      // loadEveryProvince(this.map) // 加载各省基础注记
      loadChinaNameAndStar(this.map)
      taiwanNoDataFun(this.map)
      // this.CreatPolygonLayer()
      this.createTextLayer()
      // this.Loadlayer(!isFirst)
    },
    /***
     * 生成弹出框
     * @param
     * position 点击获取到的地址 mousePosition
     * dom  要展示的demo
     */
    creatHtmlPopup (map, position, dom) {
      const myPopup = ARSCMapBox.creatHtmlPopup(map, position, dom, {})
    },
    /**
     * @param
     * 色阶
     * jsonInfo  省数据
     * colors 颜色分层
     * colorSegment  分成的高低
     * options 配置
     */
    LoadColorMap () {
      // this.clearMapLayer()  // 先清除图层
      const map = this.map
      const jsonInfo = this.currentAreaData
      const layerName = '_colorMapLayer'
      const colors = ['#6eacfe', '#3b65f4', '#fcd626', '#f7801f']
      // getColorSegment3  数据数组，颜色数组，数据参数名
      const colorSegment = getColorSegment3(jsonInfo, colors, '房产税收(亿元)')
      const options = {
        geojsonIDField: 'adcode', // 当存在鼠标点击变色或鼠标移动变色时，此参数必填
        // 鼠标移动时变色
        mouseMoveExtrusionColor: 'rgb(0,255,255)',
        mouseMoveLineColor: 'white',
        mouseMoveLineWidth: 6,
        mouseMoveExtrusionOpacity: 0.9
      }

      const clickCallBack = info => {
        console.log(info)
        console.log(info.mousePosition)
        this.map.flyTo({ center: info.mousePosition, zoom: 11 })
      }
      ARSCMapBox.CreatColorMap(
        map,
        layerName,
        jsonInfo,
        colorSegment.colorSegment,
        false,
        options,
        clickCallBack
      )
    },
    /**
     * @param
     * jsonInfo 所需标点的数据
     * options  样式配置
     * 文字数据浮层
     * textField 数据中的参数名  例如（'name'）北京市
     * name: "北京市"
      showName: "北京"
      showText: "北京\n12,142,300"
      showText2: "北京\n3,614,600"
     */
    createTextLayer () {
      const layerName = 'round_text_layer' // 图层名
      const zoom = false // 是否飞到点集所在位置，默认为false
      const jsonInfo = require('@/json/YFYJ/TaxData/provinceTaxData.json').data
      // const options = {
      //   overlapAllow: true,
      //   textColor: 'rgb(255,255,255)',
      //   minZoom: 0,
      //   maxZoom: 6,
      //   backCircleColor: 'rgba(136,114,220,.8)',
      //   backCircleRadius: 40,
      //   backCircle: true
      // }
      const options = {
        overlapAllow: false,
        textSize: 18,
        textColor: 'rgb(240,240,240)',
        borderColor: 'rgb(150,150,150)',
        borderWidth: 1
      }
      const textField = 'showText'
      ARSCMapBox.CreatTextLayer(
        this.map,
        layerName,
        jsonInfo,
        textField,
        zoom,
        options,
        // this.roundTextClick
      )
    },
    /**
     * 聚合效果
     */
    CreatPolygonLayer () {
      const layerName = '_cantonPolygonLayer'
      const map = this.map
      const jsonInfo = this.currentAreaData
      const mouseMoveAreaColor = 'rgba(0,255,255,0.2)'
      const options = {
        zoomOffset: [-2, -2, 3, 3],
        geojsonIDField: 'adcode',
        mouseMoveLineColor: 'white',
        mouseMoveLineWidth: 6,
        mouseMoveAreaColor,
        fill: 'fill',
        fillStyle: {
          'fill-color': '#2894FF',
          'fill-opacity': 0.1
        },
        lineStyle: {
          'line-color': '#ff0000',
          'line-width': 1,
          'line-opacity': 0.01
        }
      }
      const that = this
      const clickCallBack = info => {
        console.log(info.mousePosition)
        this.map.flyTo({ center: info.mousePosition, zoom: 11 })
      }
      ARSCMapBox.LoadGeoJsonLayer(
        map,
        layerName,
        jsonInfo,
        true,
        options,
        clickCallBack
      )
    },
    /***
     * 
     * 生成边界
     * @param
     * map 地图
     * jsonInfo 边界线数据
     * layerName  图层名字
     * options是一个扩展功能的参数，后期有什么新的要扩展的可以放在里面
     */
    LoadCantonLine (map, jsonInfo, layerName, zoom) {
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
    /**
     * 清除图层
     */
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
    }
  }
}
</script>
<style lang="less" scoped>
#myMap {
  height: 100vh;
  width: 100vw;
}
</style>
