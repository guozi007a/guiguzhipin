/*
消息主界面路由组件
*/
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, Badge } from 'antd-mobile' // Badge是微图标
// import { Brief } from 'antd-mobile/lib/list/ListItem'

const Item = List.Item
const Brief = Item.Brief

function getLastMsgs(chatMsgs, userid) {
    // 1，找到每个聊天的lastMsg，并用一个对象容器来保存{chat_id，lastMsg }
    const lastMsgObjs = {}
    chatMsgs.forEach(msg => {
        // 对msg进行个体的统计
        if(msg.to === userid && !msg.read) {
            msg.unReadCount = 1
        } else {
            msg.unReadCount = 0
        }

        const chatId = msg.chat_id
        let lastMsg = lastMsgObjs[chatId]
        if(!lastMsg) {
            lastMsgObjs[chatId] = msg
        } else {
            // 累计未读量 = 保存已经统计的未读数量 + 当前msg的未读数量
            const unReadCount = lastMsg.unReadCount + msg.unReadCount
            if(msg.create_time > lastMsg.create_time) {
                lastMsgObjs[chatId] = msg
            }
            // 把unReadCount保存在最新的lastMsg里
            lastMsgObjs[chatId].unReadCount = unReadCount 
        }
    })
    // 2，得到所有lastMsg的数组
    const lastMsgs = Object.values(lastMsgObjs)
    // 3，对数组按create_time进行降序排序
    lastMsgs.sort(function (m1, m2) {
        // sort排序及使用 https://www.cnblogs.com/panax/p/11045538.html
        return m2.create_time - m1.create_time
    })
    return lastMsgs
}

class Message extends Component {
    render() {
        const { user } = this.props
        const { users, chatMsgs } = this.props.chat
        // 对chatMsgs按照chat_id进行分组
        const lastMsgs = getLastMsgs(chatMsgs, user._id)
        return (
            <List style={{ marginTop: '45px', marginBottom: '45px' }} >
                {
                    // 把lastMsgs显示出来
                    lastMsgs.map(msg => {
                        // console.log(msg)
                        // 得到目标用户的id
                        const targetUserId = msg.to === user._id ? msg.from : msg.to
                        // 得到目标用户的信息 header username
                        const targetUser = users[targetUserId]
                        // console.log(targetUser)
                        return (
                            <Item key={ msg._id }
                                extra={ <Badge text={ msg.unReadCount } /> }
                                thumb={ targetUser.header ? require(`../../assets/images/${ targetUser.header }.png`) : null }
                                arrow='horizontal'
                                onClick={ () => this.props.history.push(`/chat/${ targetUserId }`) }
                                >
                                { msg.content }
                                <Brief>{ targetUser.username }</Brief>
                            </Item>
                        )
                    })
                }
            </List>
        )
    }
}

export default connect(
    state => ({ user: state.user, chat: state.chat }),
    {}
)(Message)
