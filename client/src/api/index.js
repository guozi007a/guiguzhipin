/*
包含了n个接口请求的函数模块
函数返回值是 promise
*/

import ajax from './ajax'

// 注册接口
export const reqRegister = (user) => ajax('/register', user, 'POST')
// 登录接口
export const reqLogin = ({ username, password }) => ajax('/login', { username, password }, 'POST')
// 更新用户接口
export const reqUpDateUser = (user) => ajax('/update', user, 'POST')
// 获取用户信息接口
export const reqUser = () => ajax('/user', 'GET')
// 获取用户列表信息
export const reqUserList = (type) => ajax('/userlist', { type }, 'GET')
// 获取当前用户的聊天消息列表
export const reqChatMsgList = () => ajax('/msglist')
// 修改指定消息为已读
export const reqReadMsg = (from) => ajax('/readmsg', { from }, 'POST')
