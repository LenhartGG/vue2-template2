<template>
  <div class="back">
    <border1Vue>
      <template #content>
        <div class="border">
          <div class="title">
            <div class="icon"><a-icon type="home" @click="xiazuan" /></div>
            <div class="regionName">
              {{ regionName }}
            </div>
          </div>
          <div class="content1">
            <div class="regionTax">{{ regionTitle }}:</div>
            <div class="regionTaxValue">{{ regionTax }}</div>
            <!-- <div class="regionTax">万元</div> -->
            <div class="button">
              <a-button @click="showContrast" type="primary">对比</a-button>
            </div>
          </div>
          <div class="content2">
            <div class="regionRank">地区排名:</div>
            <div class="circle">No.{{ regionRank }}</div>
          </div>
        </div>
      </template>
    </border1Vue>
    <a-button
      type="link"
      icon="close"
      class="abuttonHover"
      size="small"
      @click="Close"
    />
  </div>
</template>

<script>
import border1Vue from '../../../new/border1.vue'
import Bus from '../../../new/jsFile/bus.js'
export default {
  data () {
    return {}
  },
  props: {
    regionTitle: {
      type: String,
      default: '房产数量'
    },
    regionName: {
      type: String,
      default: '昌平区'
    },
    regionTax: {
      type: String,
      default: '6,541.6'
    },
    regionRank: {
      type: Number,
      default: 4
    },
    xiazuan: {
      type: Function,
      default: null
    },
    regionCode: {
      type: Number,
      default: 100000
    }
  },
  mounted () {
    // this.xiazuan = true
  },
  methods: {
    showContrast1showContrast () {
      Bus.$emit('contrastShow2', 'true')
    },
    showContrast () {
      var contrastInfo = [this.regionName, this.regionCode, true]
      Bus.$emit('contrastShow', contrastInfo)
      Bus.$emit('isShowComparison')
    },
    Close () {
      Bus.$emit('contrastShow', false)
      // var mine = document.getElementById('infoDia')
      // mine.parentNode.removeChild(mine)
      this.$el.remove()
    }
  },
  components: {
    border1Vue
  }
}
</script>

<style scoped>
.back {
  width: 300px;
  background: rgba(0, 0, 0, 0);
}
.border {
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 16px;
  padding-bottom: 16px;
}

.title {
  font-size: 24px;
  color: #bedaff;
  font-weight: bold;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  padding-right: 30px;
}
.content1 {
  display: flex;
  font-size: 16px;
  color: #bedaff;
  align-items: center;
  padding: 10px 0 10px 15px;
}
.content2 {
  display: flex;
  font-size: 16px;
  color: #bedaff;
  align-items: center;
  padding: 10px 0 10px 15px;
}
.icon {
  font-size: 30px;
  float: left;
  color: #1dd4ff;
}
.regionName {
  flex: 1;
}
.button {
  width: 63px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 153, 255, 0.4);
  border: solid 1px #0099ff;
  /* border-radius: 5px; */
  font-size: 18px;
  color: #fff;
  font-weight: normal;
  cursor: pointer;
  margin-left: 20px;
}
.regionTax {
  font-size: 16px;
  color: #bedaff;
  display: block;
}
.regionTaxValue {
  margin-left: 15px;
  font-size: 24px;
  color: #ffa36d;
  display: flex;
}
.regionRank {
  display: block;
}
.circle {
  margin-left: 15px;
  font-size: 24px;
  font-family: AgencyFB;
  color: #ff9966;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-image: url(./tempData/back.png);
  background-size: contain; */
}
.abuttonHover {
  z-index: 999;
  font-size: 20px;
  position: relative;
  bottom: 194px;
  float: right;
  background-color: rgba(0, 0, 0, 0);
}
</style>
