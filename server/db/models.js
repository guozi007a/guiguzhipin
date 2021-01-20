/*
包含n个操作数据库集合数据Model模块
1，连接数据库
 - 引入mongoose
 - 连接指定数据库（URL只有数据库是变化的）
 - 获取连接对象
 - 绑定连接完成的监听（用来提示连接成功）
2，得到对应特定集合的Model
 - 定义 Schema（描述文档结构）
 - 定义Model（与集合对应，可以操作集合）
 - 向外暴露Model，让别的文件调用，用于增删改查
*/

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/ggzhipin', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
const connection = mongoose.connection
connection.on('connected', () => {
    console.log('db connect success!')
})

const userSchema = mongoose.Schema({
    username: { type: String, required: true }, // 用户名
    password: { type: String, required: true }, // 密码
    type: { type: String, required: true }, // 用户类型 dashen/laoban 
    header: { type: String }, // 头像名称
    post: { type: String }, // 职位
    info: { type: String }, // 个人或者职位简介
    company: { type: String }, // 公司名称
    salary: { type: String } // 月薪
})
const UserModel = mongoose.model('user', userSchema)

exports.UserModel = UserModel

// 定义chats集合的文档结构
const chatSchema = mongoose.Schema({
    from: { type: String, required: true }, // 发送用户的id
    to: { type: String, required: true }, // 接收用户的id
    chat_id: { type: String, required: true }, // from 和 to 组成的字符串
    content: { type: String, required: true }, // 聊天内容
    read: { type: Boolean, default: false }, // 标识是否已读
    create_time: { type: Number } // 创建时间
})
// 定义能操作chats集合数据的Model
const ChatModel = mongoose.model('chat', chatSchema)
// 向外暴露ChatModel
exports.ChatModel = ChatModel
