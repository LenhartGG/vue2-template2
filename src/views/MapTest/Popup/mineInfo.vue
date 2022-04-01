<template>
  <div class="back">
    <a-button
      type="link"
      icon="close"
      class="abuttonHover"
      size="small"
      @click="Close"
    />
    <border1Vue>
      <template #content>
        <div class="border">
          <div class="title">
            <div class="icon"><a-icon type="home" /></div>
            <div class="regionName">
              {{ regionName }}
            </div>
          </div>
          <div class="content1" v-for="(item, index) in newData" :key="index">
            <div class="regionTax" >
              {{ item.titleName }}
            </div>
          </div>
          <div class="button">
            <a-button @click="showImageFun" type="primary">查看地图</a-button>
          </div>
        </div>
      </template>
    </border1Vue>
  </div>
</template>

<script>
import border1Vue from '../../../new/border1.vue'
export default {
  data () {
    return {
      // newData:
      //    [
      //      {
      //        key: 111,
      //        titleName: 'test1'
      //      },
      //      {
      //        key: 112,
      //        titleName: 'test2'
      //      },
      //      {
      //        key: 113,
      //        titleName: 'test3'
      //      }
      //    ]
    }
  },
  props: {
    regionName: {
      type: String,
      default: '昌平区'
    },
    newData: {
      type: Array,
      default: () => []
    },
    showImageFun: {
      type: Function,
      default: null
    }
  },
  methods: {
    // showContrast () {

    // },
    Close () {
      // var mine = document.getElementById('infoDia')
      // mine.parentNode.removeChild(mine)
      this.$el.remove()
    },
    generateId: function (index) {
      return 'content_' + index
    },
    showImage () {}
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
}
.regionTax {
  font-size: 16px;
  color: #bedaff;
  display: block;
}
.regionTaxValue {
  font-size: 24px;
  color: #ffa36d;
  display: flex;
}
.regionRank {
  display: block;
}
.circle {
  font-size: 24px;
  font-family: AgencyFB;
  color: #ff9966;
  width: 60px;

  height: 60px;

  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(../../../new/tempData/back.png);
  background-size: contain;
}
.abuttonHover {
  z-index: 999;
  font-size: 20px;
  position: relative;
  float: right;
  top: 24px;
  margin: 5px;
  background-color: rgba(0, 0, 0, 0);
}
.button {
  padding: 10px 0 10px 15px;
  float: left;
}
</style>
