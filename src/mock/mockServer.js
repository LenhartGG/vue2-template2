import Mock from 'mockjs'
//import data from './data.json'

Mock.mock('http://localhost:8080/userlist', {
  code: 0, data:
  {
    'data|1000': [
      {
        id: '@id',//随机id
        name: '@name',//随机名称
        nickName: '@last',//随机昵称
        phone: /^1[34578]\d{9}$/,//随机电话号码
        'age|11-99': 1,//年龄
        address: '@county(true)',//随机地址
        email: '@email',//随机邮箱
        isMale: '@boolean',//随机性别
        createTime: '@datetime',//创建时间
        avatar() {
          //用户头像
          return Mock.Random.image('100×100', Mock.Random.color(), '#757575', 'png', this.nickName)
        }
      }
    ]
  }

})