<template>
  <div>
    <Row class="dev-not-found">
      <Col :span="14" :offset="5">
        <Row class="ivu-row-flex ivu-row-flex-middle ivu-row-flex-center">
          <Col span="16">
            <img src="@/assets/images/404.png" alt="">
          </Col>
          <Col span="8">
            <div class="dev-not-found-title">404</div>
            <div class="dev-not-found-desc">抱歉，您访问的页面不存在</div>
            <Button type="primary" size="large" @click="backToHome">返回首页</Button>
          </Col>
        </Row>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  name: 'NotFound404',

  components: {

  },

  data() {
    return {
    }
  },

  mounted() {},

  methods: {
    backToHome() {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
.dev-not-found {
  padding: 60px 0px;
  img {
    width: 80%;
  }

  .dev-not-found-title {
    font-weight: 700;
    font-size: 80px;
    color: #515a6e;
  }
  .dev-not-found-desc {
    font-size: 20px;
    color: #808695;
  }
  .ivu-btn {
    margin-top: 16px;
  }
}

.ivu-row-flex-middle {
    align-items: center;
}
.ivu-row-flex-center {
    justify-content: center;
}
.ivu-row-flex {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
</style>