<template>
<div>
    <div v-dialogDrag>
        <div class="dialog" :style="{width: width}">
            <div class="dialog__header header" :style="{width: width}">
                <!-- 弹窗标题 -->
                <div class="header_title">
                    <slot name="header"></slot>
                </div>
                <!-- 关闭按钮 -->
                <div class="close_btn" @click="closeDialog">
                    <i class="el-icon-close"></i>
                </div>
            </div>
            <div class="dialog_content" :style="{width: width, height: height}">
                <!-- 弹窗内容 -->
                <slot name="content">
                </slot>
            </div>
        </div>

    </div>
</div>
</template>

<script>
// 引入基本模板
export default {
  name: 'ElementDialog',
  props: {
    visible: {
      default: false
    },
    width: {
      default: '400px'
    },
    height: {
      default: '400px'
    }
  },
  data () {
    return {
    }
  },
  computed: {
  },
  methods: {
    closeDialog () {
      this.$emit('closeDialog', false)
    }
  },
  mounted () {
  },
  watch: {
  }
}
</script>

<style lang="scss" scoped>
// 弹出层
.dialog {
    left: 1000px;
    top: 200px;
    display: flex;
    z-index: 99;
    .header {
        box-sizing: border-box;
        height: 60px;
        width: 400px;
        border: 1px solid #3959A6;
        padding: 0 20px;
        line-height: 60px;
        position: relative;
        font-size: 28px;
        background: linear-gradient(90deg, #0c2049, #080f20);
        color: #fff;
        font-weight: 500;
        display: flex;
        justify-content: space-between;
        align-items:center;
        .close_btn {
            cursor: pointer;
            width: 40px;
            height: 40px;
            line-height: 40px;
            i{
                display: inline-block;
            }
        }
    }
    .dialog_content {
        box-sizing: border-box;
        height: 765px;
        width: 400px;
        padding: 0 20px 10px;
        background: rgba(8, 15, 33, 0.9);
        border: 1px solid #3959A6;
        border-top: none;
        position: relative;
        position: absolute;
        top: 60px;
    }
}

.el-icon-close {
    font-size: 24px;
    color: rgb(0, 136, 204);
}
</style>
