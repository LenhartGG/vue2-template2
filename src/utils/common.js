/*
 * @Author: chenliang
 * @Date: 2022-02-28 13:00:24
 * @LastEditors: chenliang
 * @LastEditTime: 2022-03-05 22:29:59
 * @Description: 前端公共方法，方法作用，参数声明
 *
 */
import _ from 'lodash'

export default {
  money (value) {
    if (!value) return '0.00'
    // var intPart = Number(value).toFixed(0) // 获取整数部分
    var intPart = Math.floor(value).toFixed(0) // 获取整数部分
    var intPartFormat = intPart
      .toString()
      .replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // 将整数部分逢三一断
    var floatPart = '.00' // 预定义小数部分
    var value2Array = value.split('.')
    // =2表示数据有小数位
    if (value2Array.length === 2) {
      floatPart = value2Array[1].toString() // 拿到小数部分
      if (floatPart.length === 1) {
        // 补0,
        return intPartFormat + '.' + floatPart + '0'
      } else {
        return intPartFormat + '.' + floatPart
      }
    } else {
      return intPartFormat
    }
  },
  money2 (value) {
    if (!value) return ''
    var intPart = Number(value).toFixed(0) // 获取整数部分
    var intPartFormat = intPart
      .toString()
      .replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // 将整数部分逢三一断
    // var floatPart = '.00' // 预定义小数部分
    // var value2Array = value.split('.')
    // // =2表示数据有小数位
    // if (value2Array.length === 2) {
    //   floatPart = value2Array[1].toString() // 拿到小数部分
    //   if (floatPart.length === 1) {
    //     // 补0,
    //     return intPartFormat + '.' + floatPart + '0'
    //   } else {
    //     return intPartFormat + '.' + floatPart
    //   }
    // } else {
    //   return intPartFormat + floatPart
    // }
    return intPartFormat
  },
  moneyToFixed (value) {
    if (!value) return ''
    const moeny = []
    if (typeof (value) !== 'object') {
      value = value.toString().split('')
      value.forEach(item => {
        if (!isNaN(item) || item === '.') {
          moeny.push(item)
        }
      })
      return Number(moeny.join().replace(/,/ig, '')).toFixed(2)
    }
    value.forEach(item => {
      moeny.push(this.moneyToFixed(item))
    })
    return moeny
  }
}

/**
 * 生成geojson格式的税收数据
 * @param {*} data 区域税收数据
 * @param {*} geodata 区域geojson
 * @param {*} dataCodeField 区域税收数据中，与区域geojson中adcode进行匹配的字段
 * @returns {GEOJSON}
 */
export function returnGeoTaxData (data, geodata, dataCodeField) {
  if (!_.isArray(data) && _.isEmpty(data)) return []
  if (!_.isObject(geodata) && _.isEmpty(geodata)) return []

  const tempData = { ...geodata }
  let codeField = 'adcode'
  if (_.isString(dataCodeField) && !_.isEmpty(dataCodeField)) {
    codeField = dataCodeField
  }
  const { features } = tempData

  features.forEach((featureItem) => {
    const findData = data.find(
      (f) => f[codeField] === featureItem.properties.adcode
    )
    featureItem.properties = { ...findData, ...featureItem.properties }
  })

  return tempData
}

/**
 *
 * @param {*} props
 */
export class MapEventMsg {
  // 主题
  bizLocation = '';
  // 年份
  year = 2022;
  // 地图动作
  mapEventType = '';
  // 当前行政区编码
  currRegionCode = 100000;
  // 当前行政区级别
  currRegionType = 'province';
  // 当前行政区名称
  currRegionName = '全国';
  // 父级行政区编码
  parentRegionCode = '';
  // 父级行政区级别
  parentRegionType = '';
  // 特殊图层编码
  // 0:重点城市；1:京津冀；2：长三角；3：珠三角；4：长江经济带；
  specialRegionType = -1;

  // 更多查询
  more = {}

  returnMsg () {
    return {
      bizLocation: this.bizLocation,
      year: this.year,
      mapEventType: this.mapEventType,
      currRegionCode: this.currRegionCode,
      currRegionType: this.currRegionType,
      currRegionName: this.currRegionName,
      parentRegionCode: this.parentRegionCode,
      parentRegionType: this.parentRegionType,
      specialRegionType: this.specialRegionType,
      more: this.more
    }
  }
}
