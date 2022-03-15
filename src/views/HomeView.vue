<template>
  <div class="home">
    <EchartBar
      :data="echartBarData"
    ></EchartBar>
  </div>
</template>

<script>
// @ is an alias to /src
import EchartBar from '@/components/Echart/EchartBar/bar.vue'

export default {
  name: 'HomeView',
  components: {
    EchartBar
  },
  data () {
    return {
      echartBarData: {
        title: '柱状图',
        x: ['测试1', '测试2', '测试3'],
        y: [
          { name: '浏览量', value: [4, 1, 9], color: '#8f1414' },
          { name: '点赞量', value: [2, 6, 6], color: '#1b8caf' },
          { name: '收藏量', value: [7, 3, 12], color: '#ee2a65' }
        ]
      }
    }
  }
}
</script>
