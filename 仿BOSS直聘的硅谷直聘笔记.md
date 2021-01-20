# 仿BOSS直聘的硅谷直聘笔记

#### 1，检查是否安装了node

- 方法：打开`CMD`，输入命令`node -v`，查看是否显示版本号，如果显示，说明已安装。如果不显示，则需要[重新安装](https://blog.csdn.net/tuzi007a/article/details/106934610)

#### 2，检查是否装了Mongodb

- 方法： 打开`任务管理器`，点击`服务`，看是否有在运行的Mongodb。

  ![image-20200902090712023](C:\Users\Shinelon\AppData\Roaming\Typora\typora-user-images\image-20200902090712023.png)	

#### 3，小知识--前后端为啥简称CS

- C是`client`前端的首字母，S是`serve`后端的首字母。所以放一起就简称`CS`。

### 4、项目准备

#### 4.1项目描述

- 项目是做了一个前后端分离的仿BOSS直聘的SPA，包括前端应用和后端应用
- 包括用户注册/登录，大神/老板列表，实时聊天等模块
- 前端：使用React全家桶+ES6+Webpack等技术
- 后端：使用Node+express+mongodb+socketIO等技术
- 采用模块化、组件化、工程化的模式开发

#### 4.2 项目功能界面

#### 4.3 技术选型

![image-20200902095008931](C:\Users\Shinelon\AppData\Roaming\Typora\typora-user-images\image-20200902095008931.png)	

**注：**项目构建/工程化下面的那一项，应该是`create-react-app`。图里写错了。

#### 4.4 前端路由拆分

- ##### 注册

  - path：`/register`
  - 组件： `Register.js`

- ##### 登录

  - path: `/login`
  - 组件： `Login.js`

- ##### 主界面`main.js`

  - ###### 老板界面

    - path: `/laoban`
    - 组件： `Laoban.js`

  - ###### 大神界面

    - path: `/dashen`
    - 组件： `Dashen.js`

  - ###### 消息列表界面

    - path: `/message`
    - 组件： `Message.js`

  - ###### 个人中心界面

    - path: `/personal`
    - 组件： `Personal.js`

  - ###### 老板信息完善界面

    - path: `/laobaninfo`
    - 组件： `LaobanInfo.js`

  - ###### 大神信息完善界面

    - path: `/dasheninfo`
    - 组件： `DashenInfo.js`

  - ###### 聊天界面

    - path: `/chat/:userid`
    - 组件： `Chat.js`

#### 4.5 API接口

![image-20200902101215989](C:\Users\Shinelon\AppData\Roaming\Typora\typora-user-images\image-20200902101215989.png)	

- 接口的组成部分
  - URL
  - 请求方式 Get/Post
  - 参数
  - 响应数据的格式

#### 4.6 流程与开发

- 熟悉一个项目的完整开发流程
- 学会模块化、组件化、工程化的开发模式
- 使用`create-react-app`脚手架初始化react项目开发
- 使用`node + express + mongoose + mongodb`搭建后台开发

#### 4.7 React插件和第三方库

- `react-router-dom`开发单页应用
- `axios`与后端进行数据交互
- `redux + react-redux + redux-thunk`管理应用组件状态
- `antd-mobile`组件库构建界面
- `mongoose`操作`mongodb`数据库
- `express`搭建后台路由
- `socket.io`实现实时通信
- `blueimp-md5`对密码进行`MD5`加密处理
- `js-cookies`操作浏览器端`cookie`数据

### 五、项目开发阶段

#### 5.1 搭建react脚手架

- 安装脚手架： `npm install -g create-react-app`（已安装的可以跳过）

- 用脚手架创建项目`create-react-app ggzhipin-client`
- 进入项目文件`cd ggzhipin-client`
- 启动项目`npm start` 这时候能正常显示react官网，说明搭建成功。

#### 5.2 项目前端目录设计

- 删除`src`文件夹里的`所有文件`，然后重新创建项目需要的目录

  ![image-20200902104759516](C:\Users\Shinelon\AppData\Roaming\Typora\typora-user-images\image-20200902104759516.png)	

  

#### 5.3 解包脚手架，less配置，装antd-mobile及其按需加载，请查看[该博客的第5和12条](https://blog.csdn.net/tuzi007a/article/details/108192596)

#### 5.4 引入路由

- 安装：`npm install --save react-router-dom`
- 在`src/container`里写入注册、登录、主页的路由组件

#### 5.5 引入redux

- 安装**redux**： `npm install redux`
- 安装**react-redux**： `npm install react-redux`
- 安装**redux-thunk**： `npm install redux-thunk`
- 还要安装一个调试工具，但是这个调试工具的官方文档更新了，我这里不显示，还要再研究研究。
- 在`redux`文件夹，创建`action.js / action-types / reducer.js / store.js`这四个文件

#### 5.6 Logo组件

#### 5.7 Register注册组件

#### 5.8 Login登录组件

### 六、搭建后台应用

#### 6.1 创建`node + express`应用

- 到[node官网](https://nodejs.org/en/)下载node
- 安装node，一路next即可。
- 安装express： `npm install express -g`
- 安装express脚手架： `npm install express-generator -g`
- 安装好后，在`ggzhipin-client`文件夹的同一个根目录下，创建后台项目文件夹： `express ggzhipin-serve`，生成一个`ggzhipin-serve`的文件夹。里面有`bin, public, routes, views`等文件夹。但是还没有`node_modules`文件夹
- `cd ggzhipin-serve`
- 在`ggzhipin-serve`文件夹里，打开`CMD`，输入命令`npm install`，生成`node_modules`文件夹
- `npn start`就可以执行了
- 把`bin/www`文件里的`3000`端口改为`4000`，前后端分离，方便查看对应端口的渲染效果

#### 6.2 测试接口工具 Postman

- 下载安装
  - [Postman官网免费版下载](https://www.postman.com/downloads/)
  - 下载后傻瓜安装即可

- 测试使用

  - 在`routes/index.js`文件里，写下测试代码

  ```js
  // 测试： 定义一个路由，实现用户注册
  /*
  a) path为 /register
  b) 请求方式为post
  c) 接收username和password参数
  d) admin是已注册用户
  e) 注册成功，返回： { code:0, data: { _id: 'abc', username: 'xxx', password: 'xxx' } }
  f) 注册失败，返回： {code: 1, msg: '此用户已存在'}
  */ 
  router.post('/register', (req, res) => {
    /* 1，获取请求参数
       2，处理
       3，返回响应数据 */
    const {username, password} = req.body
    if (username === 'admin') {
      res.send({code: 1, msg: '此用户已存在'})
    } else {
      res.send({ code: 0, data: { id: 'abc', username, password } })
    }
  })
  ```

  - 启动服务： `npm start`

  - 打开`Postman`，开启测试。操作步骤如图：

    ![image-20200903112443718](C:\Users\Shinelon\AppData\Roaming\Typora\typora-user-images\image-20200903112443718.png)

  - 在`Postman`中，如何写接口

    ![image-20200903112649614](C:\Users\Shinelon\AppData\Roaming\Typora\typora-user-images\image-20200903112649614.png)	左边是创建一个项目文件夹，右边是创建一个接口，存放在这个项目文件夹中。方便随时查看和测试。

#### 6.3 后台应用自动重运行

- 每次修改后端的代码，都要关掉运行命令，重新`npm start`，相当麻烦。所以需要自动重运行。
- 解决：使用`nodemon`包
- 安装： `npm install nodemon -g`
- 配置：打开项目中`package.json`文件，把这里的`node`换成`nodemon`，即 `"start": "nodemon ./bin/www"`
- 测试： 关闭之前的`npm start`，重新运行`npm start`，修改后端代码，会自动重新运行，表示安装和配置成功。

#### 6.4 使用mongoose操作数据库mongodb

- 下载安装非关系型数据库`mongodb`，操作数据库的`mongoose`，以及一些增删改查的应用。请查看博客：[node知识整理](https://blog.csdn.net/tuzi007a/article/details/106934610)，可以在博客里直接`ctrl + f`搜索'mongo'直接查看。

- 安装给密码加密的库： `npm install blueimp-md5`

- 测试`mongoose`是否可以正常使用

  ```js
  // 在ggzhipin-serve下创建db文件夹，接着在db文件夹里创建db-test.js文件
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
  // 在db文件夹里打开控制台，输入node db-test.js，测试数据库是否连接成功
  
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
  testRemove()
  
  // 注： 这里的增删改查知识其中的一个方法而已，还有其他方法，可以查看博客的内容。
  // 注意增加集合，create（）方法和save（）的区别。
  // 注意： 只有保存集合，用的是userModel，也就是UserModel生成的实例
  // 查找，更新，和删除集合，都是用的UserModel本身。
  ```

- 补充关于`mongoose`可视化的应用
  - 我没有找到合适的插件，我用的是mongo自带的可视化工具`MongoDB Compass`。这个工具是下载`Mongodb`的时候，顺带下载安装的
  - 直接打开这个工具，然后连接，即可使用。

#### 6.5 进入项目，开始连接数据库，并向外暴露集合

- 在`db`文件夹下，创建文件`models.js`，用于连接数据库，并向外暴露集合
- 在该文件内，写入连接数据库和向外暴露集合的代码。

#### 6.6 写注册路由

- 在`routes`文件夹的`index.js`中
- `UserModel`在`models.js`文件里已经暴露出来了，要拿到这里用，所以要先引入`const UserModel = require('../db/models').UserModel`或者`const { UserModel } = require('../db/models')`
- 引入给密码加密的`blueimp-md5`包： `const md5 = require('blueimp-md5')`
- 读取请求参数数据，因为是`POST`请求，所以要用`req.body`拿到需要的数据
- 处理：先判断用户是否存在
  - 如果用户已存在
  - 返回提示错误信息
  - 如果用户不存在，说明注册有效，需要保存注册的用户数据
  - 同时，要记得在保存时，给用户的密码进行`md5`加密处理
  - 在发送响应数据之前，先生成一个`cookie`给浏览器保存，其中的`maxAge`用来表示cookie存活的时间，单位是毫秒。
  - 在发送响应的数据中，不要携带携带密码。
- ~~引入`const ObjectId = require('mongodb').ObjectId`来转换后台id的数据类型~~
  
- 测试注册路由是否成功： `npm start`。

#### 6.7 写登录路由

#### 6.8 回到ggzhipin-client，注册/登录的前端处理

- 安装axios： `npm install axios`
- 在`src/api/ajax.js`里写ajax请求函数
- 在`src/api/index.js`里写注册、登录、更新用户信息的接口
- redux管理状态
  - `npm install redux`
  - `npm install react-redux`
  - `npm install redux-thunk`
  - `npm install redux-devtools-extension -D` （开发环境显示redux状态的谷歌应用插件）
- 写入代理，解决跨域问题

  - 在`ggzhipin-client/package.json`文件里，写入代理`"proxy": "http://localhost:4000"`。让代理实现在前后端端口的连接。4000是服务器的端口号。![image-20200905162147286](C:\Users\Shinelon\AppData\Roaming\Typora\typora-user-images\image-20200905162147286.png)

  - 代理实现连接的原理是，前端发起请求，被代理拦截，代理把这个请求转发给客户端。客户端把响应给到代理，代理再把响应传给前端。就完成了一次请求响应。
- 处理注册提示信息，错误信息可以在页面显示
- 处理登录提示信息，错误信息可以在页面显示

#### 6.9 实现user（老板和大神页面）信息完善功能

- 下载依赖包： `npm install js-cookie`
- 在`components`文件夹，分别创建老板和大神组件
- 收集老板/大神完善的信息
- 安装: `npm install prop-types`
- 导出的两种方法(`export`和`export default`)的应用和区别
  - `export `导出的数据，用`import`引入时，需要加大括号{}
  - 同一个文件里，可以`export`多个数据
  - `export default` 导出的数据，用`import`引入时，不需要加大括号{}
  - 同一个文件里，只能有一个`export default`

```js
// export用法举例
// index.js文件
export function add(x, y) {
    return x + y
}
export function sayHello() {
    return 'hello'
}
// 在另一个文件里引入
import { add, sayHello } from './index'

--------------

// export default 用法
// index.js文件
export default function add(x, y) {
    return x + y
}
// 在另一个文件里引入
import add from './index'
```

#### 6.10 前后端交互，实现保存用户信息更新功能

- 先写后端的
- 在`routes/index.js`文件里，写路由，请求方式`POST`，请求路径`/update`
- 因为需要往信息里面加`_id`，所以需要从请求的`cookie`中，获取`userid`，`const userid = req.cookies.userid`
- 这里有一种情况，就是用户没有登录，所以就不存在cookie，所以这里需要先判断一下cookie里的userid是不是存在。如果没登录，就响应提示请先登录。
- 如果登录过，就要先判断一下，老的数据`oldUser`是否存在。如果不存在，说明登录失效，数据没有更新成功，就要通知浏览器，删除`cookie`的`userid`数据`res.clearCookie('userid')`。然后提示用户重新登录。
- 如果老的数据`oldUser`存在，则做对象深拷贝，user里面没有_id, username, type，要把这三个数据覆盖给user。

#### 6.11 前端写ajax更新用户接口

- `export const reqUpDateUser = (user) => ajax('/update', user, 'POST')` ，ajax参数分别是路径，要更新的信息，请求方法

#### 6.12 前端写redux更新状态

- `redux/action.js` 写异步保存用户更新信息的action
- 老板/大神完善信息界面，点击保存，自动重定向到老板/大神界面
- 在主页面，判断一下，如果没有userid，则自动重定向到登录界面

#### 6.13 搭建整体界面

- 项目说明： 如果登录用户是老板，则看到的是大神列表，路径是`/dashen` ，如果登录用户是大神，则看到的是老板列表，路径是`/laoban` 。
- 为了方便读取cookie中的userid，安装包： `npm install js-cookie --save`。 js-cookie是一个可以操作前端cookie的包
- 

添加聊天页面的动画效果

- 下载依赖包 `npm install rc-queue-anim` 

















































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































