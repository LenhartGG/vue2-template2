const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig(
  {
    // transpileDependencies: true,
    // publicPath: process.env.NODE_ENV === 'production'
    //   ? '/'
    //   : '/',
    // outputDir: 'dist',
    // assetsDir: '',
    // indexPath: 'index.html',
    // filenameHashing: true,
    // lintOnSave: process.env.NODE_ENV !== 'production',  //保存时 lint 代码
    // transpileDependencies: false, //转译第三方依赖
    // productionSourceMap: false, //生产环境的 source map
    // integrity: false, //子资源完整性
  }
)
