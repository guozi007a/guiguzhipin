/*
包含n个action creator
异步action
同步action
*/
import { reqRegister, reqLogin, reqUpDateUser, reqUser, reqUserList, reqChatMsgList, reqReadMsg } from '../api/index'
import { AUTH_SUCCESS, ERROR_MSG, RECEIVE_USER, RESET_USER, RECEIVE_USER_LIST, RECEIVE_MSG_LIST,RECEIVE_MSG, MSG_READ } from './action-types'
import io from 'socket.io-client'


// 授权成功的同步action
const authSuccess = (user) => ({ type: AUTH_SUCCESS, data: user })
// 错误提示信息的同步action
const errMsg = (msg) =>({ type: ERROR_MSG, data: msg })
// 接收用户信息的同步action
const receiveUser = (user) => ({ type: RECEIVE_USER, data: user })
// 重置用户信息的同步action
 export const resetUser = (msg) => ({ type: RESET_USER, data: msg })
 // 接收用户列表信息的同步action
const receiveUserList = (userList) => ({ type: RECEIVE_USER_LIST, data: userList })
 // 接收消息列表的同步action
const receiveMsgList = ({ users, chatMsgs, userid }) => ({ type: RECEIVE_MSG_LIST, data: { users, chatMsgs, userid }})
 // 接收单个消息列表的同步action
const receiveMsg = (chatMsg, userid) => ({ type: RECEIVE_MSG, data: { chatMsg, userid } })
// 已读某个消息的同步action
const msgRead = ({count, from, to}) => ({ type: MSG_READ, data: {count, from, to}})

// 注册异步action
export const register = (user) => {
    const { username, password, password2, type } = user
    // 表单的前台验证
    // 如果不通过，返回一个errMsg的同步action
    if (!username) {
        return errMsg('用户名不能为空！')
    } else if (password !== password2) {
        return errMsg('2次输入密码不一致，请重新确认！')
    }
    // 表单数据都正确，返回一个发ajax请求的异步action函数
    return async dispatch => {
        // 发送异步ajax请求
        // await等待一下 拿到响应结果
        // 写了await语句，他的函数就加上async 这就算异步的写法
        const res = await reqRegister(/* user */{ username, password, type })
        const result = res.data
        if (result.code === 0) { // 成功
            getMsgList(dispatch, result.data._id)
            // 分发授权成功的同步action 
            dispatch(authSuccess(result.data))
        } else { // 失败
            // 分发错误提示信息的同步action
            dispatch(errMsg(result.msg))
        }
    }
}

// 登录异步action
export const login = (user) => {
    const { username, password } = user
    // 做表单的前端检查，如果不通过，返回一个errMsg的同步action
    if (!username) {
        return errMsg('用户名不能为空！')
    } else if (!password) {
        return errMsg('密码不能为空-_-')
    }
    return async dispatch => {
        // 发送异步ajax请求
        // await等待一下 拿到响应结果
        // 写了await语句，他的函数就加上async 这就算异步的写法
        const res = await reqLogin(user)
        const result = res.data
        if (result.code === 0) { // 成功
            getMsgList(dispatch, result.data._id)
            // 分发授权成功的同步action 
            dispatch(authSuccess(result.data))
        } else { // 失败
            // 分发错误提示信息的同步action
            dispatch(errMsg(result.msg))
        }
    }
}

// 异步保存用户更新信息的action
export const updateUser = (user) => {
    return async dispatch => {
        const res = await reqUpDateUser(user)
        const result = res.data 
        if (result.code === 0) { // 更新成功
            dispatch(receiveUser(result.data))
        } else { // 更新失败
            dispatch(resetUser(result.msg))
        }
        
    }
}

// 获取用户异步action
export const getUser = () => {
    return async dispatch => {
        const res = await reqUser()
        const result = res.data 
        if (result.code === 0) { // 成功
            getMsgList(dispatch, result.data._id)
            dispatch(receiveUser(result.data))
        } else {
            dispatch(resetUser(result.msg))
        }
    }
}

// 获取用户列表的异步action
export const getUserList = (type) => {

    return async dispatch => {
        // 执行异步ajax请求
        const res = await reqUserList(type)
        const result = res.data
        // 得到结果后，分发一个同步的action
        if (result.code === 0) {
            dispatch(receiveUserList(result.data))
        } 
    }
}

/*
因为连接服务器，只需要连接一次，也就是只需要创建一次socket对象
但是 调用initIo函数时 每次调用都会创建一次 
所以 这里要用到单例对象
应用方法：
1，创建socket对象之前：
    判断对象是否已经创建（即存在）。 只有在对象还没有创建，才去创建这个对象
2，创建socket对象之后：
    保存对象
*/
function initIo(dispatch, userid) {
    if (!io.socket) {
        // 连接服务器，得到代表连接客户端和服务端的socket对象
        io.socket = io('ws://localhost:4000')
        // 绑定receiveMsg的监听，来接收服务器发送的消息
        io.socket.on('receiveMsg', function(chatMsg) {
            console.log('浏览器端接收到消息', chatMsg)
            // 只有当chatMsg是与当前用户相关的消息，才去分发同步action保存消息
            if(userid === chatMsg.from || userid === chatMsg.to) {
                dispatch(receiveMsg(chatMsg, userid))
            }
        })
    }   
}

// 异步获取消息列表数据
async function getMsgList(dispatch, userid) {
    initIo(dispatch, userid)
    const res = await reqChatMsgList()
    const result = res.data 
    if(result.code === 0) {
        const { users, chatMsgs } = result.data 
        // 分发同步action
        dispatch(receiveMsgList({ users, chatMsgs, userid }))
    }
}

// 发送消息的异步action
export const sendMsg = ({ from, to, content }) => {
    return dispatch => {
        console.log('客户端向服务器发送消息', { from, to, content })
        // 用io.socket向服务器发消息
        io.socket.emit('sendMsg', { from, to, content })
    }
}

// 读消息的异步action
export const readMsg = (from, to) => {
    return async dispatch => {
        const res = await reqReadMsg(from)
        const result = res.data
        if(result.code === 0) {
            const count = result.data 
            dispatch(msgRead({count, from, to}))
        }
    }
}
