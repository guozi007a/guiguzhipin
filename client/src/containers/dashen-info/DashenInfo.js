// 大神信息完善页面路由容器组件

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from  'react-router-dom'
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile'
import HeaderSelector from '../../components/header-selector/HeaderSelctor'
import { updateUser } from '../../redux/action'

class DashenInfo extends Component {
    state = {
        header: '',
        post: '',
        info: '',
        // compony: '',
        // salary: '',
    }
    setHeader = (header) => {
        this.setState({
            header
        })
    }
    handleChange = (name, value) => {
        this.setState({
            [name]: value
        })
    }
    save = () => {
        // console.log(this.state)
        this.props.updateUser(this.state)
    }
    render() {
        const { header, type } = this.props.user 
        if (header) { // 说明信息已经完善好了
            const path = type === 'laoban' ? '/laoban' : '/dashen'
            return <Redirect to={ path } /> // 重定向页面，跳转到指定路径
        }
        return (
            <div>
                <NavBar style={{ backgroundColor:"#109C82" }} >大神信息完善</NavBar>
                <HeaderSelector  setHeader={ this.setHeader } />
                <InputItem onChange={ val => { this.handleChange('post', val) }} >求职岗位：</InputItem>
                <TextareaItem 
                title="个人介绍："
                rows={ 4 } 
                onChange={ val => { this.handleChange('info', val) }} />
                <Button type="primary" style={{ backgroundColor:"#109C82" }} 
                onClick={ this.save } >保&emsp;存</Button>
            </div>
        )
    }
}

export default connect(
    state => ({ user: state.user }),
    { updateUser }
)(DashenInfo)
