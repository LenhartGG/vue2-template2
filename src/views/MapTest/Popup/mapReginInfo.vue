<template>
  <div class="map_reginInfo">
    <div class="header">
      <img src="../img/zhuanqu.png" alt="" @click="xiazuan" />
      {{ regionName }}
      <div class="icons">
        <!-- <img src="@/assets/xunbiao.png" alt="" /> -->
        <img src="../img/duibi.png" alt="" @click="showContrast" />
      </div>
    </div>
    <div class="content">
      <div class="desc_item">
        <span class="desc_title">{{ regionTitle }}:</span>
        <span class="desc_value">
          <span>{{ regionTax  || '0'}}</span>
          {{ suffix }}
        </span>
      </div>
    </div>
    <div class="desc_item">
      <span class="desc_title">地区排名:</span>
      <span class="desc_value">
        <span>{{ regionRank }}</span>
      </span>
    </div>
    <div class="close_icon" @click="Close">
      <img src="../img/map_tan_close.png" alt="" />
    </div>
  </div>
</template>
<script>
import Bus from '../bus.js'
export default {
  data () {
    return {}
  },
  props: {
    regionTitle: {
      type: String,
      default: ''
    },
    regionName: {
      type: String,
      default: ''
    },
    regionCode: {
      type: [String, Number],
      default: ''
    },
    regionTax: {
      type: [String, Number],
      default: ''
    },
    regionRank: {
      type: [String, Number],
      default: ''
    },
    xiazuan: {
      type: Function,
      default: null
    },
    suffix: {
      type: String,
      default: ''
    },
    close: {
      type: Function,
      default: () => { }
    },
    isShowComparison: {
      type: Function,
      default: () => { }
    }
  },
  mounted () {
    // this.xiazuan = true
  },
  methods: {
    showContrast () {
      const contrastInfo = [this.regionName, this.regionCode, true]
      Bus.$emit('contrastShow', contrastInfo)
      Bus.$emit('isShowComparison')
      this.isShowComparison()
    },
    Close () {
      // this.$el.remove()
      this.close()
    }
  }
}
</script>
<style lang="scss" scoped>
.map_reginInfo {
  user-select: none;
  position: relative;
  width: 400px;
  height: 210px;
  padding: 41px 25px 31px 40px;
  background: url("../img/map_region.png") no-repeat;
  background-size: 100%;
  box-sizing: border-box;
  margin-bottom: -16px;
  margin-left: -80px;
  .header {
    position: relative;
    font-size: 30px;
    font-family: PingFangSC-Regular;
    color: #f2f2f2;
    height: 30px;
    img {
      width: 32px;
      height: 21px;
      display: inline-block;
      vertical-align: top;
      &:hover {
        cursor: pointer;
      }
    }
    .icons {
      position: absolute;
      top: -5px;
      right: 0px;
      img {
        display: inline-block;
        vertical-align: top;
        width: 29px;
        height: 29px;
        margin-left: 5px;
      }
    }
  }

  .content {
    max-height: 120px;
    // overflow: auto;
  }
  .desc_item {
    font-size: 24px;
    color: #e6e6e6;
    height: 32px;
    // padding-top: 15px;
    line-height: 32px;
    margin-top: 20px;
    font-family: PingFangSC-Regular;
    display: flex;
    justify-content: space-between;
    .desc_title {
      // float: left;
    }
    .desc_value {
      // float: right;
      span {
        font-size: 32px;
        color: #ed7d31;
        display: inline-block;
        vertical-align: top;
        margin-top: 2px;
        font-family: DINCond-Medium;
      }
    }
    // &:last-child {
    //   margin-top: 20px;
    //   .desc_value {
    //     float: none;
    //     margin-left: 15px;
    //   }
    // }
  }
  .close_icon {
    position: absolute;
    top: 12px;
    right: 12px;
    width: 20px;
    height: 20px;
    &:hover {
      cursor: pointer;
    }
    img {
      display: inline-block;
      vertical-align: top;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
