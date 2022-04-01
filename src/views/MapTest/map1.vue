<template>
  <div id="myMap"></div>
</template>
<script>
/* eslint-disable */
import { ARSCMapBox } from 'arscmapbox'
import { GEO_JSON } from '../../utils/mapEnum'
import { mapLayerUrl } from './utils/mapLayer'
import money from '@/utils/common.js'
import { getColorSegment3 } from '@/utils/colorSegmentJs'
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
import popup from './Popup/mapReginInfo.vue'
// import Contrast from './components/Contrast.vue'
export default {
  name: 'map1',
  data () {
    return {
      mapJson: null, // 小区坐标json（百度地图）
      map: null,
      GLOBEMAP: {},
      openImageLayer: false,
      myPublicPopupMarker: null, // 弹框
      myPublicPointLayer: null, // 当前展示的图层
      currentAreaData: null,
      createPointData: null,
      currentAdcode: 100000,
      currentLevel: 'country', // 当前行政区等级：国（country)、省(province)、市(city)
      currentStyle: 5, // 当前地图展示效果：1：色阶；2：热力；3：散点；4：萤火虫；5：聚合效果
      showOnlyCheck: true,
      noExpand: false,
      // img: require('../../../assets/imgs/csq.png'),
      imgName: '重点城市',
      shows: null,
      layerInfo: null,
      expandLayerShow: false,
      houseDataList: [],
      linerColorBarVisible: false,
      linerColorBarMaxValue: 0,
      linerColorBarMinValue: 0,
      infoJson: [],
      popupId: null,
      selectAddress: {},
      isShowContrast: false
    }
  },
  mounted () {
    this.initMap()
  },
  methods: {
    initMap () {
      if (this.GLOBEMAP) {
        // 切换地图效果按钮
        this.GLOBEMAP.updateMapStyle = this.switchMapType

        // 切换地图效果按钮
        this.GLOBEMAP.updateSearchPoint = this.updateSearchPoint
      }
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
            // layout: {
            //   visibility: 'none'
            // }
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
        // this.cantonUpdate(true)

        
        const jsonInfo = {...require('@/json/geo/china.json')}
        let taxInfo = []
        taxInfo = require('@/json/YFYJ/TaxData/provinceTaxData.json').data
        taxInfo = JSON.parse(JSON.stringify(taxInfo))
        this.currentAreaData = getTaxDataOfPolygon(jsonInfo, taxInfo)
        this.currentCantonName = getNextCanton(
          100000,
          'country'
        ) // 无需后台
        this.currentCantonName = JSON.parse(JSON.stringify(this.currentCantonName))
        console.log(this.currentAreaData);
        console.log(this.currentCantonName);
        
        this.LoadJSONLine(this.map, jsonInfo, '_jsonLineFirstLevelLayer', false)
        loadEveryProvince(this.map) // 加载各省基础注记
        let isFirst = true
        // 加载图层
        this.Loadlayer(!isFirst)
      })
    },
    
    cantonUpdate (isFirst) {
      const jsonInfo = require('@/json/geo/china.json')
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
      
      taxInfo = require('@/json/YFYJ/TaxData/provinceTaxData.json').data

      this.currentAreaData = getTaxDataOfPolygon(jsonInfo, taxInfo)
      this.currentCantonName = getNextCanton(
        this.currentAdcode,
        this.currentLevel
      ) // 无需后台


      // console.log(JSON.stringify(jsonInfo))
      // console.log(JSON.stringify(taxInfo))
      // console.log(JSON.stringify(this.currentAreaData))
      

      if (isFirst) {
        this.LoadJSONLine(this.map, jsonInfo, '_jsonLineFirstLevelLayer', false)
        loadEveryProvince(this.map) // 加载各省基础注记
      }
      // 加载图层
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
      // this.clearMapLayer()
      
      // 加载边界线
      this.LoadCantonLine(
        this.map,
        this.currentAreaData,
        '_currentBorder',
        false
      )
      
      // // 聚合效果
      // this.CreatPolygonLayer()
      // // 创建圈文字图层
      // this.createTextLayer()
      // // 加载中国名称和星星图标
      // loadChinaNameAndStar(this.map)
      // // 台湾暂无数据
      // taiwanNoDataFun(this.map)
    },
    LoadColorMap (zoom, callBack, moveLineWhenClick) {
      const map = this.map
      const jsonInfo = this.currentAreaData
      const layerName = '_colorMapLayer'
      let valueKey
      if (this.currentCardType === '2') {
        valueKey = '房产税收(亿元)'
      } else if (this.currentCardType === '4') {
        valueKey = '房屋均价(元/平方米)'
      }
      const colors = ['#6eacfe', '#3b65f4', '#fcd626', '#f7801f']
      const colorSegment = getColorSegment3(jsonInfo, colors, valueKey)
      const options = {
        // legendPositionSetting: {
        //   left: '1540px',
        //   bottom: '40px'
        // },
        // legendColorSetting: {
        //   backgroundColor: 'rgba(0,0,0,0.6)',
        //   titleColor: 'orange',
        //   valueColor: 'rgb(0,200,200)'
        // },
        // click点击变色相关
        geojsonIDField: 'adcode', // 当存在鼠标点击变色或鼠标移动变色时，此参数必填
        // 鼠标移动时变色
        mouseMoveExtrusionColor: 'rgb(0,255,255)',
        mouseMoveLineColor: 'white',
        mouseMoveLineWidth: 6,
        mouseMoveExtrusionOpacity: 0.9
      }

      this.linerColorBarVisible = true
      this.linerColorBarMaxValue = colorSegment.maxValue.toFixed(2)
      this.linerColorBarMinValue = colorSegment.minValue.toFixed(2)
      if (callBack) {
        ARSCMapBox.CreatColorMap(
          map,
          layerName,
          jsonInfo,
          colorSegment.colorSegment,
          false,
          options,
          callBack
        )
        return
      }
      const that = this
      const clickCallBack = info => {
        this.selectAddress = JSON.parse(JSON.stringify(info.properties))
        const MapEventMsg = {
          ...that.$store.state.YFYJ.YFYJformdata,
          focusAdcode: parseInt(info.properties.adcode)
        }
        that.$store.commit('YFYJ/infos', MapEventMsg)
        const popupClick = function () {
          that.mapClickPopup && that.mapClickPopup.remove()
          if (
            parseInt(info.properties.adcode) !== 100000 &&
            parseInt(info.properties.adcode) !== 370200 &&
            parseInt(info.properties.adcode) !== 370214
          ) {
            return
          }
          that.switchCantonCode(info.properties)
          const MapEventMsg = {
            ...that.$store.state.YFYJ.YFYJformdata,
            adcode: parseInt(info.properties.adcode),
            level: info.properties.level
          }
          that.$store.commit('YFYJ/infos', MapEventMsg)
          // 清除
          ARSCMapBox.clearLayerByName(that.map, 'moveLine_layer_2')
        }
        that.createCantonPopUp(info.properties, popupClick) // 第二步中的创建内容的方法;
        const position = info.mousePosition
        const dom = that.popupTemp
        that.mapClickPopup && that.mapClickPopup.remove()
        const myPopup = ARSCMapBox.creatHtmlPopup(map, position, dom, {
          // anchor: 'top-left'
        })
        that.mapClickPopup = myPopup

        if (moveLineWhenClick) {
          const mousePosition = info.mousePosition
          that.CreatMoveLine2(false, 'moveLine_layer_2', mousePosition)
        }
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
      // 过滤台湾
      const layer = map.getLayer(layerName)
      if (layer) {
        const filter = ['!=', 'adcode', 710000]
        map.setFilter(layerName, filter)
      }
      if (this.currentLevel === 'city') {
        this.map.flyTo({ center: [120.359135, 36.366833], zoom: 8.3 })
      } else if (this.currentLevel === 'country') {
        this.map.flyTo({ center: [105, 40.012005], zoom: 3.8 })
      }
    },
    clickPopup () {
      this.mapClickPopup && this.mapClickPopup.remove()
    },
    CreatPolygonLayer () {
      const layerName = '_cantonPolygonLayer'
      const map = this.map
      const jsonInfo = this.currentAreaData
      const mouseMoveAreaColor =
        this.currentLevel === 'district' ? 'transparent' : 'rgba(0,255,255,0.2)'
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
        this.selectAddress = JSON.parse(JSON.stringify(info.properties))
        if (that.currentLevel === 'district') {
          return
        }
        const popupClick = function () {
          that.mapClickPopup && that.mapClickPopup.remove()
          if (
            parseInt(info.properties.adcode) !== 100000 &&
            parseInt(info.properties.adcode) !== 370200 &&
            parseInt(info.properties.adcode) !== 370214
          ) {
            return
          }
          that.switchCantonCode(info.properties)
          const MapEventMsg = {
            ...that.$store.state.YFYJ.YFYJformdata,
            adcode: info.properties.adcode,
            level: info.properties.level
          }
          that.$store.commit('YFYJ/infos', MapEventMsg)
        }
        that.createCantonPopUp(info.properties, popupClick) // 第二步中的创建内容的方法;
        const position = info.mousePosition
        const dom = that.popupTemp
        that.mapClickPopup && that.mapClickPopup.remove()
        const myPopup = ARSCMapBox.creatHtmlPopup(map, position, dom, {
          // anchor: 'top-left'
        })
        that.mapClickPopup = myPopup
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
    switchMapType (type) {
      debugger
      this.currentStyle = type
      this.clearMapLayer()
      this.Loadlayer(false)
    },
    switchCantonCode (info) {
      if (parseInt(info.adcode) === 100000) {
        this.currentLevel = 'country'
      } else if (parseInt(info.adcode) === 370200) {
        this.currentLevel = 'city'
      } else if (parseInt(info.adcode) === 370214) {
        this.currentLevel = 'district'
      }
      this.currentAdcode = info.adcode
      this.cantonUpdate()
    },
    createCantonPopUp (info, click) {
      let regionTitle = '房产数量'
      let regionTax = 0
      let suffix = ''
      let regionRank = 10
      this.$store.state.YFYJ.mapditu = info
      if (this.currentCardType === '1') {
        regionTitle = '房产数量'
        regionRank = info.rank1
        if (this.currentLevel === 'city') {
          regionTax = parseInt(info['房产套数(万)'] * 10000)
          suffix = '套'
        } else {
          regionTax = money.money(info['房产套数(万)'].toFixed(2))
          suffix = '万套'
        }
      } else if (this.currentCardType === '2') {
        regionTitle = '税收收入'
        regionTax = money.money(info['房产税收(亿元)'].toFixed(2))
        suffix = '亿元'
        regionRank = info.rank3
      } else if (this.currentCardType === '3') {
        regionTitle = '纳税人户数'
        regionRank = info.rank3
        if (this.currentLevel === 'city') {
          regionTax = parseInt(info['权属人数量(万)'] * 10000)
          suffix = '户'
        } else {
          regionTax = money.money(info['权属人数量(万)'].toFixed(2))
          suffix = '万户'
        }
      } else if (this.currentCardType === '4') {
        regionTitle = '房产均价'
        regionTax = money.money(
          parseInt(info['房屋均价(元/平方米)']).toString()
        )
        suffix = '元/平方米'
        regionRank = info.rank4
      }
      // 无数据则选择第一个
      if (!regionRank) {
        regionRank = info.rank1 || info.rank2 || info.rank3 || info.rank4 || 5
      }
      const AdminInfo = Vue.extend(popup)
      const vm = new AdminInfo({
        propsData: {
          regionTitle,
          regionName: info.showName || info.name,
          regionCode: info.adcode,
          regionTax,
          suffix,
          regionRank,
          isShowComparison: this.isShowComparison,
          xiazuan: click,
          close: this.clickPopup
        } // 传参
      })
      vm.$mount() // 挂载
      this.popupTemp = vm.$el
      this.popupId = vm
    },
    createTextLayer () {
      if (
        this.map &&
        this.map.arscMapLayerCollection &&
        this.map.arscMapLayerCollection.round_text_layer
      ) {
        this.map.arscMapLayerCollection.round_text_layer.clear()
      }
      let jsonInfo
      let options
      let color = ''
      let textField = ''
      if (this.currentCardType === '1') {
        color = 'rgba(40,157,145,.8)'
        textField = 'showText'
      } else if (this.currentCardType === '3') {
        color = 'rgba(136,114,220,.8)'
        textField = 'showText2'
      }
      if (this.currentLevel === 'country') {
        jsonInfo = require('@/json/YFYJ/TaxData/provinceTaxData.json')
          .data
        options = {
          overlapAllow: true,
          textColor: 'rgb(255,255,255)',
          minZoom: 0,
          maxZoom: 6,
          backCircleColor: color,
          backCircleRadius: 40,
          backCircle: true
        }
      } else if (this.currentLevel === 'city') {
        jsonInfo = require('@/json/YFYJ/TaxData/districtTaxData.json')
          .data
        options = {
          overlapAllow: true,
          textSize: 20,
          textColor: 'rgb(255,255,255)',
          minZoom: 5,
          maxZoom: 15,
          backCircleColor: color,
          backCircleRadius: 48,
          backCircle: true
        }
      } else {
        return
      }
      const layerName = 'round_text_layer' // 图层名
      const zoom = false // 是否飞到点集所在位置，默认为false
      ARSCMapBox.CreatTextLayer(
        this.map,
        layerName,
        jsonInfo,
        textField,
        zoom,
        options,
        this.roundTextClick
      )
      if (this.currentLevel === 'city') {
        this.map.flyTo({ center: [120.359135, 36.366833], zoom: 8.3 })
      } else if (this.currentLevel === 'country') {
        this.map.flyTo({ center: [105, 40.012005], zoom: 3.8 })
      }
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
