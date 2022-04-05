<template>
  <div>
    <h2>原始HTML</h2>
    <div style="margin: 0 auto; background:red;width: 600px;" class="test" ref="testDom">
      <div style="background:green;">
        <div style="background:blue;">
          <div style="background:yellow;">
            <div style="background:orange;">
              33333333333333333333333333333333
            </div>
          </div>
        </div>
      </div>
    </div>

    <h2 ref="toCanvas" class="toCanvas"> <a href="javascript:void(0);" @click="toCanvas"> 转成canvas </a></h2>
    <h2 ref="toPic" v-if="visibleToPic" class="toPic"><a href="javascript:void(0);" @click="toPic"> 转成图片 </a></h2>

    <h5 class="display: flex;">
      <label for="imgW">宽度:</label>
      <Input class="input" ref="input" v-model="imgW" placeholder="Enter something..."/>
      <label for="imgH">高度:</label>
      <Input class="input"  ref="input" v-model="imgH" placeholder="Enter something..."/>
      <label for="imgFileName">文件名:</label>
      <Input class="input"  ref="input" v-model="imgFileName" placeholder="Enter something..."/>
      
      <Select class="input"  v-model="selectType" style="width:200px">
        <Option v-for="item in imgTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <Button id="save" @click="saveImg">保存</Button>
    </h5>
  </div>
</template>

<script>
import html2canvas from 'html2canvas'
export default {
  name: 'Vue2Template2Test',

  data() {
    return {
      mycanvas: null,
      visibleToPic: false,
      imgW: 0,
      imgH: 0,
      imgFileName: '',
      selectType: 'png',
      imgTypeList: [
        {value: 'png', label: 'png'},
        {value: 'jpeg', label: 'jpeg'},
        {value: 'bmp', label: 'bmp'},
      ]
    }
  },

  mounted() {},

  methods: {
    toCanvas() {
      let testDom = this.$refs.testDom;
      let toCanvas = this.$refs.toCanvas;
      html2canvas(testDom).then((canvas) => {
        this.mycanvas = canvas;
        // canvas宽度
        this.canvasWidth = canvas.width;
        // canvas高度
        this.canvasHeight = canvas.height;
        // 渲染canvas
        toCanvas.appendChild(canvas)
        this.visibleToPic = true;
      })
    },
    toPic() {
      let toPic = this.$refs.toPic;
      // 调用Canvas2Image插件
      console.log(this.$Canvas2Image);
      let img = this.$Canvas2Image.convertToImage(this.mycanvas, this.canvasWidth, this.canvasHeight);
      toPic.appendChild(img);
    },
    saveImg() {
      
      let type = this.selectType; //图片类型
      let w = this.imgW; //图片宽度
      let h = this.imgH; //图片高度
      let f = this.imgFileName; //图片文件名
      w = !w ? this.canvasWidth : w; //判断输入宽高是否为空，为空时保持原来的值
      h = !h ? this.canvasHeight : h;
      // 调用Canvas2Image插件
      console.log(this.mycanvas, w, h, type, f);
      this.$Canvas2Image.saveAsImage(this.mycanvas, w, h, type, f);
    }
  }
}
</script>

<style lang="scss" scoped>
div {
  padding: 20px;
  // border: 5px solid black;
}

h2 {
  background: #efefef;
  margin: 10px;
}

.input {
  width: 200px;
}
</style>