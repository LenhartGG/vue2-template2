const mapLayerUrl = {
  // 信息中心发布的蓝色背景底图
  blueScreenMapUrl: 'http://124.114.202.110:15182/geoserver/cite/wms?service=WMS&version=1.1.0&request=GetMap&layers=cite%3Abasic_3857&bbox={bbox-epsg-3857}&width=548&height=768&srs=EPSG%3A3857&FORMAT=image/png&TRANSPARENT=true&STYLES',
  // 天地图矢量
  tiandituVectorUrl: 'http://t0.tianditu.com/vec_w/wmts?tk=451d7a122e07aeecba2c2cdad386994a&SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=tiles',
  // 天地图影像
  tiandituImageUrl: 'http://t0.tianditu.com/img_w/wmts?tk=451d7a122e07aeecba2c2cdad386994a&SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=tiles',
  // 天地图注记
  tiandituTextUrl: 'http://t0.tianditu.com/cva_w/wmts?tk=451d7a122e07aeecba2c2cdad386994a&SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=tile',
  // 高德矢量
  gaodeVectorUrl: 'http://wprd01.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=1&style=7',
  // 高德影像
  gaodeImageUrl: 'http://wprd01.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=1&style=6'
}

export {
  mapLayerUrl
}
