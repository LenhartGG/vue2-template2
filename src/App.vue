<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/progress">ProgressBar</router-link> |
      <router-link to="/treelist">treelist</router-link> |
      <router-link to="/test">test</router-link> |
      <router-link to="/list">list</router-link> |
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  created() {
    //页面刷新store数据备份
    // if (localStorage.cmstoken) {
    // this.$router.replace("/data");
    // }else {
    // this.$router.replace("/");
    // }
    if (sessionStorage.getItem('store')) {
      //在页面加载时读取sessionStorage里的状态信息
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))))
    }
    window.addEventListener('beforeunload', () => {
      //在页面刷新时将vuex里的信息保存到sessionStorage里
      sessionStorage.setItem('store', JSON.stringify(this.$store.state))
    })
  }
}
</script>

<style lang="scss">
@import '@/assets/css/style';
html, body, #app {
  background: #f8f8f9;
}
</style>
