<template>
  <div class="card" :style="{height: height ? (height+'px') : 'auto'}">
    <div class="card_body">
      <div class="card_title" v-if="title">
        <span>{{title}}</span>
        <slot name="details"></slot>
      </div>

      <slot></slot>

    </div>
  </div>
</template>

<script>
export default {
  name: 'Vue2Template2Card',
  components: {},

  props: {
    title: {
      type: String,
      default: '',
    },
    height: {
      type: [String, Number],
      default: 0,
    },
    color: {
      type: String,
      default: '#000000',
    },
    enlarge: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      
    };
  },

  methods: {
    notify() {
      this.$emit('on-enlarge')
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/css/style.scss';
.card {
  width: 100%;
  background-color: #ffffff;
  border-radius: 12px;
  margin-bottom: 20px;
  overflow: hidden;
  box-shadow: 0px 6px 8px 1px rgba(199, 199, 199, 0.25);
  .card_body {
    width: 100%;
    height: 100%;
  }
  .card_title {
    color: #131523;
    font-size: 18px;
    font-weight: bold;
    margin: 24px 0 0 24px;
  }
}

</style>