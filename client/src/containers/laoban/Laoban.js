/*
老板主界面路由组件
*/
import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserList from '../../components/user-list/UserList'
import { getUserList } from '../../redux/action'

class Laoban extends Component {
    componentDidMount() {
        // 异步获取userlist大神列表信息
        this.props.getUserList('dashen')
    }
    render() {
        return (
            <UserList userList={ this.props.userList } />
        )
    }
}

export default connect(
    state => ({ userList: state.userList }),
    { getUserList }
)(Laoban)
