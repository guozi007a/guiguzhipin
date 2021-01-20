import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import LaobanInfo from '../laoban-info/LaobanInfo'
import DashenInfo from '../dashen-info/DashenInfo'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'
import { getRedirectTo } from '../../utils/index'
import { getUser } from '../../redux/action'
import  Dashen  from '../dashen/Dashen'
import  Laoban  from '../laoban/Laoban'
import  Personal  from '../personal/Personal'
import  Message  from '../message/Message'
import  NotFound  from '../../components/not-found/NotFound'
import { NavBar } from 'antd-mobile'
import NavFooter from '../../components/nav-footer/NavFooter'
import Chat from '../chat/Chat'

// 主界面路由组件
class Main extends Component {
    navList = [
        {
            path: '/laoban', // 路由路径
            component: Laoban, // 路由组件
            title: '大神列表', // 顶部标题
            icon: 'dashen', // 底部图标
            text: '大神' // 底部文本
        },
        {
            path: '/dashen',
            component: Dashen,
            title: '老板列表',
            icon: 'laoban',
            text: '老板'
        },
        {
            path: '/message',
            component: Message,
            title: '消息列表',
            icon: 'message',
            text: '消息'
        },
        {
            path: '/personal',
            component: Personal,
            title: '个人中心',
            icon: 'personal',
            text: '个人中心'
        }
    ]
    componentDidMount() { // 组件的异步请求都写在这里面
        // 登录过，cookie中有userid了，但是关闭了浏览器，user中没有了_id
        // 要发请求，获取user
        const userid = Cookies.get('userid')
        const { _id } = this.props.user
        if (userid && !_id) {
            // 发送异步请求，获取user信息
            // console.log('send ajax')
            this.props.getUser()
        }

    }
    render() {
        /*
        1，实现自动登录
         - 如果cookie中有userid，发请求获取对应的user，暂时不做任何显示
         - 如果cookie中没有userid，自动进入login登录页面
        2，如果已经登录，但是请求路径是'/'根路径
        根据user的type和header来计算出一个重定向的路由路径并自动重定向
        */
        // 读取cookie中的userid
        const userid = Cookies.get('userid')
        // 判断userid是否存在 如果没有，就重定向到登录界面
        if (!userid) {
            return <Redirect to='/login' />
        }
        // 如果有userid，读取redux中的user状态
        const { user, unReadCount } = this.props
        // 判断user中是否有_id
        if (!user._id) {
            return null 
        } else {
            // 如果请求的是根路径，就根据user的type和header来计算出一个重定向的路由路径并自动重定向
            // 获取请求路径
            let path = this.props.location.pathname
            // 对获取的路径进行判断，看请求路径是不是根路径
            if (path === '/') {
                // 把重定向的路径 给path
                path = getRedirectTo(user.type, user.header)
                return <Redirect to={ path } />
            }
        }

        const { navList } = this  // 即 const navList = this.navList
        const path = this.props.location.pathname // 请求路径
        const currentNav = navList.find( nav =>  nav.path === path )
        // 解决底部导航栏显示老板/大神问题
        if (currentNav) {
            // 在底部导航栏显示老板还是大神，根据用户登录类型type进行判断
            if(user.type === 'laoban') {
                // 就把数组中的第2个即大神 隐藏掉
                navList[1].hide = true 
            } else {
                navList[0].hide = true 
            }
        }
        return (
            <div>
                {
                    currentNav ? <NavBar className='sticky-header' style={{ backgroundColor:"#109C82" }} >{ currentNav.title }</NavBar> : null
                }
                <Switch>
                    {
                        navList.map(nav => 
                            <Route key={nav.path} path={ nav.path }  component={ nav.component } />
                            )
                    }
                    <Route path='/laobaninfo' component={ LaobanInfo } />
                    <Route path='/dasheninfo' component={ DashenInfo } />
                    <Route path='/chat/:userid' component={ Chat } />
                    <Route component={ NotFound } />
                </Switch> 
                {
                    currentNav ? <NavFooter navList={ navList } unReadCount={unReadCount} /> : null
                }  
            </div>
        )
    }
}

export default connect(
    state => ({ user: state.user, unReadCount: state.chat.unReadCount }), 
    { getUser }
)(Main)
