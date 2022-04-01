1.项目结构
├── README.md
├── dist  // 打包构建后的文件夹
├── config  // 环境配置文件
├── node_modules  // 安装的依赖包
├── public  // public中的静态资源会被复制到输出目录（dist）中
│   ├── lib //自定义的文件夹 放一些静态文件（脱框架版的地图sdk一般放这里）
│   └── json //自定义的文件夹 放一些JSON文件
├── src
│   ├── assets //放置一些静态资源，例如图片、图标、字体、样式等
│   │   └── less //公共LESS
│   ├── components //一些共用组件 (一般开发人员不允许改动，由专员负责)
│   ├── route //路由文件夹
│   │   └── index.js  // 路由配置文件
│   ├── store //状态管理
│   │   └── modules  // 各模块状态管理
│   ├── utils // 公共方法
│   │   ├── common.js  //
│   │   └── request.js  // 封装使用的ajax方法，拦截器等（这里用的是axios）
│   ├── views //所有的路由组件
│   │   ├── modulesName  //各模块文件夹
│   │   └── index.vue  // 主页
│   ├── App.vue // 路由组件的顶层路由
│   ├── main.js //vue入口文件
└── vue.config.js //配置文件

2.技术栈
    Vue 2.X
    vue-router
    vuex
    axios

3.路由
各模块以模块名为路由地址 

4：拦截器
统一处理所有http请求和响应，就得用上 axios 的拦截器。通过配置http response inteceptor，当后端接口返回200 数据获取成功。

// http request 拦截器
     // 配置请求拦截器
    this._request.interceptors.request.use(
      // 请求之前处理，参数是单次请求的配置信息
      (config) => {
        const token = storage.get(ACCESS_TOKEN)
        if (token && token.length > 0) {
          config.headers[ACCESS_TOKEN] = token
        }

        const key = config.url + '?' + hash(config.data)
        config.myHash = key

        if (config.method.toLowerCase() === 'post') {
          const timeStamp = new Date().getTime()

          if (config.data instanceof FormData) {
            config.data.append('_t', timeStamp)
          } else {
            config.data = { ...config.data, _t: timeStamp }
          }
        }


// http response 拦截器
this._request.interceptors.response.use(
      (response) => {
        const { config, data, status } = response
        removeHash(config)
        if (status !== 200) {
          throw new Error('请求失败')
        }
        return data
      },
      (error) => {
        const { config } = error
        removeHash(config)

        if (process.env.NODE_ENV === 'development') {
          console.error('response error:', error)
        }

        throw new Error(error.message)
      }
    )
完整的方法见/src/utils/axios.js.


5.安装项目依赖
  npm install
6.运行项目
  npm run serve
7.打包项目
  npm run build


————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
分割线


项目统一命名规范

1.js命名规范
一、变量 
命名方法: 小驼峰式命名法
例：let maxCount = 10;

二、常量
命名方法：名词全部大写
例：const URL = '//www.huifenqi.com';

三、函数 & 方法
命名方法： 小驼峰式命名法 前缀应该为动词
例：function getName() {}

四、类 & 构造函数
命名方法：大写驼峰式命名法，首字母大写。
例：class Persion {
  constructor(name) {
   ...
  }
}

——————————————————————————————————————————————————————
2.vue开发规范
一、组件命名
命名方法：单词大写开头
例：PascalCase

二、模块命名
命名方法：大写开头，开头的单词就是所属模块名字
CarDetail

三、自定义方法命名
命名方法：驼峰命名
例：getListData


——————————————————————————————————————————————————————
3.CSS开发规范
一、项目预处理语言
Less （Leaner Style Sheets 的缩写）


二、样式命名
命名方法：小写英文和下划线_ 连接（方便选择），或者破折号 - 连接 。不允许驼峰命名法 。
例：.case_left{}  .case-left{}

