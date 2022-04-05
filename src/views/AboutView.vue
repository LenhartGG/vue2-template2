<template>
<div>
  <Button @click="dialog.visible=!dialog.visible">弹出框按钮</Button>
  <ElementDialog
    v-if="dialog.visible"
    :visible="dialog.visible"
    :width="dialog.width"
    :height="dialog.height"
    @closeDialog="closeDialog"
    >
    <template v-slot:header>
      <!-- 标题 -->
      <div>建筑物名称</div>
    </template>
    <template v-slot:content>
      <!-- 主体 -->
      <div class="subject">
        <div class="house-num"
            v-for="(item, index) in 10" :key="index">
            <Button class="num-1">{{item}}层</Button>
            <Button class="num-others"
            v-for="(item2, index2) in 10" :key="index2"
            :style="{'background-color': colors[0]}">{{item2}}</Button>
        </div>
      </div>
    </template>
  </ElementDialog>
</div>
</template>

<script>
import ElementDialog from '../components/Element/ElementDialog/dialog.vue'
export default {
  components: {
    ElementDialog
  },
  data () {
    return {
      dialog: {
        visible: false,
        width: '1380px',
        height: '840px'
      },
      colors: [
        '#7D7D7D',
        '#3959A6',
        '#0D86F9'
      ]
    }
  },
  methods: {
    closeDialog () {
      this.dialog.visible = false
    }
  }

}
</script>

<style lang="scss" scoped>
  .subject {
    //  主体
    width: 100%;
    height: calc(100% - 27px);
    padding-top: 27px;
    font-family: PingFang SC;
    .house-num{
      color: #fff;
      padding:0 14px 14px;
      display: flex;
      justify-content: space-between;
      line-height: 50px;
      text-align: center;
      button{
        width: 133px;
        height: 50px;
        background: #8c959e;
        margin:8.5px;
        border:  1px solid #3959A6;
        border-radius: 0px;
        font-size: 20px;
        color: #f2f2f2;
      }
      .num-1{
        background-color:#080F21;
      }
    }
  }
</style>
