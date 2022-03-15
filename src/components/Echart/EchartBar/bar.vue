<template>
  <div
    class="echart-container"
    :style="'height:' + height + 'px;'"
    ref="chart"
  ></div>
</template>

<script>
// 引入基本模板
export default {
  name: 'IEchartsBar',
  props: {
    data: {
      type: Object,
      default () {
        return {
          title: '柱状图',
          x: ['测试1', '测试2', '测试3'],
          y: [
            { name: '浏览量', value: [4, 1, 9], color: '#8f1414' },
            { name: '点赞量', value: [2, 6, 6], color: '#1b8caf' },
            { name: '收藏量', value: [7, 3, 12], color: '#ee2a65' }
          ]
        }
      }
    },
    zoom: {
      type: Number,
      default () {
        return 0
      }
    },
    height: {
      type: Number,
      default () {
        return 400
      }
    },
    fontSize: {
      type: Number,
      default () {
        return 14
      }
    },
    download: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  data () {
    return {
      key: this._uid,
      chart: null
    }
  },
  computed: {
    options () {
      const options = {
        // --------------   全局字体 -----------------
        textStyle: {
          fontFamily: 'Microsoft YaHei',
          fontSize: this.fontSize
        },
        // --------------   提示框 -----------------
        tooltip: {
          show: true, // ---是否显示提示框,默认为true
          trigger: 'item', // ---数据项图形触发
          axisPointer: {
            // ---指示样式
            type: 'shadow',
            axis: 'auto'
          },
          padding: 5,
          backgroundColor: 'rgba(255,255,255,0.7)',
          textStyle: {
            // ---提示框内容样式
            color: '#000'
          }
        },

        // --------------   展示控制 -----------------
        legend: {
          top: '5%',
          left: 'center'
        },

        // -------------  grid区域  ----------------
        grid: {
          show: false, // ---是否显示直角坐标系网格
          top: 80, // ---相对位置，top\bottom\left\right
          containLabel: false, // ---grid 区域是否包含坐标轴的刻度标签
          tooltip: {
            // ---鼠标焦点放在图形上，产生的提示框
            show: true,
            trigger: 'item', // ---触发类型
            textStyle: {
              color: '#666'
            }
          },
          left: 40,
          right: 40
        },

        // -------------   x轴   -------------------
        xAxis: {
          show: true, // ---是否显示
          position: 'bottom', // ---x轴位置
          offset: 0, // ---x轴相对于默认位置的偏移
          type: 'category', // ---轴类型，默认'category'
          nameLocation: 'end', // ---轴名称相对位置
          nameTextStyle: {
            // ---坐标轴名称样式
            color: '#000',
            padding: [5, 0, 0, -5] // ---坐标轴名称相对位置
          },
          nameGap: 15, // ---坐标轴名称与轴线之间的距离
          // nameRotate:270, //---坐标轴名字旋转

          axisLine: {
            // ---坐标轴 轴线
            show: true, // ---是否显示

            // ------------------- 箭头 -------------------------
            symbol: ['none', 'arrow'], // ---是否显示轴线箭头
            symbolSize: [8, 8], // ---箭头大小
            symbolOffset: [0, 7], // ---箭头位置

            // ------------------- 线 -------------------------
            lineStyle: {
              // color: "#000",
              width: 1,
              type: 'solid'
            }
          },
          axisTick: {
            // ---坐标轴 刻度
            show: true, // ---是否显示
            inside: true, // ---是否朝内
            lengt: 3, // ---长度
            lineStyle: {
              // color:'red', //---默认取轴线的颜色
              width: 1,
              type: 'solid'
            }
          },
          axisLabel: {
            // ---坐标轴 标签
            show: true, // ---是否显示
            inside: false, // ---是否朝内
            rotate: 0, // ---旋转角度
            margin: 5, // ---刻度标签与轴线之间的距离
            // color:'red', //---默认取轴线的颜色
            textStyle: {
              fontSize: this.fontSize // 更改坐标轴文字大小
            }
          },
          splitLine: {
            // ---grid 区域中的分隔线
            show: false, // ---是否显示，'category'类目轴不显示，此时我的X轴为类目轴，splitLine属性是无意义的
            lineStyle: {
              // color:'red',
              // width:1,
              // type:'solid',
            }
          },
          splitArea: {
            // --网格区域
            show: false // ---是否显示，默认false
          },
          data: this.data.x
        },

        // ----------------------  y轴  ------------------------
        yAxis: {
          show: true, // ---是否显示
          position: 'left', // ---y轴位置
          offset: 0, // ---y轴相对于默认位置的偏移
          type: 'value', // ---轴类型，默认'category'
          nameLocation: 'end', // ---轴名称相对位置value
          nameTextStyle: {
            // ---坐标轴名称样式
            color: '#000',
            padding: [5, 0, 0, 5] // ---坐标轴名称相对位置
          },
          nameGap: 15, // ---坐标轴名称与轴线之间的距离
          // nameRotate:270, //---坐标轴名字旋转

          axisLine: {
            // ---坐标轴 轴线
            show: true, // ---是否显示

            // ------------------- 箭头 -------------------------
            symbol: ['none', 'arrow'], // ---是否显示轴线箭头
            symbolSize: [8, 8], // ---箭头大小
            symbolOffset: [0, 7], // ---箭头位置

            // ------------------- 线 -------------------------
            lineStyle: {
              // color: "#000",
              width: 1,
              type: 'solid'
            }
          },
          axisTick: {
            // ---坐标轴 刻度
            show: true, // ---是否显示
            inside: true, // ---是否朝内
            lengt: 3, // ---长度
            lineStyle: {
              // color:'red', //---默认取轴线的颜色
              width: 1,
              type: 'solid'
            }
          },
          axisLabel: {
            // ---坐标轴 标签
            show: true, // ---是否显示
            inside: false, // ---是否朝内
            rotate: 0, // ---旋转角度
            margin: 8, // ---刻度标签与轴线之间的距离
            // color:'red', //---默认取轴线的颜色
            textStyle: {
              fontSize: this.fontSize // 更改坐标轴文字大小
            }
          },
          splitLine: {
            // ---grid 区域中的分隔线
            show: true, // ---是否显示，'category'类目轴不显示，此时我的y轴为类目轴，splitLine属性是有意义的
            lineStyle: {
              // color: "#666",
              width: 1,
              type: 'dashed' // ---类型
            }
          },
          splitArea: {
            // --网格区域
            show: false // ---是否显示，默认false
          }
        },

        // ------------ 内容数据  -----------------
        series: []
      }
      if (this.zoom) {
        // --------------   滑动条 -----------------
        options.dataZoom = [
          {
            show: this.data.x.length > this.zoom, // 是否显示滑动条
            type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
            startValue: 0, // 从头开始。
            endValue: this.zoom - 1 // 一次性展示zoom个。
          }
        ]
      }
      if (this.data.title) {
        // 标题
        options.title = {
          text: this.data.title,
          textStyle: {
            // ---主标题内容样式
            color: '#000'
          },
          x: 'center'
        }
      }
      if (this.data.y) {
        for (const y of this.data.y) {
          const item = {
            name: y.name, // ---系列名称
            type: 'bar', // ---类型
            legendHoverLink: true, // ---是否启用图例 hover 时的联动高亮
            label: {
              // ---图形上的文本标签
              show: false,
              position: 'insideTop', // ---相对位置
              rotate: 0, // ---旋转角度
              color: '#eee'
            },
            itemStyle: {
              // ---图形形状
              color: y.color,
              borderRadius: [4, 4, 0, 0]
            },
            barWidth: '20', // ---柱形宽度
            barCategoryGap: '20%', // ---柱形间距
            data: y.value
          }

          options.series.push(item)
        }
      }
      if (this.download) {
        // --------------    工具栏  -----------------
        options.toolbox = {
          feature: {
            saveAsImage: {
              type: 'png',
              title: '保存'
            }
          }
        }
      }

      return options
    }
  },
  methods: {
    init () {
      this.chart = this.$echarts.init(this.$refs.chart)
      // this.chart = echarts.init(this.$refs.chart)
    },
    setOptions () {
      this.chart.setOption(this.options, true)
    }
  },
  mounted () {
    this.init()
    this.setOptions()
  },
  watch: {
    options () {
      this.setOptions()
    }
  }
}
</script>

<style>
.echart-container {
  width: 100%;
  margin: 0 auto;
}
</style>
