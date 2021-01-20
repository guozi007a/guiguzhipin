var express = require('express');
var router = express.Router();
// UserModel在models.js文件里已经暴露出来了，要拿到这里用，所以要先引入
const { UserModel, ChatModel } = require('../db/models')
// console.log(UserModel)
// 引入密码加密的包
const md5 = require('blueimp-md5')

// 如果没有这里的引入，还有后面id的定义，会报错：
// TypeError: Cannot read property '_id' of undefined
// 解决办法就是，先引入，再定义id，最后把user._id换成id即可。

// const ObjectId = require('mongodb').ObjectId

const filter = { password: 0 } // 指定过滤属性，把密码过滤掉，不显示出来

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 测试： 定义一个路由，实现用户注册
/*
a) path为 /register
b) 请求方式为post
c) 接收username和password参数
d) admin是已注册用户
e) 注册成功，返回： { code:0, data: { _id: 'abc', username: 'xxx', password: '123' } }
f) 注册失败，返回： {code: 1, msg: '此用户已存在'}
*/ 
// router.post('/register', (req, res) => {
//   /* 1，获取请求参数
//      2，处理
//      3，返回响应数据 */
//   const {username, password} = req.body
//   if (username === 'admin') {
//     res.send({code: 1, msg: '此用户已存在'})
//   } else {
//     res.send({ code: 0, data: { id: 'abc', username, password } })
//   }
// })

// 注册的路由
router.post('/register', function(req, res) {
  
  // 读取请求参数数据
  // 此时的id才是后台传过来的id,才能与数据库对照
  // const id = ObjectId(req.body.id)
  const { username, password, type } = req.body
  // console.log(id)
  // const _id = id
  // console.log(typeof(_id))
  // console.log(req.body)
  // console.log(req.body.username)
  // console.log({ username })
  // console.log(username)
  // console.log({ username, password, type })
  // 处理
  // 1，判断 看用户是否存在
  
  UserModel.findOne( { username }, function(err, user) {
    // console.log(user)
    // console.log(username)
    // console.log(user.username)
    if (user) { // user已存在，user值为true
      // 返回提示错误信息
      res.send({ code: 1, msg: '此用户已存在' })
      // console.log(user)
    } else { // user不存在
      // console.log(user)
      // 保存注册的用户数据
      new UserModel({ username, password: md5(password), type }).save(function(err, user) {
        // console.log(user._id)
        // 在发送响应数据之前，生成一个cookie(userid: user._id)，
        // 并交给浏览器保存
        // 参数maxAge单位是毫秒，表示cookie存活的时间。
        // 1000*60*60*24 是一天
        res.cookie('userid', user._id, { maxAge: 1000*60*60*24 })

        // 响应数据中，不要携带密码
        const data = { _id: user._id, username, type } 
        res.send({ code: 0, data })
        // console.log(err, user)
        // res.send(user)
      })
    }
  })
  

  // 返回响应数据
})

// const userModel = new UserModel({
//     username: 'ming',
//     password: 233,
//     type: 'dashen'
//   })
//   userModel.save((err, user) => {
//     console.log(err, 'user is', user)
//   })

// 登录的路由
router.post('/login', (req, res) => {
  // 获取数据
  const { username, password } = req.body
  // const id = ObjectId(req.body.id)
  // 处理数据
  // 根据username和password去查询数据库users，但是这个password是加密的
  // 如果有，返回登录成功信息。
  // 如果没有，就返回提示登录失败的信息
  // filter是个过滤器
  UserModel.findOne({ username, password: md5(password) }, filter, (err, user) => {
    // console.log(user)
    if (user) { // 登录成功
      // 生成一个cookie，并交给浏览器保存
      res.cookie('userid', user._id, { maxAge: 1000*60*60*24 })
      // 返回登录信息，包含user
      res.send({ code: 0, data: user})
    } else { // 登录失败
      res.send({ code: 1, msg: '用户名或密码不正确！'})
    }
  })
})

// 更新用户信息的路由
router.post('/update', function(req, res) {
  // console.log('cookies: ',  req.cookies)
  // 获取cookie携带的userid
  const userid = req.cookies.userid 
  // console.log('userid: ', userid)
  // 获取提交的用户数据
  // 对用户userid进行判断， 如果不存在，就说明用户还没登录
  if (!userid) {
    res.send({code: 1, msg: '请先登录'})
  } else {
    // 用户已登录，根据userid更新对应的user信息
    const user = req.body 
  // console.log('user: ', user) // 这里面是没有_id的
  // user 里面是用户提交的header头像等信息
    UserModel.findByIdAndUpdate({ _id: userid }, user, function(err, oldUser) {
      // console.log('oldUser', oldUser)
      // oldUser里面有_id, username, password, type等信息
      // 如果登录失效，则oldUser就不存在了。
      // 这时候需要提醒浏览器删除cookie携带的userid
      // 所以 这里需要对oldUser做个判断
      if (!oldUser) { // 不存在
        res.clearCookie('userid')
        res.send({code: 1, msg: '请先登录'})
      } else { // 存在
        const { _id, username, type } = oldUser
        // 做用户信息合并，把user里的header头像等新数据，和登录数据进行合并
        const data = Object.assign({ _id, username, type }, user)
        res.send({ code: 0, data })
      }
    })
  }
})

// 根据cookie中的userid， 获取用户信息的路由
router.get('/user', (req, res) => {
  // 获取cookie携带的userid
  const userid = req.cookies.userid 
  if (!userid) {
    res.send({code: 1, msg: '请先登录'})
  } else {
    UserModel.findOne({ _id: userid }, filter, (err, user) => {
      res.send({code: 0, data: user })
    })
  }
})

// 根据用户类型，获取用户列表信息
router.get('/userlist', (req, res) => {
  const { type } = req.query
  console.log({type})
  UserModel.find({ type }, filter, (err, users) => {
    res.send({ code: 0, data: users })
  })
})

// 获取当前用户所有相关聊天信息的列表
router.get('/msglist', (req, res) => {
  // 获取cookie中的userid
  const userid = req.cookies.userid 
  // 查询得到所有user文档数组
  UserModel.find((err, userDocs) => {
    // 用对象储存所有的user信息： key是user的_id，
    // val是name和header组成的user对象
    const users = {}
    userDocs.forEach(doc => {
      users[doc._id] = { username: doc.username, header: doc.header }
    })
    /*
    查询userid相关的所有聊天信息
    参数1： 查询条件
    参数2： 过滤条件
    参数3： 回调函数
    */
   // $or 是mongoDB逻辑操作符
   ChatModel.find({ '$or': [{ from: userid }, { to: userid }]}, filter, (err, chatMsgs) => {
     // 返回包含所有用户和当前用户相关的聊天消息数据
     res.send({ code: 0, data: { users, chatMsgs }})
   })
  })
})

// 修改指定消息为已读
router.post('/readmsg', (req, res) => {
  // 得到请求中的from 和 to
  const from = req.body.from 
  const to = req.cookies.userid 
  /*
  更新数据库中的chat数据
  参数1： 查询条件
  参数2： 更新为指定的数据对象
  参数3： 是否1次更新多条， 默认只更新一条
  参数4： 更新完成的回调函数
  */
 ChatModel.update({ from, to, read: false }, {read: true }, { multi: true }, (err, doc) => {
   console.log('/readmsg', doc)
   res.send({ code: 0, data: doc.nModified }) // 更新的数量
 })
})


module.exports = router;
