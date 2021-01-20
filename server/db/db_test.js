/*
测试使用mongoose操作mongodb数据库
1，连接数据库
 - 引入mongoose
 - 连接指定数据库（URL只有数据库是变化的）
 - 获取连接对象
 - 绑定连接完成的监听（用来提示连接成功）
2，得到对应特定集合的Model
 - 定义 Schema（描述文档结构）
 - 定义Model（与集合对应，可以操作集合）
3，通过Model或其 实例对集合数据进行CRUD操作
 - 通过Model实例的save（）添加数据
 - 通过Model实例的find（）/findOne（）查询多个或一个数据
 - 通过Model实例的findByIdAndUpdate（）更新某个数据
 - 通过Model实例的remove（）删除匹配的数据
*/
const md5 = require('blueimp-md5') //引入md5加密

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/ggzhipin_test', { useNewUrlParser: true, useUnifiedTopology: true }) // 数据库文件的名字是ggzhipin_test
const connection = mongoose.connection 
connection.on('connected', () => {
    console.log('数据库连接成功！')
})

// 先定义文档 就是你这个文档里面应该有什么，是什么类型，默认值都是啥
// 就像做一个收集学生分数的excel表格，里面有姓名 学号 分数等，姓名是汉字，学号和分数是数字
// 学生考60分以下就默认不及格，考90分以上默认是优秀等
const userSchema = mongoose.Schema({
    username: { type: String, required: true }, // 用户名 required:true表示这个数据是必须的
    password: { type: String, required: true }, // 密码
    type: { type: String, required: true }, // 用户类型 dashen/laoban
    header: { type: String } // 这个数据没有required:true 表示数据非必需，比如登录的时候就不需要头像
})

// 定义Model（与集合对应，可以操作集合）
const UserModel = mongoose.model('user', userSchema)

// 添加集合
function testSave() {
    // 创建UserModel的实例
   const userModel =  new UserModel({ 
        username: '刘诗诗',
        password: md5('233'),
        type: 'dashen'
    })
    // 调用save（）保存数据
    userModel.save((err, user) => {
        console.log(err, user)
    })
}
// testSave()

// 查询集合
function testFind() {
    // 查询多个 得到的是一个数组
    UserModel.find((err, users) => {
        console.log(err, users)
    }) 
    // 查询一个 得到的是一个对象
    UserModel.findOne({ username: "高圆圆" }, (err, user) => {
        console.log(err, user)
    })
}
// testFind()

// 更新集合
function testUpDate() {
    UserModel.findByIdAndUpdate({ _id: "5f50980e59489325741fa069" }, { type: "明星" }, (err, oldUser) => {
        console.log(err, oldUser)
    })
}
// testUpDate()

// 删除集合
function testRemove() {
    UserModel.remove({ _id: "5f50980e59489325741fa069" }, (err, user) => {
        console.log(err, user)
    })
}
// testRemove()
