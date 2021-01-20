// 登录路由组件

import React, { Component } from 'react'
import {
    NavBar,
    WingBlank,
    List,
    InputItem,
    WhiteSpace,
    Button
} from 'antd-mobile'
import Logo from '../../components/logo/Logo'
import { connect } from 'react-redux'
import { login } from '../../redux/action'
import '../../assets/styles/css/index.less'
import { Redirect } from 'react-router-dom' // 引入重定向路由组件

// const ListItem = List.Item

class Login extends Component {

    state = {
        username: '', // 用户名
        password: '', // 密码
    }

    login = () => {
        // console.log(this.state)
        this.props.login(this.state)
    }
    // 处理输入数据的改变 更新对应的状态
    handleChange = (name, val) => {
        // 更新状态
        // console.log(val)
        // 这里的val就是e.target.value
        this.setState({
            [name]: val // 属性名不是name，而是name变量的值
        })
    }
    toRegister = () => {
        // 这里可以用push 或者 replace
        // push有浏览记录，返回的上一个浏览界面
        // replace没有浏览记录，直接返回到了主页面了
        this.props.history.replace('/register')
    }
    render() {
        // redirectTo是仓库管理员user里面的，所以redirectTo要放在这里引入
        const { msg, redirectTo } = this.props.user
        // 做个判断  如果注册成功 redirectTo就有值， 就直接重定向跳转到主页面
        if (redirectTo) {
            return <Redirect to={ redirectTo } />
        }
        return (
            <div>
                <NavBar style={{ backgroundColor:"#109C82" }} >硅 谷 直 聘</NavBar>
                <Logo />
                <WingBlank>
                    <List>
                        { msg ? <div className="err-msg">{ msg }</div> : null }
                        <WhiteSpace></WhiteSpace>
                        <InputItem 
                        placeholder="请输入用户名"
                        onChange={ val => { this.handleChange('username', val) }} >用户名：</InputItem>
                        <WhiteSpace></WhiteSpace>
                        <InputItem
                        placeholder="请输入密码"
                        onChange={val =>{ this.handleChange('password', val) } } >密&emsp;码：</InputItem>
                        <WhiteSpace></WhiteSpace>
                        
                        <Button style={{ backgroundColor:"#109C82" }} 
                        onClick={ this.login } >登录</Button>
                        <Button onClick={ this.toRegister } >我要注册</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}

export default connect(
    state => ({ user: state.user }),
    { login }
)(Login)

