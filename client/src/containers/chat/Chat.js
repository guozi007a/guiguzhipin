import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavBar, List, InputItem, Grid, Icon } from 'antd-mobile'
import { sendMsg, readMsg } from '../../redux/action'
import QueueAnim from 'rc-queue-anim'

const Item = List.Item

class Chat extends Component {

    state = {
        content: '',
        isShow: false // 是否显示表情列表，false为不显示
    }
    componentWillMount() {
        // 初始化表情列表数据
        const emojis = ['😃', '😄', '😅', '😊', '😇','😃', '😄', '😅', '😊', '😇','😃', '😄', '😅', '😊', '😇','😃', '😄', '😅', '😊', '😇',]
        this.emojis = emojis.map(emoji => ({ text: emoji }))
    }
    componentDidMount() {
        // 初始化显示列表 让聊天列表显示出底部内容
        window.scrollTo(0, document.body.scrollHeight + 45)
    }
    componentDidUpdate() {
        // 更新显示列表 发消息后 让消息列表自动往下滚动 把最新消息内容显示出来
        window.scrollTo(0, document.body.scrollHeight + 45)
    }
    componentWillUnmount () {
        // 发请求更新消息的未读状态
        const from = this.props.match.params.userid
        const to = this.props.user._id
        this.props.readMsg(from, to)
    }

    toggleShow = () => {
        const isShow = !this.state.isShow
        this.setState({ isShow })
        if(isShow) {
            // 异步手动派发resize事件，解决表情列表显示的bug
            setTimeout(() => {
                window.dispatchEvent(new Event('resize'))
            }, 0)
        }
    }
    handleSend = () => {
        // 谁发送的消息
        const from = this.props.user._id
        // 发送给谁的消息
        const to = this.props.match.params.userid 
        // 发送了什么消息
        const content = this.state.content.trim()
        // 异步发送请求（发消息）
        if (content) {
            this.props.sendMsg({ from, to, content })
        }
        // 发送完消息后，要清除掉输入的消息内容
        this.setState({
            content: '' ,
            isShow: false
        })
    }
    render() {
        const { user } = this.props
        const { users, chatMsgs } = this.props.chat 

        // 根据自己的id，和聊天对象的id，得到当前聊天的chatId
        const myId = user._id 
        if(!users[myId]) {
            return null 
        }
        const targetId = this.props.match.params.userid 
        const chatId = [myId, targetId].sort().join('_')

        // 这里的chatMsgs是所有聊天信息， 所以要进行过滤
        // 把当前的聊天信息筛选出来
        const msgs = chatMsgs.filter(msg => msg.chat_id === chatId)

        // 得到目标用户的头像header
        const targetHeader = users[targetId].header
        const targetIcon = targetHeader ? require(`../../assets/images/${ targetHeader }.png`) : null

        return (
            <div id='chat-page' >
                <NavBar 
                    className='sticky-header' 
                    style={{ backgroundColor:"#109C82" }}
                    icon={ <Icon type='left' /> } 
                    onLeftClick={ () => this.props.history.goBack() }
                    >
                    { users[targetId].username }
                </NavBar>
                <List style={{ marginTop: '45px', marginBottom: '45px' }} >
                    <QueueAnim>
                        {
                            msgs.map(msg => {
                                if(myId === msg.to) { // 对方发给我的
                                    return (
                                        <Item key={ msg._id }
                                            thumb={ targetIcon }
                                            wrap
                                        >
                                            { msg.content }
                                        </Item>
                                    )
                                } else { // 我发给对方的
                                    return (
                                        <Item key={ msg._id }
                                            className='chat-me'
                                            extra='我' 
                                            wrap
                                        >
                                            { msg.content }
                                        </Item>
                                    )
                                }
                            })
                        }
                    </QueueAnim>
                </List>
                <div className='am-tab-bar' >
                    <InputItem
                        placeholder='请输入'
                        onChange = { val => this.setState({ content: val }) }
                        onFocus={ () => this.setState({ isShow: false })}
                        value={ this.state.content }
                        extra={
                            <span>
                                <span onClick={ this.toggleShow } style={{ marginRight: '5px' }} >😀</span>
                                <span onClick={ this.handleSend } >发送</span>
                            </span>
                        }
                    />
                    {
                        this.state.isShow ? (
                            <Grid 
                                data={ this.emojis }
                                columnNum={ 8 }
                                carouselMaxRow={ 4 }
                                isCarousel={ true }
                                onClick={ item => {
                                    this.setState({ content: this.state.content + item.text })
                                }}
                            />
                        ) : null 
                    }
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({ user: state.user, chat: state.chat }),
    {sendMsg, readMsg}
)(Chat)
