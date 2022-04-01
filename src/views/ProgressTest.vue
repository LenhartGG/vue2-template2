<template>
<div>
  <DraggableProgressBar :min="0" :max="20" v-model="progressModel"></DraggableProgressBar>
</div>
</template>

<script>
import DraggableProgressBar from '@/components/ProgressBar/DraggableProgressBar.vue'
export default {
  components: { DraggableProgressBar },
  data () {
    return {
      progressModel: 1
    }
  }
}
</script>

<style>

</style>
