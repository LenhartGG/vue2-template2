<template>
  <div>
    <h1>canvas2image</h1>
    <canvas2image />
  </div>
</template>

<script>
import canvas2image from '@/components/canvas2image/canvas2image.vue'
export default {
  name: 'Vue2Template2Test',

  components: {
    canvas2image
  },
  
  data() {
    return {
    }
  },

  mounted() {},

  methods: {
    
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