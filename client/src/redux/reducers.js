import { combineReducers } from 'redux'
import { AUTH_SUCCESS, ERROR_MSG, RECEIVE_USER, 
    RESET_USER, RECEIVE_USER_LIST, RECEIVE_MSG_LIST,
    RECEIVE_MSG, MSG_READ
} from './action-types'
import { getRedirectTo }  from '../utils/index'



const initUser = {
    username: '', // 用户名
    type: '', // 用户类型 dashen/laoban
    msg: '', // 错误提示信息
    redirectTo: '', // 需要自动重定向的路由路径
}
// 产生user状态的redux
// 仓库管理员必须是个函数
function user(state=initUser, action) {
    switch (action.type) {
        case AUTH_SUCCESS: // data是user
            const { type, header } = action.data
            return { ...action.data, redirectTo: getRedirectTo(type, header) }
        case ERROR_MSG: // data是msg
            return { ...state, msg: action.data }
        case RECEIVE_USER:
            return action.data 
        case RESET_USER:
            return { ...initUser, msg: action.data }
        default:
            return state
    }
}

// 产生userlist状态的reducer
const initUserList = []
function userList(state=initUserList, action) {
    switch (action.type) {
        case RECEIVE_USER_LIST: 
            return action.data 
        default:
            return state 
    }
}

const initChat = {
    users: {}, // 所有用户信息的对象
    chatMsgs: [], // 当前用户所有相关msg的数组
    unReadCount: 0 // 总的未读数量
}
// 产生聊天状态的reducer
function chat(state=initChat, action) {
    switch(action.type) {
        case RECEIVE_MSG_LIST:
            const { users, chatMsgs, userid } = action.data 
            return {
                users,
                chatMsgs,
                unReadCount: chatMsgs.reduce((preTotal, msg) => preTotal + (!msg.read && (msg.to === userid)  ? 1 : 0), 0)
            }
        case RECEIVE_MSG:
            const { chatMsg } = action.data
            return {
                users: state.users,
                chatMsgs: [...state.chatMsgs, chatMsg],
                unReadCount: state.unReadCount + (!chatMsg.read && (chatMsg.to === action.data.userid)  ? 1 : 0)
            }
        case MSG_READ:
            const { count, from ,to } = action.data
            state.chatMsgs.forEach(msg => {
                if(msg.from === from && msg.to === to && !msg.read) {
                    msg.read = true
                }
            })
            return {
                users: state.users,
                chatMsgs: state.chatMsgs.map(msg => {
                    if(msg.from === from && msg.to === to && !msg.read) { // 满足条件需要改的
                        msg.read = true
                        return { ...msg, read: true }
                    } else { // 不需要改的
                        return msg
                    }
                }),
                unReadCount: state.unReadCount - count
            }
        default:
            return state
    }
}


export default combineReducers({ 
    user,
    userList,
    chat
 })
// 向外暴露的状态结构是 { user: {}, userList: [], chat: {} }
